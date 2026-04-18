import fs from 'node:fs';
import path from 'node:path';

const SOURCE_REPO = '/Users/jonathanfernandes/ds-react';
const DESIGN_DOC_PATH = path.join(SOURCE_REPO, 'design.md');
const TOKENS_EXPORT_PATH = path.join(SOURCE_REPO, 'tokens-for-react.json');
const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';

const ALLOWED_PREFIXES = [
  'color.',
  'component.',
  'border.',
  'spacing.',
  'font.',
  'motion.',
  'z-index.',
  'elevation.',
];

const STRIPPABLE_PREFIXES = [
  'NeutralTheme.',
  'LeblonTheme.',
  'RedTheme.',
  'GreenTheme.',
  'Mobile.',
  'Desktop.',
  'Universal.',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, value);
}

function flattenTokens(node, pathParts = [], output = []) {
  if (!node || typeof node !== 'object') {
    return output;
  }

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    output.push(pathParts.join('.'));
    return output;
  }

  for (const [key, value] of Object.entries(node)) {
    flattenTokens(value, [...pathParts, key], output);
  }

  return output;
}

function normalizeDocToken(rawToken) {
  return rawToken
    .trim()
    .replaceAll('/', '.')
    .toLowerCase()
    .replace(/[(),:;]+$/g, '')
    .replace(/^\.+|\.+$/g, '');
}

function normalizeExportToken(token) {
  let normalized = token;
  for (const prefix of STRIPPABLE_PREFIXES) {
    if (normalized.startsWith(prefix)) {
      normalized = normalized.slice(prefix.length);
      break;
    }
  }
  return normalized;
}

function isAllowedToken(token) {
  return ALLOWED_PREFIXES.some((prefix) => token.startsWith(prefix));
}

function tokenize(token) {
  return token.split('.').filter(Boolean);
}

function similarityScore(a, b) {
  const aParts = tokenize(a);
  const bParts = tokenize(b);
  const aSet = new Set(aParts);
  const bSet = new Set(bParts);

  let shared = 0;
  for (const part of aSet) {
    if (bSet.has(part)) {
      shared += 1;
    }
  }

  let prefix = 0;
  while (prefix < aParts.length && prefix < bParts.length && aParts[prefix] === bParts[prefix]) {
    prefix += 1;
  }

  const overlap = shared / Math.max(aSet.size, bSet.size);
  const prefixWeight = prefix / Math.max(aParts.length, bParts.length);
  return overlap * 0.6 + prefixWeight * 0.4;
}

function getBestCandidates(token, exportTokens, limit = 3) {
  return exportTokens
    .map((candidate) => ({
      token: candidate,
      score: Number(similarityScore(token, candidate).toFixed(3)),
    }))
    .filter((candidate) => candidate.score > 0.35)
    .sort((a, b) => b.score - a.score || a.token.localeCompare(b.token))
    .slice(0, limit);
}

function groupByPrefix(tokens) {
  const groups = {};

  for (const token of tokens) {
    const parts = tokenize(token);
    const key = parts.slice(0, 2).join('.') || parts[0] || 'other';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(token);
  }

  return Object.fromEntries(
    Object.entries(groups)
      .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
      .map(([key, value]) => [key, value.sort()])
  );
}

const designDoc = fs.readFileSync(DESIGN_DOC_PATH, 'utf8');
const designDocWithoutCodeFences = designDoc.replace(/```[\s\S]*?```/g, '');
const exportData = JSON.parse(fs.readFileSync(TOKENS_EXPORT_PATH, 'utf8'));

