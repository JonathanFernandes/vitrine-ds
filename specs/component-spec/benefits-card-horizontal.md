# Benefits Card (horizontal) — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7810-5098](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7810-5098&t=V9texaooiIVSgims-4)  
> **Figma:** `COMPONENT_SET` **Benefits Card (horizontal)** (`7810:5098`)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 15 de maio de 2026  

---

## Visão geral

Cartão de benefício em **layout horizontal** para listas e carrosséis: **área de branding + logo da loja** à esquerda (**136×136**), coluna de **metadado de categoria**, **título**, **descrição**, **vencimento** e **CTA** (instância de **Button** secundário pequeno) à direita. Três estados publicados no Figma: **Default** (ativar), **bloqueado** (máscara + lock central + CTA desabilitado) e **utilizado** (CTA desabilitado com ícone de sucesso).

Este componente **não** está implementado no pacote `components/react-native` neste repositório (existe apenas `BenefitsCardVertical`). A spec abaixo descreve o alvo Figma para implementação futura.

**Validação com documentação local:** o arquivo de referência do repositório é `design.md` (raiz). A seção **5.10 Benefits Card (vertical)** documenta vários tokens **`component.benefits-card.*`** reutilizados aqui; os tokens **`component.benefits-card-horizontal.*`** constam no Figma e **ainda não aparecem** na tabela 5.10 de `design.md` — recomenda-se atualizar `design.md` após congelar os nomes no DS.

---

## Anatomia

| # | Elemento | Tipo RN | Figma (camada / instância) | Descrição |
|---|----------|---------|----------------------------|-----------|
| 1 | Root | `View` / `Pressable` | `Status=*` | Auto-layout **horizontal**; gap entre colunas **16** |
| 2 | Branding | `View` | `Branding` | Envolve o logo; cantos **4** (`3xs` no DST); no **Default** / **utilizado** recebe fill de marca |
| 2b | Branding mask (só bloqueado) | `View` | `Rectangle 2882` | Retângulo **atrás** do logo com fill ligado a token de borda (efeito cinza) |
| 3 | Store logo | `View` + `Image` | `Store Logo` (instance) | **136×136**; borda **2**; raio **4**; imagem da loja |
| 4 | Content | `View` | `Content` | Coluna vertical; `itemSpacing` **12** |
| 5 | Text stack | `View` | `Text` | Coluna; `itemSpacing` **8** |
| 6 | Category meta | `View` + ícone | `Benefits Category Meta` (instance) | Linha: ícone **16×16** + legenda categoria |
| 7 | Title block | `View` | `Title and sub` | Coluna; `itemSpacing` **4** |
| 8 | Store name | `Text` | `Abbraccio` | Bold 14 / lh 16 |
| 9 | Description | `Text` | `Ganhe 20% de desconto` | Regular 14 / lh 16 |
| 10 | Expiration | `Text` | `Vencimento` | Regular 12 / lh 14 |
| 11 | Action | `Button` (DS) | `Button` (instance `7040:2863` / `7040:2733`) | **Secondary · Small** no default; estados bloqueado/utilizado reutilizam fill/label disabled |
| 12 | Lock badge (só bloqueado) | `View` | `Frame 11016` | Círculo com fundo overlay + ícone lock **16** |
| 13 | Ilustração check (utilizado) | vetores internos | `Ellipse 1–3` | Partes do ícone check com fill semântico `Color/Function/PrimaryContrast/Default` |

---

## Variantes e propriedades

| Propriedade (Figma) | Valores | Default |
|---------------------|---------|---------|
| `Status` | `Default` · `bloqueado` · `utilizado` | `Default` |

**Conteúdo de exemplo** no arquivo (Sorteio, Abbraccio, copy, datas, imagens): substituir por **props** no RN.

---

## Tokens por variante e estado

Valores **Neutral** na coluna final foram resolvidos a partir dos `boundVariables` + cadeia de variáveis no modo padrão da coleção (inspeção Plugin API em 15/05/2026). Nomes de token usam a convenção do Figma com `/`; no código RN costumam aparecer como chaves do tema em `camelCase`.

