# Store Card — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/02---Tokens---React-Native?node-id=7995-6944](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/02---Tokens---React-Native?node-id=7995-6944&t=8MgQ2g6pNJJ5qfGl-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 26 de maio de 2026  

---

## Visão geral

**Cartão de loja/restaurante** para listagens no app do shopping: exibe identidade visual (avatar ou logo), nome, categoria, link de localização (piso), atalhos de contato (WhatsApp, telefone) e ações contextuais em botões secundários. Duas variantes de fluxo definem o conjunto de ações e o tipo de mídia leading.

| Fluxo (`Fluxo`) | Uso | Ações no rodapé |
|-----------------|-----|-----------------|
| `Restaurante` | Gastronomia | 4 botões em grade 2×2: Cardápio digital, Fila online, Reservar mesa, Benefícios |
| `Lojas` | Varejo | 2 botões em linha: Benefícios, Compra online |

---

## Anatomia

| # | Elemento | Tipo RN | Figma layer | Descrição |
|---|----------|---------|-------------|-----------|
| 1 | Root | `View` | `Fluxo=*` | Card vertical; padding **16**, gap **16**, raio **8**, borda **1** |
| 2 | Content container | `View` | `Content/Container` | Linha: bloco de info + coluna de ícones de contato |
| 3 | Card info group | `View` | `Card Info Group` | Linha: mídia leading + coluna de textos/link |
| 4a | Avatar | `Image` / instance | `Avatar/Square` | **~88×88**, raio **4**, borda **2** — fluxo Restaurante |
| 4b | Store logo | `View` | `Store Logo` | **~88×88**, raio **4**, borda **1** — fluxo Lojas (artwork de marca interno) |
| 5 | Content | `View` | `Content` | Coluna: stack de texto + link |
| 6 | Content / text | `View` | `Content/Text` | Coluna título + subtítulo (`gap` **4**) |
| 7 | Title | `Text` | `Abbraccio` / `Adidas` | Nome da loja — SemiBold **16** / lh **20** |
| 8 | Subtitle | `Text` | Categoria… | Metadado — Regular **12** / lh **16** |
| 9 | Location link | `Link` (instance) | `Link` | Ícone place + texto + chevron — ex.: "Piso L1" |
| 10 | Card icon group | `View` | `Card Icon Group` | Coluna vertical; `gap` **24** entre WhatsApp e telefone |
| 11 | WhatsApp | `Pressable` + SVG | `whatsapp-filled` | **24×24** |
| 12 | Call | `Pressable` + SVG | `call` | **24×24** |
| 13 | Button group | `View` + `Button` | `Button Group` | Instância remota; botões **Secondary** **144×32** |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `Fluxo` | `Restaurante` · `Lojas` | `Restaurante` |

**Conteúdo dinâmico (props):** nome, subtítulo, piso/local, imagem de avatar, logo da marca, handlers de WhatsApp/telefone e lista de ações (`buttons`).

---

## Tokens — estrutura comum (ambos os fluxos)

### Container (Root)

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Root | `backgroundColor` | `component.store-card.bg.default` | `color.surface.default` | `color.ambient.base.deep-light` | **#FFFFFF** |
| Root | `borderColor` | `component.store-card.border.default` | `color.border.input-disabled` | `color.ambient.grayscales.30` | **#CCCCCC** |
| Root | `borderWidth` | — | — | — | **1** px |
| Root | `borderRadius` | `Border/Radius/sm` (DST) | `border.radius.sm` | — | **8** px |
| Root | `padding` | `Spacing/Padding/Positive/sm` (DST) | `spacing.padding.positive.sm` | — | **16** px |
| Root | `gap` (vertical) | `Spacing/Padding/Positive/sm` (DST) | `spacing.padding.positive.sm` | — | **16** px |

### Tipografia

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Title | `color` | `component.store-card.title.default` | `color.text.value` | `color.ambient.base.deep-dark` | **#000000** |
| Subtitle | `color` | `component.store-card.subtitle.default` | `color.text.supporting` | `color.ambient.grayscales.60` | **#808080** |

