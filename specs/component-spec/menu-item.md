# Menu Item — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7506-9672](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7506-9672&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 18 de abril de 2026  

---

## Visão geral

Linha de **menu / lista acionável**: ícone leading opcional, **rótulo** expansível, **chevron** trailing e **divisor** horizontal opcional. Pensado para ações em listas (ex.: “Conectar Wi‑Fi”), com variante visual **Default** (fundo claro) e **Negative** (texto/ícone para uso sobre superfícies escuras — validar contexto de produto). Propriedades booleanas **Icon** e **Divider** controlam presença do ícone Wi‑Fi e da linha inferior.

---

## Anatomia

| # | Elemento | Tipo RN sugerido | Figma (referência) | Descrição |
|---|----------|------------------|--------------------|-----------|
| 1 | Root | `Pressable` / `View` | `Style=Default` / `Style=Negative` | Coluna vertical; padding 0; gap 0 |
| 2 | Row | `View` | `Frame 11025` | `flexDirection: 'row'`, alinhamento vertical ao centro |
| 3 | Leading icon | `View` + ícone (DS ou SVG) | `wifi-web` | **24×24** quando `icon=true` |
| 4 | Label | `Text` | `Conectar Wi-fi` | Ocupa espaço flexível (`flex: 1`) |
| 5 | Chevron | `View` + ícone | `arrow-right` | **16×16**; espelhado horizontalmente no Figma (`scaleX: -1`) |
| 6 | Divider | `View` + linha | `Vector 492` | Altura 0, stroke **1**; largura total quando `divider=true` |

---

## Variantes e propriedades

| Propriedade (Figma) | Tipo | Valores | Default |
|----------------------|------|---------|---------|
| `Style` | VARIANT | `Default` · `Negative` | `Default` |
| `Icon` | BOOLEAN | `true` · `false` | `true` |
| `Divider` | BOOLEAN | `true` · `false` | `true` |

**Variantes publicadas no arquivo:** apenas combinações de **`Style`** aparecem como filhos do `COMPONENT_SET` (`Style=Default`, `Style=Negative`), ambas com **319×64** px. Comportamento de `Icon` e `Divider` deve seguir as props do componente (booleanas); no RN, omitir o nó do ícone ou do divisor quando `false`.

---

## Tokens por variante e estado

Nomes em **dot notation** como no `design.md` (no Figma as variáveis usam `/` equivalentes).

### Style: Default

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo (Neutral) | Valor Neutral |
|----------|----------------|-----------------|-------------|------------------------|---------------|
| Leading icon (fill) | `color` | `component.menu-item.icon.leading.default` | `color.icon.brand-strong` | `color.function.primary.action` | **#1B3C7E** |
| Label | `color` | `component.menu-item.text.default` | `color.text.body` | `color.ambient.neutral.80` | **#414958** |
| Chevron (fill) | `color` | `component.menu-item.chevron.default` | `color.text.body` | `color.ambient.neutral.80` | **#414958** |
| Divider | `borderColor` / stroke | `component.menu-item.divider.default` | `color.border.card` | `color.ambient.neutral.20` | **#E2E4E9** |

**Cadeia semântica (ícone Negative no DS):** `color.icon.negative` resolve ainda em variável de biblioteca **`Color/Function/Primary/Light`** — documentado no DS; aceitável como folha de alias até unificação em primitivo local.

### Style: Negative

| Elemento | Propriedade RN | Component token | → Semântico | → Primitivo (Neutral) | Valor Neutral |
|----------|----------------|-----------------|-------------|------------------------|---------------|
| Leading icon (fill) | `color` | `component.menu-item.icon.leading.negative` | `color.icon.negative` | *(Primary/Light lib)* | **#D5E0F6** |
| Label | `color` | `component.menu-item.text.negative` | `color.text.on-dark` | `color.ambient.base.light` | **#FAFAFA** |
| Chevron | `color` | `component.menu-item.chevron.negative` | `color.text.on-dark` | `color.ambient.base.light` | **#FAFAFA** |
| Divider | stroke | `component.menu-item.divider.negative` | `color.border.input` | `color.ambient.grayscales.50` | **#999999** |

*(Quando `divider=false`, não renderizar o divisor; tokens de divisor não se aplicam.)*

---

## Tipografia

| Elemento | Estilo Figma (referência) | Font Family | Size | Weight | Line height | Letter spacing |
|----------|---------------------------|-------------|------|--------|-------------|----------------|
| Label | `Mobile/BodyText/Body Large` | Be Vietnam Pro | 16 | 400 (Regular) | 24 px | 0 |

