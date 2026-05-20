# Benefits Levels — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7935-14175](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7935-14175&t=6YcsJh8Vlh5q99fR-4)  
> **Figma:** `COMPONENT_SET` **benefits-levels** (`7935:14175`)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 19 de maio de 2026  

---

## Visão geral

Card vertical do **programa de relacionamento por estrelas**: ícone de estrelas loyalty, badge opcional **“Você está aqui”**, título do nível (ex.: “1 Estrela”), texto de **critério de elegibilidade** e lista fixa de **cinco benefícios** com ícone **Check** (ativo) ou **Close** (indisponível no nível).

Três variantes publicadas no Figma (`Level=1` · `Level=2` · `Level=3`) diferem no **conteúdo de exemplo** e em **quais linhas** usam estado desabilitado (no nível 1, estacionamento e brindes aparecem bloqueados). Em RN, o nível deve ser **prop**; os benefícios devem vir de um **array configurável** (`enabled: boolean`), não de cópia fixa do arquivo Figma.

Este componente **não** está implementado no pacote `components/react-native` neste repositório.

**Validação com documentação local:** tokens `component.benefits-levels.*` constam em `design.md` § **5.10c Benefits Levels** — **0 divergências** na auditoria Figma↔doc para este node (`7935:14175`).

---

## Anatomia

| # | Elemento | Tipo RN | Figma (camada / instância) | Descrição |
|---|----------|---------|----------------------------|-----------|
| 1 | Root | `View` | `Level=*` | Card com borda, fundo e padding **24**; largura **303** |
| 2 | Header block | `View` | `Container` (topo) | Coluna; gap **16** até o bloco título/descrição |
| 3 | Header row | `View` | `Container` (horizontal) | Estrela(s) + badge; `justify-between` em níveis 2/3 |
| 4 | Star icon | `Image` / SVG | `estrela-loyalt` | **32×32**; 1, 2 ou 3 estrelas conforme nível |
| 5 | Status badge | `View` + `Text` | `Badge` (instance) | Pill “Você está aqui”; controlado por `Show Tag` |
| 6 | Title stack | `View` | `Container` (vertical) | Título Display + descrição Body |
| 7 | Level title | `Text` | `Title by Rule Criteria` | Bold **24** / lh **32** |
| 8 | Criteria copy | `Text` | `Title by Rule Criteria` | Regular **14** / lh **16** |
| 9 | Benefit row (×5) | `View` | `Container` (horizontal) | Ícone **24×24** + coluna título/legenda; gap linha **12** |
| 10 | Row icon | `Icon` | `Check` ou `Close` (instance) | Check = benefício ativo; Close = indisponível |
| 11 | Benefit title | `Text` | `Title by Rule Criteria` | Bold **18** / lh **24** |
| 12 | Benefit caption | `Text` | `Title by Rule Criteria` | Regular **12** / lh **120%** |

**Ícones publicados (instâncias inspecionadas):**

| Uso | Componente Figma | Observação |
|-----|------------------|------------|
| Ativo | `Check` | Vetor `vector` com token `component.benefits-levels.icon.check.default` |
| Bloqueado | `Close` | Vetor `vector` com token `component.benefits-levels.icon.close.disabled` |
| Estrelas | `estrela-loyalt` | Vetor principal com `component.benefits-levels.icon.star.default` |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `Level` | `1` · `2` · `3` | `1` |
| `Show Tag#2257:0` | boolean | `true` |

| Variante Figma | Node | Dimensões (W×H) | Diferença funcional |
|----------------|------|-----------------|---------------------|
| `Level=1` | `7935:14176` | **303 × 498** | 1 estrela; linhas 1 e 4 com **Close** + texto `benefit-text.disabled` |
| `Level=2` | `7935:14213` | **303 × 498** | 2 estrelas; todas as linhas **Check** + tokens ativos |
| `Level=3` | `7935:14247` | **303 × 498** | 3 estrelas; todas as linhas **Check** + tokens ativos |

**Conteúdo de exemplo** (títulos, critérios, copy dos benefícios): substituir por **props** no RN. A lista deve aceitar **N** itens na API, mantendo o layout de **5** linhas apenas se o produto exigir — o Figma publica 5 como amostra.

---

## Tokens por variante e estado

Valores **NeutralTheme** na coluna final foram resolvidos via `boundVariables` + cadeia de variáveis (Plugin API, 19/05/2026). Nomes Figma com `/`; no código RN usar `component.benefitsLevels.*` (camelCase) via `useTheme()`.

