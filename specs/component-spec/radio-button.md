# Radio-button — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/02---Tokens---React-Native?node-id=8041-6995](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/02---Tokens---React-Native?node-id=8041-6995&t=8MgQ2g6pNJJ5qfGl-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 26 de maio de 2026  

---

## Visão geral

**Item de lista com rádio + label + divisor**, usado em grupos onde o usuário escolhe **uma única opção** (formulários, bottom sheets tipo “Radio options”, listas de configuração). Cada linha tem **344×57 px**, ícone **Radio-icon** (24×24) embutido e texto principal **“Type something”** (placeholder de design). O conjunto publicado cobre **8 estados visuais** × **2 posições do ícone** (esquerda/direita) com **Microcopy=Off** (camadas auxiliares de microcopy/link/erro existem no arquivo mas estão ocultas).

Em React Native, tratar como **`Pressable`** na linha inteira com `accessibilityRole="radio"`; compor o círculo via subcomponente **[Radio-icon](./radio-icon.md)** (`7555:13248`), não redesenhar o anel localmente.

---

## Anatomia

| # | Elemento | Tipo RN | Figma layer | Descrição |
|---|----------|---------|-------------|-----------|
| 1 | Root | `Pressable` / `View` | `Variable=*` (variant root) | Coluna vertical; padding superior e laterais; opcional **focus ring** no wrapper |
| 2 | Frame conteúdo | `View` | `Frame-Radio-button` | Agrupa linha do rádio; em foco ganha `paddingLeft` extra |
| 3 | Linha label | `View` | `Radio-button-label` | Row: ícone + texto (ordem conforme `Option side`) |
| 4 | Ícone | `RadioIcon` | `Radio-icon` (INSTANCE) | Instância do **Radio-icon**; variante interna conforme estado |
| 5 | Label | `Text` | `Type something` | Texto da opção (Body Medium 14/16) |
| 6 | Divisor | `View` | `$divider` → `Shape-line` | Linha horizontal 1 px abaixo da linha |
| 7 | Auxiliar *(oculto)* | `View` | `auxiliary-labels` | Microcopy, link opcional, ícones de feedback — `visible: false` nas variantes atuais |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `Variable` (VARIANT) | `Default` · `Hover` · `Checked` · `Error` · `Disabled` · `Disabled-checked` · `Focused` · `Focus-selected` | `Default` |
| `Microcopy` (VARIANT) | `Off` *(único valor publicado)* | `Off` |
| `Option side` (VARIANT) | `Left` · `Right` | `Left` |

**Espelhamento Left / Right:** tokens de cor e espaçamento são **idênticos**; apenas a ordem flex (`Radio-icon` antes ou depois do `Text`) muda. Implementar uma prop `optionSide` sem duplicar tabelas de token.

---

## Tokens por variante e estado

Nomes em **dot notation** no código (`component.radio-button.label.default`); no Figma: `component/radio-button/label/default`. Cadeias e hex **NeutralTheme** extraídos via Plugin API (`boundVariables` + resolução de alias, maio/2026).

### Variable: Default

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Label | `color` | `component.radio-button.label.default` | `color.text.helper` | `color.ambient.grayscales.80` | **#4D4D4D** |
| Divisor | `backgroundColor` | `component.radio-button.divider` | `color.border.default` | `color.ambient.grayscales.20` | **#E6E6E6** |
| Ícone (anel) | `borderColor` | `component.radio-icon.border.default` | `color.border.input-disabled` | `color.ambient.grayscales.30` | **#CCCCCC** |
| Root | `paddingTop` | `Spacing/sm` (DST remoto) | — | — | **16px** |
| Root | `paddingHorizontal` | `BaseTokens/Spacing/Positive/3xs` | — | — | **4px** |
| Root | `gap` (coluna) | `Spacing/sm` | — | — | **16px** |
| Row | `gap` | `Spacing/2xs` | — | — | **8px** |
| Ícone | `width` / `height` | — | — | — | **24px** |

### Variable: Hover *(web only — ignorar hover de pointer em RN)*

