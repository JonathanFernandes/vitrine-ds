# Accordion — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7922-5670](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7922-5670&t=6YcsJh8Vlh5q99fR-4)  
> **Figma:** `COMPONENT_SET` **accordion** (`7922:5670`)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 19 de maio de 2026  

---

## Visão geral

Componente **expansível** para revelar conteúdo secundário sob um cabeçalho clicável: título em destaque + ícone de chevron (fechado = `chevron-bottom`, aberto = `chevron-top`). Dois modos de conteúdo quando expandido:

1. **`open-simple`** — bloco de texto único (subtítulo / corpo).
2. **`open-list`** — lista numerada com **badge circular** (ex.: `1°`, `2°`) + texto por linha.

A propriedade Figma **`Type`** não é “tema claro/escuro do app”: **`Dark`** usa tokens **default** (texto escuro sobre fundo claro); **`Light`** usa tokens **`*/negative`** (texto/ícone claros para fundos escuros ou de marca). Em RN, mapear `Type` para algo como `variant: 'default' | 'inverse'`.

Este componente **não** está implementado no pacote `components/react-native` neste repositório.

**Validação com documentação local:** os tokens `component.accordion.*` existem no Figma (coleção **Component Tokens**) mas **ainda não constam** em `design.md` §5 — recomenda-se adicionar subseção **5.x Accordion** após congelar nomes com design.

---

## Anatomia

| # | Elemento | Tipo RN | Figma (camada / instância) | Descrição |
|---|----------|---------|----------------------------|-----------|
| 1 | Root | `Pressable` + `View` | `action=* , Type=*` | Container principal; largura fixa **343** |
| 2 | Header row | `Pressable` / `View` | `container` (aberto) ou filhos diretos no root (fechado) | Linha título + ícone; padding horizontal **8** |
| 3 | Title | `Text` | `title` | Título bold 14 / lh 16 |
| 4 | Chevron icon | `Icon` / SVG | `icon` (instance) | **16×16**; `chevron-bottom` fechado · `chevron-top` aberto |
| 5 | Content area | `View` | `container` (corpo) | Só em `open-simple` / `open-list` |
| 6 | Subtitle (simple) | `Text` | `subtitle` | Corpo regular 12 / lh 14; padding horizontal **16** |
| 7 | List stack | `View` | `container` vertical | `open-list`; `itemSpacing` **12** entre linhas |
| 8 | List row | `View` | `container` horizontal | Badge + texto; gap **12**; padding horizontal **8** |
| 9 | Number badge | `View` | `container` (circular) | **24×24**; padding **4**; raio **round** |
| 10 | Number label | `Text` | `number` | Bold 12 / lh 14; ex. `1°` |
| 11 | Row label | `Text` | `subtitle` (por linha) | Regular 12 / lh 14 |

**Ícones publicados (instâncias inspecionadas):**

| Estado | Componente Figma | Node |
|--------|------------------|------|
| `closed` | `chevron-bottom` | `7099:658` |
| `open-*` | `chevron-top` | `7922:5667` |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `action` | `closed` · `open-simple` · `open-list` | `closed` |
| `Type` | `Dark` · `Light` | `Dark` |

| Variante Figma | Dimensões (W×H) | Conteúdo visível |
|----------------|-----------------|------------------|
| `closed` | 343 × **16** | Título + chevron para baixo |
| `open-simple` | 343 × **50** | Header + 1 parágrafo |
| `open-list` | 343 × **168** | Header + 4 linhas numeradas (exemplo) |

**Conteúdo de exemplo** (“Lorem ipsum…”, `1°`–`4°`): substituir por **props** no RN. A lista deve ser **dinâmica** (`items[]`), não fixa em 4 itens.

---

## Tokens por variante e estado

Valores **NeutralTheme** na coluna final foram resolvidos via `boundVariables` + cadeia de variáveis (Plugin API, 19/05/2026). Nomes Figma com `/`; no código RN usar convenção `component.accordion.*` (dot-notation) via `useTheme()`.

### `Type = Dark` (tokens `*/default`)

Aplica-se a **todos** os estados `action` quando `Type=Dark`.

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Title | `color` | `component.accordion.title.default` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |
| Chevron | `color` | `component.accordion.icon.default` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |
| Subtitle / row text | `color` | `component.accordion.subtitle.default` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |
| Badge (fundo) | `backgroundColor` | `component.accordion.badge.bg.default` | `color.surface.dark` | `Color/Ambient/Base/Dark` | **#1A1A1A** |
| Badge (número) | `color` | `component.accordion.badge.number.default` | `color.text.negative` | `color.function.primary.light` | **#D5E0F6** |