### Base (comum a `Level=1` · `Level=2` · `Level=3`)

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Root | `backgroundColor` | `component.benefits-levels.surface.default` | `color.surface.card` | `color.ambient.base.light` | **#FAFAFA** |
| Root | `borderColor` | `component.benefits-levels.border.default` | `color.border.default` | `color.ambient.grayscales.20` | **#E6E6E6** |
| Root | `borderWidth` | — | — | — | **1** px |
| Root | `borderRadius` | *(DST)* `Border/Radius/xs` | — | — | **4** px |
| Root | `padding` | *(DST)* `Spacing/Padding/Positive/lg` | — | — | **24** px |
| Root | `gap` (seções) | *(DST)* `Spacing/Padding/Positive/lg` | — | — | **24** px |
| Header block | `gap` | *(DST)* `Spacing/Padding/Positive/sm` | — | — | **16** px |
| Header row | `gap` | *(DST)* `Spacing/Padding/Positive/2xs` | — | — | **8** px* |
| Title stack | `gap` | *(DST)* `Spacing/Padding/Positive/2xs` | — | — | **8** px |
| Level title | `color` | `component.benefits-levels.heading.default` | `color.text.body` | `color.ambient.neutral.80` | **#414958** |
| Criteria | `color` | `component.benefits-levels.description.default` | `color.text.body` | `color.ambient.neutral.80` | **#414958** |
| Star (vetor principal) | `color` | `component.benefits-levels.icon.star.default` | `color.icon.loyalty-star` | `color.function.specific.yellow-star` | **#EDC41E** |
| Badge | `backgroundColor` | `component.benefits-levels.badge.bg.default` | `color.surface.neutral-muted` | `Color/Ambient/Neutral/40` (DST) | **#A7AFBE** |
| Badge label | `color` | `component.benefits-levels.badge.label.default` | `color.text.dark` | `Color/Function/Primary/Dark` (DST) | **#09142A** |
| Benefit row | `gap` (ícone ↔ texto) | *(DST)* `Spacing/Padding/Positive/xs` | — | — | **12** px |
| Text column | `gap` | *(DST)* `Spacing/Padding/Positive/3xs` | — | — | **4** px |
| Benefit title (ativo) | `color` | `component.benefits-levels.benefit-title.default` | `color.text.body` | `color.ambient.neutral.80` | **#414958** |
| Benefit caption (ativo) | `color` | `component.benefits-levels.benefit-caption.default` | `color.text.body` | `color.ambient.neutral.80` | **#414958** |
| Check icon (vetor) | `color` | `component.benefits-levels.icon.check.default` | `color.icon.brand-strong` | `color.function.primary.action` | **#1B3C7E** |

\* **Alerta:** na variante `Level=2`, o header row publica `itemSpacing` **10** px (fora do grid de 4 px). Preferir **8** px (`2xs`) na implementação, salvo alinhamento explícito com design.

### Benefício indisponível — diferenças vs base

Aplica-se por **linha** quando `enabled === false` (no Figma, `Level=1` nas linhas com ícone **Close**).

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Close icon (vetor) | `color` | `component.benefits-levels.icon.close.disabled` | `color.text.tertiary` | `color.ambient.grayscales.50` | **#999999** |
| Benefit title + caption | `color` | `component.benefits-levels.benefit-text.disabled` | `color.text.tertiary` | `color.ambient.grayscales.50` | **#999999** |

> **Nota:** título e legenda desabilitados compartilham o **mesmo** token de cor — não há tokens separados para título vs legenda no estado disabled.

### `Show Tag = false`

Ocultar a instância **Badge**; o header row deve recolher para apenas o ícone de estrelas (layout `HORIZONTAL` com gap **8** px, como em `Level=1`).

---

## Tipografia

| Elemento | Estilo Figma | Family | Size | Weight | Line height | Letter spacing |
|----------|--------------|--------|------|--------|-------------|----------------|
| Badge | Mobile/Caption/Caption Regular Small | Be Vietnam Pro · Regular | 12 | 400 | 14 px | 0 |
| Level title | Mobile/Display/Display 4 | Be Vietnam Pro · **Bold** | 24 | 700 | 32 px | **-1** px |
| Criteria | Mobile/BodyText/Body Medium | Be Vietnam Pro · Regular | 14 | 400 | 16 px | 0 |
| Benefit title (ativo) | Mobile/Heading/Heading 5 | Be Vietnam Pro · **Bold** | 18 | 700 | 24 px | **-1%** (~ -0.18 px) |
| Benefit caption | Mobile/Caption/Caption | Be Vietnam Pro · Regular | 12 | 400 | **120%** (~ 14.4 px) | 0 |

