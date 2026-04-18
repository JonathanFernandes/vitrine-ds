import fs from 'node:fs';
import path from 'node:path';

export const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';
export const TOKENS_SOURCE_ROOT = path.join(OUTPUT_ROOT, 'tokens/source');
export const THEMES_ROOT = path.join(OUTPUT_ROOT, 'themes');
export const DIST_ROOT = path.join(OUTPUT_ROOT, 'tokens/dist');
export const REACT_NATIVE_DIST_ROOT = path.join(DIST_ROOT, 'react-native');
export const PACKAGE_JSON_PATH = path.join(OUTPUT_ROOT, 'package.json');
export const TOKEN_MANIFEST_PATH = path.join(
  OUTPUT_ROOT,
  'tokens/source/metadata/token-manifest.json',
);

export const REQUIRED_THEME_IDS = ['neutral', 'leblon', 'red', 'green'];
export const REQUIRED_DIST_TOKEN_PATHS = [
  'component.button.radius',
  'component.navigation-bar.item.active.label',
  'component.notification-icon-group.counter.bg',
  'component.progress-bar.fill.success',
  'component.card-store-item.image-border.default',
];

export function getSourceFileGroups() {
  return {
    primitives: [
      'primitives/border.base.json',
      'primitives/color.base.json',
      'primitives/elevation.base.json',
      'primitives/motion.base.json',
      'primitives/spacing.base.json',
      'primitives/typography.mobile.json',
      'primitives/z-index.base.json',
    ],
    semantic: ['semantic/color.json'],
    component: fs
      .readdirSync(path.join(TOKENS_SOURCE_ROOT, 'component'))
      .filter((fileName) => fileName.endsWith('.json'))
      .sort()
      .map((fileName) => `component/${fileName}`),
  };
}

export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export function writeText(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, value);
}

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !Object.prototype.hasOwnProperty.call(value, '$value')
    ) {
      if (
        !target[key] ||
        typeof target[key] !== 'object' ||
        Array.isArray(target[key]) ||
        Object.prototype.hasOwnProperty.call(target[key], '$value')
      ) {
        target[key] = {};
      }
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }

  return target;
}

export function buildSourceTree(sourceFileGroups = getSourceFileGroups()) {
  const sourceTree = {};

  for (const filePath of [
    ...sourceFileGroups.primitives,
    ...sourceFileGroups.semantic,
    ...sourceFileGroups.component,
  ]) {
    const absolutePath = path.join(TOKENS_SOURCE_ROOT, filePath);
    deepMerge(sourceTree, readJson(absolutePath));
  }

  return sourceTree;
}

export function loadThemes() {
  return fs
    .readdirSync(THEMES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readJson(path.join(THEMES_ROOT, entry.name, 'theme.json')))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getNodeByPath(tree, tokenPath) {
  return tokenPath.split('.').reduce((current, part) => current?.[part], tree);
}

export function resolveTokenValue(tree, tokenPath, seen = new Set()) {
  const node = getNodeByPath(tree, tokenPath);

  if (!node || typeof node !== 'object' || !Object.prototype.hasOwnProperty.call(node, '$value')) {
    throw new Error(`Token não encontrado para resolução: ${tokenPath}`);
  }

  const rawValue = node.$value;
  if (typeof rawValue !== 'string') {
    return rawValue;
  }

  const referenceMatch = rawValue.match(/^\{(.+)\}$/);
  if (!referenceMatch) {
    return rawValue;
  }

  const referencePath = referenceMatch[1];
  if (seen.has(referencePath)) {
    throw new Error(`Referência circular detectada: ${[...seen, referencePath].join(' -> ')}`);
  }

  seen.add(referencePath);
  return resolveTokenValue(tree, referencePath, seen);
}

export function buildResolvedValueTree(tree, currentNode = tree, pathParts = []) {
  if (!currentNode || typeof currentNode !== 'object') {
    return currentNode;
  }

  if (Object.prototype.hasOwnProperty.call(currentNode, '$value')) {
    return resolveTokenValue(tree, pathParts.join('.'));
  }

  return Object.fromEntries(
    Object.entries(currentNode).map(([key, value]) => [
      key,
      buildResolvedValueTree(tree, value, [...pathParts, key]),
    ]),
  );
}

export function flattenResolvedTree(node, pathParts = [], output = {}) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    output[pathParts.join('.')] = node;
    return output;
  }

  for (const [key, value] of Object.entries(node)) {
    flattenResolvedTree(value, [...pathParts, key], output);
  }

  return output;
}

