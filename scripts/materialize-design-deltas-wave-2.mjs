import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';

const FILES = {
  semanticColor: path.join(OUTPUT_ROOT, 'tokens/source/semantic/color.json'),
  componentInput: path.join(OUTPUT_ROOT, 'tokens/source/component/input.json'),
  componentLink: path.join(OUTPUT_ROOT, 'tokens/source/component/link.json'),
  reviewedAliases: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/design-doc-aliases.reviewed.json'
  ),
  metadata: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/materialized-deltas.wave-2.json'
  ),
  waveDoc: path.join(OUTPUT_ROOT, 'docs/token-materialization-wave-2.md'),
};

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
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

function componentFloatToken(value, description) {
  return {
    $collectionName: 'Primitive tokens',
    $description: description,
    $libraryName: '',
    $scopes: ['ALL_SCOPES'],
    $type: 'float',
    $value: `{${value}}`,
  };
}

const semanticAdditions = {
  color: {
    border: {
      active: semanticToken(
        'color.function.primary.active',
        'Borda ativa ou de foco para links e inputs.'
      ),
      'danger-active': semanticToken(
        'color.feedback.error.action',
        'Borda de foco em contexto destrutivo.'
      ),
      input: semanticToken(
        'color.ambient.grayscales.50',
        'Borda padrao de inputs.'
      ),
      'input-disabled': semanticToken(
        'color.ambient.grayscales.30',
        'Borda de inputs em estado disabled.'
      ),
    },
    text: {
      cancel: semanticToken(
        'color.function.primary.action',
        'Texto de acao cancelar em formularios.'
      ),
      'danger-pressed': semanticToken(
        'color.feedback.error.dark',
        'Texto destrutivo em estado pressed.'
      ),
      default: semanticToken(
        'color.ambient.grayscales.90',
        'Texto default generico para nomes e labels.'
      ),
      helper: semanticToken(
        'color.ambient.grayscales.80',
        'Texto auxiliar abaixo de formularios.'
      ),
      'helper-disabled': semanticToken(
        'color.ambient.neutral.40',
        'Texto auxiliar em estado disabled.'
      ),
      hover: semanticToken(
        'color.ambient.neutral.80',
        'Texto ou icone em estado hover.'
      ),
      negative: semanticToken(
        'color.function.primary.light',
        'Texto sobre fundo escuro em estilo negativo.'
      ),
      'negative-hover': semanticToken(
        'color.ambient.base.light',
        'Texto negativo em hover.'
      ),
      'placeholder-hover': semanticToken(
        'color.function.primary.action',
        'Placeholder ou value em hover.'
      ),
      prefix: semanticToken(
        'color.ambient.grayscales.50',
        'Prefixo ou sufixo de inputs.'
      ),
      'prefix-disabled': semanticToken(
        'color.ambient.grayscales.30',
        'Prefixo ou sufixo de inputs em disabled.'
      ),
      pressed: semanticToken(
        'color.function.primary.dark',
        'Texto em estado pressed.'
      ),
      value: semanticToken(
        'color.ambient.base.deep-dark',
        'Texto digitado ou preenchido pelo usuario.'
      ),
    },
  },
};

