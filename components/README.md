# Components

Este diretório guarda implementações e contratos dos componentes do Design System.

## Direção

- separar por plataforma, começando por `react-native/`
- cada componente deve ser autocontido
- specs e tokens precisam ser rastreáveis a partir do componente
- componentes nao devem depender de telas ou fluxos de produto

## Estado atual

- `react-native/` já contém a primeira leva de implementações migradas do `ds-react`
- o contrato de tema usado por esses componentes é gerado a partir do Design System deste repo
- a próxima etapa é ampliar a migração dos componentes básicos e reduzir o `ds-react` a consumidor
