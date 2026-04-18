# Themes

Este diretório organiza metadata e overrides de tema.

Cada tema deve:

- ter um id técnico estável
- corresponder a um modo conhecido do Figma
- sobrescrever apenas o que muda de branding
- preservar a mesma API de tokens para os consumidores

## Estado Atual

- `neutral` funciona como base do sistema neste primeiro recorte
- `leblon`, `red` e `green` guardam apenas overrides de primitives
- `semantic` e `component` permanecem compartilhados no export atual
