# Home Benefícios (logado) — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7499-9022](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7499-9022&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 18 de abril de 2026  

---

## Visão geral

Tela **Home da área de benefícios com usuário logado** (`home-benefits-logado`): status de relacionamento (estrelas / prazo), atalhos do hub de benefícios, **busca**, **filtrar e ordenar**, **carrossel horizontal de categorias** (chip ativo + inativos) e grade **2 colunas** de cards de benefício disponíveis com CTA **Ativar**. Este frame **não inclui bottom navigation** — apenas o conteúdo principal (altura **1650** no arquivo). Estado documentado: **sucesso / lista populada** (dados de exemplo).

---

## Mapa da tela

| Região | Layer/Node | Função | Scroll | Observações |
|--------|------------|--------|--------|-------------|
| Header | `Header` → `header` (`user-status=header-benefits`) | Status do cliente + hub de 4 atalhos | Não (no Figma) | Altura **232**; padding **24/16**; gap **20** entre faixa superior e hub |
| Controles | `Frame 427318933` | Busca, filtro, categorias | Vertical + horizontal | Altura **260**; fundo branco; gap **24** entre blocos |
| Lista | `Frame 427318934` | Título da seção + grade de cards | Vertical (RN) | Altura **1158**; **6** instâncias de `[M] Benefits Card (vertical)` em **3** linhas |

---

## Hierarquia e layout

| Nível | Elemento | Tipo RN sugerido | Auto-layout / direção | Width / Height | Padding / Gap | Observações |
|-------|----------|------------------|------------------------|----------------|-----------------|-------------|
| 1 | `home-benefits-logado` | `SafeAreaView` / `View` | Vertical | **375** / **HUG** (1650) | 0 / 0 | Raiz sem padding |
| 2 | `Header` | `View` | Vertical | Fill / **232** | 0 / 0 | Wrapper local |
| 3 | `header` | Instância DS | Vertical | Fill / **232** | **24** top, **16** h, **24** bottom / gap **20** | `user-status=header-benefits` |
| 2 | `Frame 427318933` | `View` | Vertical | Fill / **260** | **24** v, **16** h / gap **24** | Fundo `color/surface/default` |
| 3 | `Input` | Instância DS | — | **343** × **44** | — | `Type=Text`, `State=Placeholder`, `Size=Medium` |
| 3 | `Button` | Instância DS | — | **155** × **32** (HUG) | — | `Status=Secondary`, `Size=Small`; label **Filtrar & Ordenar** |
| 3 | `Frame 427318931` | `ScrollView` horizontal | Horizontal | **1068** × **88** (conteúdo) | 0 / gap **10** | **11** chips `Shortcuts menu` (1 ativo) |
| 2 | `Frame 427318934` | `View` / `ScrollView` | Vertical | Fill / **1158** | **24** v, **16** h / gap **24** | Fundo `color/surface/default` |
| 3 | Linhas de grade | `View` | Horizontal | Fill / **338** cada | 0 / gap **16** | `SPACE_BETWEEN` + 2 cards **156** px |

---

## Componentes reutilizados

| Elemento | Instância Figma | Variante/Props detectadas | Reuso | Observações |
|----------|-----------------|---------------------------|--------|---------------|
| Cabeçalho benefícios | `header` | `user-status=header-benefits` | DS | Textos: **Você é cliente**, **2 estrelas**, **Aproveite por 90 dias**; faixa superior + `Hub de atalhos` |
| Hub de atalhos | `Hub de atalhos` | `Property 1=Hub de benefícios` | DS | Gap **16** entre ítens **72** px |
| Atalho | `[M] Shortcuts` | `Benefícios ativos`, `Benefícios utilizados`, `Próximas categorias`, `Como funciona?` | DS | Labels conforme canvas |
| Campo de busca | `Input` | `Type=Text`, `State=Placeholder`, `Size=Medium`, footer/label desligados | DS | Placeholder visível: **Buscar** |
| Filtro | `Button` | `Status=Secondary`, `Action=Default`, `Size=Small`, ícone esquerdo | DS | Label: **Filtrar & Ordenar** |
| Categoria (chip) | `Shortcuts menu` | `Type=Vertical`, `Aplication=Category`, `State=Active` ou `Default` | DS | Ativo: fundo **#1B3C7E** (token ver cadeia); inativo: fundo cinza claro |
| Título de seção | `Section title` | `Property 1=Default` | DS | Título **Benefícios disponíveis** + link **Abrir todos** |
| Card de benefício | `[M] Benefits Card (vertical)` | `Action=No branding`, `Store=Abraccio` | DS | Placeholder de conteúdo de exemplo |
| CTA do card | (dentro do card) | — | DS | Label **Ativar** |

**Nota:** a instância `header` pode conter layers de atalhos adicionais com textos repetidos no plugin; a composição principal visível no frame segue o `Hub de atalhos` com quatro variantes listadas acima.

