import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';

const FILES = {
  semanticColor: path.join(OUTPUT_ROOT, 'tokens/source/semantic/color.json'),
  componentProgressBar: path.join(
    OUTPUT_ROOT,
    'tokens/source/component/progress-bar.json'
  ),
  componentCardStoreItem: path.join(
    OUTPUT_ROOT,
    'tokens/source/component/card-store-item.json'
  ),
  componentEventCard: path.join(
    OUTPUT_ROOT,
    'tokens/source/component/event-card.json'
  ),
  componentFiquePorDentroCard: path.join(
    OUTPUT_ROOT,
    'tokens/source/component/fique-por-dentro-card.json'
  ),
  reviewedAliases: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/design-doc-aliases.reviewed.json'
  ),
  metadata: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/materialized-deltas.wave-4.json'
  ),
  waveDoc: path.join(OUTPUT_ROOT, 'docs/token-materialization-wave-4.md'),
};

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readJsonOr(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return readJson(filePath);
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, value);
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

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key]) &&
      !Object.prototype.hasOwnProperty.call(value, '$value')
    ) {
      deepMerge(target[key], value);
      continue;
    }

    target[key] = value;
  }

  return target;
}

function countLeafTokens(node) {
  if (!node || typeof node !== 'object') {
    return 0;
  }

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    return 1;
  }

  return Object.values(node).reduce((sum, value) => sum + countLeafTokens(value), 0);
}

function semanticToken(value, description) {
  return {
    $collectionName: 'Primitive tokens',
    $description: description,
    $libraryName: '',
    $scopes: ['ALL_SCOPES'],
    $type: 'color',
    $value: `{${value}}`,
  };
}

function componentColorToken(value, description) {
  return {
    $collectionName: 'Semantic Tokens',
    $description: description,
    $libraryName: '',
    $scopes: ['ALL_SCOPES'],
    $type: 'color',
    $value: `{${value}}`,
  };
}

const semanticAdditions = {
  color: {
    surface: {
      dark: semanticToken(
        'color.ambient.base.dark',
        'Fundo escuro para logos e containers internos.'
      ),
      disabled: semanticToken(
        'color.ambient.grayscales.40',
        'Superficie disabled para barras e estados inativos.'
      ),
      'image-tinted': semanticToken(
        'color.ambient.neutral-opacity.50',
        'Placeholder tintado de imagem.'
      ),
      track: semanticToken(
        'color.ambient.grayscales.20',
        'Fundo de trilhas de progress bar e slider.'
      ),
    },
  },
};

const progressBarAdditions = {
  component: {
    'progress-bar': {
      fill: {
        disabled: componentColorToken(
          'color.surface.disabled',
          'Preenchimento da barra inativa do progress bar.'
        ),
        primary: componentColorToken(
          'color.surface.brand',
          'Preenchimento ativo do progress bar primary.'
        ),
      },
      track: {
        default: componentColorToken(
          'color.surface.track',
          'Fundo da trilha do progress bar.'
        ),
      },
    },
  },
};

const cardStoreItemAdditions = {
  component: {
    'card-store-item': {
      'image-border': {
        default: componentColorToken(
          'color.border.image',
          'Borda do placeholder de imagem da loja.'
        ),
      },
      'image-fill': {
        default: componentColorToken(
          'color.surface.image-tinted',
          'Placeholder tintado da imagem da loja.'
        ),
      },
      'logo-bg': {
        default: componentColorToken(
          'color.surface.card',
          'Fundo do container do logo da loja.'
        ),
      },
      'logo-border': {
        default: componentColorToken(
          'color.border.default',
          'Borda do container do logo da loja.'
        ),
      },
      'logo-inner-bg': {
        default: componentColorToken(
          'color.surface.dark',
          'Fundo escuro interno do logo da loja.'
        ),
      },
      'logo-inner-border': {
        default: componentColorToken(
          'color.border.light',
          'Borda clara interna do logo sobre fundo escuro.'
        ),
      },
      name: {
        default: componentColorToken(
          'color.text.default',
          'Texto do nome da loja no card store item.'
        ),
      },
    },
  },
};

const eventCardAdditions = {
  component: {
    'event-card': {
      bg: {
        default: componentColorToken(
          'color.surface.card',
          'Fundo do event card.'
        ),
      },
      border: {
        default: componentColorToken(
          'color.border.card',
          'Borda do event card.'
        ),
      },
      date: {
        default: componentColorToken(
          'color.text.secondary',
          'Texto da data do evento.'
        ),
      },
      icon: {
        default: componentColorToken(
          'color.icon.muted',
          'Icone de calendario do event card.'
        ),
      },
      'image-border': {
        default: componentColorToken(
          'color.surface.card',
          'Stroke da imagem do event card alinhado ao fundo.'
        ),
      },
      title: {
        default: componentColorToken(
          'color.text.body',
          'Titulo do event card.'
        ),
      },
    },
  },
};

