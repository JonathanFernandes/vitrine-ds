# Convenções de Organização

## Nomeação

- diretórios: `kebab-case`
- componentes React Native: `PascalCase`
- arquivos de specs: `kebab-case.md`
- tokens: `dot-notation` com segmentos em `kebab-case`

Exemplos:

- `color.interactive.primary.default`
- `component.button.primary.bg.default`
- `specs/component-spec/button.md`
- `components/react-native/Button/Button.tsx`

## Tokens

- `primitives/`: valores absolutos
- `semantic/`: significado funcional
- `component/`: contrato de uso por componente
- `metadata/`: manifesto, versões e mapeamentos

## Temas

Cada tema deve ter:

- `theme.json` com metadata do tema
- overrides apenas quando houver diferença real de brand
- mapeamento claro entre nome de tema no Figma e id técnico no repositório

## Componentes

Estrutura esperada por componente:

```text
components/react-native/Button/
├── Button.tsx
├── index.ts
├── Button.types.ts
├── Button.stories.tsx
└── README.md
```

Nem todos os arquivos precisam existir no primeiro momento, mas a pasta deve evoluir nessa direção.

## Specs

### `component-spec/`

Usar para:

- anatomia
- variantes
- estados
- tokens
- acessibilidade
- regras de uso

### `screen-spec/`

Usar para:

- composição de tela
- hierarquia
- uso de instâncias DS
- exceções ou containers específicos de produto

## Versionamento Futuro

- versionar tokens e temas de forma explícita
- evitar mudanças silenciosas em artefatos gerados
- manter changelog ou histórico de decisão quando iniciar publicação
