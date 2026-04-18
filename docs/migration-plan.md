# Estratégia de Migração a partir de `ds-react`

## Objetivo

Migrar o conteúdo útil do projeto `/Users/jonathanfernandes/ds-react` para este repositório sem carregar o acoplamento atual com Expo, app shell e estrutura de vitrine.

## O que existe hoje no `ds-react`

- `tokens-for-react.json`: export de tokens com valor potencial de migração
- `src/theme/`: tema resolvido para consumo React Native
- `src/components/`: componentes RN reutilizáveis
- `specs/`: specs de componentes
- `screen spec/`: specs de telas
- `design.md`: documentação extensa de arquitetura, decisões e tokens
- `App.tsx` e `screens/`: material de showcase/app, nao fonte de verdade

## Mapeamento Proposto

| Origem em `ds-react` | Destino neste repo | Observação |
| --- | --- | --- |
| `tokens-for-react.json` | `tokens/source/metadata/figma-export.json` ou arquivos fracionados em `primitives/`, `semantic/`, `component/` | Preferir quebrar por camada antes de consumir |
| `src/theme/themes.ts` | `themes/*/theme.json` + futura camada de build | Separar metadata de tema de código resolvido |
| `src/components/*` | `components/react-native/*` | Migrar por componente, com limpeza de dependências do app |
| `specs/*.md` | `specs/component-spec/*.md` | Manter nomes em kebab-case |
| `screen spec/*.md` | `specs/screen-spec/*.md` | Normalizar pasta e nomes |
| `design.md` | `docs/architecture.md`, `docs/conventions.md` e docs futuras | Fatiar em documentos menores e acionáveis |
| `App.tsx`, `screens/*` | `apps/showcase/` | Apenas se fizer sentido como consumidor |

## Ordem Recomendada

1. consolidar tokens e temas
2. normalizar specs
3. migrar componentes base
4. montar showcase consumidor

## Fase 1: Tokens e Temas

- extrair o export atual para `tokens/source/metadata/`
- quebrar o arquivo grande em camadas menores
- transformar nomes de tema em ids estáveis: `neutral`, `leblon`, `red`, `green`
- decidir quais artefatos gerados devem ser commitados em `tokens/dist/`

## Fase 2: Specs

- mover `specs/*.md` para `specs/component-spec/`
- mover `screen spec/*.md` para `specs/screen-spec/`
- revisar links de Figma, datas, naming e seções obrigatórias

## Fase 3: Componentes

- começar por componentes de alta reutilização: `Button`, `Input`, `Link`, `Badge`
- remover dependências implícitas de tema local ou arquivos de app
- documentar props, estados e dependências de token junto da implementação

## Fase 4: Showcase

- criar um app simples como consumidor
- usar o showcase para smoke test visual e auditoria de tema
- evitar lógica de produto dentro da vitrine

## Critérios para Aceitar uma Migração

- sem dependência obrigatória de `App.tsx` ou `screens/`
- sem token hardcoded no componente quando existir token semântico
- spec correspondente criada ou migrada
- naming alinhado com as convenções deste repositório
