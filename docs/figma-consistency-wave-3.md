# Verificacao de Consistencia com Figma - Wave 3

Escopo desta verificacao:

- `Section title`
- `Benefits Card`
- `Benefits Content Card`
- `Toolbar`

Arquivo auditado no Figma:

- `01 - Tokens - React Native`
- file key: `ZUEzW52KbL0DN9aKGSqwAs`
- nodes:
  - `Section title`: `7187:1333`
  - `Benefits Card (vertical)`: `7195:3512`
  - `Benefits Content Card`: `7401:15414`
  - `Toolbar`: `7229:5776`

## Metodo

Foi feita uma verificacao em duas camadas:

1. Estrutura e variantes vivas no Figma via `get_metadata`
2. Amostragem de bindings reais via `get_variable_defs` e `get_design_context` em variantes representativas

## Variantes confirmadas no Figma

### Section title

Frame auditado: `7187:1333`

Cobertura confirmada:

- `Default`
- `Negative`

### Benefits Card

Frame auditado: `7195:3512`

Cobertura confirmada:

- `Action=No branding, Store=Abraccio`
- `Action=disabled, Store=Abraccio`

### Benefits Content Card

Componente auditado: `7401:15414`

Cobertura confirmada:

- card unico com superficie, borda, texto, estrelas e instancia interna de botao primario

### Toolbar

Frame auditado: `7229:5776`

Cobertura confirmada:

- `Variable=Default`
- `Variable=Negative`
- `Variable=Icons`
- `Variable=Onboarding`

## Amostras validadas 1:1

Os exemplos abaixo foram comparados entre o binding real do Figma e o valor final resolvido no repositorio.

### Section title

- `component/section-title/title/default` -> Figma `#414958` | repo `#414958`
- `component/section-title/title/negative` -> Figma `#fafafa` | repo `#fafafa`
- `component/section-title/link/default` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/section-title/link/negative` -> Figma `#d5e0f6` | repo `#d5e0f6`

### Benefits Card

- `component/benefits-card/image-bg/default` -> Figma `#e6e6e6` | repo `#e6e6e6`
- `component/benefits-card/container-bg/default` -> Figma `#ffffff` | repo `#ffffff`
- `component/benefits-card/secondary/default` -> Figma `#666666` | repo `#666666`
- `component/benefits-card/text/default` -> Figma `#2b303b` | repo `#2b303b`
- `component/benefits-card/action/default` -> Figma `#0f4e57` | repo `#0f4e57`
- `component/benefits-card/on-dark/default` -> Figma `#fafafa` | repo `#fafafa`
- `component/benefits-card/lock-bg/default` -> Figma `#1a1a1ae5` | repo `rgba(26, 26, 26, 0.9)`
- `component/benefits-card/action-bg/disabled` -> Figma `#f2f2f2` | repo `#f2f2f2`
- `component/benefits-card/action/disabled` -> Figma `#b3b3b3` | repo `#b3b3b3`

Observacao:

- `component/benefits-card/logo-border/default` resolve para `#e6e6e6` no repositorio e esta consistente com o contrato do `design.md`, mas esse binding especifico nao apareceu explicitamente nas amostras retornadas pelo Figma para as variantes auditadas.

### Benefits Content Card

- `component/benefits-content-card/surface/default` -> Figma `#fafafa` | repo `#fafafa`
- `component/benefits-content-card/surface/inner` -> Figma `#ffffff` | repo `#ffffff`
- `component/benefits-content-card/border/default` -> Figma `#e6e6e6` | repo `#e6e6e6`
- `component/benefits-content-card/text/default` -> Figma `#414958` | repo `#414958`
- `component/benefits-content-card/icon/star/default` -> Figma `#edc41e` | repo `#edc41e`

Observacao:

- `component/benefits-content-card/icon/outline/default` resolve para `#333333` no repositorio e segue o contrato do `design.md`, mas o Figma nao expôs esse token como variable separada na amostra inspecionada.
- o proprio `design.md` ja sinaliza que existem detalhes legados/ocultos no icone de estrela e que nem todo fill interno esta tokenizado.

### Toolbar

- `component/toolbar/icon/default` -> Figma `#333333` | repo `#333333`
- `component/toolbar/label/default` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/toolbar/icon/negative` -> Figma `#d5e0f6` | repo `#d5e0f6`
- `component/toolbar/label/negative` -> Figma `#d5e0f6` | repo `#d5e0f6`

Observacao:

- `component/toolbar/chevron/default` resolve para `#1b3c7e` no repositorio e esta alinhado ao contrato do `design.md`, mas o sampled node auditado pelo Figma nao expôs esse binding separadamente.

## Conclusao

Resultado desta wave:

- nao foi encontrada divergencia objetiva entre o repositorio e o Figma nas amostras verificadas
- `section-title`, `benefits-card`, `benefits-content-card` e `toolbar` estao consistentes com o contrato atual nas partes expostas pelo Figma
- alguns bindings continuam implicitos por dependerem de instancias remotas, overrides internos ou detalhes legados nao retornados pelo MCP

## Proximo recorte recomendado

1. seguir para a proxima wave em `card-store-item`, `event-card`, `fique-por-dentro-card` e residuos finais de `progress-bar`
2. se quisermos fechar a trilha de cards por completo, incluir tambem `benefits-goals` e os semanticos relacionados a `card-store-item`