### `Type = Light` (tokens `*/negative`) — diferenças vs Dark

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Title | `color` | `component.accordion.title.negative` | `color.text.on-dark` | `color.ambient.base.light` | **#FAFAFA** |
| Chevron | `color` | `component.accordion.icon.negative` | `color.icon.on-brand` | `color.ambient.base.light` | **#FAFAFA** |
| Subtitle / row text | `color` | `component.accordion.subtitle.negative` | `color.text.on-dark` | `color.ambient.base.light` | **#FAFAFA** |
| Badge (fundo) | `backgroundColor` | `component.accordion.badge.bg.negative` | `color.surface.card` | `color.ambient.base.light` | **#FAFAFA** |
| Badge (número) | `color` | `component.accordion.badge.number.negative` | `color.text.brand-strong` | `color.function.primary.action` | **#1B3C7E** |

> **Uso esperado:** `Type=Light` pressupõe **fundo escuro ou de marca** por trás do accordion. Não usar texto `#FAFAFA` sobre fundo branco.

### `action = closed` — layout (sem tokens de cor adicionais)

| Propriedade | Valor Figma | Token / nota |
|-------------|-------------|--------------|
| `layoutMode` | `HORIZONTAL` | — |
| `paddingLeft` / `paddingRight` | **8** px | **Não bound** no root fechado — mapear para `spacing.padding.positive.2xs` na implementação |
| `itemSpacing` | **0** | — |
| Largura título | **277** px | flex + `flexShrink` no RN |
| Ícone | **16×16** | instância `chevron-bottom` |

### `action = open-simple` ou `open-list` — diferenças de layout

| Propriedade | Valor Figma | Token (quando bound) |
|-------------|-------------|----------------------|
| Root `layoutMode` | `VERTICAL` | — |
| Gap header ↔ conteúdo | **20** px | Alinhar a `spacing.padding.positive.md` — **não bound** no root inspecionado |
| Header `paddingLeft` / `paddingRight` | **8** px | `Spacing/Padding/Positive/2xs` |
| Header `primaryAxisAlignItems` | `SPACE_BETWEEN` | `itemSpacing` **50** no frame — **não bound**; espaçamento efetivo vem do space-between |
| Corpo `open-simple` padding H | **16** px | `Spacing/Padding/Positive/sm` |
| Lista `itemSpacing` (entre linhas) | **12** px | `Spacing/Padding/Positive/xs` |
| Linha lista `itemSpacing` (badge ↔ texto) | **12** px | `Spacing/Padding/Positive/xs` |
| Linha lista padding H | **8** px | `Spacing/Padding/Positive/2xs` |
| Badge padding | **4** px | `Spacing/Padding/Positive/3xs` |
| Badge `borderRadius` | **999** | `Border/Radius/Round` |
| Badge tamanho | **24×24** | — |

---

## Tipografia

| Elemento | Estilo Figma | Family | Size | Weight | Line height |
|----------|--------------|--------|------|--------|-------------|
| Title | Mobile/Link/Link Small Bold | Be Vietnam Pro · **Bold** | 14 | 700 | 16 |
| Subtitle / row label | Mobile/Link/Link XSmall | Be Vietnam Pro · Regular | 12 | 400 | 14 |
| Badge number | Mobile/Link/Link XSmall Bold | Be Vietnam Pro · **Bold** | 12 | 700 | 14 |

Mapear para tokens `font.*` do DS onde existirem; manter valores acima como referência do layout publicado.

---

## Espaçamento e dimensões

| Propriedade | Origem (Figma variable / layer) | Valor publicado |
|-------------|----------------------------------|-----------------|
| Largura do componente | variantes `action=*` | **343** px |
| Altura `closed` | — | **16** px |
| Altura `open-simple` | — | **50** px |
| Altura `open-list` (4 itens exemplo) | — | **168** px |
| Largura útil do título | `title` | **277** px |
| Ícone chevron | `icon` | **16×16** px |
| Badge numérico | `container` circular | **24×24** px |
| Altura da linha da lista | row `container` | **24** px |

---

## Variações por tema

Propriedades que passam por **`color.function.primary.light`** e **`color.function.primary.action`** variam entre temas. Textos `*/default` (grayscale 100) permanecem estáveis.

### Badge número — `component.accordion.badge.number.default` (Type Dark)

| Tema | Primitivo | Hex |
|------|-----------|-----|
| NeutralTheme | `color.function.primary.light` | **#D5E0F6** |
| LeblonTheme | `color.function.primary.light` | **#F2E6D9** |
| RedTheme | `color.function.primary.light` | **#F2A6B1** |
| GreenTheme | `color.function.primary.light` | **#DBF0E2** |

### Badge número — `component.accordion.badge.number.negative` (Type Light)

| Tema | Primitivo | Hex |
|------|-----------|-----|
| NeutralTheme | `color.function.primary.action` | **#1B3C7E** |
| LeblonTheme | `color.function.primary.action` | **#734E26** |
| RedTheme | `color.function.primary.action` | **#590D18** |
| GreenTheme | `color.function.primary.action` | **#265937** |

Título, subtítulo e ícone **default** / **negative** não variam entre os quatro temas no modo inspecionado (semânticos apontam para ambient estáveis).

---

## Acessibilidade

