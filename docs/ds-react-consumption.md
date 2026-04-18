# Consumo no `ds-react`

O `ds-react` agora consome o contrato oficial do Design System sem mudar a API pública de `useTheme()`.

## Como funciona

1. o repositório do Design System gera o `dist` com `npm run tokens:build`
2. o Design System sincroniza o app com `npm run tokens:sync-ds-react`
3. o `ds-react` passa a ler `src/theme/themes.generated.ts`
4. o arquivo `src/theme/themes.ts` no app vira apenas um contrato estável de tipos + reexports

## Comandos

No repositório do Design System:

- `npm run tokens:build`
- `npm run tokens:sync-ds-react`

No `ds-react`:

- `npm run tokens:sync-design-system`

## Arquivos envolvidos

- [scripts/sync-ds-react-theme.mjs](/Users/jonathanfernandes/Vitrine%20DS%20repo/scripts/sync-ds-react-theme.mjs)
- [themes.ts](/Users/jonathanfernandes/ds-react/src/theme/themes.ts)
- [themes.generated.ts](/Users/jonathanfernandes/ds-react/src/theme/themes.generated.ts)

## Exceções intencionais

- `HeaderHome` agora tem contrato oficial com variações estáveis para o app (`logado`, `deslogado` e `header-benefits`) sem depender de aliases locais
- `CarouselStore` agora tem contrato oficial de layout e segue reutilizando `card-store-item` como bloco interno oficial
- `shortcuts`, `notificationIconGroup.counter.bg` e `camera.strokeWidth/defaultSize` agora vêm do contrato oficial do Design System

## Resultado esperado

- o novo repositório vira a fonte de verdade
- o `ds-react` continua funcionando com o mesmo `ThemeContext`
- futuras mudanças de token precisam só de rebuild + sync
