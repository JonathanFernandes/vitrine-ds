# Verificacao de Consistencia com Figma - Wave 1

Escopo desta verificacao:

- `Button`
- `Badge`
- `Shortcuts menu`

Arquivo auditado no Figma:

- `01 - Tokens - React Native`
- file key: `ZUEzW52KbL0DN9aKGSqwAs`
- canvas analisado: `7040:1539`

## Metodo

Foi feita uma verificacao em duas camadas:

1. Estrutura e variantes vivas no Figma via `get_metadata`
2. Amostragem de bindings reais via `get_variable_defs` em variantes representativas

O objetivo desta rodada nao foi reimplementar componentes, e sim validar se os tokens materializados no repositorio permanecem consistentes com o contrato atual do Figma.

## Variantes confirmadas no Figma

### Button

Frame auditado: `7040:1614`

Cobertura confirmada:

- `Primary`
- `Primary Inverse`
- `Secondary`
- `Secondary Inverse`
- `Destructive`
- estados `Default`, `Disabled`, `Hover`, `Focus`, `Pressed`, `Loading`
- tamanhos `Large`, `Medium`, `Small`

### Badge

Frame auditado: `7229:6138`

Cobertura confirmada:

- `Success`
- `Warning`
- `Error`
- `Info`
- `Neutral 1`
- `Neutral 2`
- `Neutral 3`
- `Promoções`
- `Estreia`
- `Blog`
- `Filter default`
- `Filter Active`
- `Disabled`
- tamanhos `Medium` e `Small`

### Shortcuts menu

Frame auditado: `7250:6531`

Cobertura confirmada:

- `State=Active`, `Default`, `Number`, `Disabled`
- `Aplication=Category`
- `Aplication=Menu` com `Reserva de mesa`, `Fila online`, `Cardapio digital`

## Amostras validadas 1:1

Os exemplos abaixo foram comparados entre o binding real do Figma e o valor final resolvido no repositorio.

### Button

- `component/button/primary-inverse/bg/default` -> Figma `#d5e0f6` | repo `#d5e0f6`
- `component/button/primary-inverse/label/default` -> Figma `#1a1a1a` | repo `#1a1a1a`
- `component/button/secondary-inverse/border/default` -> Figma `#ffffff` | repo `#ffffff`
- `component/button/secondary-inverse/label/disabled` -> Figma `#1a1a1a` | repo `#1a1a1a`

Observacao:

- no repositorio, esses casos estao resolvidos via semantic tokens; no Figma eles aparecem como variables de componente. Mesmo assim, o valor final bateu.

### Badge

- `component/badge/blog/bg` -> Figma `#81a2e4` | repo `#81a2e4`
- `component/badge/blog/fg` -> Figma `#09142a` | repo `#09142a`
- `component/badge/filter-default/border` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/badge/filter-default/fg` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/badge/filter-active/bg` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/badge/filter-active/fg` -> Figma `#fafafa` | repo `#fafafa`
- `component/badge/disabled/bg` -> Figma `#f2f2f2` | repo `#f2f2f2`
- `component/badge/disabled/fg` -> Figma `#b3b3b3` | repo `#b3b3b3`

### Shortcuts menu

- `component/shortcuts-menu/active/bg` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/shortcuts-menu/active/border` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/shortcuts-menu/active/label` -> Figma `#fafafa` | repo `#fafafa`
- `component/shortcuts-menu/default/bg` -> Figma `#f2f2f2` | repo `#f2f2f2`
- `component/shortcuts-menu/default/border` -> Figma `#f2f2f2` | repo `#f2f2f2`
- `component/shortcuts-menu/default/icon-fill` -> Figma `#000000` | repo `#000000`
- `component/shortcuts-menu/default/icon-stroke` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/shortcuts-menu/default/label` -> Figma `#2b303b` | repo `#2b303b`
- `component/shortcuts-menu/disabled/icon-stroke` -> Figma `#cccccc` | repo `#cccccc`
- `component/shortcuts-menu/disabled/label` -> Figma `#cccccc` | repo `#cccccc`
- `component/shortcuts-menu/menu/bg` -> Figma `#ffffff` | repo `#ffffff`
- `component/shortcuts-menu/menu/border` -> Figma `#e2e4e9` | repo `#e2e4e9`
- `component/shortcuts-menu/menu/icon` -> Figma `#1b3c7e` | repo `#1b3c7e`
- `component/shortcuts-menu/menu/icon-accent` -> Figma `#666666` | repo `#666666`
- `component/shortcuts-menu/menu/icon-bg` -> Figma `#ffffff` | repo `#ffffff`
- `component/shortcuts-menu/menu/label` -> Figma `#1b3c7e` | repo `#1b3c7e`

## Divergencia encontrada

Foi encontrada uma divergencia objetiva durante a auditoria:

- `component/button/radius`
  - Figma: `4`
  - repositorio antes do ajuste: `{border.radius.sm}` -> `8`
  - repositorio apos o ajuste: `{border.radius.xs}` -> `4`

Interpretacao:

- essa divergencia nao foi introduzida pela materializacao recente de `button`, `badge` ou `shortcuts-menu`
- ela veio do contrato anterior/export legado
- como o Figma atual expoe explicitamente `component/button/radius = 4`, o repositorio foi alinhado para seguir esse valor

## Conclusao

Resultado desta wave:

- `Badge` e `Shortcuts menu` estao consistentes com o Figma nas amostras verificadas
- os estados auditados de `Button` tambem batem em cor/label/border
- nao foi detectada inconsistencia estrutural criada pela migracao recente
- a divergencia objetiva encontrada nesta rodada foi `component/button/radius`, e ela foi corrigida no repositorio

## Recomendacao

Proximo recorte recomendado:

1. seguir para a proxima fila de deltas, priorizando `link`, `input` e o restante de `color.text.*`
