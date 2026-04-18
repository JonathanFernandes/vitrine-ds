import fs from 'node:fs';
import path from 'node:path';

import {
  DIST_ROOT,
  OUTPUT_ROOT,
  PACKAGE_JSON_PATH,
  REACT_NATIVE_DIST_ROOT,
  REQUIRED_DIST_TOKEN_PATHS,
  REQUIRED_THEME_IDS,
  THEMES_ROOT,
  TOKEN_MANIFEST_PATH,
  TOKENS_SOURCE_ROOT,
  buildDistArtifacts,
  collectTokenDefinitions,
  getNodeByPath,
  getReactNativeReadme,
  getSourceFileGroups,
  readJson,
} from './lib/token-dist.mjs';

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function assertExists(filePath, label = filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Ausente: ${label}`);
    return false;
  }

  return true;
}

function stripGeneratedAt(value) {
  if (Array.isArray(value)) {
    return value.map(stripGeneratedAt);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'generatedAt')
        .map(([key, nestedValue]) => [key, stripGeneratedAt(nestedValue)]),
    );
  }

  return value;
}

function compareJson(label, actual, expected) {
  if (
    JSON.stringify(stripGeneratedAt(actual)) !== JSON.stringify(stripGeneratedAt(expected))
  ) {
    fail(`${label} está desatualizado em relação ao estado atual do source. Rode \`npm run tokens:build\`.`);
  }
}

function compareText(label, actual, expected) {
  if (actual !== expected) {
    fail(`${label} está desatualizado. Rode \`npm run tokens:build\`.`);
  }
}

function validateSourceFiles(sourceFileGroups) {
  const tokenOccurrences = new Map();

  for (const groupFiles of Object.values(sourceFileGroups)) {
    for (const relativeFilePath of groupFiles) {
      const absolutePath = path.join(TOKENS_SOURCE_ROOT, relativeFilePath);
      assertExists(absolutePath, relativeFilePath);
      if (!fs.existsSync(absolutePath)) {
        continue;
      }

      const fileJson = readJson(absolutePath);
      const tokenDefinitions = collectTokenDefinitions(fileJson);

      for (const tokenDefinition of tokenDefinitions) {
        const occurrences = tokenOccurrences.get(tokenDefinition.path) ?? [];
        occurrences.push(relativeFilePath);
        tokenOccurrences.set(tokenDefinition.path, occurrences);
      }
    }
  }

  for (const [tokenPath, occurrences] of tokenOccurrences.entries()) {
    if (occurrences.length > 1) {
      fail(
        `Token duplicado em múltiplos arquivos: ${tokenPath} (${occurrences.join(', ')})`,
      );
    }
  }
}

function validateTokenManifest(tokenManifest) {
  assertExists(TOKEN_MANIFEST_PATH, 'tokens/source/metadata/token-manifest.json');
  assert(
    Array.isArray(tokenManifest.themes) &&
      REQUIRED_THEME_IDS.every((themeId) => tokenManifest.themes.includes(themeId)),
    `token-manifest.json precisa declarar os temas obrigatórios: ${REQUIRED_THEME_IDS.join(', ')}`,
  );
  assert(
    tokenManifest.sourceOfTruth === 'tokens/source',
    'token-manifest.json deve apontar `sourceOfTruth` para `tokens/source`.',
  );
}

