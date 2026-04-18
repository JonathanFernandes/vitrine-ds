# Vitrine Design System

Repositório dedicado para a fonte de verdade do Design System da Vitrine.

O objetivo deste repositório é separar claramente:

- `tokens/`: definição e distribuição de design tokens
- `themes/`: modos/brands e overrides de tema
- `components/`: implementação e contrato dos componentes
- `specs/`: especificações técnicas de componentes e telas
- `docs/`: arquitetura, convenções e governança
- `apps/showcase/`: vitrine opcional para consumo e validação visual

## Princípios

- tokens são a base versionada e independente de app
- temas sobrescrevem tokens sem duplicar componentes
- componentes consomem tokens sem hardcode de primitives
- specs documentam comportamento, anatomia, estados e regras de uso
- showcase é consumidor do Design System, não a fonte de verdade

## Estrutura Inicial

```text
.
├── apps/
│   └── showcase/
├── components/
│   ├── _templates/
│   └── react-native/
├── docs/
├── specs/
│   ├── component-spec/
│   └── screen-spec/
├── themes/
│   ├── green/
│   ├── leblon/
│   ├── neutral/
│   └── red/
└── tokens/
    ├── dist/
    └── source/
        ├── compat/
        ├── component/
        ├── metadata/
        ├── primitives/
        └── semantic/
```

## Limites de Responsabilidade

- `tokens/source/` é a fonte de verdade versionada
- `tokens/dist/` é saída gerada para consumo futuro
- `themes/` guarda metadata e overrides por tema
- `components/` guarda implementações, contratos e assets por componente
- `specs/` guarda documentação técnica consumível por design, produto e engenharia
- `tokens/source/compat/` guarda aliases oficiais de compatibilidade

## Estado Atual da Migração

- `primitives` foram migrados como base `neutral` + overrides por tema
- `semantic` foi migrado em namespace compartilhado
- `component` foi migrado em arquivos por componente
- `compat` guarda aliases oficiais para nomes legados do `design.md`
- `typography`, `elevation`, `motion` e `z-index` ficaram em arquivos base dedicados
- `tokens/dist/react-native` agora entrega saída resolvida por tema para consumo no app
- `ds-react` já consegue consumir o contrato novo via sync gerado a partir de `tokens/dist`

Script de migração atual:

- `npm run tokens:migrate-from-ds-react`
- `npm run tokens:build-compat-layer`
- `npm run tokens:build`
- `npm run tokens:validate`
- `npm run tokens:sync-ds-react`
- `npm run tokens:audit-current-state`

Fluxo de consumo atual no app:

- [docs/ds-react-consumption.md](/Users/jonathanfernandes/Vitrine%20DS%20repo/docs/ds-react-consumption.md)

Fluxo operacional do repositório:

- [docs/operations.md](/Users/jonathanfernandes/Vitrine%20DS%20repo/docs/operations.md)

## Estratégia de Migração

O plano detalhado está em [docs/migration-plan.md](/Users/jonathanfernandes/Vitrine%20DS%20repo/docs/migration-plan.md), mas a direção é:

1. migrar tokens e temas primeiro
2. migrar componentes para uma estrutura desacoplada do app
3. migrar specs de componentes e telas
4. por último, criar ou adaptar `apps/showcase/` como consumidor

## Próximos Passos

1. escolher convenção de publicação para componentes
2. inicializar git e publicar no GitHub
