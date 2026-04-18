# Verificacao de Consistencia com Figma - Wave 2

Escopo desta verificacao:

- `Link`
- `Input`

Arquivo auditado no Figma:

- `01 - Tokens - React Native`
- file key: `ZUEzW52KbL0DN9aKGSqwAs`
- nodes:
  - `Link`: `7133:3191`
  - `Input`: `7099:1059`

## Metodo

Foi feita uma verificacao em duas camadas:

1. Estrutura e variantes vivas no Figma via `get_metadata`
2. Amostragem de bindings reais via `get_variable_defs` em variantes representativas

## Variantes confirmadas no Figma

### Link

Frame auditado: `7133:3191`

Cobertura confirmada:

- `primary`
- `destructive`
- `negative`
- estados `Default`, `Hover`, `Pressed`, `Focus`, `Disabled`
- tamanhos `Large`, `Medium`, `Small`, `Extra Small`
- estilos `Default` e `Negative`
- combinacoes com `TextBold=False` e `TextBold=True`

### Input

Frame auditado: `7099:1059`

Cobertura confirmada:

- estados `Placeholder`, `Hover`, `Writing`, `Filled`, `Focus`, `Error`, `Disabled`, `View-Only`, `Cancel`
- tamanhos `Large` e `Medium`

## Amostras validadas 1:1

Os exemplos abaixo foram comparados entre o binding real do Figma e o valor final resolvido no repositorio.

### Link

- `component/link/primary/text/default` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/link/primary/text/hover` -> Figma `#414958` | repo `#414958`
- `component/link/primary/text/pressed` -> Figma `#09142a` | repo `#09142a`
- `component/link/primary/text/disabled` -> Figma `#b3b3b3` | repo `#b3b3b3`
- `component/link/primary/focus-stroke` -> Figma `#81a2e4` | repo `#81a2e4`
- `component/link/destructive/text/default` -> Figma `#df2020` | repo `#df2020`
- `component/link/destructive/text/pressed` -> Figma `#2d0606` | repo `#2d0606`
- `component/link/destructive/text/disabled` -> Figma `#b3b3b3` | repo `#b3b3b3`
- `component/link/negative/text/default` -> Figma `#d5e0f6` | repo `#d5e0f6`
- `component/link/negative/text/hover` -> Figma `#fafafa` | repo `#fafafa`
- `component/link/negative/text/disabled` -> Figma `#cccccc` | repo `#cccccc`
- `component/link/negative/focus-stroke` -> Figma `#81a2e4` | repo `#81a2e4`

### Input

- `component/input/bg/default` -> Figma `#ffffff` | repo `#ffffff`
- `component/input/bg/disabled` -> Figma `#f2f2f2` | repo `#f2f2f2`
- `component/input/bg/view-only` -> Figma `#f2f2f2` | repo `#f2f2f2`
- `component/input/border/default` -> Figma `#999999` | repo `#999999`
- `component/input/border/hover` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/input/border/focus` -> Figma `#81a2e4` | repo `#81a2e4`
- `component/input/border/focus-width` -> Figma `2` | repo `2`
- `component/input/border/error` -> Figma `#df2020` | repo `#df2020`
- `component/input/border/disabled` -> Figma `#cccccc` | repo `#cccccc`
- `component/input/border/view-only` -> Figma `#999999` | repo `#999999`
- `component/input/label/default` -> Figma `#666666` | repo `#666666`
- `component/input/label/disabled` -> Figma `#b3b3b3` | repo `#b3b3b3`
- `component/input/label/error` -> Figma `#861313` | repo `#861313`
- `component/input/value/default` -> Figma `#000000` | repo `#000000`
- `component/input/value/hover` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/input/value/error` -> Figma `#df2020` | repo `#df2020`
- `component/input/placeholder/default` -> Figma `#999999` | repo `#999999`
- `component/input/cancel/text` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/input/radius` -> Figma `4` | repo `4`
- `component/input/border-width` -> Figma `1` | repo `1`

## Divergencia encontrada

Foi encontrada uma divergencia objetiva durante a auditoria:

- `component/link/destructive/focus-stroke`
  - Figma: `#ec7979`
  - repositorio antes do ajuste: `color.border.danger-active -> color.feedback.error.action` -> `#861313`
  - repositorio apos o ajuste: `color.border.danger-active -> color.feedback.error.active` -> `#ec7979`

## Conclusao

Resultado desta wave:

- `Input` ficou consistente com o Figma nas amostras verificadas
- `Link` tambem ficou consistente nas amostras verificadas apos o ajuste em `destructive.focus-stroke`
- nao foi detectada inconsistencia estrutural criada pela `wave 2`

## Proximo recorte recomendado

1. seguir para a proxima fila de deltas priorizando componentes ainda sem verificacao dedicada no Figma
2. atacar `section-title`, `benefits-card`, `toolbar` e familias semanticas residuais de `color.border` e `color.icon`