### Status = Default

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo | Valor Neutral |
|----------|----------------|-----------------|-------------|-------------|----------------|
| Root | `gap` / `columnGap` | *(DST)* `sm` | — | — | **16** px |
| Root | `borderRadius` | `Border/Radius/xs` (DST) | — | — | **4** px |
| Branding | `backgroundColor` | `component/benefits-card-horizontal/branding/bg/default` | `color/interactive/primary/default` | `color/function/primary/default` | **#4274D6** |
| Store logo | `backgroundColor` | `component/benefits-card-horizontal/store-logo-bg/default` | `color/surface/partner-merchant-mock` | `color/ambient/partner/merchant-mock-bg` | **#016435** |
| Store logo | `borderColor` | `component/benefits-card/logo-border/default` | `color/border/default` | `color/ambient/grayscales/20` | **#E6E6E6** |
| Store logo | `borderWidth` | `border/stroke/stroke-medium` | — | *(primitivo direto)* | **2** px |
| Category label + ícone meta | `color` | `component/benefits-card/secondary/default` | `color/text/secondary` | `color/ambient/grayscales/70` | **#666666** |
| Título + descrição | `color` | `component/benefits-card/text/default` | `color/text/strong` | `Color/Ambient/Neutral/90` | **#2B303B** |
| Vencimento | `color` | `component/benefits-card/secondary/default` | `color/text/secondary` | `color/ambient/grayscales/70` | **#666666** |
| Button (container) | `borderColor` | `component/button/secondary/border/default` | `color/interactive/secondary/default invert` | `color/function/secondary/action` | **#0F4E57** |
| Button (container) | `borderWidth` | — | *(stroke 1 px no layout publicado)* | — | **1** px |
| Button (ícone cupom + label) | `color` | `component/button/secondary/label/default` | `color/interactive/secondary/default invert` | `color/function/secondary/action` | **#0F4E57** |
| Cupom (vetores) | `color` | `component/benefits-card/action/default` | `color/interactive/secondary/default invert` | `color/function/secondary/action` | **#0F4E57** |
| Button | `paddingHorizontal` | `Spacing/Padding/Positive/sm` (DST) | — | — | **16** px |
| Button | `paddingVertical` | `Spacing/Padding/Positive/2xs` (DST) | — | — | **8** px |
| Button | `borderRadius` | `component/button/radius` | `border/radius/xs` | — | **4** px |

**Espaçamentos internos (bound no Figma):** `Content` `itemSpacing` → `Spacing/Padding/Positive/xs` (**12** px); `Text` `itemSpacing` → `2xs` (**8** px); `Benefits Category Meta` `itemSpacing` → `Spacing/Padding/Positive/3xs` (**4** px); `Title and sub` `itemSpacing` → `3xs` (**4** px).

### Status = bloqueado — diferenças vs Default

| Elemento | Propriedade RN | Component token | Notas |
|----------|----------------|-----------------|--------|
| Branding | `backgroundColor` | — | **Sem** fill `component/benefits-card-horizontal/branding/bg/default`; em vez disso, `Rectangle 2882` cobre fundo com `component/benefits-card/logo-border/default` → `color/border/default` → **#E6E6E6** (fill de “cinza” por cima do slot de marca) |
| Store logo | `opacity` / blend | — | No Figma: **mix-blend luminosity** na instância do logo — em RN, aproximar com opacidade/`grayscale` se necessário (sem token dedicado inspecionado) |
| Button | `backgroundColor` | `component/benefits-card/action-bg/disabled` | `color/surface/subtle` → `color/ambient/grayscales/10` → **#F2F2F2** |
| Button | `borderColor` / `borderWidth` | — | **Sem** borda secundária visível (instância alinhada ao botão disabled) |
| Lock + label CTA | `color` | `component/benefits-card/action/disabled` | `color/text/label-disabled` → `color/ambient/grayscales/40` → **#B3B3B3** |
| Lock badge (centro) | `backgroundColor` | `component/benefits-card/lock-bg/default` | `color/surface/overlay-strong` → `Color/Ambient/GrayscalesOpacity/50` |
| Lock badge (ícone) | `color` | `component/benefits-card/on-dark/default` | `color/text/on-dark` → `color/ambient/base/light` → **#FFFFFF** |

