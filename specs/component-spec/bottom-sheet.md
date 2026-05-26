# Bottom Sheet — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7555-12998](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7555-12998&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 19 de abril de 2026  

---

## Visão geral

**Painel modal inferior** largura mobile (**375**), com **handle** superior, **área de conteúdo** por tipo de fluxo e **footer** com barra decorativa. Suporta **ícone de fechar** opcional, **scrollbar** opcional (lista de benefícios) e **`Slot`** para composição. Variantes de conteúdo: **Simple** (mensagem + CTA + link), **Form** (título, texto, inputs, botões), **Benefits list** (lista rolável de cartões) e **Radio options** (título, texto e duas linhas `Card-options`).

---

## Anatomia

| # | Elemento | Tipo RN | Figma | Descrição |
|---|----------|---------|-------|-----------|
| 1 | Shell | `View` / `Modal` | `Type=*` | Fundo do sheet; cantos superiores arredondados |
| 2 | Header mixin | `View` | `↪️ Mixins/Header` | Faixa **40** px; handle (`tab`) centralizado |
| 3 | Handle | `View` | `tab` | Barra **4×44** px |
| 4 | Content | `View` | `Content` | Bloco principal; gaps variam por `Type` |
| 5 | Slot | composição | `Slot` | Troca de conteúdo conforme contrato Figma |
| 6 | Footer mixin | `View` | `↪️ Mixins/Footer` | Altura **24** px + arte da barra inferior |
| 7 | Close | `Pressable` | `Close button` | **24×24**; posição absoluta canto superior direito |
| 8 | Inputs / cards / botões | componentes DS | nós internos | Ver subsecções por `Type` |

---

## Variantes e propriedades

| Propriedade (Figma) | Tipo | Valores | Default |
|---------------------|------|---------|---------|
| `Type` | VARIANT | `Simple` · `Form` · `Benefits list` · `Radio options` | `Simple` |
| `Show icon` | BOOLEAN | `true` · `false` | `true` |
| `Show Scrollbar` | BOOLEAN | `true` · `false` | `false` |
| `Slot` | SLOT | *(componentes preferidos no Figma)* | — |

**Dimensões publicadas (altura × largura):**

| `Type` | Largura | Altura (frame) |
|--------|---------|----------------|
| Simple | 375 | 384 |
| Form | 375 | 480 |
| Benefits list | 375 | 526 |
| Radio options | 375 | 382 |

---

## Tokens comuns (todos os `Type`)

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Shell | `backgroundColor` | `component.bottom-sheet.surface.shell` | `color.surface.card` | `color.ambient.base.light` | **#FAFAFA** |
| Shell | `borderTopLeftRadius` / `borderTopRightRadius` | `border.radius.sm` (Design System Tokens) | — | — | **16** px |
| Shell | `paddingHorizontal` | `spacing` token `lg` | — | — | **24** px |
| Divisor header | `borderColor` | `component.bottom-sheet.divider` | `color.border.default` | `color.ambient.grayscales.20` | **#E6E6E6** |
| Handle | `backgroundColor` | `component.bottom-sheet.chrome.tab` | `color.border.default` | `color.ambient.grayscales.20` | **#E6E6E6** |
| Título (onde existir) | `color` | `component.bottom-sheet.text.title` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |
| Corpo | `color` | `component.bottom-sheet.text.body` | `color.text.helper` | `color.ambient.grayscales.80` | **#4D4D4D** |
| Ícone primário (Simple / star / etc.) | `color` | `component.bottom-sheet.icon.primary` | `color.icon.brand` | `color.function.primary.default` | **#4274D6** |
| Ícone ação (Benefits star) | `color` / `borderColor` | `component.bottom-sheet.icon.action` | `color.icon.brand-strong` | `color.function.primary.action` | **#1B3C7E** |
| Fechar | `color` | `component.bottom-sheet.icon.close` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |

---

## Type: Simple

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Content `gap` | `gap` | token `sm` (Design System Tokens) | — | — | **16** px |
| Botão primário | `backgroundColor` | `component.button.primary.bg.default` | `color.interactive.primary.default` | `color.function.primary.default` | **#4274D6** |
| Label primário | `color` | `component.button.primary.label.default` | `color.interactive.primary.text` | `color.ambient.base.deep-light` | **#FFFFFF** |
| Link | `color` | `component.link.primary.text.default` | `color.text.brand-strong` | `color.function.primary.action` | **#1B3C7E** |
| Decoração loading (elipse) | `backgroundColor` | `component.bottom-sheet.decoration.on-primary` | `color.surface.default` | `color.ambient.base.deep-light` | **#FFFFFF** |

---

## Type: Form

