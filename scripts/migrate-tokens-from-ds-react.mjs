import fs from 'node:fs';
import path from 'node:path';

const SOURCE_REPO = '/Users/jonathanfernandes/ds-react';
const SOURCE_TOKENS_PATH = path.join(SOURCE_REPO, 'tokens-for-react.json');
const SOURCE_DESIGN_DOC_PATH = path.join(SOURCE_REPO, 'design.md');
const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';

const THEME_ID_BY_MODE = {
  NeutralTheme: 'neutral',
  LeblonTheme: 'leblon',
  RedTheme: 'red',
  GreenTheme: 'green',
};

const data = JSON.parse(fs.readFileSync(SOURCE_TOKENS_PATH, 'utf8'));
const designDoc = fs.readFileSync(SOURCE_DESIGN_DOC_PATH, 'utf8');

function getCollection(name) {
  const match = data.find((entry) => Object.prototype.hasOwnProperty.call(entry, name));
  if (!match) {
    throw new Error(`Collection not found: ${name}`);
  }
  return match[name];
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function removeFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function sortObject(value) {
  if (Array.isArray(value)) {
    return value.map(sortObject);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const result = {};
  for (const key of Object.keys(value).sort()) {
    result[key] = sortObject(value[key]);
  }
  return result;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function splitSharedAndOverridesByPath(themeModesById, topLevelKey) {
  const themeIds = Object.keys(themeModesById);
  const baseThemeId = themeIds[0];
  const shared = {};
  const overridesByTheme = Object.fromEntries(themeIds.map((themeId) => [themeId, {}]));

  function walk(nodesByTheme, targetShared, targetOverridesByTheme) {
    const firstThemeId = themeIds[0];
    const firstNode = nodesByTheme[firstThemeId];

    if (!firstNode || typeof firstNode !== 'object') {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(firstNode, '$value')) {
      const serializedValues = themeIds.map((themeId) => JSON.stringify(nodesByTheme[themeId]));
      const sameAcrossThemes = new Set(serializedValues).size === 1;

      if (sameAcrossThemes) {
        Object.assign(targetShared, deepClone(firstNode));
        return;
      }

      const baseValue = nodesByTheme[baseThemeId];
      Object.assign(targetShared, deepClone(baseValue));

      for (const themeId of themeIds) {
        if (themeId === baseThemeId) {
          continue;
        }

        if (JSON.stringify(nodesByTheme[themeId]) !== JSON.stringify(baseValue)) {
          Object.assign(targetOverridesByTheme[themeId], deepClone(nodesByTheme[themeId]));
        }
      }
      return;
    }

    const keys = new Set();
    for (const themeId of themeIds) {
      for (const key of Object.keys(nodesByTheme[themeId] || {})) {
        keys.add(key);
      }
    }

    for (const key of Array.from(keys).sort()) {
      const nextNodesByTheme = Object.fromEntries(
        themeIds.map((themeId) => [themeId, nodesByTheme[themeId]?.[key]])
      );

      const childShared = {};
      const childOverridesByTheme = Object.fromEntries(themeIds.map((themeId) => [themeId, {}]));

      walk(nextNodesByTheme, childShared, childOverridesByTheme);

      if (Object.keys(childShared).length > 0) {
        targetShared[key] = childShared;
      }

      for (const themeId of themeIds) {
        if (Object.keys(childOverridesByTheme[themeId]).length > 0) {
          targetOverridesByTheme[themeId][key] = childOverridesByTheme[themeId];
        }
      }
    }
  }

  const nodesByTheme = Object.fromEntries(
    Object.entries(themeModesById).map(([themeId, themeMode]) => [themeId, themeMode[topLevelKey]])
  );

  walk(nodesByTheme, shared, overridesByTheme);

  return {
    shared: sortObject({ [topLevelKey]: shared }),
    overridesByTheme: Object.fromEntries(
      Object.entries(overridesByTheme).map(([themeId, overrides]) => [
        themeId,
        sortObject(Object.keys(overrides).length > 0 ? { [topLevelKey]: overrides } : {}),
      ])
    ),
  };
}

function extractSectionMeta(markdown) {
  const version = markdown.match(/>\s+\*\*Versao:\*\*\s*(.+)$/im)?.[1]?.trim()
    || markdown.match(/>\s+\*\*Versão:\*\*\s*(.+)$/im)?.[1]?.trim()
    || null;
  const date = markdown.match(/>\s+\*\*Data:\*\*\s*(.+)$/im)?.[1]?.trim() || null;
  const status = markdown.match(/>\s+\*\*Status:\*\*\s*(.+)$/im)?.[1]?.trim() || null;
  return { version, date, status };
}

function countTokens(node) {
  if (!node || typeof node !== 'object') {
    return 0;
  }

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    return 1;
  }

  return Object.values(node).reduce((total, value) => total + countTokens(value), 0);
}

const primitivesByMode = getCollection('Primitive tokens').modes;
const semanticByMode = getCollection('Semantic Tokens').modes;
const componentByMode = getCollection('Component Tokens').modes;
const typographyByMode = getCollection('Typography').modes;
const elevationUniversal = getCollection('Elevation Tokens').modes.Universal;
const motionUniversal = getCollection('Motion Tokens').modes.Universal;
const zIndexUniversal = getCollection('Z-Index Tokens').modes.Universal;

const primitiveThemeModesById = Object.fromEntries(
  Object.entries(primitivesByMode).map(([modeName, value]) => [THEME_ID_BY_MODE[modeName], value])
);

const semanticShared = sortObject(semanticByMode.NeutralTheme);
const componentShared = sortObject(componentByMode.NeutralTheme);
const sectionMeta = extractSectionMeta(designDoc);

const primitiveColorSplit = splitSharedAndOverridesByPath(primitiveThemeModesById, 'color');
const primitiveBorderSplit = splitSharedAndOverridesByPath(primitiveThemeModesById, 'border');
const primitiveSpacingSplit = splitSharedAndOverridesByPath(primitiveThemeModesById, 'spacing');

removeFileIfExists(path.join(OUTPUT_ROOT, 'tokens/source/primitives/color.shared.json'));
removeFileIfExists(path.join(OUTPUT_ROOT, 'tokens/source/primitives/border.shared.json'));
removeFileIfExists(path.join(OUTPUT_ROOT, 'tokens/source/primitives/spacing.shared.json'));
removeFileIfExists(path.join(OUTPUT_ROOT, 'tokens/source/primitives/elevation.shared.json'));
removeFileIfExists(path.join(OUTPUT_ROOT, 'tokens/source/primitives/motion.shared.json'));
removeFileIfExists(path.join(OUTPUT_ROOT, 'tokens/source/primitives/z-index.shared.json'));

writeJson(path.join(OUTPUT_ROOT, 'tokens/source/primitives/color.base.json'), primitiveColorSplit.shared);
writeJson(path.join(OUTPUT_ROOT, 'tokens/source/primitives/border.base.json'), primitiveBorderSplit.shared);
writeJson(path.join(OUTPUT_ROOT, 'tokens/source/primitives/spacing.base.json'), primitiveSpacingSplit.shared);
writeJson(
  path.join(OUTPUT_ROOT, 'tokens/source/primitives/typography.mobile.json'),
  sortObject(typographyByMode.Mobile)
);
writeJson(
  path.join(OUTPUT_ROOT, 'tokens/source/primitives/typography.desktop.json'),
  sortObject(typographyByMode.Desktop)
);
writeJson(
  path.join(OUTPUT_ROOT, 'tokens/source/primitives/elevation.base.json'),
  sortObject(elevationUniversal)
);
writeJson(
  path.join(OUTPUT_ROOT, 'tokens/source/primitives/motion.base.json'),
  sortObject(motionUniversal)
);
writeJson(
  path.join(OUTPUT_ROOT, 'tokens/source/primitives/z-index.base.json'),
  sortObject(zIndexUniversal)
);

for (const [namespace, value] of Object.entries(semanticShared)) {
  writeJson(path.join(OUTPUT_ROOT, `tokens/source/semantic/${namespace}.json`), { [namespace]: value });
}

for (const [componentName, value] of Object.entries(componentShared.component)) {
  writeJson(
    path.join(OUTPUT_ROOT, `tokens/source/component/${componentName}.json`),
    { component: { [componentName]: value } }
  );
}

for (const [themeId, figmaMode] of Object.entries(
  Object.fromEntries(Object.entries(THEME_ID_BY_MODE).map(([modeName, id]) => [id, modeName]))
)) {
  const themeOverrides = {
    primitives: {
      color: primitiveColorSplit.overridesByTheme[themeId].color || {},
      border: primitiveBorderSplit.overridesByTheme[themeId].border || {},
      spacing: primitiveSpacingSplit.overridesByTheme[themeId].spacing || {},
    },
  };

  writeJson(path.join(OUTPUT_ROOT, `themes/${themeId}/theme.json`), {
    id: themeId,
    figmaMode,
    status: 'migrated-from-ds-react',
    source: {
      tokensFile: SOURCE_TOKENS_PATH,
      designDoc: SOURCE_DESIGN_DOC_PATH,
      designVersion: sectionMeta.version,
      designDate: sectionMeta.date,
      designStatus: sectionMeta.status,
    },
    tokenCounts: {
      primitiveOverrides: countTokens(themeOverrides),
    },
    overrides: sortObject(themeOverrides),
  });
}

writeJson(path.join(OUTPUT_ROOT, 'tokens/source/metadata/token-manifest.json'), {
  name: 'vitrine-design-system',
  version: '0.1.0',
  sourceOfTruth: 'tokens/source',
  migrationSource: {
    repositoryPath: SOURCE_REPO,
    tokensFile: SOURCE_TOKENS_PATH,
    designDoc: SOURCE_DESIGN_DOC_PATH,
    designVersion: sectionMeta.version,
    designDate: sectionMeta.date,
    designStatus: sectionMeta.status,
  },
  layers: ['primitives', 'semantic', 'component'],
  foundations: ['typography', 'elevation', 'motion', 'z-index'],
  themes: Object.values(THEME_ID_BY_MODE),
  summary: {
    primitiveBaseTokens: countTokens({
      ...primitiveColorSplit.shared,
      ...primitiveBorderSplit.shared,
      ...primitiveSpacingSplit.shared,
    }),
    semanticTokens: countTokens(semanticShared),
    componentTokens: countTokens(componentShared),
    typographyTokens: countTokens(typographyByMode.Mobile) + countTokens(typographyByMode.Desktop),
    elevationTokens: countTokens(elevationUniversal),
    motionTokens: countTokens(motionUniversal),
    zIndexTokens: countTokens(zIndexUniversal),
  },
  notes: [
    'Primitive tokens foram separados em base neutral + overrides por tema.',
    'Semantic Tokens e Component Tokens sao compartilhados entre os temas no export atual.',
    'Typography varia por plataforma e foi mantida em arquivos dedicados.',
  ],
});
