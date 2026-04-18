import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';

const FILES = {
  semanticColor: path.join(OUTPUT_ROOT, 'tokens/source/semantic/color.json'),
  componentSectionTitle: path.join(
    OUTPUT_ROOT,
    'tokens/source/component/section-title.json'
  ),
  componentBenefitsCard: path.join(
    OUTPUT_ROOT,
    'tokens/source/component/benefits-card.json'
  ),
  componentBenefitsContentCard: path.join(
    OUTPUT_ROOT,
    'tokens/source/component/benefits-content-card.json'
  ),
  componentToolbar: path.join(OUTPUT_ROOT, 'tokens/source/component/toolbar.json'),
  reviewedAliases: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/design-doc-aliases.reviewed.json'
  ),
  metadata: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/materialized-deltas.wave-3.json'
  ),
  waveDoc: path.join(OUTPUT_ROOT, 'docs/token-materialization-wave-3.md'),
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
    border: {
      'accent-secondary': semanticToken(
        'color.function.secondary.action',
        'Borda accent em contexto de marca secundaria.'
      ),
      image: semanticToken(
        'color.ambient.neutral.10',
        'Borda de containers e placeholders de imagem.'
      ),
      light: semanticToken(
        'color.ambient.base.light',
        'Borda clara sobre fundos escuros.'
      ),
    },
    icon: {
      'brand-tint': semanticToken(
        'color.ambient.neutral.70',
        'Icone com tint da marca para estados ativos em navegacao.'
      ),
      dark: semanticToken(
        'color.ambient.grayscales.90',
        'Icones escuros para toolbar e cards.'
      ),
      'loyalty-star': semanticToken(
        'color.function.specific.yellow-star',
        'Estrelas e icones do programa de relacionamento.'
      ),
      muted: semanticToken(
        'color.ambient.grayscales.60',
        'Icones suaves para metadados como calendario.'
      ),
      negative: semanticToken(
        'color.function.primary.light',
        'Icones sobre fundo escuro em estilo negativo.'
      ),
    },
    surface: {
      'overlay-strong': semanticToken(
        'color.ambient.grayscales-opacity.50',
        'Overlay denso para badges de lock e estados disabled.'
      ),
    },
  },
};

const sectionTitleAdditions = {
  component: {
    'section-title': {
      link: {
        default: componentColorToken(
          'color.text.brand-strong',
          'Link e chevron do section title em fundo claro.'
        ),
        negative: componentColorToken(
          'color.text.negative',
          'Link e chevron do section title em fundo escuro.'
        ),
      },
      title: {
        default: componentColorToken(
          'color.text.body',
          'Titulo do section title em fundo claro.'
        ),
        negative: componentColorToken(
          'color.text.on-dark',
          'Titulo do section title em fundo escuro.'
        ),
      },
    },
  },
};

const benefitsCardAdditions = {
  component: {
    'benefits-card': {
      action: {
        default: componentColorToken(
          'color.interactive.secondary.default-invert',
          'Borda, icone e label da acao ativa do benefits card.'
        ),
        disabled: componentColorToken(
          'color.text.label-disabled',
          'Icone, label e logo em estado disabled no benefits card.'
        ),
      },
      'action-bg': {
        disabled: componentColorToken(
          'color.surface.subtle',
          'Fundo da acao disabled no benefits card.'
        ),
      },
      'container-bg': {
        default: componentColorToken(
          'color.surface.default',
          'Fundo do container interno do benefits card.'
        ),
      },
      'image-bg': {
        default: componentColorToken(
          'color.surface.placeholder',
          'Placeholder de imagem do produto no benefits card.'
        ),
      },
      'lock-bg': {
        default: componentColorToken(
          'color.surface.overlay-strong',
          'Fundo do badge de lock no benefits card.'
        ),
      },
      'logo-border': {
        default: componentColorToken(
          'color.border.default',
          'Borda do logo da loja no benefits card.'
        ),
      },
      'on-dark': {
        default: componentColorToken(
          'color.text.on-dark',
          'Dots do logo e icone de lock sobre fundo escuro.'
        ),
      },
      secondary: {
        default: componentColorToken(
          'color.text.secondary',
          'Texto e icones secundarios do benefits card.'
        ),
      },
      text: {
        default: componentColorToken(
          'color.text.strong',
          'Texto principal do benefits card.'
        ),
      },
    },
  },
};

const benefitsContentCardAdditions = {
  component: {
    'benefits-content-card': {
      border: {
        default: componentColorToken(
          'color.border.default',
          'Borda do container do benefits content card.'
        ),
      },
      icon: {
        outline: {
          default: componentColorToken(
            'color.icon.dark',
            'Contornos e detalhes escuros do benefits content card.'
          ),
        },
        star: {
          default: componentColorToken(
            'color.icon.loyalty-star',
            'Estrelas do programa de relacionamento.'
          ),
        },
      },
      surface: {
        default: componentColorToken(
          'color.surface.card',
          'Fundo externo do benefits content card.'
        ),
        inner: componentColorToken(
          'color.surface.default',
          'Mascaras e frames internos do benefits content card.'
        ),
      },
      text: {
        default: componentColorToken(
          'color.text.body',
          'Titulo e descricao do benefits content card.'
        ),
      },
    },
  },
};