const fiquePorDentroCardAdditions = {
  component: {
    'fique-por-dentro-card': {
      bg: {
        default: componentColorToken(
          'color.surface.card',
          'Fundo do card de noticias.'
        ),
      },
      border: {
        default: componentColorToken(
          'color.border.card',
          'Borda do card de noticias.'
        ),
      },
      date: {
        default: componentColorToken(
          'color.text.secondary',
          'Texto da data no card de noticias.'
        ),
      },
      icon: {
        default: componentColorToken(
          'color.icon.muted',
          'Icone de calendario no card de noticias.'
        ),
      },
      title: {
        default: componentColorToken(
          'color.text.body',
          'Titulo do card de noticias.'
        ),
      },
    },
  },
};

const semanticColor = readJson(FILES.semanticColor);
const progressBar = readJson(FILES.componentProgressBar);
const cardStoreItem = readJsonOr(FILES.componentCardStoreItem, {
  component: { 'card-store-item': {} },
});
const eventCard = readJsonOr(FILES.componentEventCard, {
  component: { 'event-card': {} },
});
const fiquePorDentroCard = readJsonOr(FILES.componentFiquePorDentroCard, {
  component: { 'fique-por-dentro-card': {} },
});
const reviewedAliases = readJson(FILES.reviewedAliases);

deepMerge(semanticColor, semanticAdditions);
deepMerge(progressBar, progressBarAdditions);
deepMerge(cardStoreItem, cardStoreItemAdditions);
deepMerge(eventCard, eventCardAdditions);
deepMerge(fiquePorDentroCard, fiquePorDentroCardAdditions);

delete reviewedAliases['component.progress-bar.fill.primary'];
delete reviewedAliases['component.progress-bar.track.default'];

writeJson(FILES.semanticColor, sortObject(semanticColor));
writeJson(FILES.componentProgressBar, sortObject(progressBar));
writeJson(FILES.componentCardStoreItem, sortObject(cardStoreItem));
writeJson(FILES.componentEventCard, sortObject(eventCard));
writeJson(FILES.componentFiquePorDentroCard, sortObject(fiquePorDentroCard));
writeJson(FILES.reviewedAliases, sortObject(reviewedAliases));

const metadata = {
  wave: 'wave-4',
  scope: [
    'progress-bar',
    'card-store-item',
    'event-card',
    'fique-por-dentro-card',
    'color.surface',
  ],
  semanticTokensMaterialized: [
    'color.surface.dark',
    'color.surface.disabled',
    'color.surface.image-tinted',
    'color.surface.track',
  ],
  componentTokensMaterialized: {
    'progress-bar': countLeafTokens(progressBarAdditions.component['progress-bar']),
    'card-store-item': countLeafTokens(cardStoreItemAdditions.component['card-store-item']),
    'event-card': countLeafTokens(eventCardAdditions.component['event-card']),
    'fique-por-dentro-card': countLeafTokens(
      fiquePorDentroCardAdditions.component['fique-por-dentro-card']
    ),
  },
  promotedAliasesRemoved: [
    'component.progress-bar.fill.primary',
    'component.progress-bar.track.default',
  ],
  outputFiles: [
    'tokens/source/semantic/color.json',
    'tokens/source/component/progress-bar.json',
    'tokens/source/component/card-store-item.json',
    'tokens/source/component/event-card.json',
    'tokens/source/component/fique-por-dentro-card.json',
    'tokens/source/metadata/design-doc-aliases.reviewed.json',
  ],
};

writeJson(FILES.metadata, metadata);

writeText(
  FILES.waveDoc,
  `# Materializacao Wave 4

Escopo desta quarta onda:

- \`progress-bar\`
- \`card-store-item\`
- \`event-card\`
- \`fique-por-dentro-card\`
- semanticos residuais de \`color.surface\`

## O que entrou

- promocao dos nomes oficiais de \`progress-bar\`, eliminando os aliases restantes
- criacao dos arquivos de componente para \`card-store-item\`, \`event-card\` e \`fique-por-dentro-card\`
- materializacao de \`color.surface.dark\`, \`color.surface.disabled\`, \`color.surface.image-tinted\` e \`color.surface.track\`
- fechamento da camada temporaria de aliases revisados

## Arquivos principais

- \`tokens/source/semantic/color.json\`
- \`tokens/source/component/progress-bar.json\`
- \`tokens/source/component/card-store-item.json\`
- \`tokens/source/component/event-card.json\`
- \`tokens/source/component/fique-por-dentro-card.json\`
- \`tokens/source/metadata/materialized-deltas.wave-4.json\`

## Observacao

Esta wave foi materializada a partir do contrato vivo do \`design.md\`.
Ela ainda nao passou por verificacao dedicada no Figma token a token.
`
);
