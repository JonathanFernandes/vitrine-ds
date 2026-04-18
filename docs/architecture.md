# Arquitetura do Repositório

## Objetivo

Este repositório existe para ser a fonte oficial do Design System, e nao um app de demonstração.

## Modelo Conceitual

```text
Primitives -> Semantic -> Component Tokens -> Themes -> Components -> Specs -> Consumers
```

## Responsabilidades por Diretório

### `tokens/`

- concentra a definição de tokens em formato versionável
- separa fonte (`source/`) de artefatos gerados (`dist/`)
- permite evoluir pipeline de export sem reestruturar o repositório

### `themes/`

- organiza os modos de tema e eventuais overrides por brand
- evita espalhar decisões de branding dentro dos componentes
- facilita multi-brand e futura publicação independente de tema

### `components/`

- guarda implementação por plataforma
- deve conter apenas componentes do DS, nao telas de app
- cada componente deve ter contrato claro, specs associadas e dependência explícita de tokens

### `specs/`

- documenta a anatomia, estados, regras e decisões de implementação
- separa `component-spec` de `screen-spec` para nao confundir design system com composição de produto

### `apps/showcase/`

- existe apenas como consumidor, sandbox ou catálogo visual
- nao pode virar fonte de verdade de tokens, componentes ou specs

## Fonte de Verdade

- tokens: `tokens/source/`
- temas: `themes/*/theme.json`
- contrato de componente: pasta do componente + spec correspondente
- decisões de arquitetura e governança: `docs/`

## Regras de Ouro

1. componente nao consome token primitivo diretamente quando existir semantic token equivalente
2. tema nao duplica componente
3. spec de tela documenta composição; spec de componente documenta contrato reutilizável
4. showcase valida consumo; nao define a base do sistema