const toolbarAdditions = {
  component: {
    toolbar: {
      chevron: {
        default: componentColorToken(
          'color.icon.brand-strong',
          'Chevron do link dentro do toolbar.'
        ),
      },
      icon: {
        default: componentColorToken(
          'color.icon.dark',
          'Seta de navegacao e icones de acao no toolbar default.'
        ),
        negative: componentColorToken(
          'color.icon.negative',
          'Seta de navegacao no toolbar negative.'
        ),
      },
      label: {
        default: componentColorToken(
          'color.text.brand-strong',
          'Label do link no toolbar default.'
        ),
        negative: componentColorToken(
          'color.text.negative',
          'Label do link no toolbar negative.'
        ),
      },
    },
  },
};

const semanticColor = readJson(FILES.semanticColor);
const sectionTitle = readJsonOr(FILES.componentSectionTitle, {
  component: { 'section-title': {} },
});
const benefitsCard = readJsonOr(FILES.componentBenefitsCard, {
  component: { 'benefits-card': {} },
});
const benefitsContentCard = readJsonOr(FILES.componentBenefitsContentCard, {
  component: { 'benefits-content-card': {} },
});
const toolbar = readJsonOr(FILES.componentToolbar, {
  component: { toolbar: {} },
});
const reviewedAliases = readJson(FILES.reviewedAliases);

deepMerge(semanticColor, semanticAdditions);
deepMerge(sectionTitle, sectionTitleAdditions);
deepMerge(benefitsCard, benefitsCardAdditions);
deepMerge(benefitsContentCard, benefitsContentCardAdditions);
deepMerge(toolbar, toolbarAdditions);

delete reviewedAliases['color.icon.muted'];

writeJson(FILES.semanticColor, sortObject(semanticColor));
writeJson(FILES.componentSectionTitle, sortObject(sectionTitle));
writeJson(FILES.componentBenefitsCard, sortObject(benefitsCard));
writeJson(FILES.componentBenefitsContentCard, sortObject(benefitsContentCard));
writeJson(FILES.componentToolbar, sortObject(toolbar));
writeJson(FILES.reviewedAliases, sortObject(reviewedAliases));

const metadata = {
  wave: 'wave-3',
  scope: [
    'section-title',
    'benefits-card',
    'benefits-content-card',
    'toolbar',
    'color.border',
    'color.icon',
    'color.surface',
  ],
  semanticTokensMaterialized: [
    'color.border.accent-secondary',
    'color.border.image',
    'color.border.light',
    'color.icon.brand-tint',
    'color.icon.dark',
    'color.icon.loyalty-star',
    'color.icon.muted',
    'color.icon.negative',
    'color.surface.overlay-strong',
  ],
  componentTokensMaterialized: {
    'section-title': countLeafTokens(sectionTitleAdditions.component['section-title']),
    'benefits-card': countLeafTokens(benefitsCardAdditions.component['benefits-card']),
    'benefits-content-card': countLeafTokens(
      benefitsContentCardAdditions.component['benefits-content-card']
    ),
    toolbar: countLeafTokens(toolbarAdditions.component.toolbar),
  },
  promotedAliasesRemoved: ['color.icon.muted'],
  outputFiles: [
    'tokens/source/semantic/color.json',
    'tokens/source/component/section-title.json',
    'tokens/source/component/benefits-card.json',
    'tokens/source/component/benefits-content-card.json',
    'tokens/source/component/toolbar.json',
    'tokens/source/metadata/design-doc-aliases.reviewed.json',
  ],
};

writeJson(FILES.metadata, metadata);

writeText(
  FILES.waveDoc,
  `# Materializacao Wave 3

Escopo desta terceira onda:

- \`section-title\`
- \`benefits-card\`
- \`benefits-content-card\`
- \`toolbar\`
- semanticos residuais de \`color.border\`, \`color.icon\` e \`color.surface\`

## O que entrou

- criacao dos arquivos de componente para \`section-title\`, \`benefits-card\`, \`benefits-content-card\` e \`toolbar\`
- materializacao de semanticos residuais necessarios para cards, logos, toolbar e estados negativos
- promocao de \`color.icon.muted\` de alias temporario para token oficial
- introducao de \`color.surface.overlay-strong\` para lock badges e overlays densos

## Arquivos principais

- \`tokens/source/semantic/color.json\`
- \`tokens/source/component/section-title.json\`
- \`tokens/source/component/benefits-card.json\`
- \`tokens/source/component/benefits-content-card.json\`
- \`tokens/source/component/toolbar.json\`
- \`tokens/source/metadata/materialized-deltas.wave-3.json\`

## Observacao

Esta wave foi materializada a partir do contrato vivo do \`design.md\`.
Ela ainda nao passou por verificacao dedicada no Figma token a token.
`
);