| Elemento | Propriedade RN | Component token | Diferença vs Default |
|----------|----------------|-----------------|----------------------|
| Label | `color` | `component.radio-button.label.hover` | → `color.text.brand-strong` → `color.function.primary.action` → **#1B3C7E** (Neutral) |
| Ícone (anel) | `borderColor` | `component.radio-icon.border.hover` | → `color.border.hover` → **#1B3C7E** |
| Row | `gap` | `BaseTokens/Spacing/Positive/2xs` | **8px** (mesmo valor, token DST alternativo) |

### Variable: Checked

| Elemento | Propriedade RN | Component token | Diferença vs Default |
|----------|----------------|-----------------|----------------------|
| Label | `color` | `component.radio-button.label.checked` | → `color.text.brand-strong` → **#1B3C7E** |
| Ícone (miolo) | `backgroundColor` | `component.radio-icon.indicator.selected` | → `color.icon.brand-strong` → **#1B3C7E** |
| Ícone (detalhe claro) | `color` | `component.radio-icon.bg.canvas` | → `color.surface.default` → **#FFFFFF** |

### Variable: Error

| Elemento | Propriedade RN | Component token | Diferença vs Default |
|----------|----------------|-----------------|----------------------|
| Label | `color` | `component.radio-button.label.error` | → `color.text.error` → `color.feedback.error.default` → **#DF2020** (universal entre temas) |
| Ícone (anel) | `borderColor` | `component.radio-icon.border.error` | → `color.border.error` → **#DF2020** |

### Variable: Disabled

| Elemento | Propriedade RN | Component token | Diferença vs Default |
|----------|----------------|-----------------|----------------------|
| Label | `color` | `component.radio-button.label.disabled` | → `color.text.tertiary` → `color.ambient.grayscales.50` → **#999999** |
| Ícone (track) | `backgroundColor` | `component.radio-icon.fill.disabled-track` | → `color.surface.placeholder` → **#E6E6E6** |
| Ícone (anel) | `borderColor` | `component.radio-icon.border.disabled` | → `color.border.input` → **#999999** |
| Interação | `disabled` | — | Bloquear `onPress`; `accessibilityState.disabled` |

### Variable: Disabled-checked

| Elemento | Propriedade RN | Component token | Diferença vs Default |
|----------|----------------|-----------------|----------------------|
| Label | `color` | `component.radio-button.label.disabled-checked` | → `color.text.disabled` → `color.ambient.grayscales.30` → **#CCCCCC** |
| Ícone (vetores) | `color` | `component.radio-icon.disabled-checked.mid` / `.outer` | Tons médios desaturados (ver [radio-icon.md](./radio-icon.md)) |
| Ícone (track) | `backgroundColor` | `component.radio-icon.fill.disabled-track` | **#E6E6E6** |

### Variable: Focused

| Elemento | Propriedade RN | Component token | Diferença vs Default |
|----------|----------------|-----------------|----------------------|
| Wrapper root | `borderColor` | `component.radio-button.focus-ring.border` | → `color.border.focus-secondary` → `color.function.secondary.active` → **#94CAD1** |
| Wrapper root | `borderWidth` | — | **2px** (`strokeWeight` inspecionado) |
| Wrapper root | `borderRadius` | `Border/Radius/xs` (DST) | **4px** (Neutral/Leblon/Red/Green conforme tema) |
| Frame conteúdo | `paddingLeft` | `BaseTokens/Spacing/Positive/3xs` | **4px** extra no frame interno |
| Label | `color` | `component.radio-button.label.focus` | → `color.text.brand-strong` → **#1B3C7E** |
| Ícone (anel) | `borderColor` | `component.radio-icon.border.hover` | **#1B3C7E** *(override na instância; anel vazio em foco)* |

### Variable: Focus-selected

| Elemento | Propriedade RN | Component token | Diferença vs Focused |
|----------|----------------|-----------------|----------------------|
| Label | `color` | `component.radio-button.label.focus-selected` | Mesma cadeia que `label.focus` → **#1B3C7E** |
| Ícone | estado visual | `Checked` + focus wrapper | Miolo `component.radio-icon.indicator.selected`; vetores com `bg.canvas` |
| Wrapper root | *(igual Focused)* | `component.radio-button.focus-ring.border` | Borda **#94CAD1**, radius **4px**, stroke **2px** |