---

## Regiões customizadas

### Containers de grade (`Frame 427318935` … `427318937`)

| Elemento | Propriedade RN | Token/Binding | Valor resolvido (Neutral) | Observações |
|----------|----------------|---------------|---------------------------|-------------|
| Linha da grade | `flexDirection` / gap | — | gap **16** | `SPACE_BETWEEN` no eixo principal |
| Card | largura fixa | — | **156** | Duas colunas em **343** útil (16 gap) |

---

## Tokens por região

### Base

| Região | Elemento | Propriedade RN | Component Token | → Semântico | → Primitivo | Valor Neutral |
|--------|----------|----------------|-----------------|-------------|-------------|-----------------|
| Header (instância) | fundo | `backgroundColor` | — | `color/surface/subtle` | `color/ambient/grayscales/10` | **#F2F2F2** |
| Área de busca/categorias | `Frame 427318933` | `backgroundColor` | — | `color/surface/default` | `color/ambient/base/deep-light` | **#FFFFFF** |
| Input (campo) | fill | `backgroundColor` | `component/input/bg/default` | `color/surface/default` | `color/ambient/base/deep-light` | **#FFFFFF** |
| Categoria ativa | container | `backgroundColor` | `component/shortcuts-menu/active/bg` | `color/surface/brand-strong` | `color/function/primary/action` | **#1B3C7E** (aprox.) |
| Categoria inativa | container | `backgroundColor` | `component/shortcuts-menu/default/bg` | `color/surface/subtle` | `color/ambient/grayscales/10` | **#F2F2F2** |
| Lista | `Frame 427318934` | `backgroundColor` | — | `color/surface/default` | `color/ambient/base/deep-light` | **#FFFFFF** |
| Título seção | texto | `color` | `component/section-title/title/default` | `color/text/body` | `color/ambient/neutral/80` | validar por modo/tema |
| Card — imagem placeholder | `Image` | `backgroundColor` | `component/benefits-card/image-bg/default` | `color/surface/placeholder` | `Color/Ambient/Grayscales/20` (lib) | **#E6E6E6** |
| Card — corpo | `Container` | `backgroundColor` | `component/benefits-card/container-bg/default` | `color/surface/default` | `color/ambient/base/deep-light` | **#FFFFFF** |

**Violações / dívidas**

- `component/benefits-card/image-bg/default` encadeia até **`Color/Ambient/Grayscales/20`** (variável de biblioteca) — tratar como **binding a primitivo remoto** na cadeia ideal Component → Semantic → Primitive local.
- Bordas, raios e tipografia do **Input** e **Button** secondary seguem `get_variable_defs` do node (`component/input/*`, `component/button/*`, `Mobile/Input/Input Medium`, `Mobile/Button/Button Small`, etc.).

### Estados adicionais

Não há frames nomeados de **loading**, **empty**, **error** ou **skeleton** neste node. Documentar no produto quando existirem:

#### Estado: Loading *(placeholder)*

| Região | Elemento | Propriedade RN | Token | Diferença vs Base |
|--------|----------|------------------|-------|-------------------|
| Lista | Grade | — | — | Substituir cards por placeholders/shimmer conforme DS |

#### Estado: Empty *(placeholder)*

| Região | Elemento | Propriedade RN | Token | Diferença vs Base |
|--------|----------|------------------|-------|-------------------|
| Lista | Mensagem | — | — | Ocultar grade; exibir empty state de benefícios |

---

## Tipografia

| Região | Elemento | Font Family | Font Size | Font Weight | Line Height | Valor resolvido |
|--------|----------|-------------|-----------|--------------|---------------|-----------------|
| Status / apoio | linhas de status | Be Vietnam Pro | 12–16 | Regular / SemiBold | conforme estilo | `Mobile/BodyText/Body Small`, `Mobile/Heading/Heading 6` (defs do node) |
| Busca | placeholder | Be Vietnam Pro | 16 | Regular | 20 | `Mobile/Input/Input Medium` |
| Filtro | label botão | Be Vietnam Pro | 12 | Bold | 16 | `Mobile/Button/Button Small` |
| Categorias | labels | Be Vietnam Pro | 10 | Regular | 12 | `Mobile/Caption/Caption Regular xSmall` |
| Seção | título | Be Vietnam Pro | 18 | Bold | 24 | `Mobile/Heading/Heading 5` |
| Card | marca / corpo / data / CTA | Be Vietnam Pro | 12–14 | Bold / Regular | conforme DS | `Mobile/Subtitle/Subtitle Small`, `Mobile/BodyText/Body Medium`, `Mobile/Caption/*` |

---

## Espaçamento e dimensões

