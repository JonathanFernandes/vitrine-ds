import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';
const TOKENS_SOURCE_ROOT = path.join(OUTPUT_ROOT, 'tokens/source');
const REVIEWED_ALIASES_PATH = path.join(
  OUTPUT_ROOT,
  'tokens/source/metadata/design-doc-aliases.reviewed.json'
);
const TOKEN_MANIFEST_PATH = path.join(
  OUTPUT_ROOT,
  'tokens/source/metadata/token-manifest.json'
);
const COMPAT_ROOT = path.join(TOKENS_SOURCE_ROOT, 'compat');
const COMPAT_METADATA_PATH = path.join(
  OUTPUT_ROOT,
  'tokens/source/metadata/compatibility-layer.json'
);
const GENERATED_FILES = [
  path.join(COMPAT_ROOT, 'color.json'),
  path.join(COMPAT_ROOT, 'component.json'),
];

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

function listJsonFilesRecursively(dirPath) {
  const results = [];
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...listJsonFilesRecursively(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.json')) {
      results.push(fullPath);
    }
  }
  return results.sort();
}

function isTokenLeaf(node) {
  return Boolean(node) && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, '$value');
}

function flattenTokens(node, pathParts = [], output = {}) {
  if (!node || typeof node !== 'object') {
    return output;
  }

  if (isTokenLeaf(node)) {
    output[pathParts.join('.')] = node;
    return output;
  }

  for (const [key, value] of Object.entries(node)) {
    flattenTokens(value, [...pathParts, key], output);
  }

  return output;
}

function assignNested(target, tokenPath, value) {
  const parts = tokenPath.split('.');
  let cursor = target;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const key = parts[index];
    if (!cursor[key]) {
      cursor[key] = {};
    }
    cursor = cursor[key];
  }

  cursor[parts.at(-1)] = value;
}

const reviewedAliases = JSON.parse(fs.readFileSync(REVIEWED_ALIASES_PATH, 'utf8'));

const sourceFiles = listJsonFilesRecursively(TOKENS_SOURCE_ROOT).filter((filePath) => {
  return !filePath.includes('/metadata/') && !filePath.includes('/compat/');
});

const tokenIndex = {};

for (const filePath of sourceFiles) {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  Object.assign(tokenIndex, flattenTokens(json));
}

const groupedAliases = {};
const unresolvedAliases = [];

for (const [aliasToken, config] of Object.entries(reviewedAliases)) {
  const canonicalToken = config.aliasTo;
  const canonicalNode = tokenIndex[canonicalToken];

  if (!canonicalNode) {
    unresolvedAliases.push({ aliasToken, canonicalToken });
    continue;
  }

  const root = aliasToken.split('.')[0];
  if (!groupedAliases[root]) {
    groupedAliases[root] = {};
  }

  const aliasNode = {
    $type: canonicalNode.$type,
    $value: `{${canonicalToken}}`,
    $description: `Compatibility alias for legacy documented token ${aliasToken}. Canonical token: ${canonicalToken}.`,
    $extensions: {
      vitrine: {
        kind: 'compatibility-alias',
        reviewed: true,
        source: 'design.md',
        canonicalToken,
        reason: config.reason,
      },
    },
  };

  if (canonicalNode.$scopes) {
    aliasNode.$scopes = canonicalNode.$scopes;
  }

  assignNested(groupedAliases[root], aliasToken, aliasNode);
}

if (unresolvedAliases.length > 0) {
  throw new Error(`Compatibility layer has unresolved aliases: ${JSON.stringify(unresolvedAliases, null, 2)}`);
}

for (const filePath of GENERATED_FILES) {
  removeFileIfExists(filePath);
}

for (const [root, value] of Object.entries(groupedAliases)) {
  writeJson(path.join(COMPAT_ROOT, `${root}.json`), sortObject(value));
}

writeJson(COMPAT_METADATA_PATH, {
  source: {
    reviewedAliases: REVIEWED_ALIASES_PATH,
  },
  generatedAtLayer: 'tokens/source/compat',
  generatedFiles: GENERATED_FILES.map((filePath) => path.relative(OUTPUT_ROOT, filePath)),
  aliasCount: Object.keys(reviewedAliases).length,
  namespaces: Object.fromEntries(
    Object.entries(groupedAliases)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([root, value]) => [root, Object.keys(flattenTokens(value)).length])
  ),
  unresolvedAliases,
});

if (fs.existsSync(TOKEN_MANIFEST_PATH)) {
  const tokenManifest = JSON.parse(fs.readFileSync(TOKEN_MANIFEST_PATH, 'utf8'));
  tokenManifest.compatibility = {
    aliasCount: Object.keys(reviewedAliases).length,
    enabled: true,
    generatedFiles: GENERATED_FILES.map((filePath) => path.relative(OUTPUT_ROOT, filePath)),
    source: REVIEWED_ALIASES_PATH,
  };
  tokenManifest.summary = {
    ...tokenManifest.summary,
    compatibilityAliasTokens: Object.keys(reviewedAliases).length,
  };

  if (!Array.isArray(tokenManifest.notes)) {
    tokenManifest.notes = [];
  }

  const compatibilityNote = 'Aliases revisados podem ser materializados em tokens/source/compat via build de compatibilidade.';
  if (!tokenManifest.notes.includes(compatibilityNote)) {
    tokenManifest.notes.push(compatibilityNote);
  }

  writeJson(TOKEN_MANIFEST_PATH, sortObject(tokenManifest));
}