| Elemento | Font family | Size | Weight | Line height | Estilo Figma |
|----------|-------------|------|--------|-------------|--------------|
| Title | Be Vietnam Pro | 16 | 600 (SemiBold) | 20 px | `Mobile/BodyText/Body Large Semibold` |
| Subtitle | Be Vietnam Pro | 12 | 400 (Regular) | 16 px | `Mobile/BodyText/Body Small` |

### Layout interno

| Frame | Propriedade | Token (Figma DST) | → Código | Valor |
|-------|-------------|-------------------|----------|-------|
| `Content/Container` | `gap` | `Spacing/Padding/Positive/lg` | `spacing.padding.positive.lg` | **24** px |
| `Card Info Group` | `gap` | `Spacing/Padding/Positive/xs` | `spacing.padding.positive.xs` | **12** px |
| `Content` | `gap` | `Spacing/Padding/Positive/2xs` | `spacing.padding.positive.2xs` | **8** px |
| `Content/Text` | `gap` | `Spacing/Padding/Positive/3xs` | `spacing.padding.positive.3xs` | **4** px |
| `Card Icon Group` | `gap` | `Spacing/Padding/Positive/lg` | `spacing.padding.positive.lg` | **24** px |
| `Button Group` | `gap` | `Spacing/Padding/Positive/2xs` | `spacing.padding.positive.2xs` | **8** px |

### Link de localização (instância remota)

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Texto + chevron | `color` | `component.link.primary.text.default` | `color.text.brand-strong` | `color.function.primary.action` | **#1B3C7E** |
| Ícone place (destaque) | `color` | `component.store-card.icon-location.default` | `color.icon.brand-strong` | `color.function.primary.action` | **#1B3C7E** |

| Propriedade | Token (DST) | Valor |
|-------------|-------------|-------|
| `paddingVertical` (Link) | `3xs` | **4** px |
| `gap` (Link) | `3xs` | **4** px |
| Texto link | — | **12** px Regular |

> No fluxo **Lojas**, a parte neutra do ícone `place` usa `component.store-card.icon-location-muted.default` → `color.icon.default` → **#4D4D4D** (override local na instância).

### Ícones de contato (Card Icon Group)

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| WhatsApp (corpo) | `color` | `component.store-card.icon-whatsapp.default` | `color.icon.success` | `color.feedback.success.default` | **#33CC33** |
| WhatsApp (detalhe) | `color` | `component.store-card.icon-whatsapp-muted.default` | `color.icon.subtle` | `color.ambient.grayscales.50` | **#999999** |
| WhatsApp (detalhe claro) | `color` | `component.store-card.icon-whatsapp-inverse.default` | `color.icon.inverse` | `color.ambient.base.deep-light` | **#FFFFFF** |
| Telefone | `color` | `component.store-card.icon-action.default` | `color.border.accent-secondary` | `color.function.secondary.action` | **#0F4E57** |

| Ícone | Dimensão |
|-------|----------|
| `whatsapp-filled` | **24×24** |
| `call` | **24×24** |

### Botões de ação (instância `Button Group` + `Button` Secondary)

Seguir spec de **Button Secondary** (`component.button.secondary.*`). No Figma, labels e ícones dos botões usam:

| Elemento | Component token | → Semântico | Valor Neutral |
|----------|-----------------|-------------|----------------|
| Label + ícones do botão | `component.button.secondary.label.default` | `color.interactive.secondary.default-invert` | **#0F4E57** |
| Borda do botão | `component.button.secondary.border.default` | `color.interactive.secondary.default-invert` | **#0F4E57** |

| Propriedade | Valor |
|-------------|-------|
| Altura do botão | **32** px |
| Largura do botão (exemplo) | **144** px |
| `borderRadius` | `component.button.radius` / `Border/Radius/xs` → **4** px |

---

## Tokens por variante (`Fluxo`)

### Fluxo: Restaurante

