# Modal mobile — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7601-18126](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7601-18126&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 19 de abril de 2026  

---

## Visão geral

**Diálogo modal** centrado (**328** px de largura) para confirmações e mensagens: **ícone** informativo ou destrutivo, ou **área de ilustração** (no RN o conteúdo gráfico será um **SVG fornecido pelo produto** — não depender dos vetores coloridos do Figma). Inclui **título**, **corpo**, **fechar**, e pilha de ações (**Button** primário, **Button** secundário, **Link**). Sombra composta no container (estilo **Elevation/Elevation-50** no arquivo; **sem `boundVariables`** nas sombras — mapear para token de elevação do DS na implementação).

---

## Anatomia

| # | Elemento | Tipo RN | Figma | Descrição |
|---|----------|---------|-------|-----------|
| 1 | Shell | `View` / `Pressable` | `type=*` | Coluna; fundo branco; cantos **16**; sombra |
| 2 | Leading visual | `View` | `Icon` | `info-outline` **48×48** · `error-outline` **48×48** · `illustration-cinema` **135×135** |
| 3 | Ilustração (variante) | `SvgUri` / `react-native-svg` | `illustration-cinema` | **Substituir pelo SVG da implementação** (mesmo slot e tamanho alvo) |
| 4 | Touch target (illustration) | `View` | `Touch Feedback` | Retângulo **48** px altura, **radius 8**; sem fill no Figma — área de toque / alinhamento do título |
| 5 | Título | `Text` | `Title here` | Central (simples/destrutivo); sobreposta na faixa na variante ilustração |
| 6 | Corpo | `Text` | `Body` | Parágrafo centralizado |
| 7 | Ações | composição | `Buttons` | Instâncias de **Button** + **Link** (ver specs próprias) |
| 8 | Fechar | `Pressable` + ícone | `close` | **24×24**; canto superior direito (**8** px inset) |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `type` | `simples` · `destructive` · `illustration` | `simples` |

| Variante | Largura × altura (frame) |
|----------|--------------------------|
| `type=simples` | 328 × 384 |
| `type=destructive` | 328 × 384 |
| `type=illustration` | 328 × 471 |

---

## Tokens — superfície e tipografia (todas as variantes)

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|---------------|
| Shell | `backgroundColor` | `component.modal-mobile.surface.bg` | `color.surface.default` | `color.ambient.base.deep-light` | **#FFFFFF** |
| Título | `color` | `component.bottom-sheet.text.title` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |
| Corpo | `color` | `component.modal-mobile.text.body` | `color.text.secondary` | `color.ambient.grayscales.70` | **#666666** |
| Fechar (vetor) | `color` | `component.bottom-sheet.icon.close` | `color.text.primary` | `color.ambient.grayscales.100` | **#1A1A1A** |

### Diferenças por `type` — ícone leading

| `type` | Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|--------|----------|----------------|-----------------|-------------|-------------|---------------|
| `simples` | Traço do `info-outline` | `color` | `component.feedback.info.icon` | `color.icon.default` | `color.ambient.grayscales.80` | **#4D4D4D** |
| `destructive` | Traço do `error-outline` | `color` | `component.feedback.error.icon` | `color.icon.error` | `color.feedback.error.default` | **#DF2020** |

*(O círculo colorido de “info” no marketing pode vir de camadas do componente de ícone fora deste vetor — o binding inspecionado no traço é o da tabela.)*

### Ações (instâncias)

Reutilizar tokens já documentados:

- **Primário (`simples` / `illustration`):** `component.button.primary.bg.default`, `component.button.primary.label.default`, `component.button.radius`, paddings de botão.
- **Primário (`destructive`):** `component.button.danger.bg.default`, `component.button.danger.label.default`.
- **Secundário:** `component.button.secondary.border.default`, `component.button.secondary.label.default`, `border.stroke.stroke-thin`.
- **Link:** `component.link.primary.text.default`.

---

## Elevação (sombra do shell)

No Figma o shell usa **dois** `DROP_SHADOW` (não ligados a variáveis), equivalentes ao estilo **Elevation/Elevation-50**:

| Sombra | Cor (hex aprox.) | Offset | Radius |
|--------|------------------|--------|--------|
| 1 | `rgba(82,100,122,0.25)` | (0, 16) | 32 |
| 2 | `rgba(41,50,61,0.05)` | (0, 4) | 8 |

**Implementação RN:** aplicar via tokens de **elevação** do tema (`elevation.*`, ver `design.md` §9) ou reproduzir os dois shadows acima para fidelidade 1:1 com o Figma.

---

## Tipografia

| Elemento | Estilo (referência) | Font | Size | Weight | Line height | Letter spacing |
|----------|---------------------|------|------|--------|-------------|----------------|
| Título | `Mobile/Heading/Heading 5` | Be Vietnam Pro | 18 | Bold (700) | 24 | -1% |
| Corpo | `Mobile/BodyText/Body Medium` | Be Vietnam Pro | 14 | Regular (400) | 16 | 0 |
| Botões / link | `Mobile/Button/...`, `Mobile/Link/Link Small` | Be Vietnam Pro | 14 | Bold / Regular | 24 / 16 | 0 |

---

## Espaçamento e dimensões

### Shell (`type=simples` e `type=destructive`)