| Área | Destaque de tokens (além dos comuns) |
|------|--------------------------------------|
| Layout raiz | `itemSpacing` **40** (`2xl` Design System Tokens); `Content` interno `gap` **24** (`lg`) |
| Título / descrição | Mesmos tokens `component.bottom-sheet.text.title` / `body` |
| **Input** (instância) | `component.input.label.default` → `color.text.secondary` → `color.ambient.grayscales.70` (**#666666**); campo: `component.input.bg.default`, `component.input.border.default`, `component.input.border-width` → `border.stroke.stroke-thin` (**1**); `component.input.radius` → `border.radius.xs` (**4**); placeholder `component.input.placeholder.default` → `color.text.tertiary` → grayscales.50 (**#999999**); helper `component.input.helper.default` |
| Ícones auxiliares no formulário | `component.bottom-sheet.form.icon.success`, `form.icon.muted`, `form.icon.secondary`, `icon.muted` (conforme layer) |
| Botões inferiores | Secundário: `component.button.secondary.border.default`, `component.button.secondary.label.default`; Primário: mesmos tokens do Type Simple |

> **Observação:** alguns nós de texto opcional no Form usam `textRangeFills` ligados a variáveis da coleção **Design System Tokens** (`Color/Function/Primary/Default`, `Color/Ambient/Grayscales/70`) — tratar como texto de **link/optional** e resolver via tema, mantendo a cadeia publicada no arquivo.

---

## Type: Benefits list

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Raiz `gap` | `gap` | token `xl` | — | — | **32** px |
| Cartão benefício | `backgroundColor` | `component.bottom-sheet.surface.muted` | `color.surface.subtle` | `color.ambient.grayscales.10` | **#F2F2F2** |
| Título da lista | `color` | `component.bottom-sheet.text.list-title` | `color.text.strong` | `Color/Ambient/Neutral/90` (Design System Tokens) | *(resolver no tema)* |
| Descrição | `color` | `component.bottom-sheet.text.description` | `color.text.default` | `color.ambient.grayscales.90` | **#333333** |
| Caption / validade | `color` | `component.bottom-sheet.text.caption` | `color.text.secondary` | `color.ambient.grayscales.70` | **#666666** |
| Scrollbar (quando visível) | `borderColor` / thumb | `component.bottom-sheet.scrollbar.surface`, `...thumb`, `...label` | ver bindings no arquivo | — | implementar conforme tokens |

---

## Type: Radio options

- Reutiliza **título** e **corpo** com os tokens comuns de texto do Bottom Sheet.
- Lista de opções: **duas instâncias** de **`Card-options`** — seguir integralmente **`specs/component-spec/card-options.md`** e **`radio-icon.md`** para o controle interno.
- Espaçamentos verticais entre blocos principais alinhados ao **Form** (`2xl` entre seções, `lg` no miolo de conteúdo) nos bindings inspecionados.

---

## Tipografia

| Contexto | Estilo Figma (referência) | Font | Size | Weight | Line height |
|----------|---------------------------|------|------|--------|--------------|
| Título | `Mobile/Heading/Heading 5` | Be Vietnam Pro Bold | 18 | 700 | 24 (tracking -1%) |
| Corpo | `Mobile/BodyText/Body Medium` | Be Vietnam Pro Regular | 14 | 400 | 16 |
| Botões | `Mobile/Button/Button Medium` | Be Vietnam Pro Bold | 14 | 700 | 24 |
| Link (Simple) | `Mobile/Link/Link Small` | Be Vietnam Pro Regular | 14 | 400 | 16 |
| Inputs (Form) | `Mobile/Input/Input Medium` etc. | conforme componente Input | — | — | — |

---

## Espaçamento e dimensões

| Propriedade | Token / origem | Valor típico |
|-------------|----------------|--------------|
| Largura | layout | **375** |
| Padding horizontal shell | `lg` | **24** |
| Raio topo | `border.radius.sm` | **16** |
| Header altura | layout | **40** |
| Footer altura | layout | **24** |
| Handle | layout | **4×44** |
| `Show Scrollbar` | — | Trilho **10** px de largura quando aplicável |

---

## Variações por tema

Superfícies `color.surface.*`, textos ligados a `color.text.*`, ícones `color.icon.*` e primários **`color.function.primary.*`** mudam entre Neutral, Leblon, Red e Green. **Feedback** (success no Form) segue tokens de feedback.

---

## Acessibilidade

- [ ] `Modal` / `accessibilityViewIsModal` conforme padrão RN; foco preso dentro do sheet.
- [ ] Fechar: `accessibilityLabel` explícito (“Fechar”) + `accessibilityRole="button"`.
- [ ] Handle: não depender só do gesto — oferecer ação equivalente (botão fechar).
- [ ] Form: labels dos inputs associados aos campos; erros com `accessibilityLiveRegion`.
- [ ] Listas longas: `ScrollView` + anúncio de posição quando produto exigir.

---

## Restrições e regras

- Respeitar o **`Slot`** do Figma: substituir apenas por componentes aprovados na lista `preferredValues` do arquivo ou por composição equivalente em código.
- **Não** copiar o código React+Tailwind do `get_design_context` como contrato de token.
- Componentes filhos (`Button`, `Input`, `Card-options`, `Link`) devem obedecer às **próprias specs** de cada componente.

---

## Props da interface TypeScript

```typescript
type BottomSheetType = 'simple' | 'form' | 'benefits-list' | 'radio-options';

interface BottomSheetProps {
  type?: BottomSheetType;
  showIcon?: boolean;
  showScrollbar?: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  /** Conteúdo principal (substitui o Slot do Figma) */
  children?: React.ReactNode;
  /** Rodapé extra (botões custom) */
  footer?: React.ReactNode;
}
```

*(Mapear nomes de `Type` do Figma para camelCase no código, como na tabela.)*

---

## Exemplo de uso (React Native)

```tsx
import { BottomSheet } from '@allos/design-system';

<BottomSheet
  type="simple"
  showIcon
  title="Title goes here"
  description="Lorem ipsum…"
  onClose={() => {}}
/>

<BottomSheet type="radio-options" showIcon title="Reenviar código" description="Selecione…">
  {/* CardOptions x2 */}
</BottomSheet>
```

---

## Checklist de implementação

- [ ] Shell, handle, tipografia e ícones apenas com tokens do tema
- [ ] Quatro `Type` com gaps e alturas conferidos com o Figma
- [ ] `Show icon` / `Show Scrollbar` condicionam nós reais
- [ ] Form: inputs e botões com specs próprias + tokens listados
- [ ] Radio options: delegar a **`card-options`**
- [ ] Cruzar com `references/design.md` quando existir (**arquivo ausente** no workspace na data desta spec)