const inputAdditions = {
  component: {
    input: {
      bg: {
        default: componentColorToken(
          'color.surface.default',
          'Fundo do campo de texto padrao.'
        ),
        disabled: componentColorToken(
          'color.surface.subtle',
          'Fundo do campo desabilitado.'
        ),
        'view-only': componentColorToken(
          'color.surface.subtle',
          'Fundo do campo em estado view-only.'
        ),
      },
      border: {
        default: componentColorToken(
          'color.border.input',
          'Borda do input no estado padrao.'
        ),
        disabled: componentColorToken(
          'color.border.input-disabled',
          'Borda do input em estado disabled.'
        ),
        error: componentColorToken(
          'color.border.error',
          'Borda do input com erro de validacao.'
        ),
        focus: componentColorToken(
          'color.border.active',
          'Borda do input em foco.'
        ),
        'focus-width': componentFloatToken(
          'border.stroke.stroke-medium',
          'Espessura da borda do input em foco (2px).'
        ),
        hover: componentColorToken(
          'color.border.hover',
          'Borda do input em hover.'
        ),
        'view-only': componentColorToken(
          'color.border.input',
          'Borda do input em estado view-only.'
        ),
      },
      'border-width': componentFloatToken(
        'border.stroke.stroke-thin',
        'Espessura da borda padrao do input (1px).'
      ),
      cancel: {
        text: componentColorToken(
          'color.text.cancel',
          'Texto da acao cancelar em inputs.'
        ),
      },
      helper: {
        default: componentColorToken(
          'color.text.helper',
          'Texto auxiliar abaixo do campo.'
        ),
        disabled: componentColorToken(
          'color.text.helper-disabled',
          'Texto auxiliar do campo em disabled.'
        ),
        error: componentColorToken(
          'color.text.error',
          'Texto de erro abaixo do campo.'
        ),
      },
      icon: {
        default: componentColorToken(
          'color.icon.default',
          'Icone padrao do input.'
        ),
        disabled: componentColorToken(
          'color.icon.disabled',
          'Icone do input em disabled.'
        ),
        error: componentColorToken(
          'color.icon.error',
          'Icone do input em estado de erro.'
        ),
      },
      label: {
        default: componentColorToken(
          'color.text.secondary',
          'Label flutuante do input no estado padrao.'
        ),
        disabled: componentColorToken(
          'color.text.label-disabled',
          'Label do input em disabled.'
        ),
        error: componentColorToken(
          'color.text.label-error',
          'Label do input em estado de erro.'
        ),
      },
      placeholder: {
        default: componentColorToken(
          'color.text.tertiary',
          'Cor do placeholder do input.'
        ),
      },
      prefix: {
        default: componentColorToken(
          'color.text.prefix',
          'Prefixo ou sufixo do input.'
        ),
        disabled: componentColorToken(
          'color.text.prefix-disabled',
          'Prefixo ou sufixo do input em disabled.'
        ),
        error: componentColorToken(
          'color.text.error',
          'Prefixo ou sufixo do input em estado de erro.'
        ),
      },
      radius: componentFloatToken(
        'border.radius.xs',
        'Border radius do campo de texto (4px).'
      ),
      value: {
        default: componentColorToken(
          'color.text.value',
          'Cor do texto digitado pelo usuario.'
        ),
        error: componentColorToken(
          'color.text.error',
          'Cor do texto do input em estado de erro.'
        ),
        hover: componentColorToken(
          'color.text.placeholder-hover',
          'Cor do value ou placeholder em hover.'
        ),
      },
    },
  },
};

const linkAdditions = {
  component: {
    link: {
      destructive: {
        'focus-stroke': componentColorToken(
          'color.border.danger-active',
          'Stroke de foco para link destrutivo.'
        ),
        text: {
          default: componentColorToken(
            'color.text.danger',
            'Texto ou icone do link destrutivo em estado padrao.'
          ),
          disabled: componentColorToken(
            'color.text.label-disabled',
            'Texto ou icone do link destrutivo em disabled.'
          ),
          hover: componentColorToken(
            'color.text.hover',
            'Texto ou icone do link destrutivo em hover.'
          ),
          pressed: componentColorToken(
            'color.text.danger-pressed',
            'Texto ou icone do link destrutivo em pressed.'
          ),
        },
      },
      negative: {
        'focus-stroke': componentColorToken(
          'color.border.active',
          'Stroke de foco para link negativo.'
        ),
        text: {
          default: componentColorToken(
            'color.text.negative',
            'Texto ou icone do link negativo em estado padrao.'
          ),
          disabled: componentColorToken(
            'color.text.disabled',
            'Texto ou icone do link negativo em disabled.'
          ),
          hover: componentColorToken(
            'color.text.negative-hover',
            'Texto ou icone do link negativo em hover.'
          ),
        },
      },
      primary: {
        'focus-stroke': componentColorToken(
          'color.border.active',
          'Stroke de foco para link primario.'
        ),
        text: {
          default: componentColorToken(
            'color.text.brand-strong',
            'Texto ou icone do link primario em estado padrao.'
          ),
          disabled: componentColorToken(
            'color.text.label-disabled',
            'Texto ou icone do link primario em disabled.'
          ),
          hover: componentColorToken(
            'color.text.hover',
            'Texto ou icone do link primario em hover.'
          ),
          pressed: componentColorToken(
            'color.text.pressed',
            'Texto ou icone do link primario em pressed.'
          ),
        },
      },
    },
  },
};