**Divisor:** inalterado em todos os estados — `component.radio-button.divider` → **#E6E6E6**.

### Camadas auxiliares *(Microcopy=Off — referência para evolução)*

| Elemento | Component token | → Semântico | Uso |
|----------|-----------------|-------------|-----|
| Microcopy | `component.radio-button.microcopy.default` | `color.text.tertiary` | Texto auxiliar abaixo |
| Link opcional | `component.radio-button.link.optional` | `color.text.brand` | `Optional-Link-4` |
| Ícone erro | `component.radio-button.feedback.error-icon` | `color.text.error` | Vetor em `Icon` |
| Texto erro | `component.radio-button.feedback.error-text` | `color.text.error` | Mensagem de validação |
| Ícone sucesso | `component.radio-button.feedback.success-icon` | `color.text.success` | `checkbox-circle-line` |

---

## Tipografia

| Elemento | Font family | Size | Weight | Line height | Token tipografia | Valor Figma |
|----------|-------------|------|--------|-------------|------------------|-------------|
| Label | Be Vietnam Pro | 14px | 400 (Regular) | 16px | Mobile/BodyText/Body Medium | `fontSize: 14`, `lineHeight: 16` |

> Letter spacing: **0%** (valor numérico 0 no node).

---

## Espaçamento e dimensões

| Propriedade | Token (Figma) | Valor | Fonte |
|-------------|---------------|-------|--------|
| Largura da linha | — | **344px** | Variant width |
| Altura da linha | — | **57px** | Variant height |
| `paddingTop` (root) | `Spacing/sm` | **16px** | boundVariables |
| `paddingLeft` / `paddingRight` (root) | `BaseTokens/Spacing/Positive/3xs` | **4px** | boundVariables |
| `paddingBottom` (root) | `Spacing/Padding/Positive/None` | **0px** | boundVariables |
| Gap coluna (label ↔ divisor) | `Spacing/sm` | **16px** | boundVariables |
| Gap row (ícone ↔ label) | `Spacing/2xs` ou `BaseTokens/Spacing/Positive/2xs` | **8px** | boundVariables |
| Altura do divisor | — | **1px** | `Shape-line` |
| Tamanho do ícone | — | **24×24** | INSTANCE `Radio-icon` |
| Focus wrapper radius | `Border/Radius/xs` | **4px** (Neutral) | Focused / Focus-selected |
| Focus wrapper stroke | — | **2px** | `strokeWeight` root |

Todos os valores de spacing estão no grid de **4px**.

---

## Variações por tema

Documentar apenas tokens que **mudam** entre temas (feedback/error e grayscales universais omitidos quando iguais).

| Token / papel | NeutralTheme | LeblonTheme | RedTheme | GreenTheme |
|---------------|--------------|-------------|----------|------------|
| Label hover / checked / focus / focus-selected (`color.function.primary.action`) | **#1B3C7E** | **#734E26** | **#590D18** | **#265937** |
| Focus ring (`color.function.secondary.active`) | **#94CAD1** | **#9FC6B2** | **#CEAB97** | **#8CD9D2** |
| `border.radius.xs` | 4px | 2px | 4px | 4px |

