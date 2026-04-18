import fs from 'node:fs';
import path from 'node:path';

const DESIGN_DOC_PATH = '/Users/jonathanfernandes/ds-react/design.md';
const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';
const TOKENS_SOURCE_ROOT = path.join(OUTPUT_ROOT, 'tokens/source');

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

const DOC_TO_CANONICAL_MAPPINGS = {
  'component.bottom-menu.background.active': 'component.navigation-bar.item.active.bg',
  'component.bottom-menu.icon.active': 'component.navigation-bar.item.active.icon',
  'component.bottom-menu.icon.default': 'component.navigation-bar.item.default.icon',
  'component.bottom-menu.label.active': 'component.navigation-bar.item.active.label',
  'component.bottom-menu.label.default': 'component.navigation-bar.item.default.label',
};

const DEFERRED_COMPONENT_FAMILIES = [
  'component.bottom-sheet',
  'component.card',
  'component.checkbox',
  'component.divider',
  'component.feedback',
  'component.modal',
  'component.overlay',
  'component.radio',
  'component.skeleton',
  'component.spinner',
  'component.steps',
  'component.tooltip',
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

function getBestCandidates(token, availableTokens, limit = 3) {
  return availableTokens
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

const documentedTokens = [
  ...new Set(
    [...designDocWithoutCodeFences.matchAll(/`([^`\n]+)`/g)]
      .map((match) => normalizeDocToken(match[1]))
      .filter((token) => token.length > 0)
      .filter((token) => /^[A-Za-z0-9.-]+$/.test(token))
      .filter(isAllowedToken)
  ),
].sort();

const repoTokenFiles = fs
  .readdirSync(TOKENS_SOURCE_ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => {
    const dirPath = path.join(TOKENS_SOURCE_ROOT, entry.name);
    return fs
      .readdirSync(dirPath)
      .filter((fileName) => fileName.endsWith('.json'))
      .map((fileName) => path.join(dirPath, fileName));
  });

const repoTokens = [
  ...new Set(
    repoTokenFiles
      .flatMap((filePath) => {
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return flattenTokens(json);
      })
      .filter(isAllowedToken)
  ),
].sort();

const repoTokenSet = new Set(repoTokens);

const exactMatches = [];
const mappedMatches = [];
const trueMissing = [];

for (const token of documentedTokens) {
  if (repoTokenSet.has(token)) {
    exactMatches.push(token);
    continue;
  }

  const mappedToken = DOC_TO_CANONICAL_MAPPINGS[token];
  if (mappedToken && repoTokenSet.has(mappedToken)) {
    mappedMatches.push({
      documentedToken: token,
      canonicalToken: mappedToken,
    });
    continue;
  }

  trueMissing.push({
    token,
    candidates: getBestCandidates(token, repoTokens),
  });
}

const deferredFamiliesCoverage = Object.fromEntries(
  DEFERRED_COMPONENT_FAMILIES.map((family) => {
    const familyTokens = documentedTokens.filter((token) => token.startsWith(`${family}.`));
    const coveredCount = familyTokens.filter((token) => {
      if (repoTokenSet.has(token)) {
        return true;
      }
      const mappedToken = DOC_TO_CANONICAL_MAPPINGS[token];
      return Boolean(mappedToken && repoTokenSet.has(mappedToken));
    }).length;

    return [
      family,
      {
        documentedTokenCount: familyTokens.length,
        coveredTokenCount: coveredCount,
      },
    ];
  })
);

const report = {
  source: {
    designDoc: DESIGN_DOC_PATH,
    tokensSourceRoot: TOKENS_SOURCE_ROOT,
  },
  summary: {
    documentedTokenCount: documentedTokens.length,
    repoTokenCount: repoTokens.length,
    exactCoverageCount: exactMatches.length,
    mappedCoverageCount: mappedMatches.length,
    trueMissingCount: trueMissing.length,
    effectiveCoverageCount: exactMatches.length + mappedMatches.length,
    effectiveCoveragePercent: Number(
      (((exactMatches.length + mappedMatches.length) / documentedTokens.length) * 100).toFixed(2)
    ),
  },
  exactMatches,
  mappedMatches,
  trueMissing,
  groupedTrueMissing: groupByPrefix(trueMissing.map((item) => item.token)),
  deferredComponentFamilies: DEFERRED_COMPONENT_FAMILIES,
  deferredFamiliesCoverage,
};

const markdown = [
  '# Auditoria Atual do Design System',
  '',
  `Fonte documental: \`${DESIGN_DOC_PATH}\``,
  `Fonte de verdade auditada: \`${TOKENS_SOURCE_ROOT}\``,
  '',
  '## Resumo',
  '',
  `- tokens documentados: ${report.summary.documentedTokenCount}`,
  `- tokens no repositório auditado: ${report.summary.repoTokenCount}`,
  `- cobertura exata: ${report.summary.exactCoverageCount}`,
  `- cobertura por mapeamento canônico: ${report.summary.mappedCoverageCount}`,
  `- gaps verdadeiros restantes: ${report.summary.trueMissingCount}`,
  `- cobertura efetiva: ${report.summary.effectiveCoverageCount}/${report.summary.documentedTokenCount} (${report.summary.effectiveCoveragePercent}%)`,
  '',
  '## Renomes Canônicos Considerados',
  '',
  ...mappedMatches.map((item) => `- \`${item.documentedToken}\` -> \`${item.canonicalToken}\``),
  '',
  '## Gaps Verdadeiros',
  '',
  ...(trueMissing.length > 0
    ? trueMissing.map((item) => {
        const candidates = item.candidates.length > 0
          ? item.candidates.map((candidate) => `\`${candidate.token}\` (${candidate.score})`).join(', ')
          : 'sem candidato forte';
        return `- \`${item.token}\` -> ${candidates}`;
      })
    : ['- nenhum']),
  '',
  '## Famílias Futuras Fora do Escopo de Implementação',
  '',
  ...DEFERRED_COMPONENT_FAMILIES.map((family) => {
    const coverage = deferredFamiliesCoverage[family];
    return `- \`${family}\`: ${coverage.coveredTokenCount}/${coverage.documentedTokenCount} tokens cobertos no contrato atual`;
  }),
  '',
  '## Leitura',
  '',
  '- Esta auditoria mede o contrato atual do repositório novo, não mais o snapshot legado `tokens-for-react.json`.',
  '- Famílias ainda não desenvolvidas permanecem fora do escopo de implementação atual, mas continuam rastreadas para evolução futura.',
].join('\n');

writeJson(path.join(OUTPUT_ROOT, 'tokens/source/metadata/design-system-current-audit.json'), report);
writeText(path.join(OUTPUT_ROOT, 'docs/token-current-state-audit.md'), `${markdown}\n`);