function validateThemes(distArtifacts) {
  const discoveredThemeIds = distArtifacts.themes.map((theme) => theme.id);
  const expectedThemeIds = [...REQUIRED_THEME_IDS].sort();

  assert(
    JSON.stringify(discoveredThemeIds) === JSON.stringify(expectedThemeIds),
    `Temas encontrados em /themes divergem do esperado. Esperado: ${expectedThemeIds.join(', ')}. Atual: ${discoveredThemeIds.join(', ')}`,
  );

  for (const themeId of REQUIRED_THEME_IDS) {
    const themeFilePath = path.join(THEMES_ROOT, themeId, 'theme.json');
    assertExists(themeFilePath, `themes/${themeId}/theme.json`);
    if (!fs.existsSync(themeFilePath)) {
      continue;
    }

    const themeJson = readJson(themeFilePath);
    assert(themeJson.id === themeId, `themes/${themeId}/theme.json deve ter id "${themeId}".`);
    assert(
      typeof themeJson.figmaMode === 'string' && themeJson.figmaMode.length > 0,
      `themes/${themeId}/theme.json deve definir \`figmaMode\`.`,
    );
    assert(
      typeof themeJson.status === 'string' && themeJson.status.length > 0,
      `themes/${themeId}/theme.json deve definir \`status\`.`,
    );
    assert(
      themeJson.source && typeof themeJson.source === 'object',
      `themes/${themeId}/theme.json deve definir \`source\`.`,
    );
    assert(
      themeJson.overrides &&
        themeJson.overrides.primitives &&
        typeof themeJson.overrides.primitives === 'object',
      `themes/${themeId}/theme.json deve definir \`overrides.primitives\`.`,
    );
  }
}

function validateResolvedTokens(distArtifacts) {
  for (const theme of distArtifacts.themes) {
    const artifacts = distArtifacts.themeArtifacts[theme.id];

    assert(
      Object.keys(artifacts.flatTokens).length > 0,
      `Tema ${theme.id} não gerou tokens resolvidos.`,
    );

    for (const tokenPath of REQUIRED_DIST_TOKEN_PATHS) {
      const value = artifacts.flatTokens[tokenPath];
      assert(
        value !== undefined,
        `Tema ${theme.id} não contém o token obrigatório no dist: ${tokenPath}`,
      );
    }
  }
}

function validateDistFiles(distArtifacts) {
  assertExists(DIST_ROOT, 'tokens/dist');
  assertExists(REACT_NATIVE_DIST_ROOT, 'tokens/dist/react-native');
  assertExists(PACKAGE_JSON_PATH, 'package.json');

  const rootManifestPath = path.join(DIST_ROOT, 'manifest.json');
  const reactNativeManifestPath = path.join(REACT_NATIVE_DIST_ROOT, 'manifest.json');
  const reactNativeReadmePath = path.join(REACT_NATIVE_DIST_ROOT, 'README.md');

  assertExists(rootManifestPath, 'tokens/dist/manifest.json');
  assertExists(reactNativeManifestPath, 'tokens/dist/react-native/manifest.json');
  assertExists(reactNativeReadmePath, 'tokens/dist/react-native/README.md');

  if (fs.existsSync(rootManifestPath)) {
    compareJson('tokens/dist/manifest.json', readJson(rootManifestPath), distArtifacts.rootManifest);
  }

  if (fs.existsSync(reactNativeManifestPath)) {
    compareJson(
      'tokens/dist/react-native/manifest.json',
      readJson(reactNativeManifestPath),
      distArtifacts.reactNativeManifest,
    );
  }

  if (fs.existsSync(reactNativeReadmePath)) {
    compareText(
      'tokens/dist/react-native/README.md',
      fs.readFileSync(reactNativeReadmePath, 'utf8'),
      getReactNativeReadme(),
    );
  }

  for (const theme of distArtifacts.themes) {
    const themeDistRoot = path.join(REACT_NATIVE_DIST_ROOT, 'themes', theme.id);
    const tokensFilePath = path.join(themeDistRoot, 'tokens.json');
    const flatFilePath = path.join(themeDistRoot, 'flat.json');
    const metaFilePath = path.join(themeDistRoot, 'meta.json');

    assertExists(tokensFilePath, `tokens/dist/react-native/themes/${theme.id}/tokens.json`);
    assertExists(flatFilePath, `tokens/dist/react-native/themes/${theme.id}/flat.json`);
    assertExists(metaFilePath, `tokens/dist/react-native/themes/${theme.id}/meta.json`);

    if (fs.existsSync(tokensFilePath)) {
      compareJson(
        `tokens/dist/react-native/themes/${theme.id}/tokens.json`,
        readJson(tokensFilePath),
        distArtifacts.themeArtifacts[theme.id].resolvedTree,
      );
    }

    if (fs.existsSync(flatFilePath)) {
      const flatTokens = readJson(flatFilePath);
      compareJson(
        `tokens/dist/react-native/themes/${theme.id}/flat.json`,
        flatTokens,
        distArtifacts.themeArtifacts[theme.id].flatTokens,
      );

      const manifestTokenCount =
        distArtifacts.reactNativeManifest.themes[theme.id]?.tokenCount ?? null;
      assert(
        manifestTokenCount === Object.keys(flatTokens).length,
        `Manifest do tema ${theme.id} diverge do total real de tokens no flat.json.`,
      );

      for (const tokenPath of REQUIRED_DIST_TOKEN_PATHS) {
        assert(
          flatTokens[tokenPath] !== undefined,
          `flat.json do tema ${theme.id} não contém o token obrigatório: ${tokenPath}`,
        );
      }
    }

    if (fs.existsSync(metaFilePath)) {
      const meta = readJson(metaFilePath);
      assert(meta.id === theme.id, `meta.json do tema ${theme.id} deve repetir o id correto.`);
      assert(
        meta.tokenCount === Object.keys(distArtifacts.themeArtifacts[theme.id].flatTokens).length,
        `meta.json do tema ${theme.id} está com tokenCount desatualizado.`,
      );
      assert(
        meta.typographyProfile === 'mobile',
        `meta.json do tema ${theme.id} deve manter typographyProfile como "mobile".`,
      );
    }
  }
}