`color.feedback.error.default` (**#DF2020**) e escala `grayscales.*` usada em default/disabled/divider permanecem **iguais** nos quatro temas.

---

## Acessibilidade

- [ ] **`accessibilityRole="radio"`** no item; agrupar com `RadioGroup` / mesmo `accessibilityLabel` do label visível.
- [ ] **`accessibilityState`:** `{ checked: true }` em Checked / Focus-selected / Disabled-checked; `{ disabled: true }` em Disabled / Disabled-checked; `{ selected: false }` nos demais.
- [ ] **Touch target:** altura publicada **57px** ≥ 44pt — adequado; se usar só o ícone 24px isolado, expandir área de toque.
- [ ] **Contraste label default:** `#4D4D4D` sobre branco ≈ **7.9:1** — passa WCAG AA.
- [ ] **Contraste label disabled:** `#999999` sobre branco ≈ **2.85:1** — pode falhar AA para texto; aceitável apenas para estado disabled (não essencial).
- [ ] **Contraste focus ring:** `#94CAD1` sobre branco ≈ **2.1:1** — uso como contorno de foco (não texto); validar visibilidade em fundos não brancos.
- [ ] **Erro:** label `#DF2020` sobre branco ≈ **4.6:1** — passa AA para texto normal.

---

## Restrições e regras

- **Hover (`Variable=Hover`):** existe para web — em RN, não mapear para `hover` de mouse; opcionalmente usar como feedback de `pressed` se produto alinhar.
- **Nunca** usar tokens primitivos nem hex hardcoded no app — sempre `useTheme()` com cadeia **Component → Semântico → Primitivo**.
- **Radio-icon:** importar o subcomponente documentado; estados `Focused` / `Focus-selected` no item podem exigir **override** de variante da instância (`Variables=Focused`, etc.) conforme Figma.
- **Microcopy=On:** não publicado neste `COMPONENT_SET`; ao habilitar no Figma, revalidar tokens auxiliares da tabela acima.
- Spacing/radius via biblioteca remota **Design System Tokens** é aceitável (não entra na cadeia de 3 camadas de **cor**).

---

## Props da interface TypeScript

```typescript
type RadioButtonVisualState =
  | 'default'
  | 'hover'       // web; ignorar em RN salvo pressed explícito
  | 'checked'
  | 'error'
  | 'disabled'
  | 'disabled-checked'
  | 'focused'
  | 'focus-selected';

type RadioButtonOptionSide = 'left' | 'right';

interface RadioButtonProps {
  /** Alinhado à propriedade VARIANT `Variable` do Figma */
  state?: RadioButtonVisualState;
  /** Alinhado a `Option side` */
  optionSide?: RadioButtonOptionSide;
  /** Texto da opção (substitui "Type something") */
  label: string;
  /** Selecionado no grupo */
  selected?: boolean;
  disabled?: boolean;
  error?: boolean;
  /** Exibir divisor inferior (default: true no layout de lista) */
  showDivider?: boolean;
  onPress?: () => void;
  testID?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { RadioButton, RadioGroup } from '@allos/design-system';

<RadioGroup value={channel} onChange={setChannel}>
  <RadioButton
    label="E-mail"
    optionSide="left"
    selected={channel === 'email'}
    onPress={() => setChannel('email')}
  />
  <RadioButton
    label="SMS"
    optionSide="left"
    selected={channel === 'sms'}
    onPress={() => setChannel('sms')}
  />
</RadioGroup>

<RadioButton
  label="Opção indisponível"
  state="disabled"
  disabled
  optionSide="right"
/>

<RadioButton
  label="Campo obrigatório"
  state="error"
  error
  label="Selecione uma opção"
/>
```

---

## Checklist de implementação

- [ ] Tokens de cor via `useTheme()` — cadeia Component → Semântico → Primitivo validada no Figma (`8041:6995`)
- [ ] Compor **Radio-icon** com estado espelhado (`default`, `checked`, `disabled`, etc.)
- [ ] Suportar `optionSide` `left` | `right` sem alterar tokens
- [ ] Focused / Focus-selected: wrapper com `borderWidth: 2`, `borderRadius` do tema, cor `component.radio-button.focus-ring.border`
- [ ] Divisor 1 px com `component.radio-button.divider`
- [ ] Tipografia Be Vietnam Pro 14/400/16 no label
- [ ] Ignorar `Hover` para web em builds RN
- [ ] Funcionar nos 4 temas via `ThemeContext`
- [ ] Testes VoiceOver / TalkBack no grupo de rádio
- [ ] Cruzar com `design.md` §5.25 (Radio-button) e §5.24 (Radio-icon) — **sem divergências** na data desta spec

---

## Validação cruzada (design.md)

| Item | Status |
|------|--------|
| Tokens `component.radio-button.*` documentados em `design.md` §5.25 | OK |
| Subcomponente `component.radio-icon.*` §5.24 | OK |
| Semântico novo `color.border.focus-secondary` §4.3 | OK |
| Cores remotas `Design System Tokens` no componente | **0** (auditoria maio/2026) |