### Status = utilizado — diferenças vs Default

| Elemento | Propriedade RN | Component token | Notas |
|----------|----------------|-----------------|--------|
| Branding | `backgroundColor` | `component/benefits-card-horizontal/branding/bg/default` | Igual **Default** |
| Button | `backgroundColor` | `component/benefits-card/action-bg/disabled` | Igual **bloqueado** |
| Check + label | `color` | `component/benefits-card/action/disabled` | Igual **bloqueado** |
| Partes decorativas do check | `backgroundColor` / `color` | `Color/Function/PrimaryContrast/Default` | Resolvido **#FAFAFA** no modo inspecionado — **cadeia curta** (sem prefixo `component/` no nome da variável) |

**Textos principais** (título, descrição, meta, vencimento) mantêm os **mesmos** bindings do estado Default em **bloqueado** e **utilizado** (sem tokens de texto “muted” adicionais além do CTA).

---

## Tipografia

| Elemento | Estilo Figma | Family | Size | Weight | Line height |
|----------|--------------|--------|------|--------|---------------|
| Categoria | Mobile/Caption/Caption Regular Small | Be Vietnam Pro · Regular | 12 | 400 | 14 |
| Nome da loja | Mobile/Subtitle/Subtitle Small | Be Vietnam Pro · **Bold** | 14 | 700 | 16 |
| Descrição | Mobile/BodyText/Body Medium | Be Vietnam Pro · Regular | 14 | 400 | 16 |
| Vencimento | Mobile/Caption/Caption Regular Small | Be Vietnam Pro · Regular | 12 | 400 | 14 |
| Label do botão | Mobile/Button/Button Small | Be Vietnam Pro · **Bold** | 12 | 700 | 16 |

Mapear para tokens de tipografia do DS onde existirem (`font.*` / estilos equivalentes no `useTheme()`), mantendo os valores acima como referência do layout publicado.

---

## Espaçamento e dimensões

| Propriedade | Origem (Figma variable / layer) | Valor publicado |
|-------------|----------------------------------|-----------------|
| Largura total do componente | `Status=*` | **343** px |
| Altura total | `Status=*` | **136** px |
| Gap horizontal logo ↔ conteúdo | `sm` (DST) | **16** px |
| Área do logo | `Store Logo` | **136×136** px |
| Largura útil da coluna direita | `Content` | **191** px (343 − 136 − 16) |
| Raio cantos root / logo / botão | `Border/Radius/xs` / `component/button/radius` | **4** px |

---

## Variações por tema

Propriedades que passam por **`color/function/primary/*`**, **`color/interactive/primary/*`**, **`color/function/secondary/*`** e **`color/interactive/secondary/*`** variam entre Neutral, Leblon, Red e Green. Tokens de feedback neutros (`grayscales`, `label-disabled`, `surface/subtle`) tendem a permanecer estáveis — validar no `ThemeContext` ao implementar.

---

## Acessibilidade

- [ ] Contraste: meta e vencimento usam **`color.text.secondary`** sobre fundos claros — validar WCAG (texto secundário pode ficar abaixo de 4.5:1 em alguns temas).
- [ ] **`accessibilityRole`**: root com `Pressable` opcional; botão deve expor **`accessibilityState={{ disabled }}`** em bloqueado/utilizado.
- [ ] **`accessibilityLabel`** composto: loja + benefício + estado (ex.: “Abbraccio, ganhe 20% de desconto, benefício bloqueado”).
- [ ] Touch target: altura do botão no layout é **32** px — **abaixo** do mínimo recomendado (44 pt iOS / 48 dp Android); envolver em `Pressable` com `hitSlop` ou aumentar área tocável no RN.
- [ ] Estado **bloqueado**: o lock central é decorativo; o significado deve constar no label do card ou do botão para leitores de tela.

