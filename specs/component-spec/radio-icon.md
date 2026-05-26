# Radio Icon — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7555-13248](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7555-13248&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 19 de abril de 2026  

---

## Visão geral

**Ícone de controle circular 24×24** usado sozinho ou dentro de linhas (ex.: `Card-options`, grupos de opção). Cobre estados **não selecionado**, **hover (web)**, **selecionado**, **desabilitado**, **desabilitado selecionado**, **erro**, **indeterminado**, **foco** e **foco + selecionado**. Em React Native, **não implementar hover**; use press/focus nativos.

---

## Anatomia

| # | Elemento | Tipo RN | Figma (referência) | Descrição |
|---|----------|---------|--------------------|-----------|
| 1 | Root | `View` | `Variables=*` | Área 24×24; cantos do componente amarrados a token “None” (0) |
| 2 | Fundo / canvas | `View` | `Rectangle 26` / fills do root | Superfície branca onde aplicável |
| 3 | Anel externo (foco) | `View` | `Rectangle 30` (Focused) | **strokeWeight 2**; só em estados com anel de foco |
| 4 | Track / anel interno | `View` | `Rectangle 27` / `Rectangle 31` | Círculo **20×20** centrado; borda **2** ou preenchimento conforme estado |
| 5 | Indicador / traço | `View` / SVG | `Vector`, `check-line` | Marca de seleção ou traço do indeterminado |
| 6 | Ícone indeterminado | `View` (instance `subtract-line`) | `subtract-line` | Traço central com fill dedicado |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `Variables` (VARIANT) | `Default` · `Hover` · `Checked` · `Disabled` · `Disabled-checked` · `Error` · `Indeterminate` · `Focused` · `Focus-selected` | `Default` |

---

## Tokens por estado

Nomes em **dot notation** (Figma: `component/...` com `/`). **Valores hex (Neutral)** derivados da resolução em modo **Neutral** via Plugin API (`boundVariables` + cadeia de alias).

### Default

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Root / canvas | `backgroundColor` | `component.radio-icon.bg.canvas` | `color.surface.default` | `color.ambient.base.deep-light` | **#FFFFFF** |
| Track (anel) | `borderColor` | `component.radio-icon.border.default` | `color.border.input-disabled` | `color.ambient.grayscales.30` | **#CCCCCC** |
| Track | `borderWidth` | — | — | — | **2** (layout; sem variável de espessura nos nós inspecionados) |
| Cantos | `borderRadius` | `border.radius.round` (Design System Tokens) | — | — | **999** (círculo) |

> **Nota de nomenclatura:** o token de borda **default** aponta semanticamente para `color.border.input-disabled` — é o binding real no arquivo; não alterar na implementação sem alinhar o DS.

### Hover *(web only — ignorar em RN salvo equivalência de pressed)*

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Track | `borderColor` | `component.radio-icon.border.hover` | `color.border.hover` | `color.function.primary.action` | **#1B3C7E** |

### Checked

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Disco interno | `backgroundColor` | `component.radio-icon.indicator.selected` | `color.icon.brand-strong` | `color.function.primary.action` | **#1B3C7E** |
| Vetores / check | `color` / fill | `component.radio-icon.indicator.selected` | *(mesma cadeia)* | *(mesma cadeia)* | **#1B3C7E** |
| Check (máscara clara) | `color` | `component.radio-icon.bg.canvas` | `color.surface.default` | `color.ambient.base.deep-light` | **#FFFFFF** |

### Disabled

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Track preenchido | `backgroundColor` | `component.radio-icon.fill.disabled-track` | `color.surface.placeholder` | `Color/Ambient/Grayscales/20` (lib) | **#E6E6E6** |
| Anel | `borderColor` | `component.radio-icon.border.disabled` | `color.border.input` | `color.ambient.grayscales.50` | **#999999** |

### Disabled-checked

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Track | `backgroundColor` | `component.radio-icon.fill.disabled-track` | `color.surface.placeholder` | `Color/Ambient/Grayscales/20` | **#E6E6E6** |
| Anel externo (vetor) | `color` | `component.radio-icon.disabled-checked.outer` | `color.border.input` | `color.ambient.grayscales.50` | **#999999** |
| Miolo | `color` | `component.radio-icon.disabled-checked.mid` | `color.border.strong` | `color.ambient.grayscales.40` | **#B3B3B3** |