| Elemento | Propriedade RN | Component token | Diferença vs base |
|----------|----------------|-----------------|-------------------|
| Avatar | `backgroundColor` | `component.store-card.avatar-bg.default` | → `color.surface.partner-merchant-mock` → **#016435** |
| Avatar | `borderColor` | `component.store-card.avatar-border.default` | → `color.border.subtle` → **#F2F2F2** |
| Avatar | `borderWidth` | — | **2** px |
| Avatar | `borderRadius` | `Border/Radius/xs` (DST) | **4** px |
| Avatar | dimensões | — | **~88×88** px |

**Button Group:** layout **vertical** (`itemSpacing` **8**). Duas linhas (`Frame 11244`, `Frame 11245`) com **2** botões cada:

1. Cardápio digital  
2. Fila online  
3. Reservar mesa  
4. Benefícios  

**Altura publicada do card:** **208** px · **Largura:** **328** px.

### Fluxo: Lojas

| Elemento | Propriedade RN | Component token | Diferença vs Restaurante |
|----------|----------------|-----------------|--------------------------|
| Leading media | `Store Logo` frame | `component.store-card.logo-bg.default` | Fundo **#000000** (via `color.text.value`) |
| Leading media | borda | `component.store-card.logo-border.default` | → `color.border.subtle` → **#F2F2F2** |
| Leading media | `borderWidth` | — | **1** px |
| Leading media | dimensões | — | **~88×88** px |

**Artwork de marca:** vetores dentro do grupo `logo` (ex.: Adidas) mantêm **fills hardcoded** no Figma — reproduzir o asset/SVG da marca no RN; **não** mapear para tokens de UI.

**Button Group:** layout **horizontal** (`itemSpacing` **8**). Botões:

1. Benefícios  
2. Compra online  

**Altura publicada do card:** **168** px · **Largura:** **328** px.

---

## Variações por tema

Propriedades que passam por `color.function.primary.*`, `color.function.secondary.*`, `color.text.brand-strong` e `color.border.input-disabled` variam por tema. Cores de feedback (`color.feedback.success.*`) são universais.

| Token / papel | NeutralTheme | Observação |
|---------------|--------------|------------|
| Link + ícone local | `primary.action` → **#1B3C7E** | Varia em Leblon / Red / Green |
| Botão secondary label | `secondary.action` → **#0F4E57** | Varia por tema |
| Borda do card | `grayscales.30` → **#CCCCCC** | Universal (ambient) |
| Avatar placeholder | `partner-merchant-mock` → **#016435** | Mock de restaurante |

`border.radius.sm` (8 px no card) pode variar por tema conforme **D-006** (`border.radius.xs` / `sm` no DS).

---

## Acessibilidade

- [ ] **Título** `#000000` sobre `#FFFFFF` — contraste excelente (WCAG AAA).
- [ ] **Subtítulo** `#808080` sobre branco — ratio ~3.9:1; texto secundário 12 px pode não atingir AA 4.5:1 — tratar como supporting copy ou aumentar peso/contraste se for essencial.
- [ ] Ícones **24×24** e botões **32** px de altura ficam abaixo do touch target **44×44** (iOS) / **48×48** (Android) — envolver em `Pressable` com `hitSlop` ou `minHeight` no container.
- [ ] `accessibilityRole="button"` em WhatsApp, telefone e cada ação; `accessibilityLabel` descritivo (ex.: "WhatsApp da loja Adidas", "Ligar para a loja").
- [ ] Link de piso: `accessibilityRole="link"` + label composto ("Piso L1, toque para ver no mapa").
- [ ] Lista de botões: considerar `accessibilityRole="menu"` no grupo ou ordem de foco lógica (info → contato → ações).

---

## Restrições e regras

- **Cadeia obrigatória:** Component Token → Semântico → Primitivo — nunca primitivo direto no app (`useTheme()`).
- **Sub-componentes remotos:** `Link`, `Button`, `Button Group` — reutilizar componentes DS; aplicar apenas overrides documentados (`component.store-card.icon-location.*` no ícone place).
- **Hover** em tokens `*/hover` — ignorar no React Native.
- **Logo de marca (Lojas):** usar asset oficial; cores do logotipo não são tokenizadas.
- **Grid 4 px:** todos os espaçamentos inspecionados (4, 8, 12, 16, 24) respeitam o grid.
- Não confundir com **Card Store Item** (`component.card-store-item.*`) — componente de carousel menor; o **Store Card** é o card completo com ações (`component.store-card.*`).

