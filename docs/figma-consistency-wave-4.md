# Figma Consistency Wave 4

Data da validacao: 2026-04-17
Arquivo Figma: `01 - Tokens - React Native`
File key: `ZUEzW52KbL0DN9aKGSqwAs`

## Escopo

Validacao focada nos grupos materializados na `wave 4`:

- `component.progress-bar.*`
- `component.card-store-item.*`
- `component.event-card.*`
- `component.fique-por-dentro-card.*`

## Resultado

A `wave 4` ficou consistente com o Figma apos dois ajustes objetivos no repositorio:

1. `component.progress-bar.fill.success`
2. `color.border.image` usado por `component.card-store-item.image-border.default`

`event-card` bateu integralmente nas amostras verificadas.

`fique-por-dentro-card` bateu nos bindings expostos pelo Figma (`bg`, `border`, `title`). Os tokens `date` e `icon` permanecem como inferencia forte do contrato porque nao vieram expostos separadamente na amostra retornada.

## Evidencias por grupo

### Progress Bar

Nodes auditados:

- `7205:5059` `Size=Small, Color=Primary`
- `7205:5083` `Size=Small, Color=Disabled`
- `7386:3069` `Size=Small, Color=Success`

Bindings retornados pelo Figma:

- `component/progress-bar/track/default = #e6e6e6`
- `component/progress-bar/fill/primary = #4274d6`
- `component/progress-bar/fill/disabled = #b3b3b3`
- `color/feedback/success/default = #33cc33`

Comparativo:

- `component.progress-bar.track.default`: Figma `#e6e6e6` -> repo `#e6e6e6` -> consistente
- `component.progress-bar.fill.primary`: Figma `#4274d6` -> repo `#4274d6` -> consistente
- `component.progress-bar.fill.disabled`: Figma `#b3b3b3` -> repo `#b3b3b3` -> consistente
- `component.progress-bar.fill.success`: Figma usa sucesso `#33cc33`; repo estava em `#d5e0f6` -> corrigido para `{color.feedback.success.default}`

### Card Store Item

Node auditado:

- `7229:5711` `card-store-item`

Bindings retornados pelo Figma:

- `component/card-store-item/image-fill/default = #737f8ce5`
- `component/card-store-item/image-border/default = #f0f4f2`
- `component/card-store-item/logo-inner-bg/default = #1a1a1a`
- `component/card-store-item/logo-inner-border/default = #fafafa`
- `component/card-store-item/logo-bg/default = #fafafa`
- `component/card-store-item/logo-border/default = #e6e6e6`
- `component/card-store-item/name/default = #333333`

Comparativo:

- `component.card-store-item.image-fill.default`: Figma `#737f8ce5` -> repo `rgba(115, 127, 140, 0.9)` -> consistente
- `component.card-store-item.image-border.default`: Figma `#f0f4f2` -> repo estava em `#f0f2f4` -> corrigido em `color.border.image`
- `component.card-store-item.logo-inner-bg.default`: Figma `#1a1a1a` -> repo `#1a1a1a` -> consistente
- `component.card-store-item.logo-inner-border.default`: Figma `#fafafa` -> repo `#fafafa` -> consistente
- `component.card-store-item.logo-bg.default`: Figma `#fafafa` -> repo `#fafafa` -> consistente
- `component.card-store-item.logo-border.default`: Figma `#e6e6e6` -> repo `#e6e6e6` -> consistente
- `component.card-store-item.name.default`: Figma `#333333` -> repo `#333333` -> consistente

### Event Card

Node auditado:

- `7229:6017` `Event=Empodera, Device=Default`

Bindings retornados pelo Figma:

- `component/event-card/bg/default = #fafafa`
- `component/event-card/border/default = #e2e4e9`
- `component/event-card/image-border/default = #fafafa`
- `component/event-card/icon/default = #808080`
- `component/event-card/date/default = #666666`
- `component/event-card/title/default = #414958`

Comparativo:

- `component.event-card.bg.default`: Figma `#fafafa` -> repo `#fafafa` -> consistente
- `component.event-card.border.default`: Figma `#e2e4e9` -> repo `#e2e4e9` -> consistente
- `component.event-card.image-border.default`: Figma `#fafafa` -> repo `#fafafa` -> consistente
- `component.event-card.icon.default`: Figma `#808080` -> repo `#808080` -> consistente
- `component.event-card.date.default`: Figma `#666666` -> repo `#666666` -> consistente
- `component.event-card.title.default`: Figma `#414958` -> repo `#414958` -> consistente

### Fique Por Dentro Card

Node auditado:

- `7229:6108` `Property 1=[M] Fique por dentro`

Bindings expostos pelo Figma:

- `component/fique-por-dentro-card/title/default = #414958`
- `component/fique-por-dentro-card/bg/default = #fafafa`
- `component/fique-por-dentro-card/border/default = #e2e4e9`

Comparativo:

- `component.fique-por-dentro-card.title.default`: Figma `#414958` -> repo `#414958` -> consistente
- `component.fique-por-dentro-card.bg.default`: Figma `#fafafa` -> repo `#fafafa` -> consistente
- `component.fique-por-dentro-card.border.default`: Figma `#e2e4e9` -> repo `#e2e4e9` -> consistente
- `component.fique-por-dentro-card.date.default`: repo `#666666` -> inferencia forte, nao exposto separadamente pelo Figma nesta amostra
- `component.fique-por-dentro-card.icon.default`: repo `#808080` -> inferencia forte, nao exposto separadamente pelo Figma nesta amostra

## Conclusao

A `wave 4` ficou aprovada apos correcao de dois desvios objetivos:

- `component.progress-bar.fill.success`
- `color.border.image`

Com isso, os grupos auditados nesta wave permanecem alinhados ao Figma nas amostras verificadas.