---

## Restrições e regras

- **Hover** (`*/hover`) existe para web no DS — **ignorar** em RN salvo produto pedir pressed state equivalente.
- **Stroke do logo** (`border/stroke/stroke-medium`) está ligado a **primitivo** sem camada semântica intermediária — possível **violação da cadeia de 3 camadas**; alinhar com design tokens antes de congelar implementação.
- **`Rectangle 2882`** usa token de **borda** (`component/benefits-card/logo-border/default`) como **fill** — documentado aqui como está no Figma; avaliar se o DS deve introduzir token semântico próprio para “máscara de bloqueio”.
- Reutilizar **`Button`** do DS para o estado Default em vez de recriar estilos locais.
- Instâncias remotas: **`Benefits Category Meta`** e ícones internos seguem o mesmo padrão do card vertical — preferir componentes DS existentes quando houver paridade.

---

## Props sugeridas (TypeScript)

```typescript
export type BenefitsCardHorizontalStatus = 'default' | 'locked' | 'used';

export interface BenefitsCardHorizontalProps {
  /** Mapeia `Status` do Figma: Default · bloqueado · utilizado */
  status?: BenefitsCardHorizontalStatus;
  categoryLabel: string;
  storeName: string;
  description: string;
  /** Ex.: "Vence 12/06 às 22h30" — omitir se não houver */
  expirationText?: string;
  productImageSource?: ImageSourcePropType;
  storeLogoSource?: ImageSourcePropType;
  categoryIcon?: React.ReactNode;
  /** Default: "Ativar" */
  activateLabel?: string;
  lockedLabel?: string;
  usedLabel?: string;
  onCardPress?: (event: GestureResponderEvent) => void;
  onActivatePress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { BenefitsCardHorizontal } from '@allos/design-system'; // quando existir

<BenefitsCardHorizontal
  status="default"
  categoryLabel="Sorteio"
  storeName="Abbraccio"
  description="Ganhe 20% de desconto"
  expirationText="Vence 12/06 às 22h30"
  onActivatePress={() => {}}
/>

<BenefitsCardHorizontal
  status="locked"
  categoryLabel="Sorteio"
  storeName="Abbraccio"
  description="Ganhe 20% de desconto"
  expirationText="Vence 12/06 às 22h30"
/>

<BenefitsCardHorizontal
  status="used"
  categoryLabel="Sorteio"
  storeName="Abbraccio"
  description="Ganhe 20% de desconto"
  expirationText="Vence 12/06 às 22h30"
/>
```

---

## Checklist de implementação

- [ ] Novo módulo de tema (`benefitsCardHorizontal` ou extensão coordenada) com todos os **component tokens** desta spec.
- [ ] Cadeia **Component → Semântico → Primitivo** respeitada; exceções (`border/stroke/stroke-medium`, fills do check) documentadas e, se possível, corrigidas no Figma.
- [ ] Layout **horizontal** com dimensões **343×136** e logo **136×136**.
- [ ] Estados **locked** (overlay + lock badge + botão filled disabled) e **used** (sem overlay; botão filled disabled + check).
- [ ] Integração com **`Button`** (Secondary · Small) no estado default.
- [ ] Touch target do CTA ≥ 44×44 pt (ajuste RN).
- [ ] Testes de tema (4 temas) e de acessibilidade (VoiceOver / TalkBack).
- [ ] Atualizar `design.md` §5.10 ou subseção dedicada com **`component.benefits-card-horizontal.*`** após validação com design.

---

## Referências

- Figma: [Benefits Card (horizontal)](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7810-5098&t=V9texaooiIVSgims-4) · fileKey `ZUEzW52KbL0DN9aKGSqwAs`
- Tokens documentados no repo: `design.md` (seção **5.10** — card vertical compartilha família `component.benefits-card.*`)
- Implementação de referência parcial (vertical): `components/react-native/src/components/BenefitsCardVertical/BenefitsCardVertical.tsx`