Mapear para tokens `font.*` do DS onde existirem (`font.size.3xl` + `font.weight.bold` para Display 4, etc.); manter valores acima como referência do layout publicado.

---

## Espaçamento e dimensões

| Propriedade | Token (Figma / bound) | Valor | Fonte |
|-------------|------------------------|-------|-------|
| Largura do card | variantes `Level=*` | **303** px | Figma |
| Altura do card | variantes `Level=*` | **498** px | Figma (conteúdo exemplo com 5 linhas) |
| Padding root | `Spacing/Padding/Positive/lg` | **24** px | bound |
| Gap entre header e lista | `Spacing/Padding/Positive/lg` | **24** px | bound |
| Gap header interno | `Spacing/Padding/Positive/sm` | **16** px | bound |
| Gap estrela ↔ badge | `Spacing/Padding/Positive/2xs` | **8** px | bound (exc. L2 header **10** px) |
| Gap título ↔ critério | `Spacing/Padding/Positive/2xs` | **8** px | bound |
| Gap ícone ↔ coluna benefício | `Spacing/Padding/Positive/xs` | **12** px | bound |
| Gap título ↔ legenda do benefício | `Spacing/Padding/Positive/3xs` | **4** px | bound |
| Ícone estrela | `estrela-loyalt` | **32×32** px | Figma |
| Ícone Check / Close | instância | **24×24** px | Figma |
| Badge altura | `Badge` | **24** px | Figma |
| Badge padding H / V | `Spacing/sm` · `Spacing/2xs` | **16** / **8** px | bound (instância Badge) |

---

## Variações por tema

Propriedades que passam por **`color.function.primary.action`** variam entre temas. Textos `color.text.body` → `neutral.80` (**#414958**) e estrela `yellow-star` (**#EDC41E**) permanecem estáveis no modo inspecionado.

### Ícone Check — `component.benefits-levels.icon.check.default`

| Tema | Primitivo | Hex |
|------|-----------|-----|
| NeutralTheme | `color.function.primary.action` | **#1B3C7E** |
| LeblonTheme | `color.function.primary.action` | **#734E26** |
| RedTheme | `color.function.primary.action` | **#590D18** |
| GreenTheme | `color.function.primary.action` | **#265937** |

### Superfícies e textos neutros

`surface.default`, `heading`, `description`, `benefit-title`, `benefit-caption`, `benefit-text.disabled` e `icon.close.disabled` **não** variam entre os quatro temas na cadeia inspecionada (semânticos apontam para ambient estáveis).

---

## Acessibilidade

- [ ] **Contraste texto ativo:** `#414958` sobre `#FAFAFA` ≈ **7.5:1** — adequado para texto normal (WCAG AA).
- [ ] **Contraste texto desabilitado:** `#999999` sobre `#FAFAFA` ≈ **2.85:1** — **falha** WCAG AA para texto normal; aceitável apenas se tratado como **não essencial** / estado disabled (validar com produto).
- [ ] **Contraste badge:** `#09142A` sobre `#A7AFBE` — validar ratio no tema; label é informação de status (“Você está aqui”).
- [ ] **`accessibilityRole`:** card com `"summary"` ou container; cada linha de benefício como texto estático; badge com `"text"`.
- [ ] **`accessibilityLabel`:** compor nível + critério; por linha, anunciar benefício + “disponível” / “indisponível” conforme `enabled`.
- [ ] **Ícones decorativos:** Check/Close/estrelas com `accessible={false}` se o texto da linha já descreve o estado.
- [ ] **Touch target:** card inteiro pode ser não pressionável; se o badge ou card forem clicáveis no produto, garantir área ≥ **44×44** pt.

---

## Restrições e regras

- **Hover** (`*/hover`) — ignorar em RN.
- **`Show Tag`:** mapear para prop `showTag`; quando `false`, não reservar espaço do badge no layout.
- **Lista de benefícios:** preferir `benefits: { title, caption, enabled }[]`; o Figma fixa 5 itens de exemplo — não hardcodar copy nem quantidade no componente genérico.
- **`Level`:** controla quantidade de estrelas no asset e pode pré-preencher defaults de `enabled` no produto; a spec visual de disabled é por **linha**, não só por variante.
- **Violações / legado inspecionado:**
  - Vetores decorativos dentro de `estrela-loyalt` (gradiente `Color/Function/Gradient/*`, Wi‑Fi em `Grayscales/*`) **sem** token `component.benefits-levels.*` — herdar aparência do SVG exportado ou simplificar no RN.
  - Instância **Badge** usa também `component.badge.neutral-1.fg` em vetor interno — herança do componente Badge; no RN pode unificar em `badge.label.default`.
  - Espaçamentos **Spacing/** e **Border/** vêm da coleção **Design System Tokens** (DST) — padrão aceito para layout.
  - `lineHeight` **120%** na legenda do benefício não está como token tipográfico nomeado — usar valor calculado ou token de line-height mais próximo do DS.
  - Código gerado por `get_design_context` referencia `Color.Function.Primary.Light` como gap de linha — **incorreto**; o bound real é `Spacing/Padding/Positive/xs` (**12** px).

---

## Props sugeridas (TypeScript)

```typescript
export type BenefitsLevel = '1' | '2' | '3';

export interface BenefitsLevelItem {
  title: string;
  caption: string;
  /** false → ícone Close + tokens disabled */
  enabled: boolean;
}

