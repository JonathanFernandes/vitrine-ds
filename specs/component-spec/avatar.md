# Avatar — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7518-11611](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7518-11611&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 19 de abril de 2026  

---

## Visão geral

**Avatar** com iniciais em círculo: superfície neutra clara, borda discreta e texto centralizado. Duas escalas de tamanho (`small` / `large`) com tipografia distinta. Na variante **small**, o Figma inclui uma **ilustração decorativa** interna (`frame-10892` + vetores); na **large**, apenas o círculo e as iniciais. Valores de cor vêm de **`boundVariables`** no arquivo de tokens (cadeia Component → Semantic → Primitive), conforme `design.md` seção **5.23 Avatar**.

---

## Anatomia

| # | Elemento | Tipo RN sugerido | Figma (layer) | Descrição |
|---|----------|------------------|---------------|-----------|
| 1 | Root | `View` | Variante `size=small` / `size=large` | **48×48** ou **64×64** px; sem auto-layout próprio (`layoutMode: NONE`) |
| 2 | Círculo (container) | `View` | `icon-container` | Auto-layout vertical; fundo + borda + raio pill; contém padding interno e filhos |
| 3 | Iniciais | `Text` | `icon-text` | Uma linha, centralizada |
| 4 | Decoração (só `small`) | `View` + subcamadas / vetores | `frame-10892`, `vector-490`, `vector-491-stroke`, `vector` | Ilustração interna; **ausente** na variante `large` |

---

## Variantes e propriedades

| Propriedade (Figma) | Tipo | Valores | Default |
|---------------------|------|---------|---------|
| `size` | VARIANT | `small` · `large` | `small` |

**Dimensões do `COMPONENT` (variante):**

| Variante | Largura × altura |
|----------|------------------|
| `size=small` | **48 × 48** px |
| `size=large` | **64 × 64** px |

---

## Tokens por variante e estado

Nomes em **dot notation** como no `design.md` (no Figma as variáveis usam `/` equivalentes).

### Círculo (`icon-container`) — ambas as variantes

| Propriedade RN | Component token | → Semântico | → Primitivo (Neutral) | Valor Neutral |
|-----------------|-----------------|-------------|------------------------|---------------|
| `backgroundColor` | `component.avatar.bg.default` | `color.surface.backdrop` | `color.ambient.neutral.10` | **#F0F2F4** |
| `borderColor` | `component.avatar.border.default` | `color.border.muted` | `color.ambient.neutral.30` | **#C4C9D4** |
| `borderWidth` | — | *(sem `boundVariable` no strokeWeight — **1** px no Figma)* | — | **1** px |
| `borderRadius` (pill) | — | *(via cantos)* | `border.radius.round` (Figma: `Border/Radius/Round`) | **999** px |

**Layout / tokens de sistema (Design System Tokens — espessura de layout):**

| Propriedade | Variável Figma | Mapeamento doc |
|-------------|----------------|----------------|
| `paddingTop` / `paddingBottom` / `paddingLeft` / `paddingRight` | `Spacing/Padding/Positive/2xs` | `spacing.padding.positive.2xs` (**8** px) |
| `gap` (eixo principal) | `Spacing/Padding/Positive/None` | `spacing.padding.positive.none` (**0** px) |
| `borderTopLeftRadius` … `borderBottomRightRadius` | `Border/Radius/Round` | `border.radius.round` |

### Iniciais (`icon-text`) — ambas as variantes

| Propriedade RN | Component token | → Semântico | → Primitivo (Neutral) | Valor Neutral |
|----------------|-----------------|-------------|------------------------|---------------|
| `color` | `component.avatar.label.default` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |

### Decoração interna — apenas `size=small`

| Elemento (Figma) | Propriedade RN | Component token | → Semântico | → Primitivo (Neutral) | Valor Neutral |
|------------------|----------------|-----------------|-------------|------------------------|---------------|
| `frame-10892` | `backgroundColor` | `component.avatar.inner.surface` | `color.surface.card` | `color.ambient.base.light` | **#FAFAFA** |
| `frame-10892` | `borderColor` | `component.avatar.inner.border` | `color.border.muted` | `color.ambient.neutral.30` | **#C4C9D4** |
| `vector-490` (×2) | `color` (fill) | `component.avatar.inner.shape-muted` | `color.border.strong` | `color.ambient.grayscales.40` | **#B3B3B3** |
| `vector-491-stroke` (×2) | `color` (fill) | `component.avatar.inner.shape-subtle` | `color.border.card` | `color.ambient.neutral.20` | **#E2E4E9** |
| `vector` (×2) | `color` (fill) | `component.avatar.inner.shape-secondary` | `color.icon.secondary` | `color.ambient.grayscales.70` | **#666666** |

### `size=large` — diferenças vs `small`

| Aspecto | Diferença |
|---------|-----------|
| Dimensão raiz / `icon-container` | **64×64** px em vez de 48×48 |
| Tipografia | Ver tabela abaixo (tamanho, peso, letter-spacing) |
| Decoração | **Não** renderizar `frame-10892` nem vetores internos |

