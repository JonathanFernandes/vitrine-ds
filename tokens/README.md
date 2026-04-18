# Tokens

Este diretório guarda a camada versionada de design tokens do repositório.

## Estrutura

```text
tokens/
├── dist/
└── source/
    ├── compat/
    ├── component/
    ├── metadata/
    ├── primitives/
    └── semantic/
```

## Regras

- `source/` é a fonte de verdade
- `dist/` é saída gerada para consumo por apps, bibliotecas ou automações
- tokens devem seguir o formato W3C Design Tokens sempre que possível
- componentes nao devem depender diretamente de `primitives/` quando houver equivalente em `semantic/` ou `component/`

## Saída Atual da Migração

- `primitives/*.base.json`: baseline do sistema usando `neutral` como base
- `themes/*/theme.json`: apenas overrides reais por brand
- `semantic/*.json`: namespaces compartilhados entre temas
- `component/*.json`: tokens organizados por componente
- `compat/*.json`: aliases oficiais para nomes legados ou temporários
- `metadata/token-manifest.json`: resumo e rastreabilidade da migração
- `metadata/compatibility-layer.json`: resumo da camada oficial de compatibilidade
- `dist/react-native/themes/*/tokens.json`: saída resolvida por tema para consumo
- `dist/react-native/themes/*/flat.json`: saída plana por tema para lookup simples
- `dist/react-native/manifest.json`: contrato estável de importação da saída mobile

## Fluxo Esperado

1. definir primitives
2. mapear semantics
3. mapear component tokens
4. aplicar overrides de tema
5. gerar aliases de compatibilidade quando houver renome seguro
6. gerar artefatos em `dist/`

## Build Atual

- `npm run tokens:build` gera a saída consumível em `tokens/dist/`
- o profile atual de build é `react-native` com tipografia `mobile`
- o import recomendado para uso inicial no app é `tokens/dist/react-native/themes/neutral/tokens.json`
