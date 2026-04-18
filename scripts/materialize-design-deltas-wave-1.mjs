import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_ROOT = '/Users/jonathanfernandes/Vitrine DS repo';

const FILES = {
  semanticColor: path.join(OUTPUT_ROOT, 'tokens/source/semantic/color.json'),
  componentButton: path.join(OUTPUT_ROOT, 'tokens/source/component/button.json'),
  componentBadge: path.join(OUTPUT_ROOT, 'tokens/source/component/badge.json'),
  componentShortcutsMenu: path.join(OUTPUT_ROOT, 'tokens/source/component/shortcuts-menu.json'),
  reviewedAliases: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/design-doc-aliases.reviewed.json'
  ),
  compatibilityMetadata: path.join(
    OUTPUT_ROOT,
    'tokens/source/metadata/materialized-deltas.wave-1.json'
  ),
  waveDoc: path.join(OUTPUT_ROOT, 'docs/token-materialization-wave-1.md'),
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

function token(value, description) {
  return {
    $collectionName: 'Semantic Tokens',
    $description: description,
    $libraryName: '',
    $scopes: ['ALL_SCOPES'],
    $type: 'color',
    $value: `{${value}}`,
  };
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

const semanticAdditions = {
  color: {
    border: {
      'brand-strong': semanticToken(
        'color.function.primary.action',
        'Borda de marca forte para estados ativos e shortcuts.'
      ),
      card: semanticToken(
        'color.ambient.neutral.20',
        'Borda de cards e shortcuts.'
      ),
      hover: semanticToken(
        'color.function.primary.action',
        'Borda hover de elementos interativos.'
      ),
    },
    icon: {
      'brand-strong': semanticToken(
        'color.function.primary.action',
        'Icones de marca em variante forte.'
      ),
      'on-brand': semanticToken(
        'color.ambient.base.light',
        'Icones sobre superficies de marca.'
      ),
      'on-surface': semanticToken(
        'color.ambient.base.deep-dark',
        'Icones de alto contraste sobre superficies claras.'
      ),
      secondary: semanticToken(
        'color.ambient.grayscales.70',
        'Icones secundarios com a mesma intensidade de text.secondary.'
      ),
    },
    interactive: {
      secondary: {
        'default-invert': semanticToken(
          'color.function.secondary.action',
          'Borda e label do botao secundario em estado default.'
        ),
      },
    },
    surface: {
      'brand-active': semanticToken(
        'color.function.primary.active',
        'Superficie de marca em estado ativo.'
      ),
      'brand-strong': semanticToken(
        'color.function.primary.action',
        'Superficie de marca forte.'
      ),
      card: semanticToken(
        'color.ambient.base.light',
        'Fundo de cards e shortcuts.'
      ),
      'disabled-strong': semanticToken(
        'color.ambient.grayscales.60',
        'Fundo disabled mais forte para contextos inversos.'
      ),
      'neutral-light': semanticToken(
        'color.ambient.neutral.20',
        'Fundo neutro claro.'
      ),
      'neutral-muted': semanticToken(
        'color.ambient.neutral.40',
        'Fundo neutro medio.'
      ),
      placeholder: semanticToken(
        'color.ambient.grayscales.20',
        'Placeholder de imagem ou thumbnail.'
      ),
      premiere: semanticToken(
        'color.feedback.info.default',
        'Superficie de estreia ou premiere.'
      ),
      promo: semanticToken(
        'color.feedback.warning.default',
        'Superficie promocional.'
      ),
    },
    text: {
      body: semanticToken(
        'color.ambient.neutral.80',
        'Texto body e labels de itens.'
      ),
      dark: semanticToken(
        'color.function.primary.dark',
        'Texto escuro sobre fundos neutros ou coloridos.'
      ),
      'label-disabled': semanticToken(
        'color.ambient.grayscales.40',
        'Label em estado disabled.'
      ),
      'label-error': semanticToken(
        'color.feedback.error.action',
        'Label em estado de erro.'
      ),
      'on-dark': semanticToken(
        'color.ambient.base.light',
        'Texto sobre fundos escuros.'
      ),
      'on-premiere': semanticToken(
        'color.feedback.info.dark',
        'Texto sobre fundo premiere.'
      ),
      'on-promo': semanticToken(
        'color.feedback.warning.dark',
        'Texto sobre fundo promocional.'
      ),
      strong: semanticToken(
        'color.ambient.neutral.90',
        'Texto forte tematizado.'
      ),
    },
  },
};

const buttonAdditions = {
  component: {
    button: {
      'primary-inverse': {
        bg: {
          default: token('color.interactive.ghost.hover.bg', 'Fundo default do botao primary inverse.'),
          disabled: token('color.surface.disabled-strong', 'Fundo disabled do botao primary inverse.'),
          focus: token('color.interactive.primary.hover', 'Fundo focus do botao primary inverse.'),
          hover: token('color.interactive.primary.hover', 'Fundo hover do botao primary inverse.'),
          loading: token('color.interactive.ghost.hover.bg', 'Fundo loading do botao primary inverse.'),
          pressed: token('color.interactive.ghost.hover.bg', 'Fundo pressed do botao primary inverse.'),
        },
        border: {
          focus: token('color.interactive.ghost.hover.bg', 'Borda focus do botao primary inverse.'),
        },
        label: {
          default: token('color.text.primary', 'Label default do botao primary inverse.'),
          disabled: token('color.text.primary', 'Label disabled do botao primary inverse.'),
          focus: token('color.text.inverse', 'Label focus do botao primary inverse.'),
          hover: token('color.text.inverse', 'Label hover do botao primary inverse.'),
          loading: token('color.text.primary', 'Label loading do botao primary inverse.'),
          pressed: token('color.text.primary', 'Label pressed do botao primary inverse.'),
        },
      },
      secondary: {
        bg: {
          disabled: token('color.interactive.primary.disabled', 'Fundo disabled do botao secondary.'),
          focus: token('color.interactive.secondary.default', 'Fundo focus do botao secondary.'),
          loading: token('color.interactive.secondary.default', 'Fundo loading do botao secondary.'),
        },
        border: {
          default: token('color.interactive.secondary.default-invert', 'Borda default do botao secondary.'),
          focus: token('color.border.focus', 'Borda focus do botao secondary.'),
        },
        label: {
          disabled: token('color.text.disabled', 'Label disabled do botao secondary.'),
          focus: token('color.text.inverse', 'Label focus do botao secondary.'),
          hover: token('color.text.inverse', 'Label hover do botao secondary.'),
          loading: token('color.text.inverse', 'Label loading do botao secondary.'),
          pressed: token('color.text.inverse', 'Label pressed do botao secondary.'),
        },
      },
      'secondary-inverse': {
        bg: {
          disabled: token('color.surface.disabled-strong', 'Fundo disabled do botao secondary inverse.'),
          focus: token('color.interactive.secondary.default', 'Fundo focus do botao secondary inverse.'),
          hover: token('color.interactive.secondary.hover', 'Fundo hover do botao secondary inverse.'),
          loading: token('color.interactive.secondary.default', 'Fundo loading do botao secondary inverse.'),
          pressed: token('color.interactive.secondary.pressed', 'Fundo pressed do botao secondary inverse.'),
        },
        border: {
          default: token('color.text.inverse', 'Borda default do botao secondary inverse.'),
          focus: token('color.interactive.ghost.hover.bg', 'Borda focus do botao secondary inverse.'),
        },
        label: {
          default: token('color.text.inverse', 'Label default do botao secondary inverse.'),
          disabled: token('color.text.primary', 'Label disabled do botao secondary inverse.'),
          focus: token('color.text.inverse', 'Label focus do botao secondary inverse.'),
          hover: token('color.text.inverse', 'Label hover do botao secondary inverse.'),
          loading: token('color.text.primary', 'Label loading do botao secondary inverse.'),
          pressed: token('color.text.primary', 'Label pressed do botao secondary inverse.'),
        },
      },
    },
  },
};

const badgeAdditions = {
  component: {
    badge: {
      blog: {
        bg: token('color.surface.brand-active', 'Fundo do badge blog.'),
        fg: token('color.text.dark', 'Foreground do badge blog.'),
      },
      disabled: {
        bg: token('color.surface.subtle', 'Fundo do badge disabled.'),
        fg: token('color.text.label-disabled', 'Foreground do badge disabled.'),
      },
      error: {
        fg: token('color.text.label-error', 'Foreground do badge error.'),
      },
      'filter-active': {
        bg: token('color.interactive.primary.hover', 'Fundo do badge filter active.'),
        fg: token('color.text.on-dark', 'Foreground do badge filter active.'),
      },
      'filter-default': {
        border: token('color.border.hover', 'Borda do badge filter default.'),
        fg: token('color.text.brand-strong', 'Foreground do badge filter default.'),
      },
      info: {
        bg: token('color.surface.info', 'Fundo do badge info.'),
        fg: token('color.text.info', 'Foreground do badge info.'),
      },
      'neutral-1': {
        bg: token('color.surface.neutral-muted', 'Fundo do badge neutral 1.'),
        fg: token('color.text.dark', 'Foreground do badge neutral 1.'),
      },
      'neutral-2': {
        bg: token('color.surface.neutral-light', 'Fundo do badge neutral 2.'),
        fg: token('color.text.body', 'Foreground do badge neutral 2.'),
      },
      'neutral-3': {
        bg: token('color.surface.placeholder', 'Fundo do badge neutral 3.'),
        fg: token('color.text.secondary', 'Foreground do badge neutral 3.'),
      },
      premiere: {
        bg: token('color.surface.premiere', 'Fundo do badge premiere.'),
        fg: token('color.text.on-premiere', 'Foreground do badge premiere.'),
      },
      promo: {
        bg: token('color.surface.promo', 'Fundo do badge promo.'),
        fg: token('color.text.on-promo', 'Foreground do badge promo.'),
      },
      success: {
        fg: token('color.text.success', 'Foreground do badge success.'),
      },
      warning: {
        fg: token('color.text.warning', 'Foreground do badge warning.'),
      },
    },
  },
};

const shortcutsMenuDefinition = {
  component: {
    'shortcuts-menu': {
      active: {
        bg: token('color.surface.brand-strong', 'Fundo do shortcut menu ativo.'),
        border: token('color.border.brand-strong', 'Borda do shortcut menu ativo.'),
        icon: token('color.icon.on-brand', 'Icone do shortcut menu ativo.'),
        label: token('color.text.on-dark', 'Label do shortcut menu ativo.'),
      },
      default: {
        bg: token('color.surface.subtle', 'Fundo default do shortcut menu category.'),
        border: token('color.border.subtle', 'Borda default do shortcut menu category.'),
        'icon-fill': token('color.icon.on-surface', 'Fill do icone default do shortcut menu.'),
        'icon-stroke': token('color.icon.brand-strong', 'Stroke do icone default do shortcut menu.'),
        label: token('color.text.strong', 'Label default do shortcut menu category.'),
      },
      disabled: {
        'icon-stroke': token('color.icon.disabled', 'Stroke do icone disabled do shortcut menu.'),
        label: token('color.text.disabled', 'Label disabled do shortcut menu.'),
      },
      menu: {
        bg: token('color.surface.default', 'Fundo do shortcut menu tipo menu.'),
        border: token('color.border.card', 'Borda do shortcut menu tipo menu.'),
        icon: token('color.icon.brand-strong', 'Icone principal do shortcut menu tipo menu.'),
        'icon-accent': token('color.icon.secondary', 'Icone accent do shortcut menu tipo menu.'),
        'icon-bg': token('color.surface.default', 'Fundo do icone no shortcut menu tipo menu.'),
        label: token('color.text.brand-strong', 'Label do shortcut menu tipo menu.'),
      },
    },
  },
};

const aliasesToPromote = [
  'color.icon.on-brand',
  'color.text.body',
  'color.text.label-disabled',
  'color.text.label-error',
  'color.text.on-dark',
  'component.badge.error.fg',
  'component.badge.success.fg',
  'component.badge.warning.fg',
];

const semanticColor = readJson(FILES.semanticColor);
const componentButton = readJson(FILES.componentButton);
const componentBadge = readJson(FILES.componentBadge);
const reviewedAliases = readJson(FILES.reviewedAliases);

deepMerge(semanticColor, semanticAdditions);
deepMerge(componentButton, buttonAdditions);
deepMerge(componentBadge, badgeAdditions);

for (const alias of aliasesToPromote) {
  delete reviewedAliases[alias];
}

writeJson(FILES.semanticColor, sortObject(semanticColor));
writeJson(FILES.componentButton, sortObject(componentButton));
writeJson(FILES.componentBadge, sortObject(componentBadge));
writeJson(FILES.componentShortcutsMenu, sortObject(shortcutsMenuDefinition));
writeJson(FILES.reviewedAliases, sortObject(reviewedAliases));

writeJson(FILES.compatibilityMetadata, {
  wave: 'wave-1',
  scope: ['button', 'badge', 'shortcuts-menu'],
  semanticTokensMaterialized: [
    'color.border.brand-strong',
    'color.border.card',
    'color.border.hover',
    'color.icon.brand-strong',
    'color.icon.on-brand',
    'color.icon.on-surface',
    'color.icon.secondary',
    'color.interactive.secondary.default-invert',
    'color.surface.brand-active',
    'color.surface.brand-strong',
    'color.surface.card',
    'color.surface.disabled-strong',
    'color.surface.neutral-light',
    'color.surface.neutral-muted',
    'color.surface.placeholder',
    'color.surface.premiere',
    'color.surface.promo',
    'color.text.body',
    'color.text.dark',
    'color.text.label-disabled',
    'color.text.label-error',
    'color.text.on-dark',
    'color.text.on-premiere',
    'color.text.on-promo',
    'color.text.strong',
  ],
  componentTokensMaterialized: {
    button: countLeafTokens(buttonAdditions),
    badge: countLeafTokens(badgeAdditions),
    'shortcuts-menu': countLeafTokens(shortcutsMenuDefinition),
  },
  promotedAliasesRemoved: aliasesToPromote,
  outputFiles: [
    path.relative(OUTPUT_ROOT, FILES.semanticColor),
    path.relative(OUTPUT_ROOT, FILES.componentButton),
    path.relative(OUTPUT_ROOT, FILES.componentBadge),
    path.relative(OUTPUT_ROOT, FILES.componentShortcutsMenu),
    path.relative(OUTPUT_ROOT, FILES.reviewedAliases),
  ],
});

const waveDoc = [
  '# Materializacao Wave 1',
  '',
  'Escopo desta primeira onda:',
  '',
  '- `button`',
  '- `badge`',
  '- `shortcuts-menu`',
  '',
  '## O que entrou',
  '',
  '- semantic tokens novos para suportar contratos documentados no `design.md`',
  '- component tokens ausentes em `button` e `badge`',
  '- novo arquivo de componente para `shortcuts-menu`',
  '- promocao de aliases revisados para tokens oficiais quando o contrato ja estava claro',
  '',
  '## Arquivos principais',
  '',
  `- \`${path.relative(OUTPUT_ROOT, FILES.semanticColor)}\``,
  `- \`${path.relative(OUTPUT_ROOT, FILES.componentButton)}\``,
  `- \`${path.relative(OUTPUT_ROOT, FILES.componentBadge)}\``,
  `- \`${path.relative(OUTPUT_ROOT, FILES.componentShortcutsMenu)}\``,
  `- \`${path.relative(OUTPUT_ROOT, FILES.compatibilityMetadata)}\``,
  '',
  '## Proximo recorte recomendado',
  '',
  '- `color.text.*` restante',
  '- `component.link.*`',
  '- `component.input.*`',
  '- `component.benefits-card.*`',
].join('\n');

writeText(FILES.waveDoc, `${waveDoc}\n`);