const documentedTokens = [
  ...new Set(
    [...designDocWithoutCodeFences.matchAll(/`([^`\n]+)`/g)]
      .map((match) => normalizeDocToken(match[1]))
      .filter((token) => token.length > 0)
      .filter((token) => /^[A-Za-z0-9.-]+$/.test(token))
      .filter(isAllowedToken)
  ),
].sort();

const exportedTokens = [
  ...new Set(
    exportData
      .flatMap((entry) => Object.values(entry)[0]?.modes ? Object.values(entry)[0].modes : [])
      .flatMap((mode) => flattenTokens(mode))
      .map(normalizeExportToken)
      .filter(isAllowedToken)
  ),
].sort();

const exportedTokenSet = new Set(exportedTokens);
const documentedTokenSet = new Set(documentedTokens);

const documentedButMissing = documentedTokens.filter((token) => !exportedTokenSet.has(token));
const exportedButUndocumented = exportedTokens.filter((token) => !documentedTokenSet.has(token));

const missingWithCandidates = documentedButMissing.map((token) => ({
  token,
  candidates: getBestCandidates(token, exportedTokens),
}));

const aliasDraft = Object.fromEntries(
  missingWithCandidates
    .filter((item) => item.candidates[0]?.score >= 0.72)
    .map((item) => [
      item.token,
      {
        aliasTo: item.candidates[0].token,
        confidence: item.candidates[0].score,
      },
    ])
);

const report = {
  source: {
    designDoc: DESIGN_DOC_PATH,
    tokensExport: TOKENS_EXPORT_PATH,
  },
  summary: {
    documentedTokenCount: documentedTokens.length,
    exportedTokenCount: exportedTokens.length,
    documentedButMissingCount: documentedButMissing.length,
    exportedButUndocumentedCount: exportedButUndocumented.length,
    highConfidenceAliasCount: Object.keys(aliasDraft).length,
  },
  documentedButMissing: missingWithCandidates,
  exportedButUndocumented,
  groupedMissing: groupByPrefix(documentedButMissing),
  groupedUndocumented: groupByPrefix(exportedButUndocumented),
  aliasDraft,
};

const markdown = [
  '# Auditoria de Tokens: design.md x export',
  '',
  `Fonte: \`${DESIGN_DOC_PATH}\``,
  `Export: \`${TOKENS_EXPORT_PATH}\``,
  '',
  '## Resumo',
  '',
  `- tokens documentados: ${report.summary.documentedTokenCount}`,
  `- tokens no export normalizado: ${report.summary.exportedTokenCount}`,
  `- documentados e ausentes no export: ${report.summary.documentedButMissingCount}`,
  `- no export e nao documentados: ${report.summary.exportedButUndocumentedCount}`,
  `- aliases heurísticos com alta confianca: ${report.summary.highConfidenceAliasCount}`,
  '',
  '## Grupos com maior delta no design.md',
  '',
  ...Object.entries(report.groupedMissing)
    .slice(0, 12)
    .flatMap(([group, tokens]) => [`### ${group}`, '', ...tokens.slice(0, 12).map((token) => `- \`${token}\``), '']),
  '## Candidatos de Alias',
  '',
  ...missingWithCandidates.slice(0, 80).map((item) => {
    const candidates = item.candidates.length > 0
      ? item.candidates.map((candidate) => `\`${candidate.token}\` (${candidate.score})`).join(', ')
      : 'sem candidato forte';
    return `- \`${item.token}\` -> ${candidates}`;
  }),
  '',
  '## Tokens no export ainda nao referenciados no design.md',
  '',
  ...exportedButUndocumented.slice(0, 80).map((token) => `- \`${token}\``),
  '',
  '## Nota',
  '',
  '- Este relatório usa heurística de similaridade de nomes; os aliases precisam de revisão humana antes de virarem contrato oficial.',
].join('\n');

writeJson(path.join(OUTPUT_ROOT, 'tokens/source/metadata/design-doc-audit.json'), report);
writeJson(path.join(OUTPUT_ROOT, 'tokens/source/metadata/design-doc-aliases.draft.json'), aliasDraft);
writeText(path.join(OUTPUT_ROOT, 'docs/token-audit.md'), `${markdown}\n`);
