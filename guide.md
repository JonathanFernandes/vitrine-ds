# Guia de Operação do Vitrine Design System

Este guia é o ponto de partida para operar o novo repositório do Design System no dia a dia.

Ele foi escrito para uso prático: o que existe, onde mexer, quais comandos rodar, como sincronizar com o `ds-react` e como evoluir o sistema com segurança.

## 1. O que é este repositório

Este repositório é a fonte de verdade do Design System.

Ou seja:

- tokens ficam aqui
- temas ficam aqui
- contratos de componentes ficam aqui
- specs ficam aqui
- o `ds-react` consome o que é gerado aqui

O objetivo é evitar que o app seja a origem dos tokens.

## 2. Estrutura principal

### `tokens/source/`

É a fonte de verdade versionada.

Contém:

- `primitives/`: valores-base como cor, radius, spacing, tipografia, motion, elevation
- `semantic/`: nomes semânticos como `color.text.body`, `color.surface.card`
- `component/`: tokens específicos de componente como `component.button.primary.bg.default`
- `metadata/`: manifestos, auditorias e rastreabilidade
- `compat/`: compatibilidade legada, se existir

### `tokens/dist/`

É a saída gerada para consumo.

Você não edita manualmente essa pasta.

Ela existe para:

- apps consumirem tokens prontos
- facilitar integração com React Native
- congelar um contrato estável por tema

### `themes/`

Cada pasta representa um tema ou brand:

- `neutral`
- `leblon`
- `red`
- `green`

Cada uma tem um `theme.json` com:

- `id`
- `figmaMode`
- `status`
- `source`
- `overrides.primitives`

### `components/`

Reservado para implementação e contratos de componentes do Design System.

Hoje o foco principal do repositório está em tokens e especificações.

### `specs/`

Guarda documentação técnica de componentes e telas.

Use essa pasta quando quiser formalizar comportamento, anatomia, estados e regras de uso.

### `docs/`

Documentação de suporte do repositório:

- arquitetura
- convenções
- migração
- operação
- consumo no app
- auditorias

## 3. Como pensar a arquitetura

A ordem mental correta é:

1. `primitive`
2. `semantic`
3. `component`
4. `theme override`
5. `dist`
6. `app consumidor`

Exemplo:

1. uma cor base nasce em `primitives`
2. ela ganha significado em `semantic`
3. um componente passa a usá-la em `component`
4. um tema pode sobrescrever o primitive
5. o `dist` resolve tudo
6. o `ds-react` só consome o resultado final

## 4. O que já está pronto

Hoje o repositório já tem:

- migração de tokens a partir do `ds-react`
- materialização por waves
- auditoria contra `design.md`
- auditoria de consistência com Figma para os componentes já existentes
- build de `dist` para React Native
- sync com o `ds-react`
- validação de integridade do pipeline

Ou seja: ele já está operacional.

## 5. Comandos principais

### `npm run tokens:build`

Gera o `dist` resolvido em `tokens/dist/react-native`.

Use quando:

- você alterar tokens
- você alterar temas
- você materializar novos tokens

### `npm run tokens:validate`

Valida a saúde do repositório.

Ele verifica:

- duplicidade de token path
- temas obrigatórios
- estrutura de `theme.json`
- integridade do `dist`
- manifests atualizados
- tokens críticos presentes em todos os temas
- se o `dist` está coerente com o source atual

Use sempre depois do `build`.

### `npm run tokens:sync-ds-react`

Sincroniza o contrato consumido pelo `ds-react`.

Ele gera no app:

- `src/theme/themes.generated.ts`
- `src/theme/themes.ts`

Use quando:

- você quer que o app passe a refletir a mudança mais recente dos tokens

### `npm run tokens:audit-current-state`

Compara o `design.md` com o estado atual materializado no novo repositório.

Use quando:

- atualizar o `design.md`
- quiser conferir cobertura
- quiser medir se a documentação continua consistente com o contrato atual

### Comandos legados/importantes

- `npm run tokens:migrate-from-ds-react`
- `npm run tokens:build-compat-layer`
- `npm run tokens:audit-design-doc`

Esses comandos continuam úteis, mas o fluxo diário normal hoje é:

1. editar
2. build
3. validate
4. sync app

## 6. Fluxo recomendado do dia a dia

Quando você fizer qualquer mudança de token:

1. edite o arquivo certo em `tokens/source/`
2. rode `npm run tokens:build`
3. rode `npm run tokens:validate`
4. se o app precisar refletir isso, rode `npm run tokens:sync-ds-react`
5. abra o `ds-react` e valide visualmente o fluxo afetado

Se `build` e `validate` passarem, o repositório está saudável.

## 7. Onde editar cada tipo de coisa

### Se quiser mudar um valor-base

Edite:

- `tokens/source/primitives/*.json`

Exemplos:

- radius
- grayscale
- spacing
- typography

### Se quiser mudar o significado de uso

Edite:

- `tokens/source/semantic/*.json`

Exemplos:

- `color.text.body`
- `color.surface.card`
- `color.border.active`

### Se quiser mudar um componente específico

Edite:

- `tokens/source/component/<nome>.json`

Exemplos:

- `button.json`
- `input.json`
- `badge.json`