export interface BenefitsLevelsProps {
  level?: BenefitsLevel;
  showTag?: boolean;
  tagLabel?: string;
  /** Ex.: "1 Estrela", "2 Estrelas" */
  heading: string;
  /** Critério de elegibilidade */
  description: string;
  benefits: BenefitsLevelItem[];
  testID?: string;
  accessibilityLabel?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { BenefitsLevels } from '@allos/design-system'; // quando existir

<BenefitsLevels
  level="1"
  showTag
  tagLabel="Você está aqui"
  heading="1 Estrela"
  description="Enviando apenas 1 nota fiscal de qualquer valor, você já será 1 Estrela!"
  benefits={[
    { title: '0% de desconto', caption: 'no estacionamento', enabled: false },
    { title: '1 cupom de sorteio', caption: 'para concorrer a prêmios incríveis', enabled: true },
    { title: 'Compre e ganhe', caption: 'participe de promoções exclusivas', enabled: true },
    { title: 'Brindes', caption: 'exclusivos do Shopping', enabled: false },
    { title: 'Descontos e muito mais!', caption: 'para usar em lojas do Shopping', enabled: true },
  ]}
/>

<BenefitsLevels
  level="3"
  showTag={false}
  heading="3 Estrelas"
  description="A partir de R$ 25.000,00, com o mínimo de 20 notas fiscais enviadas"
  benefits={[
    { title: 'Até 5 horas grátis', caption: 'no estacionamento, todos os dias', enabled: true },
    { title: '10 cupons de sorteio', caption: 'para concorrer a prêmios incríveis', enabled: true },
    { title: 'Compre e ganhe', caption: 'participe de promoções exclusivas', enabled: true },
    { title: 'Brindes', caption: 'exclusivos do Shopping', enabled: true },
    { title: 'Descontos e muito mais!', caption: 'para usar em lojas do Shopping', enabled: true },
  ]}
/>
```

---

## Checklist de implementação

- [ ] Módulo de tema com todos os tokens `component.benefits-levels.*` listados nesta spec (ver `design.md` §5.10c).
- [ ] Cadeia **Component → Semântico → Primitivo** para cores; DST para espaçamento e `border.radius.xs`.
- [ ] Ícones **Check**, **Close** e **estrela-loyalt** do DS (SVG) com cores via tema.
- [ ] Estado `enabled: false` por linha (não apenas por `level`).
- [ ] Prop `showTag` ocultando badge sem quebrar layout do header.
- [ ] Tipografia **Be Vietnam Pro** com tamanhos/pesos da tabela.
- [ ] Funciona nos **4 temas** via `ThemeContext` (ícone Check / `brand-strong`).
- [ ] Conferência pixel a pixel com variantes Figma `7935:14175`.

---

## Referências

- Figma: [benefits-levels](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7935-14175&t=6YcsJh8Vlh5q99fR-4) · fileKey `ZUEzW52KbL0DN9aKGSqwAs`
- Tokens gerais: `design.md` (§5.10c · §3 `primary.action` · §4 `icon.loyalty-star`, `text.body`, `text.tertiary`)
- Template de spec: `specs/component-spec/template.md`