| Região | Propriedade | Token (quando aplicável) | Valor | Fonte |
|--------|-------------|---------------------------|-------|-------|
| Raiz | largura lógica | — | **375** | Frame |
| `header` | padding | `spacing/padding/positive/lg` · `sm` | **24** top/bottom, **16** horizontal | Auto-layout |
| `header` | gap | — | **20** | Auto-layout |
| `Frame 427318933` | padding | idem | **24** v, **16** h | Auto-layout |
| `Frame 427318933` | gap entre busca, botão e chips | — | **24** | Auto-layout |
| Carrossel categorias | gap entre chips | — | **10** | `Frame 427318931` |
| Chip categoria | tamanho | — | **88** × **88** | Instância |
| `Frame 427318934` | padding | idem | **24** v, **16** h | Auto-layout |
| `Frame 427318934` | gap título → primeira linha / entre linhas | — | **24** | Auto-layout |
| Grade | gap entre colunas | — | **16** | Linhas horizontais |
| Card | largura | — | **156** | Instância |

**Grid 4 px:** valores principais (**8, 10, 16, 20, 24**) — **10** quebra múltiplo estrito de 4; alinhar com DS ou confirmar intenção no Figma.

---

## Navegação e comportamento

- **Entrada na tela:** acesso por push ou troca de aba a partir dos seguintes pontos da experiência:
  - clique em **Meus benefícios** no hub de atalhos da home;
  - clique em **Abrir todos** na seção de benefícios;
  - clique no item **Benefícios** no bottom menu.
- **Saída da tela:** back do stack ou troca de aba na bottom nav **fora** deste layout.
- **Scroll:** **vertical** para a página inteira; **horizontal** para categorias (`Frame 427318931`, largura conteúdo **1068**).
- **Elementos fixos:** nenhum no frame; opcionalmente fixar barra de busca no RN conforme produto.
- **Gestos:** arraste horizontal nas categorias; toque em chip altera filtro ativo; busca e “Filtrar & Ordenar” abrem fluxos próprios.
- **Dependências de estado:** autenticação (logado), catálogo de benefícios, categorias, favoritos/filtros.

---

## Variações por tema

Documentar no código via resolução de variáveis em modo (**NeutralTheme**, **LeblonTheme**, **RedTheme**, **GreenTheme**). Tokens críticos para diff visual: `color/function/primary/action`, `component/shortcuts-menu/active/*`, `component/button/secondary/*`, `color/text/body`.

---

## Acessibilidade

- [ ] Contraste do chip ativo (fundo escuro + texto/ícone claro) — WCAG AA.
- [ ] Contraste do botão secondary “Filtrar & Ordenar” (borda/teal) sobre branco.
- [ ] Ordem de foco: status → hub → busca → filtro → categorias → título/link → grade.
- [ ] `accessibilityRole` em chips selecionáveis, busca e botões.
- [ ] `accessibilityLabel` nos ícones; estado selecionado anunciado nos chips.
- [ ] Touch target: chips **88** px atendem altura; confirmar área tocável do botão filtro (**32** px altura — pode precisar **minHeight** 44 ou hitSlop).
- [ ] Campo de busca: `accessibilityHint` para placeholder “Buscar”.

---

## Regras e restrições

- Não hardcodar cores, espaçamentos ou tipografia fora dos tokens do tema.
- Reutilizar `header`, `Input`, `Button`, `Shortcuts menu`, `Section title` e `[M] Benefits Card (vertical)` do DS.
- Ignorar código web gerado por `get_design_context` na implementação RN.
- Corrigir **gap 10** vs grid 4 px se o DS exigir múltiplos de 4.

---

## Arquitetura sugerida em React Native

```tsx
<ScreenRoot>
  <ScrollView>
    <HeaderBenefitsLoggedIn /> {/* user-status=header-benefits */}
    <View style={controlsSurface}>
      <SearchInput placeholder="Buscar" />
      <FilterSortButton />
      <CategoryChipsCarousel />
    </View>
    <View>
      <SectionTitle title="Benefícios disponíveis" linkLabel="Abrir todos" />
      <BenefitsGrid columns={2} gap={16} data={benefits} />
    </View>
  </ScrollView>
</ScreenRoot>
```

---

## Checklist de implementação

- [ ] Estrutura com **3** regiões principais na ordem do Figma (`Header`, `Frame 427318933`, `Frame 427318934`)
- [ ] **6** cards (`[M] Benefits Card (vertical)`) em **3** linhas × **2** colunas
- [ ] **11** categorias com primeiro chip **Active** (“Todos os benefícios”)
- [ ] Tokens de superfície e chips resolvidos via tema
- [ ] Scroll vertical + carrossel horizontal de categorias
- [ ] Estados loading/empty/error quando o produto definir
- [ ] Cruzar com `references/design.md` quando disponível no repositório

---

## Referência cruzada

O arquivo `references/design.md` **não foi encontrado** no workspace na geração desta spec; validar nomenclatura e temas contra esse documento quando existir.