---

## Tipografia

Estilos de texto **ligados no Figma** (referência; mapear para tokens de tipografia do DS no RN quando existirem variáveis globais equivalentes).

| Variante | Estilo Figma (referência) | Font Family | Size | Weight | Line height | Letter spacing |
|----------|---------------------------|-------------|------|--------|-------------|----------------|
| `size=small` | `Mobile/BodyText/Body Large Bold` | Be Vietnam Pro | **16** | **700** (Bold) | **24** px | **0** % |
| `size=large` | `Mobile/Heading/Heading 4` | Be Vietnam Pro | **20** | **600** (SemiBold) | **24** px | **-1** % |

---

## Espaçamento e dimensões

| Propriedade | Token (Figma / doc) | Valor | Fonte |
|-------------|---------------------|-------|--------|
| Tamanho componente `small` | — | **48 × 48** px | COMPONENT |
| Tamanho componente `large` | — | **64 × 64** px | COMPONENT |
| `icon-container` padding (todos os lados) | `spacing.padding.positive.2xs` | **8** px | `boundVariables` |
| `icon-container` gap | `spacing.padding.positive.none` | **0** px | `boundVariables` |
| Raio do círculo | `border.radius.round` | **999** px | `boundVariables` (pill) |
| `strokeWeight` borda do círculo | — | **1** px | Propriedade numérica no node (sem variável vinculada) |

**Grid 4 px:** 8, 16, 24, 48, 64 são múltiplos de 4.

---

## Variações por tema

Cores que passam por **`color.ambient.neutral.*`** e **`color.ambient.base.light`** **variam por modo** (Neutral, Leblon, Red, Green). Os hex da coluna “Valor Neutral” referem-se ao **NeutralTheme**. Resolver sempre via tema / variáveis, sem hex fixo no código de produto.

`color.text.primary` → `color.ambient.grayscales.100` coincide com **#1A1A1A** no Neutral; em outros temas seguir a tabela de primitivos do `design.md`.

---

## Acessibilidade

- [ ] Contraste iniciais (**#1A1A1A**) sobre fundo **#F0F2F4**: verificar ratio ≥ **4.5:1** para tamanhos de corpo; texto **20px** SemiBold pode ser tratado como “large text” (≥3:1) conforme guideline — validar com ferramenta.
- [ ] `accessibilityLabel`: quando mostrar só iniciais, expor nome completo da pessoa via `accessibilityLabel` (ex.: “Avatar de Maria Silva”) se o produto tiver o dado.
- [ ] `accessibilityRole`: `"image"` ou `"text"` conforme padrão do app; se o avatar for botão, usar `"button"` + label.
- [ ] Touch target: **48** e **64** px atendem ou excedem **44** pt na variante small em iOS.
- [ ] Variante **small** com ilustração: tratar vetores como **decorativos** (`accessible={false}`) se não forem informativos.

---

## Restrições e regras

- Não usar cores **primitivas** diretas no RN — usar **`component.avatar.*`** (ou semânticos expostos pelo tema) na cadeia documentada.
- O código gerado por `get_design_context` (Tailwind / web) é **apenas referência visual**, não fonte de tokens.
- Estados **hover** de tokens do DS aplicam-se a web; em RN, ignorar `*/hover` quando existirem em aliases futuros.
- A ilustração interna existe **somente** em `size=small` no Figma atual — não replicar esses layers na variante `large`.

---

## Props da interface TypeScript

```typescript
interface AvatarProps {
  /** Conteúdo exibido (ex.: iniciais "AB"). O Figma usa placeholder "M". */
  label: string;
  /** Escala visual do avatar. */
  size?: 'small' | 'large';
  /** Opcional: nome completo para acessibilidade. */
  accessibilityLabel?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { Avatar } from '@allos/design-system';

<Avatar label="M" size="small" accessibilityLabel="Maria Souza" />

<Avatar label="JS" size="large" accessibilityLabel="João Silva" />
```

---

## Checklist de implementação

- [ ] Cores via `useTheme()` / tokens — **nunca** hex fixo para fundo, borda ou texto.
- [ ] Cadeia **Component → Semantic → Primitive** para fills/strokes listados.
- [ ] `size=small` | `size=large`: dimensões **48** e **64** px; tipografia conforme tabela.
- [ ] Padding **8** e raio **999** alinhados aos tokens de spacing/radius do Figma.
- [ ] Borda **1** px e cores `component.avatar.border.default` no círculo.
- [ ] Ilustração interna apenas em `small` (paridade com Figma).
- [ ] Testar **NeutralTheme** e pelo menos um tema alternativo para regressão de cor.
- [ ] VoiceOver / TalkBack com `accessibilityLabel` quando houver só iniciais.

---

## Validação cruzada com `design.md`

Os tokens da seção **5.23 Avatar** em `/Users/jonathanfernandes/ds-react/design.md` coincidem com os **`boundVariables`** inspecionados no node `7518:11611` (nomes com `/` no Figma ↔ dot notation na doc). Nenhuma divergência entre doc e arquivo de tokens para este componente.