| Propriedade | Token / variável Figma | Valor Neutral |
|-------------|------------------------|---------------|
| `paddingTop` / `paddingBottom` | `Spacing/Padding/Positive/lg` | **24** px |
| `paddingLeft` / `paddingRight` | `None` (Design System Tokens) | **0** |
| `itemSpacing` (coluna) | `None` | **0** |
| `borderRadius` (cantos) | `sm` (Design System Tokens) | **16** px |
| Largura | — | **328** px |

### Shell (`type=illustration`)

| Propriedade | Token / variável Figma | Valor Neutral |
|-------------|------------------------|---------------|
| `paddingTop` / `paddingBottom` | `sm` | **16** px |
| `paddingLeft` / `paddingRight` | `None` | **0** |
| `itemSpacing` | `None` | **0** |
| `borderRadius` | `sm` | **16** px |

### `Icon`

| `type` | `paddingTop` |
|--------|--------------|
| `simples` / `destructive` | `Spacing/Padding/Positive/None` → **0** |
| `illustration` | `Spacing/Padding/Positive/sm` → **16** px |

### `Title`

| `type` | Notas de padding / gap |
|--------|-------------------------|
| `simples` / `destructive` | `padding` vertical **16** (`sm`); horizontal **8** (`2xs`); `itemSpacing` **0** |
| `illustration` | `padding` vertical **4** (`3xs`); horizontal **8** (`2xs`); `itemSpacing` **0**; título em posição absoluta sobre `Touch Feedback` |

### `Body`

| Propriedade | Token Figma | Valor |
|-------------|-------------|-------|
| `paddingTop` / `paddingBottom` | `2xs` | **8** px |
| `paddingLeft` / `paddingRight` | `lg` | **24** px |
| `itemSpacing` | `2xs` | **8** px |

### `Buttons`

| Propriedade | Token Figma | Valor |
|-------------|-------------|-------|
| `paddingTop` / `paddingBottom` | `Spacing/Padding/Positive/2xs` | **8** px |
| `paddingLeft` / `paddingRight` | `lg` | **24** px |
| `itemSpacing` | `sm` | **16** px |

### Fechar

| Propriedade | Valor | Fonte |
|-------------|-------|--------|
| Posição | `top` **8**, `right` **8** | Layout absoluto |
| Área | **24×24** | Layout |

**Grid 4 px:** 4, 8, 16, 24, 328 (328 não é múltiplo de 4 — largura fixa do layout publicado).

---

## Variações por tema

Cores que passam por `color.text.*`, `color.surface.default`, `color.icon.*`, `color.feedback.error.*` e botões (`color.function.primary.*`, `color.function.secondary.*`) variam com o modo do tema. **Feedback de erro** permanece universal entre temas.

---

## Acessibilidade

- [ ] `Modal` / `accessibilityViewIsModal`; foco preso e retorno ao elemento acionador ao fechar.
- [ ] Fechar: `accessibilityLabel` explícito (ex.: “Fechar”) e `accessibilityRole="button"`.
- [ ] Título + corpo: leitura em ordem lógica; na variante **illustration**, garantir que o SVG decorativo use `accessible={false}` se redundante.
- [ ] Contraste: corpo **#666** sobre branco — validar WCAG para texto secundário 14px.
- [ ] Área tocável do fechar **24** px — considerar `hitSlop` até **44** px se o padrão de produto exigir.

---

## Restrições e regras

- **Ilustração:** implementar como **SVG único** (ou componente SVG) no slot **135×135**; não replicar fills locais do Figma.
- **Botões e link:** seguir specs de **Button** e **Link** do DS; não duplicar tabelas de tokens aqui.
- **Código gerado por `get_design_context` (Tailwind):** apenas referência visual.
- **Hover** de tokens web: ignorar em RN.

---

## Props da interface TypeScript

```typescript
type ModalMobileType = 'simples' | 'destructive' | 'illustration';

interface ModalMobileProps {
  /** Alinhado à propriedade VARIANT `type` do Figma */
  type?: ModalMobileType;
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  linkLabel: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  onLinkPress?: () => void;
  onClose?: () => void;
  /** Obrigatório quando `type === 'illustration'` — SVG ou componente equivalente */
  illustration?: React.ReactNode;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { ModalMobile } from '@allos/design-system';
import { IllustrationCinema } from '../assets/IllustrationCinema';

<ModalMobile
  type="simples"
  title="Title here"
  body="The backups created with this functionality may contain some sensitive data."
  primaryLabel="Primary action"
  secondaryLabel="Secondary"
  linkLabel="Link button"
  onClose={() => {}}
/>

<ModalMobile
  type="illustration"
  title="Title here"
  body="…"
  primaryLabel="Primary action"
  secondaryLabel="Secondary"
  linkLabel="Link button"
  illustration={<IllustrationCinema width={135} height={135} />}
/>
```

---

## Checklist de implementação

- [ ] `component.modal-mobile.surface.bg` e textos via `useTheme()` — sem hex fixo
- [ ] Título via `component.bottom-sheet.text.title` (ou alias de tema equivalente)
- [ ] Ícones `info` / `error` / `close` com tokens da tabela
- [ ] Sombras alinhadas ao DS ou ao pixel com Elevation-50
- [ ] Três variantes de layout (padding do shell e bloco `Title`)
- [ ] SVG de ilustração no slot, com acessibilidade correta
- [ ] Cruzado com **`design.md` §5.27** (`/Users/jonathanfernandes/ds-react/design.md`)
