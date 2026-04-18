# Materializacao Wave 2

Escopo desta segunda onda:

- `input`
- `link`
- semanticos restantes de `color.text`
- semanticos de `color.border` necessarios para links e inputs

## O que entrou

- materializacao dos tokens restantes de `color.text` usados por links e formularios
- materializacao de `color.border.active`, `color.border.danger-active`, `color.border.input` e `color.border.input-disabled`
- alinhamento do contrato de `input` ao `design.md`, incluindo estados `view-only`, `hover`, `error` e tokens de helper/prefix/icon
- criacao da estrutura moderna de `link.primary`, `link.destructive` e `link.negative`
- promocao de aliases revisados para tokens oficiais quando o contrato estava claro

## Arquivos principais

- `tokens/source/semantic/color.json`
- `tokens/source/component/input.json`
- `tokens/source/component/link.json`
- `tokens/source/metadata/materialized-deltas.wave-2.json`

## Observacao

Esta wave foi materializada a partir do contrato vivo do `design.md`.
Ao contrario da wave anterior, ela ainda nao passou por uma verificacao dedicada no Figma token a token.