---

## Props da interface TypeScript

```typescript
type StoreCardFluxo = 'restaurante' | 'lojas';

interface StoreCardAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
}

interface StoreCardProps {
  fluxo: StoreCardFluxo;
  title: string;
  subtitle: string;
  /** Texto do link de localização (ex.: "Piso L1") */
  locationLabel: string;
  onLocationPress?: () => void;
  /** Fluxo Restaurante — imagem do estabelecimento */
  avatarSource?: ImageSourcePropType;
  /** Fluxo Lojas — logo da marca (SVG/Image) */
  brandLogo?: React.ReactNode;
  onWhatsAppPress?: () => void;
  onCallPress?: () => void;
  /** Restaurante: até 4 ações; Lojas: até 2 */
  actions: StoreCardAction[];
  testID?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { StoreCard } from '@allos/design-system';

<StoreCard
  fluxo="restaurante"
  title="Abbraccio"
  subtitle="Alimentação / Restaurantes"
  locationLabel="Piso L1"
  onLocationPress={() => {}}
  avatarSource={{ uri: 'https://…' }}
  onWhatsAppPress={() => {}}
  onCallPress={() => {}}
  actions={[
    { id: 'menu', label: 'Cardápio digital', onPress: () => {} },
    { id: 'queue', label: 'Fila online', onPress: () => {} },
    { id: 'reserve', label: 'Reservar mesa', onPress: () => {} },
    { id: 'benefits', label: 'Benefícios', onPress: () => {} },
  ]}
/>

<StoreCard
  fluxo="lojas"
  title="Adidas"
  subtitle="Vestuário / Vestuário Unissex"
  locationLabel="Piso L1"
  brandLogo={<AdidasLogo />}
  onWhatsAppPress={() => {}}
  onCallPress={() => {}}
  actions={[
    { id: 'benefits', label: 'Benefícios', onPress: () => {} },
    { id: 'shop', label: 'Compra online', onPress: () => {} },
  ]}
/>
```

---

## Checklist de implementação

- [ ] Tokens via `useTheme()` — `component.store-card.*` para cores do card; `Button` / `Link` dos pacotes DS
- [ ] Variante `fluxo` altera leading media, layout do button group (grade 2×2 vs linha) e lista de ações
- [ ] Espaçamentos: 16 (card), 24 (content/icon group), 12 (info), 8 (content/buttons), 4 (text stack)
- [ ] `borderRadius` 8 no card, 4 no avatar/logo e botões
- [ ] Ícones WhatsApp com 3 camadas de cor tokenizadas; telefone com `icon-action`
- [ ] Touch targets ampliados nos ícones 24 px e botões 32 px
- [ ] Funciona nos 4 temas via `ThemeContext`
- [ ] Conferência pixel a pixel com Figma (`328` px de largura de referência)
- [ ] Artwork de marca em `lojas` sem hardcode de cores DS no SVG da marca

---

## Validação cruzada (`design.md` § 5.14b)

| Token na spec | Documentado em `design.md` | Status |
|---------------|---------------------------|--------|
| `component.store-card.bg.default` | ✓ | OK |
| `component.store-card.border.default` | ✓ | OK |
| `component.store-card.title.default` | ✓ | OK |
| `component.store-card.subtitle.default` | ✓ | OK |
| `component.store-card.avatar-*` | ✓ | OK |
| `component.store-card.logo-*` | ✓ | OK |
| `component.store-card.icon-*` | ✓ | OK |
| `component.link.primary.text.default` | § 5.6 Link | OK |
| `component.button.secondary.*` | § 5.1b Button Secondary | OK |

**Auditoria de tokens (26/05/2026):** cores de UI com cadeia de 3 camadas validada no Figma; exceção documentada para vetores de logotipo de marca no fluxo Lojas.
