# Card Options — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7555-13212](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7555-13212&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 19 de abril de 2026  

---

## Visão geral

**Cartão selecionável** em linha: ícone leading (instância de ilustração), **título** e **subtítulo** empilhados, e **Radio-icon** à direita. Usado em fluxos de escolha (ex.: canal de envio de código). A seleção altera **borda do container** e o estado visual do **Radio-icon** embutido.

---

## Anatomia

| # | Elemento | Tipo RN | Figma | Descrição |
|---|----------|---------|-------|-----------|
| 1 | Root | `View` | `State=*` | Coluna vertical; `itemSpacing` **24** (`spacing.padding.positive.lg`) |
| 2 | Container | `Pressable` / `View` | `Contact method container` | Auto-layout horizontal; cantos **4** (`border.radius.xs`) |
| 3 | Leading icon | `View` + SVG | `Icon` (instance) | **24×24**; fill do boolean `union` |
| 4 | Text stack | `View` | `Contact details container` | Coluna; `gap` **4** (`spacing.padding.positive.3xs`) |
| 5 | Title | `Text` | `Contact method` | Bold 14 / lh 20 |
| 6 | Subtitle | `Text` | `Contact information` | Regular 12 / lh 16 |
| 7 | Radio | `RadioIcon` / instance | `Radio-icon` | **24×24**; estado espelha `State` do card |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `State` | `Default` · `Selected` | `Selected` (no arquivo) |

**Conteúdo:** título, subtítulo e ícone são **conteúdo de exemplo** no Figma — substituir por props no RN.

---

## Tokens por estado

### State: Default (não selecionado)

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Container | `backgroundColor` | `component.card-options.container.bg` | `color.surface.default` | `color.ambient.base.deep-light` | **#FFFFFF** |
| Container | `borderColor` | `component.card-options.container.border.default` | `color.border.default` | `color.ambient.grayscales.20` | **#E6E6E6** |
| Leading icon | `color` (fill) | `component.card-options.icon.leading` | `color.icon.brand` | `color.function.primary.default` | **#4274D6** |
| Title | `color` | `component.card-options.title` | `color.text.default` | `color.ambient.grayscales.90` | **#333333** |
| Subtitle | `color` | `component.card-options.subtitle` | `color.text.supporting` | `color.ambient.grayscales.60` | **#808080** |
| Radio (interno) | *(ver spec `radio-icon` — estado Default)* | `component.radio-icon.border.default` | … | … | … |

### State: Selected

| Elemento | Propriedade RN | Component token | Diferença vs Default |
|----------|----------------|-----------------|----------------------|
| Container | `borderColor` | `component.card-options.container.border.selected` | → `color.border.hover` → `color.function.primary.action` → **#1B3C7E** |
| Radio (interno) | *(estado Checked do Radio-icon)* | `component.radio-icon.indicator.selected` | Miolo + anel selecionados |

**Igual entre estados:** `padding` / `gap` do container (**16** = `spacing.padding.positive.sm`), `borderRadius` **4** (`border.radius.xs`), tokens de título/subtítulo/ícone leading conforme tabela Default (não mudam com seleção no binding inspecionado).

---

## Tipografia

| Elemento | Font Family | Size | Weight | Line height | Neutral |
|----------|-------------|------|--------|-------------|---------|
| Title | Be Vietnam Pro · **Bold** | 14 | 700 | 20 | Figma: `Mobile/BodyText/Body Medium Bold` |
| Subtitle | Be Vietnam Pro · Regular | 12 | 400 | 16 | `Mobile/BodyText/Body Small` |

---

## Espaçamento e dimensões

| Propriedade | Token | Valor | Fonte |
|-------------|-------|-------|--------|
| Largura do exemplo | — | **327** px | Layout publicado |
| Root `gap` | `spacing.padding.positive.lg` | **24** px | `boundVariables` |
| Container `padding` | `spacing.padding.positive.sm` | **16** px | idem |
| Container `gap` (horizontal) | `spacing.padding.positive.sm` | **16** px | idem |
| Stack título/subtítulo `gap` | `spacing.padding.positive.3xs` | **4** px | idem |
| `borderWidth` (container) | — | **1** px | Layout (sem variável dedicada no stroke do frame) |
| Ícone / Radio | — | **24×24** | Layout |

**Grid 4 px:** 4, 16, 24, 327 (327 ≈ layout de exemplo; largura final pode ser `100%` do pai).

---

## Variações por tema

`color.function.primary.*`, `color.border.hover`, `color.text.*` e ícones de marca variam por tema. Bordas de feedback universal (se adicionadas no futuro) seguem tokens de feedback.

---

## Acessibilidade

- [ ] Container tocável: `accessibilityRole="radio"` ou integração em `RadioGroup`.
- [ ] `accessibilityState={{ selected: state === 'selected' }}`.
- [ ] Anunciar título + subtítulo como **um** rótulo composto quando fizer sentido (`accessibilityLabel`).
- [ ] Contraste: título **#333** e subtítulo **#808080** sobre branco — validar WCAG para corpo 12 px (subtítulo pode ser texto secundário).

---

## Restrições e regras

- O **Radio-icon** embutido deve seguir a spec **`radio-icon.md`**; não duplicar valores hardcoded.
- Não usar primitivos diretos no app — sempre component / semântico via tema.

---

## Props da interface TypeScript

```typescript
interface CardOptionsProps {
  state?: 'default' | 'selected';
  title: string;
  subtitle: string;
  /** Ícone leading (ex.: ilustração DS) */
  leadingIcon?: React.ReactNode;
  onPress?: () => void;
  testID?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { CardOptions } from '@allos/design-system';

<CardOptions
  state="selected"
  title="SMS"
  subtitle="(21) *****-4734"
  leadingIcon={<PhoneOutlineIcon />}
/>

<CardOptions
  state="default"
  title="E-MAIL"
  subtitle="*******@gmail.com"
  leadingIcon={<PhoneOutlineIcon />}
/>
```

---

## Checklist de implementação

- [ ] Tokens de container, texto e ícone via `useTheme()`
- [ ] `State` espelha borda + delegação correta ao `RadioIcon`
- [ ] Auto-layout: row 16 padding, gap 16 entre colunas
- [ ] Tipografia Be Vietnam Pro conforme tabela
- [ ] Cruzar com `references/design.md` quando disponível (**arquivo ausente** no workspace na data desta spec)
