# Auditoria de Tokens: design.md x export

Fonte: `/Users/jonathanfernandes/ds-react/design.md`
Export: `/Users/jonathanfernandes/ds-react/tokens-for-react.json`

## Resumo

- tokens documentados: 510
- tokens no export normalizado: 350
- documentados e ausentes no export: 227
- no export e nao documentados: 67
- aliases heurísticos com alta confianca: 23

## Grupos com maior delta no design.md

### component.button

- `component.button.primary-inverse.bg.default`
- `component.button.primary-inverse.bg.disabled`
- `component.button.primary-inverse.bg.focus`
- `component.button.primary-inverse.bg.hover`
- `component.button.primary-inverse.bg.loading`
- `component.button.primary-inverse.bg.pressed`
- `component.button.primary-inverse.border.focus`
- `component.button.primary-inverse.label.default`
- `component.button.primary-inverse.label.disabled`
- `component.button.primary-inverse.label.focus`
- `component.button.primary-inverse.label.hover`
- `component.button.primary-inverse.label.loading`

### component.badge

- `component.badge.blog.bg`
- `component.badge.blog.fg`
- `component.badge.disabled.bg`
- `component.badge.disabled.fg`
- `component.badge.error.fg`
- `component.badge.filter-active.bg`
- `component.badge.filter-active.fg`
- `component.badge.filter-default.border`
- `component.badge.filter-default.fg`
- `component.badge.info.bg`
- `component.badge.info.fg`
- `component.badge.neutral-1.bg`

### color.text

- `color.text.body`
- `color.text.cancel`
- `color.text.danger-pressed`
- `color.text.dark`
- `color.text.default`
- `color.text.helper`
- `color.text.helper-disabled`
- `color.text.hover`
- `color.text.label-disabled`
- `color.text.label-error`
- `color.text.negative`
- `color.text.negative-hover`

### component.shortcuts-menu

- `component.shortcuts-menu.active.bg`
- `component.shortcuts-menu.active.border`
- `component.shortcuts-menu.active.icon`
- `component.shortcuts-menu.active.label`
- `component.shortcuts-menu.default.bg`
- `component.shortcuts-menu.default.border`
- `component.shortcuts-menu.default.icon-fill`
- `component.shortcuts-menu.default.icon-stroke`
- `component.shortcuts-menu.default.label`
- `component.shortcuts-menu.disabled.icon-stroke`
- `component.shortcuts-menu.disabled.label`
- `component.shortcuts-menu.menu.bg`

### color.surface

- `color.surface.brand-active`
- `color.surface.brand-strong`
- `color.surface.card`
- `color.surface.dark`
- `color.surface.disabled`
- `color.surface.disabled-strong`
- `color.surface.image-tinted`
- `color.surface.neutral-light`
- `color.surface.neutral-muted`
- `color.surface.overlay-strong`
- `color.surface.placeholder`
- `color.surface.premiere`

### component.input

- `component.input.bg.view-only`
- `component.input.border.focus-width`
- `component.input.border.hover`
- `component.input.border.view-only`
- `component.input.cancel.text`
- `component.input.helper.disabled`
- `component.input.icon.default`
- `component.input.icon.disabled`
- `component.input.icon.error`
- `component.input.prefix.default`
- `component.input.prefix.disabled`
- `component.input.prefix.error`

### component.link

- `component.link.destructive.focus-stroke`
- `component.link.destructive.text.default`
- `component.link.destructive.text.disabled`
- `component.link.destructive.text.hover`
- `component.link.destructive.text.pressed`
- `component.link.negative.focus-stroke`
- `component.link.negative.text.default`
- `component.link.negative.text.disabled`
- `component.link.negative.text.hover`
- `component.link.primary.focus-stroke`
- `component.link.primary.text.default`
- `component.link.primary.text.disabled`

### color.border

- `color.border.accent-secondary`
- `color.border.active`
- `color.border.brand-strong`
- `color.border.card`
- `color.border.danger-active`
- `color.border.hover`
- `color.border.image`
- `color.border.input`
- `color.border.input-disabled`
- `color.border.light`

### component.benefits-card

- `component.benefits-card.action-bg.disabled`
- `component.benefits-card.action.default`
- `component.benefits-card.action.disabled`
- `component.benefits-card.container-bg.default`
- `component.benefits-card.image-bg.default`
- `component.benefits-card.lock-bg.default`
- `component.benefits-card.logo-border.default`
- `component.benefits-card.on-dark.default`
- `component.benefits-card.secondary.default`
- `component.benefits-card.text.default`

### color.icon

- `color.icon.brand-strong`
- `color.icon.brand-tint`
- `color.icon.dark`
- `color.icon.loyalty-star`
- `color.icon.muted`
- `color.icon.negative`
- `color.icon.on-brand`
- `color.icon.on-surface`
- `color.icon.secondary`

### component.card-store-item

- `component.card-store-item.image-border.default`
- `component.card-store-item.image-fill.default`
- `component.card-store-item.logo-bg.default`
- `component.card-store-item.logo-border.default`
- `component.card-store-item.logo-inner-bg.default`
- `component.card-store-item.logo-inner-border.default`
- `component.card-store-item.name.default`

### component.benefits-content-card

- `component.benefits-content-card.border.default`
- `component.benefits-content-card.icon.outline.default`
- `component.benefits-content-card.icon.star.default`
- `component.benefits-content-card.surface.default`
- `component.benefits-content-card.surface.inner`
- `component.benefits-content-card.text.default`