### Se quiser mudar uma brand

Edite:

- `themes/<tema>/theme.json`

Normalmente você mexe em:

- `overrides.primitives`

A regra aqui é:

- tema sobrescreve primitive
- tema não deve duplicar semantic ou component sem necessidade

## 8. Como adicionar um novo token

### Caso 1: o token ainda não existe

Faça assim:

1. descubra se ele é `primitive`, `semantic` ou `component`
2. adicione no arquivo correto
3. prefira referência em vez de valor hardcoded quando fizer sentido
4. rode `npm run tokens:build`
5. rode `npm run tokens:validate`

### Caso 2: o token existe no Figma ou no `design.md`, mas não no repo

Faça assim:

1. materialize o token no arquivo correto
2. valide o naming com o padrão já usado
3. rode `build`
4. rode `validate`
5. se o componente existir no `ds-react`, sincronize o app

## 9. Como adicionar um novo componente ao contrato

Quando você desenvolver um componente novo no fluxo de telas:

1. confirme o componente no Figma
2. decida o arquivo em `tokens/source/component/`
3. materialize os tokens do componente
4. use nomes consistentes com os componentes já existentes
5. gere o `dist`
6. valide
7. se o `ds-react` for consumir, atualize o contrato do app

Se o componente ainda não existe no Figma, ele não precisa entrar como “lacuna”.

Ele pode esperar até virar necessidade real.

## 10. Como funciona o consumo no `ds-react`

O `ds-react` não lê mais o Design System direto do source bruto.

Ele consome uma camada gerada.

Fluxo:

1. este repositório gera `tokens/dist`
2. o script de sync transforma o `dist` em contrato compatível com o app
3. o app mantém a API pública de `useTheme()`

Arquivos importantes no `ds-react`:

- `src/theme/themes.generated.ts`
- `src/theme/themes.ts`
- `src/theme/ThemeContext.tsx`

Comando útil dentro do app:

- `npm run tokens:sync-design-system`

## 11. O que está intencionalmente híbrido hoje

Nem tudo já virou contrato oficial puro.

Alguns casos ainda são composições locais do app:

- `shortcuts`
- parte do comportamento de `notificationIconGroup`
- `camera.strokeWidth`
- `camera.defaultSize`

Isso não é erro.

É uma transição controlada.

A regra é simples:

- se ainda não existe como contrato oficial, pode ficar local
- se já existe no Design System, o app deve consumir do repositório oficial

## 12. Como usar o Figma nesse processo

Use o Figma quando quiser:

- validar nome e valor de token
- confirmar estados de componente
- auditar consistência antes de materializar algo novo

A lógica correta é:

- Figma ajuda a validar
- repositório oficial define o contrato versionado

Ou seja: o Figma não substitui o repo, e o repo não deve divergir silenciosamente do Figma.

## 13. Quando rodar auditoria

Rode auditorias quando:

- o `design.md` mudar
- você materializar uma família nova de componentes
- houver dúvida se algo está só no doc e não no contrato
- quiser medir cobertura antes de publicar ou versionar

Arquivos úteis:

- `docs/token-current-state-audit.md`
- `tokens/source/metadata/design-system-current-audit.json`
- relatórios `figma-consistency-*`

## 14. Como saber se está tudo saudável

Sinais de saúde:

- `npm run tokens:build` passa
- `npm run tokens:validate` passa
- o `ds-react` sincroniza sem erro
- o fluxo afetado no app está visualmente certo

Se isso acontecer, você pode seguir com segurança.

## 15. Problemas comuns

### `tokens:validate` falhou

Leia a mensagem.

Normalmente será um destes casos:

- token duplicado
- tema faltando
- `dist` desatualizado
- token crítico ausente
- manifest inconsistente

Na prática, quase sempre o caminho é:

1. corrigir o source
2. rodar `npm run tokens:build`
3. rodar `npm run tokens:validate` de novo

### O app não refletiu a mudança

Cheque:

1. você rodou `tokens:build`?
2. você rodou `tokens:sync-ds-react`?
3. no app, os arquivos de tema foram gerados?
4. o fluxo visual foi recarregado?

### O token existe no Figma mas não no repo

Isso significa que ele ainda precisa ser materializado.

Não coloque workaround no app antes de decidir onde ele entra:

- primitive
- semantic
- component

## 16. Regra de ouro para evoluir bem

Sempre prefira:

1. primitive bem definido
2. semantic claro
3. component token explícito
4. build
5. validate
6. sync no app

Evite:

- hardcode novo no `ds-react`
- criar token direto no app
- pular o `validate`
- editar `tokens/dist` manualmente

## 17. Sequência recomendada para qualquer mudança

Se estiver em dúvida, siga exatamente esta sequência:

1. identificar o que precisa mudar
2. descobrir em qual camada isso pertence
3. editar o `source`
4. rodar `npm run tokens:build`
5. rodar `npm run tokens:validate`
6. rodar `npm run tokens:sync-ds-react` se o app usar o token
7. validar visualmente no `ds-react`
8. documentar se a mudança afetar contrato ou operação

## 18. Resumo curto

Se você lembrar só de uma coisa, lembre desta:

`source -> build -> validate -> sync app`

Esse é o ciclo operacional do repositório.