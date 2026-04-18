# Findings da Auditoria de Tokens

## Leitura Atual

A comparação entre `design.md` e `tokens-for-react.json` mostra três classes diferentes de divergência:

- aliases e renomes sem mudança real de significado
- estados e variantes documentados que nao existem no export atual
- famílias de componente documentadas no `design.md` mas fora do escopo do snapshot atual de export

## Números Principais

- 510 tokens referenciados no `design.md`
- 350 tokens no export normalizado
- 227 referências documentadas sem correspondência literal no export
- 67 tokens presentes no export e ainda nao citados literalmente no `design.md`

## Onde o Delta Está Concentrado

- `component.button.*`: especialmente `primary-inverse` e `secondary-inverse`
- `component.badge.*`: famílias e estados mais ricos no documento do que no export
- `component.shortcuts-menu.*` e outros componentes auditados no documento, mas ausentes do snapshot atual
- `color.text.*`, `color.surface.*`, `color.border.*` e `color.icon.*`: muitos nomes parecem ter sido refinados entre documentação e export

## Artefatos Gerados

- relatório bruto: [docs/token-audit.md](/Users/jonathanfernandes/Vitrine%20DS%20repo/docs/token-audit.md)
- auditoria em JSON: [tokens/source/metadata/design-doc-audit.json](/Users/jonathanfernandes/Vitrine%20DS%20repo/tokens/source/metadata/design-doc-audit.json)
- aliases heurísticos: [tokens/source/metadata/design-doc-aliases.draft.json](/Users/jonathanfernandes/Vitrine%20DS%20repo/tokens/source/metadata/design-doc-aliases.draft.json)
- aliases revisados manualmente: [tokens/source/metadata/design-doc-aliases.reviewed.json](/Users/jonathanfernandes/Vitrine%20DS%20repo/tokens/source/metadata/design-doc-aliases.reviewed.json)
- camada oficial gerada: [tokens/source/compat/color.json](/Users/jonathanfernandes/Vitrine%20DS%20repo/tokens/source/compat/color.json) e [tokens/source/compat/component.json](/Users/jonathanfernandes/Vitrine%20DS%20repo/tokens/source/compat/component.json)
- metadata da camada oficial: [tokens/source/metadata/compatibility-layer.json](/Users/jonathanfernandes/Vitrine%20DS%20repo/tokens/source/metadata/compatibility-layer.json)

## Próxima Decisão Recomendada

Separar os 227 deltas em duas filas:

1. `alias only`
2. `token missing from export`

Isso permite atualizar o contrato do repositório sem perder a rastreabilidade do `design.md`.