### Error

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Track | `borderColor` | `component.radio-icon.border.error` | `color.border.error` | `color.feedback.error.default` | **#DF2020** |

### Indeterminate

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Fundo do círculo | `backgroundColor` | `component.radio-icon.indeterminate.track` | `color.surface.brand` | `color.function.primary.default` | **#4274D6** |
| Traço central | `color` | `component.radio-icon.indeterminate.icon` | `color.surface.subtle` | `color.ambient.grayscales.10` | **#F2F2F2** |

### Focused

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Anel externo | `borderColor` | `component.radio-icon.border.focus-ring` | `color.border.focus` | `color.function.primary.default` | **#4274D6** |
| Anel interno | `borderColor` | `component.radio-icon.border.default` | `color.border.input-disabled` | `color.ambient.grayscales.30` | **#CCCCCC** |

### Focus-selected

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Anel + miolo | `borderColor` / `backgroundColor` | `component.radio-icon.indicator.selected` | `color.icon.brand-strong` | `color.function.primary.action` | **#1B3C7E** |
| Detalhes do check | *(mesmo token de indicador)* | `component.radio-icon.indicator.selected` | *(mesma cadeia)* | *(mesma cadeia)* | **#1B3C7E** |

**Foco combinado:** reutilizar **`component.radio-icon.border.focus-ring`** no anel externo como no estado **Focused**, alinhado ao pixel com o frame publicado (24×24).

---

## Tipografia

Este componente **não contém texto** no Figma publicado.

---

## Espaçamento e dimensões

| Propriedade | Valor | Fonte |
|-------------|-------|--------|
| Tamanho total | **24×24** px | COMPONENT |
| Anel interno visual | **20×20** px | Layout (inset ~8,33%) |
| `borderRadius` | **999** (circular) | `Border/Radius/Round` |

---

## Variações por tema

Cores que passam por `color.function.primary.*`, `color.feedback.*` e `color.ambient.grayscales.*` variam por tema. Implementar via `useTheme()` / tokens resolvidos.

---

## Acessibilidade

- [ ] Em conjunto com label: `accessibilityRole="radio"` no conjunto; ícone com `accessible={false}` se redundante.
- [ ] Estados **Disabled** / **Disabled-checked**: `accessibilityState={{ disabled: true }}`.
- [ ] **Indeterminado:** `accessibilityState={{ checked: 'mixed' }}` quando aplicável.
- [ ] Área tocável: garantir **≥ 44×44 pt** no hit target da linha inteira (o ícone sozinho é 24 px — expandir `Pressable` se necessário).
- [ ] Contraste: anel **default** (#CCC) sobre branco pode ficar abaixo de 3:1 para UI fina — aceitável apenas como contorno de controle; validar com design em fundos não brancos.

---

## Restrições e regras

- **Hover** é referência web; em RN não mapear para hover de pointer.
- Não copiar classes Tailwind do `get_design_context` como fonte de token.
- Preferir **subcomponente único** parametrizado por estado em vez de nove cópias de layout no código.

---

## Props da interface TypeScript

```typescript
type RadioIconVisualState =
  | 'default'
  | 'hover'
  | 'checked'
  | 'disabled'
  | 'disabled-checked'
  | 'error'
  | 'indeterminate'
  | 'focused'
  | 'focus-selected';

interface RadioIconProps {
  /** Alinhado à propriedade VARIANT `Variables` do Figma */
  state?: RadioIconVisualState;
  testID?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { RadioIcon } from '@allos/design-system';

<RadioIcon state="default" />
<RadioIcon state="checked" />
<RadioIcon state="disabled-checked" />
```

---

## Checklist de implementação

- [ ] Cores apenas via tokens (`useTheme`) — cadeia Component → Semântico → Primitivo
- [ ] Estados espelhados 1:1 com o `COMPONENT_SET` do Figma
- [ ] RN: ignorar `Hover` para hover de mouse; mapear foco/teclado aos estados `Focused` / `Focus-selected`
- [ ] Stroke **2** nos anéis conforme layout
- [ ] Funciona nos quatro temas
- [ ] Cruzar com `references/design.md` quando o arquivo existir no repositório (**ausente no workspace** na data desta spec)
