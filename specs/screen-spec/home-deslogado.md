# Home (deslogado) — Especificação Técnica

> **Design System:** Allos DS · React Native  
> **Figma node:** [https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7401-7807](https://www.figma.com/design/ZUEzW52KbL0DN9aKGSqwAs/01---Tokens---React-Native?node-id=7401-7807&t=nPVDWzQSFvlSX3aC-4)  
> **Plataforma:** React Native (iOS + Android)  
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme  
> **Última atualização:** 18 de abril de 2026  

---

## Visão geral

Tela **Home do app em estado deslogado**: feed vertical de marketing, atalhos, programa de relacionamento, carrosséis de benefícios/marcas/restaurantes/eventos/notícias/filmes, bloco de endereço do shopping e **bottom navigation** fixa. Objetivo: descoberta de serviços do mall, login/cadastro e acesso rápido a áreas operacionais (estacionamento, cinema, etc.). Estado documentado: **sucesso / conteúdo estático** (sem variantes explícitas de loading, empty ou erro neste frame).

---

## Mapa da tela

| Região | Layer/Node | Função | Scroll | Observações |
|--------|------------|--------|--------|-------------|
| Header | `header` (instância `user-status=deslogado`) | Faixa institucional + login, hub de atalhos | Não (no Figma) | Altura total **284**; inclui `banner-login-sign-up` + `carrousel-header-deslogado` |
| Hero / Banner | `Banner` | Carrossel principal + dotnav | Não (no Figma) | Imagem **375×211** + `Dotnav` (4 slides) |
| Loyalty CTA | `Frame 427318926` → `Benefits Content Card` | Card “Desbloqueie benefícios” + CTA | Não | Padding vertical externo **12** |
| Benefícios | `Frame 11020` | Título de seção + carrossel horizontal de cards | Sim (horizontal no RN) | Carrossel interno **672** px de largura total no layout |
| Nossas marcas | `Frame 11021` | Título + link “Abrir todos” + carrossel de lojas | Sim (horizontal) | Carrossel `carrousel-store` **640** px |
| Restaurantes | `Frame 11023` | Título + 3 itens `Shortcuts menu` | Não (no Figma) | Fundo de seção `color/surface/subtle` |
| Eventos | `Frame 11024` | Título + carrossel de `Event Card` | Sim (horizontal) | Carrossel **842** px |
| Fique por dentro | `Frame 11025` | Título + carrossel de cards de notícia | Sim (horizontal) | Carrossel **842** px |
| Filmes em cartaz | `Frame 11026` | Fundo escuro + carrossel de pôsteres | Sim (horizontal) | Fundo `color/surface/dark` |
| Endereço | `Endereço` | Logo/nome do mall, endereço, CTAs secundários | Não | Fundo ligado a token de biblioteca (ver dívida técnica) |
| Bottom nav | `[M] Bottom Menu` | Navegação principal | Não | **86** px altura; fixa no rodapé no RN |

**Nota de implementação:** no Figma a tela é um **FRAME alto (2863 px)** com filhos em coluna. No React Native, modele como **área rolável** (`ScrollView` / `FlashList` + headers) **acima** da bottom bar, com **safe area** no topo para o conteúdo do header/banner.

---

## Hierarquia e layout

| Nível | Elemento | Tipo RN sugerido | Auto-layout / direção | Width / Height | Padding / Gap | Observações |
|-------|----------|------------------|------------------------|----------------|-----------------|-------------|
| 1 | `home-deslogado` | `View` (ou `Screen` do app) | Vertical | **375** / **HUG** (2863 no arquivo) | 0 / 0 | Raiz sem padding |
| 2 | `header` | `View` / composição DS | Vertical | Fill / **284** | 0 / 0 | Instância `user-status=deslogado` |
| 2 | `Banner` | `View` | Vertical | 375 / **247** | top 0, bottom **16** / gap **16** | Centro no eixo cruzado |
| 2 | `Frame 427318926` | `View` | Vertical | Fill / **208** | **12** vertical / 0 | Centraliza filho |
| 2 | `Frame 11020` … `Endereço` | `View` | Vertical (cada seção) | Fill / alturas **400, 198, 192, 342, 292, 382, 232** | majoritariamente **16** horizontal, **24** vertical (ver seções) | Várias seções com gap **16** |
| 2 | `[M] Bottom Menu` | DS / `View` fixa | Horizontal | 375 / **86** | bottom **16** / gap 0 | Último filho da raiz |

---

## Componentes reutilizados

| Elemento | Instância Figma | Variante/Props detectadas | Reuso | Observações |
|----------|-----------------|---------------------------|--------|---------------|
| Shell header deslogado | `header` | `user-status=deslogado` | DS | Contém `banner-login-sign-up` + área de atalhos |
| Banner topo login | `[m-banner-login-sign-up` | (default) | DS | Padding **24/16/16/16**, gap **8** |
| Link sublinhado | `[m-link-underline` | `Style=Default`, `Size=Small`, texto “Entre ou cadastre-se” | DS | |
| Hub de atalhos | `Hub de atalhos` | `Property 1=Hub home deslogada` | DS | Contém várias instâncias `[M] Shortcuts` |
| Atalho | `[M] Shortcuts` | Variantes `Type=Estacionamento`, `Central de ajuda`, etc. | DS | **Inconsistência no arquivo:** várias instâncias repetem `Type=Histórico de recibos` apesar do layout de “hub” — validar intenção com design antes do handoff final |
| Banner principal | `Banner` | Componente `Banner` | DS | Imagem + `Dotnav` |
| Paginação | `Dotnav` | `Slides=4`, horizontal | DS | Indicadores com tokens `component/dotnav/dot/*` |
| Card relacionamento | `Benefits Content Card` | default | DS | CTA `Button` primary small |
| Botão CTA | `Button` | `Status=Primary`, `Size=Small`, `FullWidth=Off`, ícone esquerdo ligado | DS | Label real no canvas: **“Enviar nota”** (texto diverge da prop `Text#2821:0` “Button large”) |
| Título de seção | `Section title` | `Property 1=Default` ou `Negative` (filmes) | DS | |
| Link “Abrir todos” | `[M] Link Bold` | `Style=Default` ou `Negative` + ícone à direita | DS | |
| Card benefício | `[M] Benefits Card (vertical)` | `Action=disabled`, `Store=Abraccio` | DS | Carrossel horizontal |
| Carrossel lojas | `carrousel-store` | — | DS | `card-store-item` repetido |
| Menu restaurantes | `Shortcuts menu` | `Type=Vertical`, `Aplication=Menu`, `Feature=Reserva de mesa` / `Cardapio digital` / `Fila online` | DS | 3 colunas com `layoutGrow` implícito (~**103.67** px cada) |
| Card evento | `Event Card` | `Event=Empodera`, `Device=Default` | DS | |
| Card notícia | `Fique por dentro Card` | `Property 1=[M] Fique por dentro` | DS | |
| Pôster filme | `[M] Movie Poster` | `Example=1` | DS | Seção com `Section title` negativo |
| Endereço / ações | (sub-frames em `Endereço`) | — | Composição | CTAs “Mapa indoor” / “Ver horários” (detalhar em spec de componente se existir) |
| Bottom navigation | `[M] Bottom Menu` | `Variants=default` | DS | Itens: Início, Benefícios, Enviar nota, Lojas, Menu |

---

## Regiões customizadas

Não há grandes blocos “detached” fora de componentes: a maior parte é instância de DS. **Composição custom** apenas nos **frames numerados** (`Frame 11019`, `Frame 11025`, etc.) que agrupam instâncias — no RN isso vira **containers** com padding/gap espelhando auto-layout.

---

## Tokens por região

Valores **Neutral** amostrados a partir de `boundVariables` + cadeias resolvidas (primeiro modo retornado pelo plugin). Hex finais no dispositivo seguem o **modo de tema** ativo.

### Base (seleção crítica)

| Região | Elemento | Propriedade RN | Component Token | → Semântico | → Primitivo / biblioteca | Valor amostrado (Neutral) |
|--------|----------|----------------|-----------------|-------------|---------------------------|---------------------------|
| Header (fundo claro) | `header` | `backgroundColor` | — | `color/surface/subtle` | `color/ambient/grayscales/10` | **#F2F2F2** |
| Faixa login | `banner-login-sign-up` | `backgroundColor` | — | `color/ambient/neutral/80` | *(primitivo na coleção 68:1307)* | ver editor de tema |
| Textos faixa | textos | `color` | — | `color/text/inverse` | `color/ambient/base/deep-light` | **#FFFFFF** |
| Área hub (fundo) | `carrousel-header-deslogado` | `backgroundColor` | **dívida:** bind direto | — | `Color/Ambient/Grayscales/10` (biblioteca) | **#F2F2F2** |
| Banner seção | `Banner` | `backgroundColor` | `component/banner/bg/default` | `color/surface/card` | `color/ambient/base/light` | **#FAFAFA** |
| Card loyalty | `Benefits Content Card` | `backgroundColor` | `component/benefits-content-card/surface/default` | `color/surface/card` | `color/ambient/base/light` | **#FAFAFA** |
| | borda | `borderColor` | `component/benefits-content-card/border/default` | `color/border/default` | `color/ambient/grayscales/20` | **#E6E6E6** |
| | título/corpo | `color` | `component/benefits-content-card/text/default` | `color/text/body` | `color/ambient/neutral/80` | **#414958** (RGB no node) |
| | estrelas (fundo interno) | `backgroundColor` | `component/benefits-content-card/surface/inner` | `color/surface/default` | `color/ambient/base/deep-light` | **#FFFFFF** |
| CTA “Enviar nota” | `Button` | `backgroundColor` | `component/button/primary/bg/default` | `color/interactive/primary/default` | `color/function/primary/default` | ver tema |
| Dot ativo | indicador | `color` | `component/dotnav/dot/active` | `color/indicator/default` | `Color/Function/Primary/Action` (lib tema) | ver tema |
| Dot inativo | indicador | `color` | `component/dotnav/dot/inactive` | `color/indicator/muted` | `Color/Ambient/Grayscales/30` | **#CCCCCC** (defs) |
| Seção Restaurantes | `Frame 11023` | `backgroundColor` | — | `color/surface/subtle` | `color/ambient/grayscales/10` | **#F2F2F2** |
| Cards evento/notícia | instâncias | `backgroundColor` | `component/event-card/bg/default` / `component/fique-por-dentro-card/bg/default` | `color/surface/card` | `color/ambient/base/light` | **#FAFAFA** |
| Filmes em cartaz | `Frame 11026` | `backgroundColor` | `color/surface/dark` | — | `Color/Ambient/Base/Dark` (lib) | **#1A1A1A** |
| Bottom menu | barra | `backgroundColor` | **dívida:** bind direto | — | `Color/Ambient/Base/Deep Light` (lib) | **#FFFFFF** |
| Endereço (fundo) | `Endereço` | `backgroundColor` | **dívida:** bind direto | — | `Color/Ambient/Base/Light` (lib) | **#FAFAFA** |

**Violações / dívidas (arquitetura de tokens)**

- `carrousel-header-deslogado`, `Endereço` e `[M] Bottom Menu` usam **variáveis de biblioteca “Color/…”** sem passar por tokens semânticos do arquivo de componente — registrar como **binding direto a primitivo remoto** / inconsistente com a cadeia ideal **Component → Semantic → Primitive** dentro do arquivo de produto.
- `component/benefits-content-card/text/default` resolve para `color/text/body` → alias para `color/ambient/neutral/80` com **RGB no paint do texto (#414958)** e **RGB distinto** na amostra do primeiro modo da variável `color/ambient/neutral/80` via API — tratar como **possível divergência multi-modo**; validar em todos os temas no Figma.

---

## Tipografia

Estilos nomeados no arquivo (referência para handoff; aplicar via tema/tokens de tipo):

| Região | Elemento | Estilo Figma (referência) |
|--------|----------|---------------------------|
| Faixa login | corpo + link | `Mobile/BodyText/Body Medium`, `Mobile/Link/Link Small Underline` |
| Título loyalty | “Desbloqueie benefícios” | `Mobile/Heading/Heading 6` (16/600, lh 20, letterSpacing -1%) |
| Descrição loyalty | corpo | `Mobile/BodyText/Body Medium` |
| CTA loyalty | botão | `Mobile/Button/Button Small` |
| Títulos de seção | — | `Mobile/Heading/Heading 5` (18/700) |
| Links “Abrir todos” | — | `Mobile/Link/Link Small Bold` |
| Textos de apoio / captions em cards | — | `Mobile/Caption/*`, `Mobile/BodyText/Body Small` |
| Filmes (título seção negativo) | — | `Mobile/Heading/Heading 5` + link negativo |
| Bottom menu | — | `Mobile/Caption/Caption` / caption bold conforme item |

Fonte: **Be Vietnam Pro** (família consistente nos estilos mobile do arquivo).

---

## Espaçamento e dimensões

| Região | Propriedade | Valor | Fonte |
|--------|-------------|-------|-------|
| Raiz | largura lógica | **375** | Frame |
| Banner | padding inferior | **16** | Auto-layout |
| Banner | gap imagem → dotnav | **16** | Auto-layout |
| Faixa login | padding | **24** top, **16** demais lados | Auto-layout |
| Faixa login | gap entre textos | **8** | Auto-layout |
| Hub header | padding | **24** top/bottom, **16** horizontal | `carrousel-header-deslogado` |
| Hub header | gap interno | **24** | Mesmo frame |
| Card loyalty wrapper | padding vertical | **12** | `Frame 427318926` |
| Card loyalty | padding interno | **16** | `Benefits Content Card` |
| Card loyalty | gap interno | **12** | idem |
| Seções conteúdo | padding típico | **16** horizontal, **24** vertical | `Frame 11020`, `11021`, … |
| Seção Eventos / Fique por dentro | padding top | **8** (vs **24** nas outras) | `Frame 11024`, `Frame 11025` |
| Filmes | padding | **16** h, **24** bottom, **16** top | `Frame 11026` |
| Carrosséis internos | gap entre cards | **16** | Vários `HORIZONTAL` |
| Bottom menu | padding inferior barra | **16** | Instância |

**Grid 4 px:** valores listados são múltiplos de 4 ou 8.

---

## Navegação e comportamento

- **Entrada:** provável rota raiz da bottom nav (**Início** ativo no estado deslogado).
- **Saída / transições:** links “Entre ou cadastre-se”, “Abrir todos”, cards clicáveis, atalhos do hub, CTAs do endereço, itens da bottom bar.
- **Scroll:** vertical para a página; **horizontal** independente em cada carrossel (`ScrollView` horizontal ou `FlatList` horizontal aninhada com `nestedScrollEnabled` no Android).
- **Fixos:** `[M] Bottom Menu` (86 px + safe area inferior).
- **Gestos:** carrosséis arrastáveis; hero banner provavelmente paginado (4 slides).
- **Estados:** apenas conteúdo estático visível neste node — **sem** frames nomeados de loading/empty/error anexados.

---

## Variações por tema

Os tokens listados (`color/*`, `component/*`, `Color/*` de bibliotecas) são **variables com modos** (Neutral, Leblon, Red, Green). Implementar via **ThemeProvider** / tokens resolvidos em runtime. Para diff visual por tema, exportar do Figma (modo a modo) após cruzar com `references/design.md` quando disponível.

---

## Acessibilidade

- [ ] Contraste: seção **Filmes em cartaz** (fundo `#1A1A1A` + textos claros) — validar WCAG AA.
- [ ] Ordem de foco: topo → carrosséis → endereço → bottom bar.
- [ ] `accessibilityRole` em links (`Pressable`) e botões.
- [ ] `accessibilityLabel` nos ícones de atalhos e na bottom bar.
- [ ] Touch target: atalhos e itens da bottom menu — conferir **mínimo 44×44** (ícones base **24** px podem precisar de hitSlop/padding).
- [ ] Carrosséis: anunciar posição (“1 de 4”) se for padrão de produto.

---

## Regras e restrições

- Não hardcodar cores, espaçamentos ou tipografia fora dos tokens; preferir nomes do DS / tema.
- Corrigir **bindings diretos em primitivos de biblioteca** quando houver token semântico equivalente no arquivo de produto.
- Respeitar safe areas e barras nativas.
- Reutilizar componentes do DS antes de recriar blocos.
- Documentar overrides de instância (ex.: label “Enviar nota” vs prop interna).

---

## Arquitetura sugerida em React Native

```tsx
<ScreenRoot>
  <ScrollArea contentContainerStyle={{ paddingBottom: bottomInset + 86 }}>
    <HeaderDeslogado />
    <HomeBanner />
    <LoyaltyCard />
    <BenefitsCarousel />
    <BrandsCarousel />
    <RestaurantsRow />
    <EventsCarousel />
    <NewsCarousel />
    <MoviesCarousel />
    <MallAddressBlock />
  </ScrollArea>
  <BottomMenu variant="default" />
</ScreenRoot>
```

---

## Checklist de implementação

- [ ] Hierarquia 1:1 com os **11** filhos diretos de `7401:7807` na ordem do Figma
- [ ] Tokens via tema; revisar binds “Color/*” de biblioteca
- [ ] Carrosséis horizontais com gap **16** e larguras fixas de card conforme componentes
- [ ] Resolver inconsistência de variantes do **Hub de atalhos** com o design visual
- [ ] CTA do card de benefícios com label **“Enviar nota”**
- [ ] Safe area + bottom bar fixa
- [ ] Cruzar com `references/design.md` quando disponível no repositório

---

## Referência cruzada

O arquivo `references/design.md` **não estava presente** no workspace no momento da geração; recomenda-se validar tokens e temas contra esse documento quando existir.
