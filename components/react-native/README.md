# React Native Components

Implementação React Native migrada do `ds-react` para dentro do repositório oficial
do Design System.

## Estrutura

- `src/components/`: componentes oficiais migrados
- `src/theme/`: `ThemeProvider`, `useTheme` e contratos sincronizados do DS
- `src/index.ts`: ponto de entrada do pacote local
- `Icons/`: assets SVG usados pelos componentes migrados

## Componentes já migrados

- `Badge`
- `Banner`
- `BenefitsCardVertical` helpers
- `BenefitsContentCard`
- `BenefitsGoals`
- `BottomMenu`
- `Button`
- `Camera`
- `CardStoreItem`
- `CarouselStore`
- `Dotnav`
- `EventCard`
- `FiquePorDentroCard`
- `HeaderHome`
- `Input`
- `Link`
- `MoviePoster`
- `NotificationIconGroup`
- `ProgressBar`
- `SectionTitle`
- `Shortcuts`
- `ShortcutsMenu`
- `Toolbar`

## Como o tema é atualizado

Os arquivos de contrato em `src/theme/themes.ts` e `src/theme/themes.generated.ts`
são gerados pelo sync oficial do repositório:

- `node ./scripts/sync-ds-react-theme.mjs ./components/react-native`

## Status

As 23 pastas de componentes do `ds-react/src/components` já foram trazidas para
`components/react-native/src/components`.

O próximo passo deixa de ser migração estrutural e passa a ser:

1. limpar dependências herdadas do `ds-react`
2. adicionar build e typecheck próprios do pacote
3. documentar uso e publicação da biblioteca React Native