- [ ] **Touch target crítico:** a altura do header publicado é **16** px — muito abaixo do mínimo **44×44 pt** (iOS) / **48×48 dp** (Android). Envolver o header em `Pressable` com `minHeight` ≥ 44 e/ou `hitSlop` generoso.
- [ ] **`accessibilityRole`:** header com `"button"`; conteúdo expandido com `"none"` ou região agrupada.
- [ ] **`accessibilityState`:** `{ expanded: boolean }` refletindo `action !== 'closed'`.
- [ ] **`accessibilityLabel`:** título + hint (“expandido” / “recolhido”); em `open-list`, anunciar contagem de itens se relevante.
- [ ] **Contraste `Type=Light`:** texto `#FAFAFA` exige fundo escuro — **falha WCAG** se renderizado sobre branco. Validar contraste do container pai no produto.
- [ ] **Contraste `Type=Dark`:** `#1A1A1A` sobre branco ≈ **15.8:1** — adequado para texto normal.
- [ ] **Badge:** o número decorativo deve estar no label acessível da linha (ex.: “1º, Lorem ipsum…”), não apenas no círculo visual.

---

## Restrições e regras

- **Hover** (`*/hover`) — ignorar em RN (D-007 em `design.md`).
- **`Type=Light`** = paleta **inverse/negative**, não “light mode” do sistema.
- Transição **closed ↔ open:** alternar ícone `chevron-bottom` ↔ `chevron-top`; animar altura/opacidade do painel no RN (não especificado no Figma estático).
- **`open-list`:** itens vêm de array; suportar N linhas (o Figma mostra 4 como amostra).
- **Violações de arquitetura / binding inspecionadas:**
  - Padding **8** px no root **fechado** sem variável bound — implementar via `spacing.padding.positive.2xs`.
  - Gap **20** px entre header e corpo **sem** bound no root — alinhar a `spacing.padding.positive.md`.
  - `itemSpacing` **50** no header aberto não é token — layout `SPACE_BETWEEN`; não portar “50” como gap fixo.
  - Espaçamentos **Spacing/** e **Border/** vêm da coleção **Design System Tokens** (não da pilha Component/Semantic/Primitive) — aceitável para layout; documentado como DST.
  - Badge bg default resolve `color.surface.dark` → primitivo nomeado `Color/Ambient/Base/Dark` na coleção DST — nomenclatura legada; no código preferir chaves semânticas do tema.

---

## Props sugeridas (TypeScript)

```typescript
export type AccordionAction = 'closed' | 'open-simple' | 'open-list';

/** Mapeia `Type` do Figma: Dark = texto escuro; Light = inverse (sobre fundo escuro) */
export type AccordionType = 'dark' | 'light';

export interface AccordionListItem {
  /** Ex.: "1°" — ou gerar a partir de `index` */
  badgeLabel: string;
  label: string;
}

export interface AccordionProps {
  /** Estado visual; em produção preferir `expanded` + `onToggle` */
  action?: AccordionAction;
  type?: AccordionType;
  title: string;
  /** `open-simple` */
  subtitle?: string;
  /** `open-list` */
  items?: AccordionListItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  testID?: string;
  accessibilityLabel?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { Accordion } from '@allos/design-system'; // quando existir

<Accordion
  type="dark"
  title="Como funciona o benefício"
  expanded={false}
  onToggle={(open) => {}}
/>

<Accordion
  type="dark"
  action="open-simple"
  title="Regulamento resumido"
  subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
/>

<Accordion
  type="light"
  action="open-list"
  title="Passo a passo"
  items={[
    { badgeLabel: '1°', label: 'Abra o app e faça login' },
    { badgeLabel: '2°', label: 'Acesse a seção de benefícios' },
    { badgeLabel: '3°', label: 'Ative o cupom desejado' },
  ]}
/>
```

> Renderizar `type="light"` apenas sobre superfícies com contraste adequado (fundo primário escuro, hero, etc.).

---

## Checklist de implementação

- [ ] Módulo de tema com todos os tokens `component.accordion.*` listados nesta spec.
- [ ] Cadeia **Component → Semântico → Primitivo** para cores; DST para espaçamento e raio round.
- [ ] Header com área tocável ≥ **44×44** pt.
- [ ] Ícones `chevron-bottom` / `chevron-top` do DS (ou SVG equivalente).
- [ ] Estados `open-simple` e `open-list` com animação de expand/collapse.
- [ ] `accessibilityState.expanded` e labels compostos em listas numeradas.
- [ ] Funciona nos **4 temas** via `ThemeContext` (badge number nas variações de marca).
- [ ] Atualizar `design.md` §5 com subseção **Accordion** após validação com design.
- [ ] Conferência pixel a pixel com variantes Figma `7922:5670`.

---

## Referências

- Figma: [accordion](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7922-5670&t=6YcsJh8Vlh5q99fR-4) · fileKey `ZUEzW52KbL0DN9aKGSqwAs`
- Tokens gerais: `design.md` (§1 arquitetura · §3 primitivos `primary.light` / `primary.action` · §4 semânticos `text.on-dark`, `text.brand-strong`)
- Template de spec: `specs/component-spec/template.md`
