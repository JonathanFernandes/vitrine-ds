# Compatibility Layer

Esta pasta guarda aliases oficiais de compatibilidade.

Objetivo:

- preservar rastreabilidade com nomes legados do `design.md`
- evitar que renomes quebrem consumidores ou documentação em transição
- manter um caminho explícito entre token legado e token canônico

Regras:

- aliases aqui nao criam novos contratos visuais
- cada alias deve apontar para um token canônico existente
- a fonte de verdade humana dos aliases é `metadata/design-doc-aliases.reviewed.json`
- os arquivos desta pasta sao gerados por `npm run tokens:build-compat-layer`
