# Operação do Design System

Este repositório agora tem um fluxo mínimo estável para manutenção de tokens e consumo no app.

## Comandos principais

- `npm run tokens:build`
  gera o `dist` resolvido em `tokens/dist/react-native`

- `npm run tokens:validate`
  valida `tokens/source`, temas, manifests e integridade do `dist`

- `npm run tokens:sync-ds-react`
  sincroniza o contrato consumido pelo `ds-react`

- `npm run tokens:audit-current-state`
  compara o `design.md` com o estado atual materializado no repositório

## Fluxo recomendado

1. editar tokens, temas ou specs no repositório oficial
2. rodar `npm run tokens:build`
3. rodar `npm run tokens:validate`
4. se o app precisar refletir a mudança, rodar `npm run tokens:sync-ds-react`
5. no `ds-react`, subir o app e validar visualmente o fluxo afetado

## O que o validate garante

- referências de token resolvem sem circularidade
- temas obrigatórios existem e têm `theme.json`
- o `dist` está coerente com o source atual
- manifests e metadados não estão desatualizados
- tokens críticos de contrato existem em todos os temas

## Quando rodar auditoria

Use `npm run tokens:audit-current-state` quando você:

- atualizar o `design.md`
- materializar novas famílias de componentes
- quiser medir cobertura documental antes de publicar ou versionar

## Regra prática

Se `tokens:validate` passar e o fluxo do `ds-react` estiver visualmente correto, o estado do Design System está saudável para continuar evoluindo.