export function buildThemeSourceTree(baseTree, theme) {
  const themeTree = structuredClone(baseTree);
  const primitiveOverrides = theme.overrides?.primitives ?? {};
  deepMerge(themeTree, primitiveOverrides);
  return themeTree;
}

export function buildThemeArtifacts(baseTree, theme) {
  const themeSourceTree = buildThemeSourceTree(baseTree, theme);
  const resolvedTree = buildResolvedValueTree(themeSourceTree);
  const flatTokens = flattenResolvedTree(resolvedTree);

  return {
    theme,
    sourceTree: themeSourceTree,
    resolvedTree,
    flatTokens,
  };
}

export function cleanReactNativeDist() {
  fs.rmSync(REACT_NATIVE_DIST_ROOT, { recursive: true, force: true });
}

export function buildDistArtifacts({
  packageJson = readJson(PACKAGE_JSON_PATH),
  sourceFileGroups = getSourceFileGroups(),
  tokenManifest = readJson(TOKEN_MANIFEST_PATH),
  buildTimestamp = new Date().toISOString(),
} = {}) {
  const baseTree = buildSourceTree(sourceFileGroups);
  const themes = loadThemes();
  const perThemeManifest = {};
  const themeArtifacts = {};

  for (const theme of themes) {
    const artifacts = buildThemeArtifacts(baseTree, theme);
    themeArtifacts[theme.id] = artifacts;
    perThemeManifest[theme.id] = {
      figmaMode: theme.figmaMode,
      tokenCount: Object.keys(artifacts.flatTokens).length,
      tokensFile: `./themes/${theme.id}/tokens.json`,
      flatFile: `./themes/${theme.id}/flat.json`,
      metaFile: `./themes/${theme.id}/meta.json`,
    };
  }

  const reactNativeManifest = {
    platform: 'react-native',
    defaultTheme: 'neutral',
    typographyProfile: 'mobile',
    generatedAt: buildTimestamp,
    contract: {
      recommendedThemeImport: './themes/neutral/tokens.json',
      recommendedFlatImport: './themes/neutral/flat.json',
    },
    themes: perThemeManifest,
  };

  const rootManifest = {
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    generatedAt: buildTimestamp,
    outputs: {
      reactNative: {
        manifestFile: './react-native/manifest.json',
        defaultTheme: 'neutral',
        themes: Object.keys(perThemeManifest),
        tokenCountByTheme: Object.fromEntries(
          Object.entries(perThemeManifest).map(([themeId, config]) => [themeId, config.tokenCount]),
        ),
      },
    },
    source: {
      sourceRoot: TOKENS_SOURCE_ROOT,
      themeRoot: THEMES_ROOT,
      includedFiles: sourceFileGroups,
    },
    metadata: {
      sourceOfTruth: tokenManifest.sourceOfTruth,
      declaredThemes: tokenManifest.themes,
    },
  };

  return {
    buildTimestamp,
    packageJson,
    tokenManifest,
    sourceFileGroups,
    baseTree,
    themes,
    themeArtifacts,
    reactNativeManifest,
    rootManifest,
  };
}

export function getReactNativeReadme() {
  return [
    '# React Native Dist',
    '',
    'Saída gerada para consumo do Design System em apps React Native.',
    '',
    'Arquivos principais:',
    '',
    '- `manifest.json`: contrato de saída da plataforma',
    '- `themes/<theme>/tokens.json`: árvore resolvida de tokens por tema',
    '- `themes/<theme>/flat.json`: mapa plano `token.path -> valor`',
    '- `themes/<theme>/meta.json`: metadata do tema gerado',
    '',
    'Import recomendado para uso inicial no `ds-react`:',
    '',
    '- `tokens/dist/react-native/themes/neutral/tokens.json`',
    '- `tokens/dist/react-native/themes/neutral/flat.json`',
  ].join('\n') + '\n';
}

export function collectTokenDefinitions(node, pathParts = [], output = []) {
  if (!node || typeof node !== 'object') {
    return output;
  }

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    output.push({
      path: pathParts.join('.'),
      value: node.$value,
      type: node.$type ?? null,
    });
    return output;
  }

  for (const [key, value] of Object.entries(node)) {
    collectTokenDefinitions(value, [...pathParts, key], output);
  }

  return output;
}