---

## Espaçamento e dimensões

| Propriedade | Token (Figma / doc) | Valor (Neutral) | Fonte |
|-------------|---------------------|-----------------|-------|
| Largura do componente | — | **319** px | COMPONENT |
| Altura do componente | — | **64** px | COMPONENT |
| Row — `paddingTop` / `paddingBottom` | `spacing.padding.positive.md` | **20** px | `boundVariables` → `Spacing/Padding/Positive/md` |
| Row — `paddingLeft` / `paddingRight` | `spacing.padding.positive.none` | **0** px | idem |
| Row — `gap` (ícone · label · chevron) | `spacing.padding.positive.xs` | **12** px | `Spacing/Padding/Positive/xs` |
| Root — padding / gap | `none` / `0` | **0** | Auto-layout raiz |
| Divider | `strokeWeight` | **1** px | VECTOR (sem variável de espessura nos defs do node) |
| Leading icon | tamanho | **24×24** | Layout |
| Chevron | tamanho | **16×16** | Layout |

**Grid 4 px:** 12, 16, 20, 24 e 64 são múltiplos de 4.

---

## Variações por tema

Cores que passam por `color.function.primary.*` e `color.ambient.neutral.*` **variam por modo** (Neutral, Leblon, Red, Green). Os hex da coluna “Valor Neutral” referem-se ao **NeutralTheme**. Implementação via `useTheme()` / resolução de variáveis, sem hex fixo no código.

---

## Acessibilidade

- [ ] Contraste: variante **Negative** com texto `#FAFAFA` só é válida sobre **fundo escuro** — sobre branco falha WCAG; usar apenas no contexto aprovado pelo design.
- [ ] Contraste **Default**: corpo `#414958` sobre branco — verificar ratio ≥ 4.5:1 (texto 16px).
- [ ] `accessibilityRole="button"` (ou `menuitem` se dentro de menu) no container tocável.
- [ ] `accessibilityLabel`: se o label for genérico, garantir que o texto visível seja lido; ícones decorativos com `accessible={false}`.
- [ ] Área tocável: altura da linha **64** px atende ≥ 44 pt em muitos dispositivos; se o hit slop for menor, expandir com `Pressable` / `minHeight`.
- [ ] Chevron: anunciar como parte da ação (“abre detalhe”) apenas se o padrão de produto exigir.

---

## Restrições e regras

- Não usar cores primitivas diretas no RN — apenas **component → semantic** via tema.
- O código gerado por `get_design_context` (Tailwind / classes web) é **só referência visual**, não fonte de tokens.
- **Hover** de tokens do DS aplica-se a web; em RN, ignorar estados `*/hover` se existirem em aliases futuros.

---

## Props da interface (TypeScript)

```typescript
type MenuItemStyle = 'default' | 'negative';

export interface MenuItemProps {
  /** Texto da linha (ex.: conteúdo do nó de texto no Figma). */
  label: string;
  /** Variante visual — espelha `Style` do COMPONENT_SET. */
  style?: MenuItemStyle;
  /** Exibe ícone leading (Wi‑Fi no Figma). */
  icon?: boolean;
  /** Exibe divisor inferior. */
  divider?: boolean;
  onPress?: () => void;
  testID?: string;
}
```

---

## Exemplo de uso (React Native)

```tsx
import { MenuItem } from '@allos/design-system';

<MenuItem
  label="Conectar Wi-fi"
  style="default"
  icon
  divider
  onPress={() => {}}
/>

<MenuItem
  label="Conectar Wi-fi"
  style="negative"
  icon
  divider
  onPress={() => {}}
/>
```

---

## Checklist de implementação

- [ ] Tokens de cor via tema (`component.menu-item.*` → semânticos)
- [ ] Tipografia `Mobile/BodyText/Body Large` (16/24, Regular)
- [ ] Espaçamentos: padding vertical **20**, gap **12**, ícone **24**, chevron **16**
- [ ] Variantes `default` e `negative` com tokens distintos conforme tabelas
- [ ] Props `icon` e `divider` condicionando renderização
- [ ] Chevron com inversão horizontal se o ícone do DS não vier espelhado
- [ ] Funciona nos quatro temas via `ThemeContext` / `useTheme()`
- [ ] Cruzado com **`design.md` §5.4b Menu Item** (`/Users/jonathanfernandes/ds-react/design.md`)