## Candidatos de Alias

- `color.border.accent-secondary` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.active` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.brand-strong` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.card` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.danger-active` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.hover` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.image` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.input` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.input-disabled` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.border.light` -> `color.border.default` (0.667), `color.border.disabled` (0.667), `color.border.error` (0.667)
- `color.icon.brand-strong` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.brand-tint` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.dark` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.loyalty-star` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.muted` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.negative` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.on-brand` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.on-surface` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.icon.secondary` -> `color.icon.brand` (0.667), `color.icon.danger` (0.667), `color.icon.default` (0.667)
- `color.indicator.default` -> `color.border.default` (0.533), `color.icon.default` (0.533), `color.surface.default` (0.533)
- `color.indicator.muted` -> sem candidato forte
- `color.indicator.negative` -> sem candidato forte
- `color.indicator.negative-muted` -> sem candidato forte
- `color.interactive.secondary.default-invert` -> `color.interactive.secondary.default` (0.75), `color.interactive.secondary.hover` (0.75), `color.interactive.secondary.pressed` (0.75)
- `color.surface.brand-active` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.brand-strong` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.card` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.dark` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.disabled` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.disabled-strong` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.image-tinted` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.neutral-light` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.neutral-muted` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.overlay-strong` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.placeholder` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.premiere` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.promo` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.surface.track` -> `color.surface.brand` (0.667), `color.surface.brand-subtle` (0.667), `color.surface.danger` (0.667)
- `color.text.body` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.cancel` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.danger-pressed` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.dark` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.default` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.helper` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.helper-disabled` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.hover` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.label-disabled` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.label-error` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.negative` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.negative-hover` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.on-dark` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.on-premiere` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.on-promo` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.placeholder-hover` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.prefix` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.prefix-disabled` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.pressed` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.strong` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `color.text.value` -> `color.text.brand` (0.667), `color.text.brand-strong` (0.667), `color.text.danger` (0.667)
- `component.badge.blog.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.blog.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.disabled.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.disabled.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.error.fg` -> `component.badge.error.bg` (0.75), `component.badge.error.label` (0.75), `component.badge.brand.bg` (0.5)
- `component.badge.filter-active.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.filter-active.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.filter-default.border` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.filter-default.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.info.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.info.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.neutral-1.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.neutral-1.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.neutral-2.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.neutral-2.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.neutral-3.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.neutral-3.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.premiere.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.premiere.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)
- `component.badge.promo.bg` -> `component.badge.brand.bg` (0.65), `component.badge.danger.bg` (0.65), `component.badge.error.bg` (0.65)
- `component.badge.promo.fg` -> `component.badge.brand.bg` (0.5), `component.badge.brand.label` (0.5), `component.badge.danger.bg` (0.5)

## Tokens no export ainda nao referenciados no design.md

- `component.badge.brand.bg`
- `component.badge.brand.label`
- `component.badge.danger.bg`
- `component.badge.danger.label`
- `component.badge.error.label`
- `component.badge.neutral.bg`
- `component.badge.neutral.label`
- `component.badge.success.label`
- `component.badge.warning.label`
- `component.bottom-sheet.bg`
- `component.bottom-sheet.handle.color`
- `component.bottom-sheet.radius`
- `component.card.bg.default`
- `component.card.bg.raised`
- `component.card.border.default`
- `component.card.border.subtle`
- `component.card.padding`
- `component.card.radius`
- `component.card.title.color`
- `component.checkbox.bg.checked`
- `component.checkbox.bg.disabled`
- `component.checkbox.bg.unchecked`
- `component.checkbox.border.default`
- `component.checkbox.border.error`
- `component.checkbox.border.focus`
- `component.checkbox.checkmark.color`
- `component.link.color.default`
- `component.link.color.disabled`
- `component.link.color.visited`
- `component.modal.bg`
- `component.modal.border.top`
- `component.modal.radius`
- `component.modal.title.color`
- `component.navigation-bar.badge.bg`
- `component.navigation-bar.badge.label`
- `component.navigation-bar.bg`
- `component.navigation-bar.border.top`
- `component.navigation-bar.height`
- `component.navigation-bar.icon-size`
- `component.navigation-bar.item.active.icon`
- `component.navigation-bar.item.active.label`
- `component.navigation-bar.item.default.icon`
- `component.navigation-bar.item.default.label`
- `component.progress-bar.fill.brand`
- `component.progress-bar.fill.success`
- `component.progress-bar.height`
- `component.progress-bar.radius`
- `component.progress-bar.track.bg`
- `component.radio.border.default`
- `component.radio.border.focus`
- `component.radio.dot.default`
- `component.radio.dot.disabled`
- `component.radio.dot.selected`
- `component.skeleton.bg.base`
- `component.skeleton.bg.highlight`
- `component.spinner.fill.color`
- `component.spinner.track.color`
- `component.steps.active.bg`
- `component.steps.active.label`
- `component.steps.completed.bg`
- `component.steps.completed.icon`
- `component.steps.inactive.bg`
- `component.steps.inactive.label`
- `component.tooltip.bg`
- `component.tooltip.label`
- `component.tooltip.padding`
- `component.tooltip.radius`

## Nota

- Este relatório usa heurística de similaridade de nomes; os aliases precisam de revisão humana antes de virarem contrato oficial.
