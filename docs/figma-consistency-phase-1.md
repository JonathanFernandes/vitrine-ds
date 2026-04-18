# Figma Consistency Phase 1

Data de inicio: 2026-04-17
Arquivo Figma principal: `01 - Tokens - React Native`
File key: `ZUEzW52KbL0DN9aKGSqwAs`

## Objetivo

Fechar a cobertura funcional restante do Design System no Figma, com foco em:

- componentes do repositório ainda sem auditoria dedicada
- casos antes marcados como inferência forte
- identificação dos gaps que ainda dependem de node/link específico

## Entregas desta fase ate agora

### 1. Navigation Bar

Mapeamento usado no Figma:

- `7080:3009` `Variants=default` em `[M] Bottom Menu`
- `7080:3107` `Action=Default, Type=Home`
- `7080:3128` `Action=Active, Type=Home`
- `7091:6` `Bottom Menu Item/Default`
- `7091:9` `Bottom Menu Item/Active`

Bindings validados:

- `component/bottom-menu/icon/default = #666666`
- `component/bottom-menu/label/default = #666666`
- `component/bottom-menu/icon/active = #566176`
- `component/bottom-menu/label/active = #1b3c7e`
- `component/bottom-menu/background/active = #d5e0f6`
- borda superior do menu = `#e6e6e6`
- fundo da nav bar = `#ffffff`

Correcoes aplicadas no repositorio:

- `component.navigation-bar.border.top -> {color.border.default}`
- `component.navigation-bar.item.default.icon -> {color.icon.secondary}`
- `component.navigation-bar.item.default.label -> {color.text.secondary}`
- `component.navigation-bar.item.active.icon -> {color.icon.brand-tint}`
- `component.navigation-bar.item.active.label -> {color.text.brand-strong}`
- `component.navigation-bar.item.active.bg -> {color.surface.brand-subtle}`
- `component.navigation-bar.height -> 86`

Status: `auditado e alinhado`

### 2. Leva adicional auditada e materializada

Mapeamentos usados no Figma:

- `7195:1358` `Dotnav` default
- `7195:1363` `Dotnav` negative
- `7205:4429` `Banner`
- `7205:5581` `Benefits Goals`
- `7367:2978` `Camera`
- `7401:15999` `notification-icon-group/default`
- `7401:16002` `notification-icon-group/with-counter`
- `7401:16006` `notification-icon-group/dot`
- `7229:5828` `Movie Poster`

Bindings confirmados:

- `component/dotnav/dot/active = #1b3c7e`
- `component/dotnav/dot/inactive = #cccccc`
- `component/dotnav/dot/active-negative = #81a2e4`
- `component/dotnav/dot/inactive-negative = #e6e6e6`
- `component/banner/bg/default = #fafafa`
- `component/benefits-goals/title/default = #2b303b`
- `component/benefits-goals/subtitle/default = #666666`
- `component/camera/stroke/default = #81a2e4`
- `component/notification-icon-group/icon/default = #333333`
- `component/notification-icon-group/counter/text = #ffffff`
- `component/notification-icon-group/counter bg = #df2020`
- `component/movie-poster/text/default = #fafafa`

Arquivos criados no repositório:

- `tokens/source/component/dotnav.json`
- `tokens/source/component/banner.json`
- `tokens/source/component/benefits-goals.json`
- `tokens/source/component/camera.json`
- `tokens/source/component/notification-icon-group.json`
- `tokens/source/component/movie-poster.json`

Observação importante:

O `notification-icon-group` expôs no Figma um fundo destrutivo forte (`#df2020`) para counter/dot. Para refletir isso sem degradar os usos existentes de `color.surface.error`, foi criado o semântico `color.surface.danger-strong`.

## Backlog atual da fase 1

### Componentes do repositório ainda sem auditoria dedicada

- `bottom-sheet`
- `card`
- `checkbox`
- `divider`
- `feedback`
- `modal`
- `overlay`
- `radio`
- `skeleton`
- `spinner`
- `steps`
- `tooltip`

### Componentes restantes que ainda dependem de localização auditável

- `bottom-sheet`
- `card`
- `checkbox`
- `divider`
- `feedback`
- `modal`
- `overlay`
- `radio`
- `skeleton`
- `spinner`
- `steps`
- `tooltip`

### Observação

Nem todos os componentes existentes em `tokens/source/component` apareceram de forma direta no arquivo atual de tokens. Para os grupos acima, o próximo passo mais eficiente é usar links diretos dos nodes no Figma quando eles existirem em outra página, biblioteca ou arquivo de apoio.