const semanticColor = readJson(FILES.semanticColor);
const componentInput = readJson(FILES.componentInput);
const componentLink = readJson(FILES.componentLink);
const reviewedAliases = readJson(FILES.reviewedAliases);

deepMerge(semanticColor, semanticAdditions);
deepMerge(componentInput, inputAdditions);
deepMerge(componentLink, linkAdditions);

for (const alias of [
  'color.text.default',
  'color.text.helper',
  'color.text.helper-disabled',
  'component.input.bg.view-only',
  'component.input.border.hover',
  'component.input.border.view-only',
  'component.input.value.hover',
]) {
  delete reviewedAliases[alias];
}

writeJson(FILES.semanticColor, sortObject(semanticColor));
writeJson(FILES.componentInput, sortObject(componentInput));
writeJson(FILES.componentLink, sortObject(componentLink));
writeJson(FILES.reviewedAliases, sortObject(reviewedAliases));

const metadata = {
  wave: 'wave-2',
  scope: ['input', 'link', 'color.text', 'color.border'],
  semanticTokensMaterialized: [
    'color.border.active',
    'color.border.danger-active',
    'color.border.input',
    'color.border.input-disabled',
    'color.text.cancel',
    'color.text.danger-pressed',
    'color.text.default',
    'color.text.helper',
    'color.text.helper-disabled',
    'color.text.hover',
    'color.text.negative',
    'color.text.negative-hover',
    'color.text.placeholder-hover',
    'color.text.prefix',
    'color.text.prefix-disabled',
    'color.text.pressed',
    'color.text.value',
  ],
  componentTokensMaterialized: {
    input: countLeafTokens(inputAdditions.component.input),
    link: countLeafTokens(linkAdditions.component.link),
  },
  promotedAliasesRemoved: [
    'color.text.default',
    'color.text.helper',
    'color.text.helper-disabled',
    'component.input.bg.view-only',
    'component.input.border.hover',
    'component.input.border.view-only',
    'component.input.value.hover',
  ],
  outputFiles: [
    'tokens/source/semantic/color.json',
    'tokens/source/component/input.json',
    'tokens/source/component/link.json',
    'tokens/source/metadata/design-doc-aliases.reviewed.json',
  ],
};

writeJson(FILES.metadata, metadata);

writeText(
  FILES.waveDoc,
  `# Materializacao Wave 2

Escopo desta segunda onda:

- \`input\`
- \`link\`
- semanticos restantes de \`color.text\`
- semanticos de \`color.border\` necessarios para links e inputs

## O que entrou

- materializacao dos tokens restantes de \`color.text\` usados por links e formularios
- materializacao de \`color.border.active\`, \`color.border.danger-active\`, \`color.border.input\` e \`color.border.input-disabled\`
- alinhamento do contrato de \`input\` ao \`design.md\`, incluindo estados \`view-only\`, \`hover\`, \`error\` e tokens de helper/prefix/icon
- criacao da estrutura moderna de \`link.primary\`, \`link.destructive\` e \`link.negative\`
- promocao de aliases revisados para tokens oficiais quando o contrato estava claro

## Arquivos principais

- \`tokens/source/semantic/color.json\`
- \`tokens/source/component/input.json\`
- \`tokens/source/component/link.json\`
- \`tokens/source/metadata/materialized-deltas.wave-2.json\`

## Observacao

Esta wave foi materializada a partir do contrato vivo do \`design.md\`.
Ao contrario da wave anterior, ela ainda nao passou por uma verificacao dedicada no Figma token a token.
`
);