function validatePackageScripts(packageJson) {
  const scripts = packageJson.scripts ?? {};
  assert(
    scripts['tokens:build'] === 'node ./scripts/build-tokens-dist.mjs',
    'package.json deve expor `tokens:build` apontando para o build oficial.',
  );
  assert(
    scripts['tokens:validate'] === 'node ./scripts/validate-tokens.mjs',
    'package.json deve expor `tokens:validate` apontando para a validação oficial.',
  );
  assert(
    scripts['tokens:sync-ds-react'] === 'node ./scripts/sync-ds-react-theme.mjs',
    'package.json deve expor `tokens:sync-ds-react` apontando para o sync do app.',
  );
}

function validateTreeHasExpectedRoots(distArtifacts) {
  const expectedRoots = ['border', 'color', 'component', 'elevation', 'font', 'motion', 'spacing', 'z-index'];
  const neutralTree = distArtifacts.themeArtifacts.neutral?.resolvedTree;

  for (const root of expectedRoots) {
    assert(
      getNodeByPath(neutralTree, root) !== undefined,
      `Árvore resolvida do tema neutral não contém a raiz esperada: ${root}`,
    );
  }
}

const packageJson = readJson(PACKAGE_JSON_PATH);
const tokenManifest = readJson(TOKEN_MANIFEST_PATH);
const sourceFileGroups = getSourceFileGroups();
const distArtifacts = buildDistArtifacts({ packageJson, sourceFileGroups, tokenManifest });

validateSourceFiles(sourceFileGroups);
validateTokenManifest(tokenManifest);
validateThemes(distArtifacts);
validateResolvedTokens(distArtifacts);
validateDistFiles(distArtifacts);
validatePackageScripts(packageJson);
validateTreeHasExpectedRoots(distArtifacts);

if (tokenManifest.compatibility?.aliasCount !== 0) {
  warn(
    `A camada de compatibilidade ainda declara ${tokenManifest.compatibility.aliasCount} aliases. Considere revisar se isso continua intencional.`,
  );
}

if (warnings.length > 0) {
  console.warn('Avisos:');
  for (const message of warnings) {
    console.warn(`- ${message}`);
  }
}

if (errors.length > 0) {
  console.error('Falhas de validação:');
  for (const message of errors) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log('Validacao concluida com sucesso.');
console.log(`- Temas validados: ${distArtifacts.themes.map((theme) => theme.id).join(', ')}`);
console.log(`- Tokens no tema neutral: ${Object.keys(distArtifacts.themeArtifacts.neutral.flatTokens).length}`);
console.log(`- Checks criticos no dist: ${REQUIRED_DIST_TOKEN_PATHS.length}`);
