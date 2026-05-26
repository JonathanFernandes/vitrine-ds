# Design System — React Native

## Tokens, Definições e Decisões de Design

> **Versão:** 2.9.0
> **Data:** 26/05/2026
> **Status:** Auditoria Figma↔doc concluída — 0 divergências nos tokens de cor do **Radio-button** (`8041:6995`); demais componentes conforme versões anteriores
> **Plataforma:** React Native (iOS + Android) · Web (futuro)
> **Temas suportados:** NeutralTheme · LeblonTheme · RedTheme · GreenTheme
> **Coleções no Figma:** Primitive tokens · Semantic Tokens · Component Tokens · Typography · Elevation Tokens · Motion Tokens · Z-Index Tokens

---

## Índice

1. [Arquitetura de Tokens](#1-arquitetura-de-tokens)
2. [Decisões de Design](#2-decisões-de-design)
3. [Tokens Primitivos](#3-tokens-primitivos)
4. [Tokens Semânticos](#4-tokens-semânticos)
5. [Component Tokens](#5-component-tokens)
6. [Tipografia](#6-tipografia)
7. [Espaçamento](#7-espaçamento)
8. [Bordas](#8-bordas)
9. [Elevation Tokens](#9-elevation-tokens)
10. [Motion Tokens](#10-motion-tokens)
11. [Z-Index Tokens](#11-z-index-tokens)
12. [Temas Multi-Brand](#12-temas-multi-brand)
13. [Visual Theme & Atmosfera](#13-visual-theme--atmosfera)
14. [Do's and Don'ts](#14-dos-and-donts)
15. [Comportamento Responsivo](#15-comportamento-responsivo)
16. [Agent Prompt Guide](#16-agent-prompt-guide)

---

## 1. Arquitetura de Tokens

O Design System adota uma arquitetura de **3 camadas**, inspirada no modelo W3C Design Tokens e Style Dictionary:

```
┌─────────────────────────────────────────────────┐
│  LAYER 3 — Component Tokens                     │
│  component.button.primary.bg.default            │
│    → {color.interactive.primary.default}        │
├─────────────────────────────────────────────────┤
│  LAYER 2 — Semantic Tokens                      │
│  color.interactive.primary.default              │
│    → {color.function.primary.default}           │
├─────────────────────────────────────────────────┤
│  LAYER 1 — Primitive Tokens                     │
│  color.function.primary.default = #4274D6       │
│  color.ambient.grayscales.10 = #F2F2F2          │
└─────────────────────────────────────────────────┘
```

**Regra de ouro:** Componentes React Native **nunca** referenciam tokens primitivos diretamente. Sempre passam pela camada semântica.

---

## 2. Decisões de Design

### D-001 · Fonte única: Be Vietnam Pro

**Decisão:** Toda a tipografia usa a família Be Vietnam Pro.
**Justificativa:** Garante consistência entre os 50+ apps; a fonte tem excelente legibilidade em tamanhos mobile e suporte a caracteres PT-BR.
**Impacto:** Sem fallback de fonte diferente por tema — apenas peso e tamanho variam.

### D-002 · Grid de 4px

**Decisão:** Toda a escala de espaçamento é múltiplo de 4px (3xs=4, 2xs=8, xs=12…).
**Justificativa:** 4px é o menor incremento visível consistente em telas de alta densidade (MDPI, HDPI, @2x, @3x). Facilita alinhamento entre designers e devs.
**Impacto:** Valores fora do grid (ex: padding de 6px, 10px) não são permitidos.

### D-003 · Feedback colors universais entre temas

**Decisão:** Error, Success, Warning e Info têm os mesmos valores em todos os temas.
**Justificativa:** Cores de feedback têm significado funcional (vermelho = erro) que não deve ser sobrescrito por branding.
**Impacto:** Mais fácil de garantir acessibilidade — apenas um conjunto de contrastes a validar.

### D-004 · Naming convention: dot-notation com kebab-case

**Decisão:** Tokens seguem dot-notation com kebab-case para segmentos compostos: `color.ambient.base.deep-light`, `font.letter-spacing.tight`, `border.stroke.stroke-thin`.
**Justificativa:** Compatível com Style Dictionary e exportação JSON. No Figma, o separador `/` converte para `.` no código.
**Impacto:** Segmentos com uma palavra ficam em lowercase (`default`, `primary`). Segmentos com múltiplas palavras usam hífen (`deep-light`, `brand-subtle`, `hover`).

### D-005 · Multi-brand via modo de variável no Figma

**Decisão:** Cada tema (NeutralTheme, LeblonTheme, RedTheme, GreenTheme) é um **modo** da coleção de variáveis.
**Justificativa:** Permite trocar 100% das cores de um app apenas mudando o modo ativo — sem duplicar componentes.
**Impacto:** No React Native, o tema é injetado via ThemeContext e aplicado globalmente.

### D-006 · Escala de border radius por tema

**Decisão:** Os tokens `border.radius.2xs` e `border.radius.xs` variam por tema (NeutralTheme: 1/4px, LeblonTheme: 1/2px, RedTheme: 2/4px, GreenTheme: 2/4px).
**Justificativa:** O LeblonTheme tem personalidade visual mais "clássica" (menos arredondado) enquanto outros temas são mais contemporâneos.
**Impacto:** Componentes com `borderRadius` pequeno terão aparência diferente por tema — comportamento esperado e intencional.

### D-007 · Hover state apenas para web

**Decisão:** Tokens `*/hover` existem na camada semântica e de componentes mas são ignorados em React Native (sem cursor).
**Justificativa:** O arquivo de tokens é fonte única para RN e web future. Hover não causa efeito em touch — safe to include.
**Impacto:** `primary.light` **nunca** deve ser usado como hover de botão preenchido. O único uso correto de `primary.light` em estado interativo é `color.interactive.ghost.hover.bg`.

---

## 3. Tokens Primitivos

> Valores absolutos. **Nunca use diretamente em componentes — sempre passe pelos Semantic Tokens.**

### 3.1 Cores — Ambient (Universais)

#### Base


| Token                           | Valor     |
| ------------------------------- | --------- |
| `color.ambient.base.light`      | `#FAFAFA` |
| `color.ambient.base.dark`       | `#1A1A1A` |
| `color.ambient.base.deep-light` | `#FFFFFF` |
| `color.ambient.base.deep-dark`  | `#000000` |


#### Grayscale


| Token                          | Valor     |
| ------------------------------ | --------- |
| `color.ambient.grayscales.10`  | `#F2F2F2` |
| `color.ambient.grayscales.20`  | `#E6E6E6` |
| `color.ambient.grayscales.30`  | `#CCCCCC` |
| `color.ambient.grayscales.40`  | `#B3B3B3` |
| `color.ambient.grayscales.50`  | `#999999` |
| `color.ambient.grayscales.60`  | `#808080` |
| `color.ambient.grayscales.70`  | `#666666` |
| `color.ambient.grayscales.80`  | `#4D4D4D` |
| `color.ambient.grayscales.90`  | `#333333` |
| `color.ambient.grayscales.100` | `#1A1A1A` |


#### Grayscale com Opacidade


| Token                                 | Valor                  |
| ------------------------------------- | ---------------------- |
| `color.ambient.grayscales-opacity.10` | `rgba(26,26,26, 0.10)` |
| `color.ambient.grayscales-opacity.20` | `rgba(26,26,26, 0.25)` |
| `color.ambient.grayscales-opacity.30` | `rgba(26,26,26, 0.50)` |
| `color.ambient.grayscales-opacity.40` | `rgba(26,26,26, 0.75)` |
| `color.ambient.grayscales-opacity.50` | `rgba(26,26,26, 0.90)` |


#### Neutral com Opacidade (tint da cor primária do tema)


| Token                              | Valor NeutralTheme        |
| ---------------------------------- | ------------------------- |
| `color.ambient.neutral-opacity.10` | `rgba(115,127,140, 0.10)` |
| `color.ambient.neutral-opacity.20` | `rgba(115,127,140, 0.25)` |
| `color.ambient.neutral-opacity.30` | `rgba(115,127,140, 0.50)` |
| `color.ambient.neutral-opacity.40` | `rgba(115,127,140, 0.75)` |
| `color.ambient.neutral-opacity.50` | `rgba(115,127,140, 0.90)` |


### 3.2 Cores — Feedback (Universais entre temas)

#### Error


| Token                          | Valor     |
| ------------------------------ | --------- |
| `color.feedback.error.dark`    | `#2D0606` |
| `color.feedback.error.light`   | `#F9D2D2` |
| `color.feedback.error.active`  | `#EC7979` |
| `color.feedback.error.default` | `#DF2020` |
| `color.feedback.error.action`  | `#861313` |


#### Success


| Token                            | Valor     |
| -------------------------------- | --------- |
| `color.feedback.success.dark`    | `#0A290A` |
| `color.feedback.success.light`   | `#D6F5D6` |
| `color.feedback.success.active`  | `#85E085` |
| `color.feedback.success.default` | `#33CC33` |
| `color.feedback.success.action`  | `#1F7A1F` |


#### Warning


| Token                            | Valor     |
| -------------------------------- | --------- |
| `color.feedback.warning.dark`    | `#312000` |
| `color.feedback.warning.light`   | `#FFEDCB` |
| `color.feedback.warning.active`  | `#FFC963` |
| `color.feedback.warning.default` | `#FFA800` |
| `color.feedback.warning.action`  | `#916000` |


> ⚠️ `warning.default` (#FFA800) não tem contraste WCAG AA suficiente para texto. Use `warning.action` (#916000) em textos; `default` apenas em ícones e backgrounds.

#### Info


| Token                         | Valor     |
| ----------------------------- | --------- |
| `color.feedback.info.dark`    | `#002131` |
| `color.feedback.info.light`   | `#CBEEFF` |
| `color.feedback.info.active`  | `#66CCFF` |
| `color.feedback.info.default` | `#00AAFF` |
| `color.feedback.info.action`  | `#006699` |


### 3.3 Cores — Function (Variam por tema)

#### Primary


| Token                            | NeutralTheme | LeblonTheme | RedTheme  | GreenTheme |
| -------------------------------- | ------------ | ----------- | --------- | ---------- |
| `color.function.primary.dark`    | `#09142A`    | `#261A0D`   | `#160306` | `#0F2416`  |
| `color.function.primary.light`   | `#D5E0F6`    | `#F2E6D9`   | `#F2A6B1` | `#DBF0E2`  |
| `color.function.primary.active`  | `#81A2E4`    | `#D9B48C`   | `#E44E62` | `#94D1A8`  |
| `color.function.primary.default` | `#4274D6`    | `#BF8240`   | `#B11B2F` | `#367D4D`  |
| `color.function.primary.action`  | `#1B3C7E`    | `#734E26`   | `#590D18` | `#265937`  |


> ⚠️ `LeblonTheme` primary (#BF8240) falha WCAG AA como texto sobre branco (~2.9:1). Use `action` (#734E26) para textos com cor de marca no LeblonTheme.

#### Secondary


| Token                              | NeutralTheme | LeblonTheme | RedTheme  | GreenTheme |
| ---------------------------------- | ------------ | ----------- | --------- | ---------- |
| `color.function.secondary.dark`    | `#08272B`    | `#132019`   | `#231710` | `#0D2624`  |
| `color.function.secondary.light`   | `#DBEDF0`    | `#DFECE5`   | `#EFE3DC` | `#D9F2F0`  |
| `color.function.secondary.active`  | `#94CAD1`    | `#9FC6B2`   | `#CEAB97` | `#8CD9D2`  |
| `color.function.secondary.default` | `#1B8998`    | `#609F80`   | `#AD7352` | `#40BFB4`  |
| `color.function.secondary.action`  | `#0F4E57`    | `#39604C`   | `#684531` | `#26736C`  |


#### Neutral (tint da cor primária — variam por tema)


| Token                       | NeutralTheme | LeblonTheme | RedTheme  | GreenTheme |
| --------------------------- | ------------ | ----------- | --------- | ---------- |
| `color.ambient.neutral.10`  | `#F0F2F4`    | `#F5F4F0`   | `#F8ECED` | `#F0F4F2`  |
| `color.ambient.neutral.20`  | `#E2E4E9`    | `#EDEBE3`   | `#F3DDE0` | `#E2E9E4`  |
| `color.ambient.neutral.30`  | `#C4C9D4`    | `#D6D3C2`   | `#E5B2B9` | `#C4D4C9`  |
| `color.ambient.neutral.40`  | `#A7AFBE`    | `#C2BDA3`   | `#D98C97` | `#A7BEAF`  |
| `color.ambient.neutral.50`  | `#8994A9`    | `#ADA784`   | `#CC6674` | `#89A994`  |
| `color.ambient.neutral.60`  | `#6C7993`    | `#999166`   | `#BF4051` | `#6C9379`  |
| `color.ambient.neutral.70`  | `#566176`    | `#7A7452`   | `#993341` | `#567661`  |
| `color.ambient.neutral.80`  | `#414958`    | `#5C573D`   | `#732631` | `#415849`  |
| `color.ambient.neutral.90`  | `#2B303B`    | `#3D3A29`   | `#4D1A20` | `#2B3B30`  |
| `color.ambient.neutral.100` | `#16181D`    | `#1F1D14`   | `#260D10` | `#161D18`  |


#### Specific


| Token                                 | Valor     |
| ------------------------------------- | --------- |
| `color.function.specific.whatsapp`    | `#118C7E` |
| `color.function.specific.yellow-star` | `#EDC41E` |


---

## 4. Tokens Semânticos

> Coleção `Semantic Tokens` no Figma — aliases dos primitivos que expressam **intenção de uso**, não aparência. Última atualização: 19/04/2026. Total: 96 variáveis.

### 4.1 Surface


| Token                        | Alias Primitivo                       | Uso                                   |
| ---------------------------- | ------------------------------------- | ------------------------------------- |
| `color.surface.default`      | `color.ambient.base.deep-light`       | Fundo principal de telas              |
| `color.surface.subtle`       | `color.ambient.grayscales.10`         | Cards, seções levemente diferenciadas |
| `color.surface.raised`       | `color.ambient.base.deep-light`       | Cards com elevação                    |
| `color.surface.overlay`      | `color.ambient.grayscales-opacity.40` | Overlays, modals, bottom sheets       |
| `color.surface.brand`        | `color.function.primary.default`      | Superfícies com cor da marca          |
| `color.surface.brand-subtle` | `color.function.primary.light`        | Chips, badges de marca                |
| `color.surface.success`      | `color.feedback.success.light`        | Banners de sucesso                    |
| `color.surface.error`        | `color.feedback.error.light`          | Banners de erro                       |
| `color.surface.warning`      | `color.feedback.warning.light`        | Banners de aviso                      |
| `color.surface.info`         | `color.feedback.info.light`           | Banners informativos                  |
| `color.surface.danger`           | `color.feedback.error.light`          | Superfície de ação destrutiva                 |
| `color.surface.disabled-strong`  | `color.ambient.grayscales.60`         | Fundo disabled mais forte (contextos inversos)|
| `color.surface.card`             | `color.ambient.base.light`            | Fundo de cards/shortcuts                      |
| `color.surface.placeholder`        | `color.ambient.grayscales.20`         | Placeholder de imagem/thumbnail               |
| `color.surface.overlay-strong`     | `color.ambient.grayscales-opacity.50` | Overlay denso (lock badges, 90% opacidade)    |
| `color.surface.track`              | `color.ambient.grayscales.20`         | Fundo de trilha (progress bar, slider)        |
| `color.surface.disabled`           | `color.ambient.grayscales.40`         | Superfície disabled (progress bar, etc.)      |
| `color.surface.dark`               | `color.ambient.base.dark`             | Fundo escuro (store logos, containers dark)   |
| `color.surface.image-tinted`       | `color.ambient.neutral-opacity.50`    | Placeholder tintado de imagem (90% opacidade) |
| `color.surface.neutral-muted`      | `color.ambient.neutral.40`            | Fundo neutro médio (badges neutral-1)         |
| `color.surface.neutral-light`      | `color.ambient.neutral.20`            | Fundo neutro claro (badges neutral-2)         |
| `color.surface.promo`              | `color.feedback.warning.default`      | Fundo promocional (badges promoções)          |
| `color.surface.premiere`           | `color.feedback.info.default`         | Fundo estreia/premiere (badges)               |
| `color.surface.brand-active`       | `color.function.primary.active`       | Fundo marca ativo (badges blog)               |
| `color.surface.brand-strong`       | `color.function.primary.action`       | Fundo marca forte (shortcuts active)           |
| `color.surface.backdrop`           | `color.ambient.neutral.10`            | Fundo neutro muito claro (círculo do Avatar, superfícies discretas) |


### 4.2 Text


| Token                     | Alias Primitivo                  | Uso                          |
| ------------------------- | -------------------------------- | ---------------------------- |
| `color.text.primary`      | `color.ambient.grayscales.100`   | Texto principal, títulos     |
| `color.text.secondary`    | `color.ambient.grayscales.70`    | Subtítulos, labels           |
| `color.text.tertiary`     | `color.ambient.grayscales.50`    | Placeholders, hints          |
| `color.text.disabled`     | `color.ambient.grayscales.30`    | Texto desabilitado           |
| `color.text.inverse`      | `color.ambient.base.deep-light`  | Texto sobre fundos escuros   |
| `color.text.brand`        | `color.function.primary.default` | Links, ações de marca        |
| `color.text.brand-strong` | `color.function.primary.action`  | Links hover/press            |
| `color.text.error`        | `color.feedback.error.default`   | Mensagens de erro            |
| `color.text.success`      | `color.feedback.success.action`  | Mensagens de sucesso         |
| `color.text.warning`      | `color.feedback.warning.action`  | Mensagens de aviso           |
| `color.text.info`         | `color.feedback.info.action`     | Mensagens informativas       |
| `color.text.danger`           | `color.feedback.error.default`   | Texto em contexto destrutivo                     |
| `color.text.value`            | `color.ambient.base.deep-dark`   | Texto digitado/preenchido pelo usuário            |
| `color.text.helper`           | `color.ambient.grayscales.80`    | Texto auxiliar abaixo de forms                    |
| `color.text.helper-disabled`  | `color.ambient.neutral.40`       | Helper text desabilitado                          |
| `color.text.prefix`           | `color.ambient.grayscales.50`    | Prefixo/sufixo de inputs                         |
| `color.text.prefix-disabled`  | `color.ambient.grayscales.30`    | Prefixo/sufixo disabled                          |
| `color.text.label-error`      | `color.feedback.error.action`    | Label em estado de erro                           |
| `color.text.label-disabled`   | `color.ambient.grayscales.40`    | Label desabilitado                                |
| `color.text.cancel`           | `color.function.primary.action`  | Texto de ação cancelar                            |
| `color.text.placeholder-hover`| `color.function.primary.action`  | Placeholder em hover                              |
| `color.text.hover`            | `color.ambient.neutral.80`       | Texto em estado hover (links, interativos)        |
| `color.text.pressed`          | `color.function.primary.dark`    | Texto em estado pressed                           |
| `color.text.danger-pressed`   | `color.feedback.error.dark`      | Texto destrutivo em estado pressed                |
| `color.text.negative`         | `color.function.primary.light`   | Texto sobre fundo escuro (estilo negativo)        |
| `color.text.negative-hover`   | `color.ambient.base.light`       | Texto negativo em hover                           |
| `color.text.body`             | `color.ambient.neutral.80`       | Texto body/labels de itens                        |
| `color.text.on-dark`          | `color.ambient.base.light`       | Texto sobre fundo escuro (títulos negativo)       |
| `color.text.strong`           | `color.ambient.neutral.90`       | Texto forte tematizado (nomes, títulos de cards)  |
| `color.text.default`          | `color.ambient.grayscales.90`    | Texto default genérico (labels, nomes)            |
| `color.text.supporting`       | `color.ambient.grayscales.60`    | Linha secundária em cards de opção (metadado)     |
| `color.text.dark`             | `color.function.primary.dark`    | Texto escuro sobre fundos neutros/coloridos       |
| `color.text.on-promo`         | `color.feedback.warning.dark`    | Texto sobre fundo promocional (warning dark)      |
| `color.text.on-premiere`      | `color.feedback.info.dark`       | Texto sobre fundo estreia (info dark)             |


### 4.3 Border


| Token                        | Alias Primitivo                  | Uso                             |
| ---------------------------- | -------------------------------- | ------------------------------- |
| `color.border.default`       | `color.ambient.grayscales.20`    | Bordas genéricas, cards         |
| `color.border.strong`        | `color.ambient.grayscales.40`    | Bordas com mais contraste       |
| `color.border.subtle`        | `color.ambient.grayscales.10`    | Divisores suaves                |
| `color.border.focus`         | `color.function.primary.default` | Estado de foco (acessibilidade) |
| `color.border.error`         | `color.feedback.error.default`   | Input com erro                  |
| `color.border.success`       | `color.feedback.success.default` | Input com sucesso               |
| `color.border.disabled`      | `color.ambient.grayscales.20`    | Input/botão desabilitado        |
| `color.border.input`         | `color.ambient.grayscales.50`    | Borda padrão de inputs          |
| `color.border.hover`         | `color.function.primary.action`  | Borda hover de interativos      |
| `color.border.active`        | `color.function.primary.active`  | Borda foco/ativo (inputs)       |
| `color.border.input-disabled`| `color.ambient.grayscales.30`    | Borda de input desabilitado     |
| `color.border.danger-active`    | `color.feedback.error.active`    | Focus ring de elementos destrutivos |
| `color.border.card`             | `color.ambient.neutral.20`       | Borda de cards/shortcuts            |
| `color.border.accent-secondary` | `color.function.secondary.action`| Borda accent de marca secundária    |
| `color.border.light`              | `color.ambient.base.light`       | Bordas claras sobre fundos escuros      |
| `color.border.muted`              | `color.ambient.neutral.30`       | Borda neutra suave (anel do Avatar, contornos leves) |
| `color.border.image`              | `color.ambient.neutral.10`       | Borda de container de imagem            |
| `color.border.brand-strong`       | `color.function.primary.action`  | Borda marca forte (shortcuts active)    |
| `color.border.focus-secondary`  | `color.function.secondary.active`| Focus ring secundário (wrapper Radio-button) |


### 4.4 Icon


| Token                 | Alias Primitivo                  | Uso                            |
| --------------------- | -------------------------------- | ------------------------------ |
| `color.icon.default`  | `color.ambient.grayscales.80`    | Ícones neutros                 |
| `color.icon.subtle`   | `color.ambient.grayscales.50`    | Ícones decorativos/secundários |
| `color.icon.brand`    | `color.function.primary.default` | Ícones de ação da marca        |
| `color.icon.inverse`  | `color.ambient.base.deep-light`  | Ícones sobre fundo escuro      |
| `color.icon.disabled` | `color.ambient.grayscales.30`    | Ícones desabilitados           |
| `color.icon.error`    | `color.feedback.error.default`   | Ícones de erro                 |
| `color.icon.success`    | `color.feedback.success.default` | Ícones de sucesso                              |
| `color.icon.danger`     | `color.feedback.error.default`   | Ícones de ação destrutiva                      |
| `color.icon.secondary`  | `color.ambient.grayscales.70`    | Ícones secundários (mesma intensidade de text/secondary) |
| `color.icon.brand-tint`   | `color.ambient.neutral.70`       | Ícone com tint da marca (itens ativos em nav)  |
| `color.icon.brand-strong` | `color.function.primary.action`  | Ícones de marca (variante forte/escura)        |
| `color.icon.dark`           | `color.ambient.grayscales.90`    | Ícones escuros (navigation arrows, action icons)   |
| `color.icon.negative`       | `color.function.primary.light`   | Ícones sobre fundo escuro (estilo negativo)        |
| `color.icon.muted`          | `color.ambient.grayscales.60`    | Ícones suaves (calendário, metadados)              |
| `color.icon.on-brand`       | `color.ambient.base.light`       | Ícones sobre superfícies de marca (shortcuts active)|
| `color.icon.on-surface`     | `color.ambient.base.deep-dark`   | Ícones alto contraste sobre superfícies claras      |
| `color.icon.loyalty-star`   | `color.function.specific.yellow-star` | Estrelas / ícones do programa de relacionamento (loyalty) |
| `color.icon.neutral-mid`    | `color.ambient.neutral.60`       | Ícones de formulário / auxiliares (tema neutro médio)        |
| `color.icon.neutral-deep`   | `color.ambient.neutral.70`       | Ícones de formulário secundários (tema neutro mais escuro)   |


### 4.5 Indicator


| Token                           | Alias Primitivo                  | Uso                                                   |
| ------------------------------- | -------------------------------- | ----------------------------------------------------- |
| `color.indicator.default`       | `color.function.primary.action`  | Indicador ativo (dotnav, stepper) em fundo claro      |
| `color.indicator.muted`         | `color.ambient.grayscales.30`    | Indicador inativo em fundo claro                      |
| `color.indicator.negative`      | `color.function.primary.active`  | Indicador ativo em fundo escuro (estilo negative)     |
| `color.indicator.negative-muted`| `color.ambient.grayscales.20`    | Indicador inativo em fundo escuro (estilo negative)   |


### 4.6 Interactive


| Token                                 | Alias Primitivo                    | Uso                                                                  |
| ------------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `color.interactive.primary.default`   | `color.function.primary.default`   | Botão primário — normal                                              |
| `color.interactive.primary.hover`     | `color.function.primary.action`    | Botão primário — hover (web)                                         |
| `color.interactive.primary.pressed`   | `color.function.primary.action`    | Botão primário — pressed                                             |
| `color.interactive.primary.disabled`  | `color.ambient.grayscales.20`      | Botão primário — disabled                                            |
| `color.interactive.primary.text`      | `color.ambient.base.deep-light`    | Texto sobre botão primário                                           |
| `color.interactive.secondary.default`        | `color.function.secondary.default` | Botão secundário — normal                                            |
| `color.interactive.secondary.default-invert` | `color.function.secondary.action`  | Botão secundário — borda/label (secondary/action)                    |
| `color.interactive.secondary.hover`          | `color.function.secondary.action`  | Botão secundário — hover (web)                                       |
| `color.interactive.secondary.pressed`        | `color.function.secondary.action`  | Botão secundário — pressed                                           |
| `color.interactive.secondary.text`           | `color.ambient.base.deep-light`    | Texto sobre botão secundário                                         |
| `color.interactive.ghost.text`        | `color.function.primary.default`   | Texto de botão ghost                                                 |
| `color.interactive.ghost.border`      | `color.ambient.grayscales.20`      | Borda de botão ghost                                                 |
| `color.interactive.ghost.hover.bg`    | `color.function.primary.light`     | Fundo hover do ghost (único uso correto de `primary.light` em botão) |
| `color.interactive.danger.default`    | `color.feedback.error.default`     | Botão destrutivo — normal                                            |
| `color.interactive.danger.hover`      | `color.feedback.error.action`      | Botão destrutivo — hover (web)                                       |
| `color.interactive.danger.pressed`    | `color.feedback.error.action`      | Botão destrutivo — pressed                                           |
| `color.interactive.danger.text`       | `color.ambient.base.deep-light`    | Texto sobre botão destrutivo                                         |


---

## 5. Component Tokens

> Coleção `Component Tokens` no Figma — aliases dos semânticos específicos por componente. Variam por tema onde relevante.
> Última atualização: 19/04/2026. Total: 215 variáveis.

### 5.1 Button — Primary


| Token                                      | Alias Semântico                      | Descrição        |
| ------------------------------------------ | ------------------------------------ | ---------------- |
| `component.button.primary.bg.default`      | `color.interactive.primary.default`  | Fundo normal     |
| `component.button.primary.bg.hover`        | `color.interactive.primary.hover`    | Fundo hover      |
| `component.button.primary.bg.pressed`      | `color.interactive.primary.pressed`  | Fundo pressed    |
| `component.button.primary.bg.disabled`     | `color.interactive.primary.disabled` | Fundo disabled   |
| `component.button.primary.label.default`   | `color.interactive.primary.text`     | Label normal     |
| `component.button.primary.label.disabled`  | `color.text.disabled`                | Label disabled   |

### 5.1b Button — Secondary


| Token                                         | Alias Semântico                              | Descrição        |
| --------------------------------------------- | -------------------------------------------- | ---------------- |
| `component.button.secondary.bg.default`       | `color.interactive.secondary.default`        | Fundo normal     |
| `component.button.secondary.bg.hover`         | `color.interactive.secondary.hover`          | Fundo hover      |
| `component.button.secondary.bg.pressed`       | `color.interactive.secondary.pressed`        | Fundo pressed    |
| `component.button.secondary.bg.focus`         | `color.interactive.secondary.default`        | Fundo focus      |
| `component.button.secondary.bg.loading`       | `color.interactive.secondary.default`        | Fundo loading    |
| `component.button.secondary.bg.disabled`      | `color.interactive.primary.disabled`         | Fundo disabled   |
| `component.button.secondary.border.default`   | `color.interactive.secondary.default-invert` | Borda normal     |
| `component.button.secondary.border.focus`     | `color.border.focus`                         | Borda focus      |
| `component.button.secondary.label.default`    | `color.interactive.secondary.default-invert` | Label normal     |
| `component.button.secondary.label.hover`      | `color.text.inverse`                         | Label hover      |
| `component.button.secondary.label.focus`      | `color.text.inverse`                         | Label focus      |
| `component.button.secondary.label.pressed`    | `color.text.inverse`                         | Label pressed    |
| `component.button.secondary.label.loading`    | `color.text.inverse`                         | Label loading    |
| `component.button.secondary.label.disabled`   | `color.text.disabled`                        | Label disabled   |

### 5.1c Button — Ghost


| Token                                   | Alias Semântico                   | Descrição       |
| --------------------------------------- | --------------------------------- | --------------- |
| `component.button.ghost.label.default`  | `color.interactive.ghost.text`    | Label ghost     |
| `component.button.ghost.border.default` | `color.interactive.ghost.border`  | Borda ghost     |
| `component.button.ghost.bg.hover`       | `color.interactive.ghost.hover.bg`| Fundo hover     |

### 5.1d Button — Danger


| Token                                    | Alias Semântico                    | Descrição      |
| ---------------------------------------- | ---------------------------------- | -------------- |
| `component.button.danger.bg.default`     | `color.interactive.danger.default` | Fundo normal   |
| `component.button.danger.bg.hover`       | `color.interactive.danger.hover`   | Fundo hover    |
| `component.button.danger.bg.pressed`     | `color.interactive.danger.pressed` | Fundo pressed  |
| `component.button.danger.label.default`  | `color.interactive.danger.text`    | Label danger   |

### 5.1e Button — Primary Inverse


| Token                                              | Alias Semântico                    | Descrição      |
| -------------------------------------------------- | ---------------------------------- | -------------- |
| `component.button.primary-inverse.bg.default`      | `color.interactive.ghost.hover.bg` | Fundo normal   |
| `component.button.primary-inverse.bg.hover`        | `color.interactive.primary.hover`  | Fundo hover    |
| `component.button.primary-inverse.bg.focus`        | `color.interactive.primary.hover`  | Fundo focus    |
| `component.button.primary-inverse.bg.pressed`      | `color.interactive.ghost.hover.bg` | Fundo pressed  |
| `component.button.primary-inverse.bg.loading`      | `color.interactive.ghost.hover.bg` | Fundo loading  |
| `component.button.primary-inverse.bg.disabled`     | `color.surface.disabled-strong`    | Fundo disabled |
| `component.button.primary-inverse.border.focus`    | `color.interactive.ghost.hover.bg` | Borda focus    |
| `component.button.primary-inverse.label.default`   | `color.text.primary`               | Label normal   |
| `component.button.primary-inverse.label.hover`     | `color.text.inverse`               | Label hover    |
| `component.button.primary-inverse.label.focus`     | `color.text.inverse`               | Label focus    |
| `component.button.primary-inverse.label.pressed`   | `color.text.primary`               | Label pressed  |
| `component.button.primary-inverse.label.loading`   | `color.text.primary`               | Label loading  |
| `component.button.primary-inverse.label.disabled`  | `color.text.primary`               | Label disabled |

### 5.1f Button — Secondary Inverse


| Token                                                | Alias Semântico                      | Descrição      |
| ---------------------------------------------------- | ------------------------------------ | -------------- |
| `component.button.secondary-inverse.border.default`  | `color.text.inverse`                 | Borda normal   |
| `component.button.secondary-inverse.bg.hover`        | `color.interactive.secondary.hover`  | Fundo hover    |
| `component.button.secondary-inverse.bg.focus`        | `color.interactive.secondary.default`| Fundo focus    |
| `component.button.secondary-inverse.bg.pressed`      | `color.interactive.secondary.pressed`| Fundo pressed  |
| `component.button.secondary-inverse.bg.loading`      | `color.interactive.secondary.default`| Fundo loading  |
| `component.button.secondary-inverse.bg.disabled`     | `color.surface.disabled-strong`      | Fundo disabled |
| `component.button.secondary-inverse.border.focus`    | `color.interactive.ghost.hover.bg`   | Borda focus    |
| `component.button.secondary-inverse.label.default`   | `color.text.inverse`                 | Label normal   |
| `component.button.secondary-inverse.label.hover`     | `color.text.inverse`                 | Label hover    |
| `component.button.secondary-inverse.label.focus`     | `color.text.inverse`                 | Label focus    |
| `component.button.secondary-inverse.label.pressed`   | `color.text.primary`                 | Label pressed  |
| `component.button.secondary-inverse.label.loading`   | `color.text.primary`                 | Label loading  |
| `component.button.secondary-inverse.label.disabled`  | `color.text.primary`                 | Label disabled |

### 5.1g Button — Shared


| Token                                    | Alias Semântico                      | Descrição              |
| ---------------------------------------- | ------------------------------------ | ---------------------- |
| `component.button.radius`                | `border.radius.xs` (4px)             | Border radius          |
| `component.button.padding.horizontal.md` | `spacing.padding.positive.md` (20px) | Padding horizontal     |


### 5.2 Input

> Atualizado em 10/04/2026 — tokens agora refletem 100% do visual do componente Figma.

| Token                                 | Alias Semântico                       | Descrição                          |
| ------------------------------------- | ------------------------------------- | ---------------------------------- |
| `component.input.bg.default`          | `color.surface.default`               | Fundo normal                       |
| `component.input.bg.disabled`         | `color.surface.subtle`                | Fundo disabled                     |
| `component.input.bg.view-only`        | `color.surface.subtle`                | Fundo view-only                    |
| `component.input.border.default`      | `color.border.input`                  | Borda normal (grayscales/50)       |
| `component.input.border.hover`        | `color.border.hover`                  | Borda hover (primary/action)       |
| `component.input.border.focus`        | `color.border.active`                 | Borda foco (primary/active)        |
| `component.input.border.focus-width`  | `border.stroke.stroke-medium` (2px)   | Espessura da borda em foco         |
| `component.input.border.error`        | `color.border.error`                  | Borda com erro                     |
| `component.input.border.disabled`     | `color.border.input-disabled`         | Borda disabled (grayscales/30)     |
| `component.input.border.view-only`    | `color.border.input`                  | Borda view-only                    |
| `component.input.label.default`       | `color.text.secondary`                | Label flutuante normal             |
| `component.input.label.error`         | `color.text.label-error`              | Label erro (error/action)          |
| `component.input.label.disabled`      | `color.text.label-disabled`           | Label disabled (grayscales/40)     |
| `component.input.value.default`       | `color.text.value`                    | Texto digitado (deep-dark)         |
| `component.input.value.hover`         | `color.text.placeholder-hover`        | Placeholder em hover               |
| `component.input.value.error`         | `color.text.error`                    | Texto em erro                      |
| `component.input.placeholder.default` | `color.text.tertiary`                 | Placeholder                        |
| `component.input.prefix.default`      | `color.text.prefix`                   | Prefixo/sufixo                     |
| `component.input.prefix.disabled`     | `color.text.prefix-disabled`          | Prefixo/sufixo disabled            |
| `component.input.prefix.error`        | `color.text.error`                    | Prefixo/sufixo em erro             |
| `component.input.helper.default`      | `color.text.helper`                   | Texto auxiliar (grayscales/80)     |
| `component.input.helper.error`        | `color.text.error`                    | Texto de erro                      |
| `component.input.helper.disabled`     | `color.text.helper-disabled`          | Helper disabled (neutral/40)       |
| `component.input.cancel.text`         | `color.text.cancel`                   | Texto "Cancelar" (primary/action)  |
| `component.input.icon.default`        | `color.icon.default`                  | Ícone padrão                       |
| `component.input.icon.disabled`       | `color.icon.disabled`                 | Ícone disabled                     |
| `component.input.icon.error`          | `color.icon.error`                    | Ícone em erro                      |
| `component.input.radius`              | `border.radius.xs` (4px)              | Border radius                      |
| `component.input.border-width`        | `border.stroke.stroke-thin` (1px)     | Espessura da borda padrão          |


### 5.3 Feedback (Banners)


| Token                              | Alias Semântico          |
| ---------------------------------- | ------------------------ |
| `component.feedback.info.bg`       | `color.surface.info`     |
| `component.feedback.info.icon`     | `color.icon.default`     |
| `component.feedback.info.label`    | `color.text.info`        |
| `component.feedback.success.bg`    | `color.surface.success`  |
| `component.feedback.success.icon`  | `color.icon.success`     |
| `component.feedback.success.label` | `color.text.success`     |
| `component.feedback.warning.bg`    | `color.surface.warning`  |
| `component.feedback.warning.icon`  | `color.icon.default`     |
| `component.feedback.warning.label` | `color.text.warning`     |
| `component.feedback.error.bg`      | `color.surface.error`    |
| `component.feedback.error.icon`    | `color.icon.error`       |
| `component.feedback.error.label`   | `color.text.error`       |
| `component.feedback.radius`        | `border.radius.sm` (8px) |


### 5.4 Overlay & Divider


| Token                             | Alias Semântico         |
| --------------------------------- | ----------------------- |
| `component.overlay.backdrop.bg`   | `color.surface.overlay`  |
| `component.divider.color.default` | `color.border.default`   |
| `component.divider.color.subtle`  | `color.border.subtle`    |


### 5.4b Menu Item

> Atualizado em 18/04/2026 — tokens criados na auditoria do `COMPONENT_SET` Menu Item (`7506:9672`). Substitui binds diretos em primitivos de biblioteca (`Color/Function/*`, `Color/Ambient/*`) por cadeia **Component → Semantic → Primitive**.


| Token                                      | Alias Semântico           | Descrição                                      |
| ------------------------------------------ | ------------------------- | ---------------------------------------------- |
| `component.menu-item.icon.leading.default` | `color.icon.brand-strong` | Ícone leading (Wi‑Fi) — estilo Default         |
| `component.menu-item.text.default`         | `color.text.body`         | Label da linha — estilo Default                |
| `component.menu-item.chevron.default`      | `color.text.body`         | Chevron trailing — estilo Default               |
| `component.menu-item.divider.default`      | `color.border.card`       | Divisor inferior — estilo Default              |
| `component.menu-item.icon.leading.negative`| `color.icon.negative`     | Ícone leading — estilo Negative                |
| `component.menu-item.text.negative`        | `color.text.on-dark`      | Label — estilo Negative                        |
| `component.menu-item.chevron.negative`     | `color.text.on-dark`      | Chevron — estilo Negative                      |
| `component.menu-item.divider.negative`     | `color.border.input`      | Divisor inferior — estilo Negative             |


### 5.5 Bottom Menu


| Token                                    | Alias Semântico              | Descrição          |
| ---------------------------------------- | ---------------------------- | ------------------ |
| `component.bottom-menu.label.default`    | `color.text.secondary`       | Label inativo      |
| `component.bottom-menu.label.active`     | `color.text.brand-strong`    | Label ativo        |
| `component.bottom-menu.icon.default`     | `color.icon.secondary`       | Ícone inativo      |
| `component.bottom-menu.icon.active`      | `color.icon.brand-tint`      | Ícone ativo (tint) |
| `component.bottom-menu.background.active`| `color.surface.brand-subtle` | Fundo ativo        |


### 5.6 Link


| Token                                         | Alias Semântico              | Descrição                              |
| ---------------------------------------------- | ---------------------------- | -------------------------------------- |
| `component.link.primary.text.default`          | `color.text.brand-strong`    | Texto/ícone Primary Default + Focus    |
| `component.link.primary.text.hover`            | `color.text.hover`           | Texto/ícone Primary Hover              |
| `component.link.primary.text.pressed`          | `color.text.pressed`         | Texto/ícone Primary Pressed            |
| `component.link.primary.text.disabled`         | `color.text.label-disabled`  | Texto/ícone Primary Disabled           |
| `component.link.primary.focus-stroke`          | `color.border.active`        | Stroke de focus Primary                |
| `component.link.destructive.text.default`      | `color.text.danger`          | Texto/ícone Destructive Default + Focus |
| `component.link.destructive.text.hover`        | `color.text.hover`           | Texto/ícone Destructive Hover          |
| `component.link.destructive.text.pressed`      | `color.text.danger-pressed`  | Texto/ícone Destructive Pressed        |
| `component.link.destructive.text.disabled`     | `color.text.label-disabled`  | Texto/ícone Destructive Disabled       |
| `component.link.destructive.focus-stroke`      | `color.border.danger-active` | Stroke de focus Destructive            |
| `component.link.negative.text.default`         | `color.text.negative`        | Texto/ícone Negative Default+Pressed+Focus |
| `component.link.negative.text.hover`           | `color.text.negative-hover`  | Texto/ícone Negative Hover             |
| `component.link.negative.text.disabled`        | `color.text.disabled`        | Texto/ícone Negative Disabled          |
| `component.link.negative.focus-stroke`         | `color.border.active`        | Stroke de focus Negative               |


### 5.7 Shortcuts Menu

| Token                                                | Alias Semântico              | Descrição                                          |
| ---------------------------------------------------- | ---------------------------- | -------------------------------------------------- |
| `component.shortcuts-menu.active.bg`                 | `color.surface.brand-strong` | Fundo do shortcut ativo (Category Active)          |
| `component.shortcuts-menu.active.border`             | `color.border.brand-strong`  | Borda do shortcut ativo                            |
| `component.shortcuts-menu.active.icon`               | `color.icon.on-brand`        | Ícone sobre fundo ativo (branco)                   |
| `component.shortcuts-menu.active.label`              | `color.text.on-dark`         | Label sobre fundo ativo (branco)                   |
| `component.shortcuts-menu.default.bg`                | `color.surface.subtle`       | Fundo Default/Number/Disabled (cinza claro)        |
| `component.shortcuts-menu.default.border`            | `color.border.subtle`        | Borda Default/Number/Disabled                      |
| `component.shortcuts-menu.default.icon-fill`         | `color.icon.on-surface`      | Preenchimento do ícone diamond (preto)             |
| `component.shortcuts-menu.default.icon-stroke`       | `color.icon.brand-strong`    | Contorno do ícone diamond (azul)                   |
| `component.shortcuts-menu.default.label`             | `color.text.strong`          | Label Default/Number (texto escuro)                |
| `component.shortcuts-menu.disabled.icon-stroke`      | `color.icon.disabled`        | Contorno do ícone diamond disabled (cinza)         |
| `component.shortcuts-menu.disabled.label`            | `color.text.disabled`        | Label disabled (cinza)                             |
| `component.shortcuts-menu.menu.bg`                   | `color.surface.default`      | Fundo do shortcut Menu (branco)                    |
| `component.shortcuts-menu.menu.border`               | `color.border.card`          | Borda do shortcut Menu                             |
| `component.shortcuts-menu.menu.icon`                 | `color.icon.brand-strong`    | Ícone primário Menu (azul)                         |
| `component.shortcuts-menu.menu.icon-accent`          | `color.icon.secondary`       | Detalhe de ícone Menu (cinza)                      |
| `component.shortcuts-menu.menu.label`                | `color.text.brand-strong`    | Label do Menu (azul forte)                         |
| `component.shortcuts-menu.menu.icon-bg`              | `color.surface.default`      | Fundo das instâncias de ícone Menu                 |


### 5.8 Section Title


| Token                                              | Alias Semântico            | Descrição                            |
| --------------------------------------------------- | -------------------------- | ------------------------------------ |
| `component.section-title.title.default`             | `color.text.body`          | Título Default (fundo claro)         |
| `component.section-title.title.negative`            | `color.text.on-dark`       | Título Negative (fundo escuro)       |
| `component.section-title.link.default`              | `color.text.brand-strong`  | Link+Chevron Default                 |
| `component.section-title.link.negative`             | `color.text.negative`      | Link+Chevron Negative                |


### 5.9 Dotnav

| Token                                         | Alias Semântico                | Descrição                                       |
| ---------------------------------------------- | ------------------------------ | ------------------------------------------------ |
| `component.dotnav.dot.active`                  | `color.indicator.default`      | Dot ativo (slide atual) — estilo Default         |
| `component.dotnav.dot.inactive`                | `color.indicator.muted`        | Dots inativos — estilo Default                   |
| `component.dotnav.dot.active-negative`         | `color.indicator.negative`     | Dot ativo — estilo Negative (fundo escuro)       |
| `component.dotnav.dot.inactive-negative`       | `color.indicator.negative-muted`| Dots inativos — estilo Negative (fundo escuro)  |


### 5.10 Benefits Card (vertical)

| Token                                              | Alias Semântico                              | Descrição                                |
| --------------------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| `component.benefits-card.image-bg.default`          | `color.surface.placeholder`                  | Placeholder de imagem do produto         |
| `component.benefits-card.container-bg.default`      | `color.surface.default`                      | Fundo do container de detalhes           |
| `component.benefits-card.secondary.default`         | `color.text.secondary`                       | Meta icon/text, data de expiração        |
| `component.benefits-card.text.default`              | `color.text.strong`                          | Nome da loja, descrição do produto       |
| `component.benefits-card.action.default`            | `color.interactive.secondary.default-invert` | Borda/ícone/label do botão ativo + logo  |
| `component.benefits-card.on-dark.default`           | `color.text.on-dark`                         | Dots do logo, ícone de lock              |
| `component.benefits-card.logo-border.default`       | `color.border.default`                       | Borda do logo da loja                    |
| `component.benefits-card.lock-bg.default`           | `color.surface.overlay-strong`               | Fundo do badge de lock (disabled)        |
| `component.benefits-card.action-bg.disabled`        | `color.surface.subtle`                       | Fundo do botão disabled                  |
| `component.benefits-card.action.disabled`           | `color.text.label-disabled`                  | Ícone/label do botão disabled + logo     |

### 5.10b Benefits Content Card

Card de CTA do programa de relacionamento (estrelas, título, descrição, botão primário). Cores de superfície, borda, texto e ícone de estrela usam apenas **Component → Semantic → Primitive**. A instância do **Button** primário reutiliza os tokens do botão; os bullets de loading dentro da instância usam override para `component.button.primary.label.default`.

| Token                                              | Alias Semântico              | Descrição                                              |
| -------------------------------------------------- | ---------------------------- | ------------------------------------------------------ |
| `component.benefits-content-card.surface.default`  | `color.surface.card`         | Fundo do card (#FAFAFA / base light)                   |
| `component.benefits-content-card.surface.inner`  | `color.surface.default`      | Máscaras / frames internos brancos (deep light)        |
| `component.benefits-content-card.border.default`   | `color.border.default`       | Borda do container do card                             |
| `component.benefits-content-card.text.default`     | `color.text.body`            | Título e descrição (neutral 80)                        |
| `component.benefits-content-card.icon.star.default`| `color.icon.loyalty-star`    | Preenchimento das estrelas loyalty                     |
| `component.benefits-content-card.icon.outline.default` | `color.icon.dark`        | Contornos / detalhes escuros em ícones legados no card |

> **Nota:** No Figma, o semântico `color.icon.dark` foi alinhado ao token primitivo `color.ambient.grayscales.90` (antes apontava para variável da coleção Design System Tokens). Um fill em **gradiente** numa variante legada oculta do ícone de estrela permanece sem variável de cor — não há token de gradiente na arquitetura atual.

### 5.10c Benefits Levels

Card de nível do programa de relacionamento (estrelas, critério de elegibilidade, lista de benefícios com ícones Check/Close). Três variantes: `Level=1`, `Level=2`, `Level=3`. Figma `COMPONENT_SET` **benefits-levels** (`7935:14175`).

| Token | Alias Semântico | Descrição |
| ----- | --------------- | --------- |
| `component.benefits-levels.surface.default` | `color.surface.card` | Fundo do card (#FAFAFA) |
| `component.benefits-levels.border.default` | `color.border.default` | Borda do container |
| `component.benefits-levels.heading.default` | `color.text.body` | Título do nível (ex.: "1 Estrela", Display 4) |
| `component.benefits-levels.description.default` | `color.text.body` | Texto de critério / regra de elegibilidade |
| `component.benefits-levels.benefit-title.default` | `color.text.body` | Título de cada benefício ativo (Heading 5) |
| `component.benefits-levels.benefit-caption.default` | `color.text.body` | Legenda do benefício ativo (Caption) |
| `component.benefits-levels.benefit-text.disabled` | `color.text.tertiary` | Título + legenda de benefício indisponível (#999) |
| `component.benefits-levels.icon.check.default` | `color.icon.brand-strong` | Vetor do ícone Check (ação primária) |
| `component.benefits-levels.icon.close.disabled` | `color.text.tertiary` | Vetor do ícone Close em benefício bloqueado |
| `component.benefits-levels.icon.star.default` | `color.icon.loyalty-star` | Preenchimento das estrelas `estrela-loyalt` |
| `component.benefits-levels.badge.bg.default` | `color.surface.neutral-muted` | Fundo do badge "Você está aqui" |
| `component.benefits-levels.badge.label.default` | `color.text.dark` | Texto do badge |

> **Nota:** Padding, gap e `border.radius` usam tokens **Design System Tokens** (`Spacing/Padding/Positive/*`, `Border/Radius/xs`) — padrão aceito (🏗️ DST). A instância **Badge** reutiliza vetores internos com `component.badge.neutral-1.fg` (herança do componente Badge). Camadas decorativas dentro de `estrela-loyalt` (gradiente `Color/Function/Gradient/Gradient Light`, vetores Wi‑Fi em cinza) permanecem sem cadeia Component — documentado como legado da biblioteca de ícones.

### 5.11 Banner

| Token                                | Alias Semântico        | Descrição                                                 |
| ------------------------------------ | ---------------------- | --------------------------------------------------------- |
| `component.banner.bg.default`        | `color.surface.card`   | Fundo do container do Banner                              |

> **Nota:** O Banner contém uma instância interna do **Dotnav** (Style=Default, Slides=4). Os fills dos dots são overrides que usam os component tokens do Dotnav (`component.dotnav.dot.active`, `component.dotnav.dot.inactive`). Spacing e radius usam tokens do Design System Tokens (DST).

### 5.12 Progress Bar

| Token                                           | Alias Semântico          | Descrição                                  |
| ----------------------------------------------- | ------------------------ | ------------------------------------------ |
| `component.progress-bar.track.default`          | `color.surface.track`    | Fundo da trilha (base) em todas as variantes |
| `component.progress-bar.fill.primary`           | `color.surface.brand`    | Preenchimento da barra ativa (Primary)     |
| `component.progress-bar.fill.disabled`          | `color.surface.disabled` | Preenchimento da barra inativa (Disabled)  |

### 5.13 Benefits Goals

| Token                                              | Alias Semântico          | Descrição                                      |
| -------------------------------------------------- | ------------------------ | ---------------------------------------------- |
| `component.benefits-goals.title.default`           | `color.text.strong`      | Texto principal do valor/meta (bold)           |
| `component.benefits-goals.subtitle.default`        | `color.text.secondary`   | Texto descritivo do total/meta (regular)       |

> **Nota:** O Benefits Goals contém uma instância local do **Progress Bar** (Size=Small, Color=Primary). Os tokens do Progress Bar (`component.progress-bar.track.default`, `component.progress-bar.fill.primary`) são herdados da instância — não são overrides.

### 5.14 Card Store Item

| Token                                                | Alias Semântico              | Descrição                                     |
| ---------------------------------------------------- | ---------------------------- | --------------------------------------------- |
| `component.card-store-item.logo-bg.default`          | `color.surface.card`         | Fundo do container do logo (light)            |
| `component.card-store-item.logo-border.default`      | `color.border.default`       | Borda do container do logo                    |
| `component.card-store-item.logo-inner-bg.default`    | `color.surface.dark`         | Fundo dark interno do logo                    |
| `component.card-store-item.logo-inner-border.default`| `color.border.light`         | Borda clara interna do logo (sobre fundo dark)|
| `component.card-store-item.image-fill.default`       | `color.surface.image-tinted` | Placeholder tintado da imagem da loja         |
| `component.card-store-item.image-border.default`     | `color.border.image`         | Borda do placeholder de imagem                |
| `component.card-store-item.name.default`             | `color.text.default`         | Texto do nome da loja                         |

> **Nota:** A instância `store-logo` dentro do card é **remota** (biblioteca externa). Os tokens acima são aplicados como overrides na instância.

### 5.14b Store Card

Component set Figma: `store-card` (`7995:6944`) — variantes `Fluxo=Restaurante` e `Fluxo=Lojas`.

| Token                                              | Alias Semântico                    | Descrição                                              |
| -------------------------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| `component.store-card.bg.default`                  | `color.surface.default`            | Fundo do card                                          |
| `component.store-card.border.default`              | `color.border.input-disabled`      | Borda do card                                          |
| `component.store-card.title.default`               | `color.text.value`                 | Nome da loja (título)                                  |
| `component.store-card.subtitle.default`            | `color.text.supporting`            | Categoria / metadado                                   |
| `component.store-card.avatar-bg.default`           | `color.surface.partner-merchant-mock` | Fundo do avatar (placeholder restaurante)         |
| `component.store-card.avatar-border.default`       | `color.border.subtle`              | Borda do avatar                                        |
| `component.store-card.logo-bg.default`             | `color.text.value`                 | Fundo do container de logo (fluxo Lojas)               |
| `component.store-card.logo-border.default`         | `color.border.subtle`              | Borda do container de logo                             |
| `component.store-card.icon-location.default`       | `color.icon.brand-strong`          | Ícone de local no link de piso                           |
| `component.store-card.icon-location-muted.default` | `color.icon.default`               | Parte neutra do ícone place (fluxo Lojas)              |
| `component.store-card.icon-action.default`         | `color.border.accent-secondary`    | Ícone de telefone na barra de ações                      |
| `component.store-card.icon-whatsapp.default`       | `color.icon.success`               | Cor principal do ícone WhatsApp                          |
| `component.store-card.icon-whatsapp-muted.default` | `color.icon.subtle`              | Detalhe cinza do ícone WhatsApp                          |
| `component.store-card.icon-whatsapp-inverse.default` | `color.icon.inverse`           | Detalhe claro do ícone WhatsApp                          |

| Propriedade (spacing/radius) | Token Figma                         | Tipo    |
| ---------------------------- | ----------------------------------- | ------- |
| `padding` / `itemSpacing`    | `Spacing/Padding/Positive/md` (16)  | 🏗️ DST |
| `cornerRadius` (card)        | `Border/Radius/xs` (8)              | 🏗️ DST |
| `cornerRadius` (avatar)      | `Border/Radius/2xs` (4)             | 🏗️ DST |

> **Nota:** Instâncias remotas de **Link**, **Button** e **Button Group** mantêm seus próprios component tokens (`component.link.*`, `component.button.secondary.*`). Overrides de ícones dentro de botões usam `component.button.secondary.label.default`. Vetores do artwork de marca Adidas no fluxo Lojas (`logo` group) permanecem com fills hardcoded — cores de identidade visual da marca, fora do escopo de tokens de UI.

### 5.15 Carousel Store

O Carousel Store é um container horizontal que renderiza múltiplas instâncias locais de **Card Store Item**. Não possui tokens de cor próprios — todas as cores são herdadas dos component tokens do Card Store Item (seção 5.14).

| Propriedade | Token                            | Tipo    |
| ----------- | -------------------------------- | ------- |
| `itemSpacing` (entre cards) | `spacing.padding.positive.2xs` (8) | 🏗️ DST |

### 5.16 Toolbar

| Token                                       | Alias Semântico           | Descrição                                         |
| ------------------------------------------- | ------------------------- | ------------------------------------------------- |
| `component.toolbar.icon.default`            | `color.icon.dark`         | Seta de navegação e ícones de ação (style default) |
| `component.toolbar.label.default`           | `color.text.brand-strong` | Label do link (style default/icons/onboarding)    |
| `component.toolbar.chevron.default`         | `color.icon.brand-strong` | Chevron do link (todas as variantes)              |
| `component.toolbar.icon.negative`           | `color.icon.negative`     | Seta de navegação (style negative/fundo escuro)   |
| `component.toolbar.label.negative`          | `color.text.negative`     | Label do link (style negative)                    |

> **Nota:** As instâncias `[M] Link Bold` e `[M] Link right` dentro do Toolbar são **remotas**. Os tokens acima são aplicados como overrides. Ícones em frames `visible: false` (Default, Negative, Onboarding) mantêm fills hardcoded residuais — sem impacto visual.

### 5.17 Badge

| Token                                       | Alias Semântico                  | Descrição                                     |
| ------------------------------------------- | -------------------------------- | --------------------------------------------- |
| `component.badge.success.bg`                | `color.surface.success`          | Fundo badge Success                           |
| `component.badge.success.fg`                | `color.text.success`             | Texto/ícones badge Success                    |
| `component.badge.warning.bg`                | `color.surface.warning`          | Fundo badge Warning                           |
| `component.badge.warning.fg`                | `color.text.warning`             | Texto/ícones badge Warning                    |
| `component.badge.error.bg`                  | `color.surface.error`            | Fundo badge Error                             |
| `component.badge.error.fg`                  | `color.text.label-error`         | Texto/ícones badge Error                      |
| `component.badge.info.bg`                   | `color.surface.info`             | Fundo badge Info                              |
| `component.badge.info.fg`                   | `color.text.info`                | Texto/ícones badge Info                       |
| `component.badge.neutral-1.bg`              | `color.surface.neutral-muted`    | Fundo badge Neutral 1                         |
| `component.badge.neutral-1.fg`              | `color.text.dark`                | Texto/ícones badge Neutral 1                  |
| `component.badge.neutral-2.bg`              | `color.surface.neutral-light`    | Fundo badge Neutral 2                         |
| `component.badge.neutral-2.fg`              | `color.text.body`                | Texto/ícones badge Neutral 2                  |
| `component.badge.neutral-3.bg`              | `color.surface.placeholder`      | Fundo badge Neutral 3                         |
| `component.badge.neutral-3.fg`              | `color.text.secondary`           | Texto/ícones badge Neutral 3                  |
| `component.badge.promo.bg`                  | `color.surface.promo`            | Fundo badge Promoções                         |
| `component.badge.promo.fg`                  | `color.text.on-promo`            | Texto/ícones badge Promoções                  |
| `component.badge.premiere.bg`               | `color.surface.premiere`         | Fundo badge Estreia                           |
| `component.badge.premiere.fg`               | `color.text.on-premiere`         | Texto/ícones badge Estreia                    |
| `component.badge.blog.bg`                   | `color.surface.brand-active`     | Fundo badge Blog                              |
| `component.badge.blog.fg`                   | `color.text.dark`                | Texto/ícones badge Blog                       |
| `component.badge.filter-default.border`     | `color.border.hover`             | Borda badge Filter default                    |
| `component.badge.filter-default.fg`         | `color.text.brand-strong`        | Texto/ícones badge Filter default             |
| `component.badge.filter-active.bg`          | `color.interactive.primary.hover`| Fundo badge Filter Active                     |
| `component.badge.filter-active.fg`          | `color.text.on-dark`             | Texto/ícones badge Filter Active              |
| `component.badge.disabled.bg`               | `color.surface.subtle`           | Fundo badge Disabled                          |
| `component.badge.disabled.fg`               | `color.text.label-disabled`      | Texto/ícones badge Disabled                   |

> **Nota:** O Badge é um COMPONENT_SET com 26 variantes (13 Status × 2 Size). Cada variante tem foreground unificado — texto e ícones usam o mesmo component token `fg`. Filter default é o único status com stroke (sem fill). Font style é Bold para Filter Active e Disabled.

### 5.18 Movie Poster

| Token                                        | Alias Semântico        | Descrição                                  |
| -------------------------------------------- | ---------------------- | ------------------------------------------ |
| `component.movie-poster.text.default`        | `color.text.on-dark`   | Título e data sobre imagem (texto branco)  |

> **Nota:** O Movie Poster é um COMPONENT_SET com 3 variantes (Example=1/2/3), cada uma com uma imagem de poster diferente. Título (12px Regular) e data (14px Bold) compartilham o mesmo component token de texto. Imagem do poster é fill de imagem (não tokenizável). Spacing via `Spacing/Padding/Positive/2xs` (8px), radius via `Border/Radius/xs` (4px).

### 5.19 Event Card

| Token                                          | Alias Semântico        | Descrição                                          |
| ---------------------------------------------- | ---------------------- | -------------------------------------------------- |
| `component.event-card.bg.default`              | `color.surface.card`   | Fundo do card                                      |
| `component.event-card.border.default`          | `color.border.card`    | Borda do card (neutral/20)                         |
| `component.event-card.image-border.default`    | `color.surface.card`   | Stroke da imagem (match fundo, mascara cantos)     |
| `component.event-card.icon.default`            | `color.icon.muted`     | Ícone do calendário (grayscales/60)                |
| `component.event-card.date.default`            | `color.text.secondary` | Texto da data (grayscales/70)                      |
| `component.event-card.title.default`           | `color.text.body`      | Título do evento (neutral/80)                      |

> **Nota:** O Event Card contém instâncias **remotas** de Badge (Neutral 1 e Neutral 2, Size=Small). Os tokens do Badge (`component.badge.neutral-1.*`, `component.badge.neutral-2.*`) são aplicados como overrides nas instâncias. A imagem do evento é fill de imagem (não tokenizável). Spacing via `Spacing/Padding/Positive/sm` (16px) e radius via `Border/Radius/xs` (4px).


### 5.20 Fique por dentro Card

| Token                                                | Alias Semântico          | Descrição                                          |
| ---------------------------------------------------- | ------------------------ | -------------------------------------------------- |
| `component.fique-por-dentro-card.bg.default`         | `color.surface.card`     | Fundo do card (#FAFAFA)                            |
| `component.fique-por-dentro-card.border.default`     | `color.border.card`      | Borda do card (neutral/20)                         |
| `component.fique-por-dentro-card.title.default`      | `color.text.body`        | Título da notícia (neutral/80)                     |
| `component.fique-por-dentro-card.date.default`       | `color.text.secondary`   | Texto da data (grayscales/70)                      |
| `component.fique-por-dentro-card.icon.default`       | `color.icon.muted`       | Ícone do calendário (grayscales/60)                |

> **Nota:** O Fique por dentro Card contém instâncias **remotas** de Badge (Neutral 1 e Neutral 2, Size=Small). Os tokens do Badge (`component.badge.neutral-1.*`, `component.badge.neutral-2.*`) são aplicados como overrides nas instâncias. A imagem de destaque é fill de imagem (não tokenizável). Spacing via `Spacing/Padding/Positive/sm` (16px) e radius via `Border/Radius/xs` (4px).

### 5.21 Camera

| Token                               | Alias Semântico        | Descrição                                                |
| ----------------------------------- | ---------------------- | -------------------------------------------------------- |
| `component.camera.stroke.default`   | `color.border.active`  | Traço dos cantos (viewfinder); alinha a `primary.active` |

> **Nota:** Componente `Camera` na página Componentes — quatro layers `Vector` com `STROKE_COLOR`. Antes: variável remota da biblioteca `Design System Tokens` (`Color/Function/Primary/Active`). Após auditoria: token local na cadeia Component → Semantic → Primitive.

### 5.22 Notification Icon Group

`COMPONENT_SET` **notification-icon-group** (`7401:15998`) — variantes: `default`, `with-counter`, `dot`, `filled`.

| Token                                              | Alias Semântico              | Descrição |
| -------------------------------------------------- | ---------------------------- | --------- |
| `component.notification-icon-group.icon.default` | `color.icon.dark`            | Fill do sino (outline e filled); grayscales/90 |
| `component.notification-icon-group.counter.bg`   | `color.surface.error`        | Fundo do badge contador / dot (mesma cadeia que badge erro) |
| `component.notification-icon-group.counter.text` | `color.text.inverse`       | Número no badge (branco sobre vermelho) |
| `component.notification-icon-group.layout.hidden` | `color.surface.subtle`      | `rectangle-55` invisível (hit-area / layout); não afeta visual |

> **Nota:** Antes, `union` e `counter` usavam variáveis remotas `Design System Tokens` (`Color/Ambient/Grayscales/90`, `Color/Feedback/Error/Default`, etc.); texto do contador idem. Há **cadeia Component → Semantic → Primitive** local. O fill do contador usa `color.surface.error` (não `color.feedback.error/default` primitivo direto), alinhado ao padrão do **Badge Error** em doc.

### 5.23 Avatar

`COMPONENT_SET` **avatar** (`7518:11611`) — variantes: `size=small`, `size=large`. O variant `size=small` inclui ilustração decorativa interna (`frame-10892` + vetores); `size=large` só círculo + iniciais.

| Token                                              | Alias Semântico              | Descrição |
| -------------------------------------------------- | ---------------------------- | --------- |
| `component.avatar.bg.default`                    | `color.surface.backdrop`     | Fundo do círculo (`icon-container`) |
| `component.avatar.border.default`                | `color.border.muted`         | Borda do círculo |
| `component.avatar.label.default`               | `color.text.primary`         | Cor das iniciais (`icon-text`) |
| `component.avatar.inner.surface`               | `color.surface.card`         | Fundo do frame decorativo (small) |
| `component.avatar.inner.border`                | `color.border.muted`         | Borda do frame decorativo (small) |
| `component.avatar.inner.shape-muted`           | `color.border.strong`        | Vetores em tom médio (grayscales/40) |
| `component.avatar.inner.shape-subtle`          | `color.border.card`          | Vetores em tom claro (neutral/20) |
| `component.avatar.inner.shape-secondary`       | `color.icon.secondary`       | Vetores em tom secundário (grayscales/70) |

> **Nota:** Antes, fills/strokes usavam variáveis **remotas** da biblioteca `Design System Tokens` (`Color/Ambient/Neutral/10`, `Color/Ambient/Base/Dark`, etc.), sem a cadeia local de três camadas. Foram criados `color.surface.backdrop` e `color.border.muted` nos Semantic Tokens e tokens `component.avatar.*` na coleção Component Tokens; spacing/radius permanecem em tokens de layout (`Spacing/*`, `Border/Radius/*`).

### 5.24 Radio-icon

`COMPONENT_SET` **Radio-icon** (`7555:13248`) — variantes: `Variables=Default`, `Hover`, `Checked`, `Disabled`, `Disabled-checked`, `Error`, `Indeterminate`, `Focused`, `Focus-selected`.

| Token | Alias semântico | Uso |
| ----- | ---------------- | --- |
| `component.radio-icon.bg.canvas` | `color.surface.default` | Fundo branco / recorte do ícone |
| `component.radio-icon.bg.muted` | `color.surface.subtle` | Preenchimento cinza muito claro (foco vazio, máscaras) |
| `component.radio-icon.border.default` | `color.border.input-disabled` | Anel externo default (#CCC) |
| `component.radio-icon.border.hover` | `color.border.hover` | Anel hover (primary/action) |
| `component.radio-icon.border.error` | `color.border.error` | Anel erro |
| `component.radio-icon.border.focus-ring` | `color.border.focus` | Anel de foco (primary/default) |
| `component.radio-icon.border.disabled` | `color.border.input` | Anel disabled (#999) |
| `component.radio-icon.fill.disabled-track` | `color.surface.placeholder` | Preenchimento interno disabled (#E6E6E6) |
| `component.radio-icon.indicator.selected` | `color.icon.brand-strong` | Disco / traços selecionados (primary/action) |
| `component.radio-icon.indeterminate.track` | `color.surface.brand` | Fundo estado indeterminado |
| `component.radio-icon.indeterminate.icon` | `color.surface.subtle` | Traço branco/cinza claro no indeterminado |
| `component.radio-icon.disabled-checked.outer` | `color.border.input` | Camada externa disabled+checked |
| `component.radio-icon.disabled-checked.mid` | `color.border.strong` | Camadas internas disabled+checked |

> **Nota:** Cores vinham da biblioteca remota `Design System Tokens` ou preenchimento sem variável; `Rectangle 30` (Focused) usava `color.interactive.primary.default` sem camada Component — unificado em `component.radio-icon.border.focus-ring` → `color.border.focus`. Spacing/radius continuam em `Spacing/*` e `Border/Radius/*`.

### 5.25 Radio-button

`COMPONENT_SET` **Radio-button** (`8041:6995`) — 16 variantes: `Variable=Default|Hover|Checked|Error|Disabled|Disabled-checked|Focused|Focus-selected` × `Microcopy=Off` × `Option side=Left|Right`. Instância embutida **Radio-icon** (`7555:13248`) reutiliza `component.radio-icon.*`; overrides de cor nas instâncias foram alinhados aos tokens locais do ícone.

| Token | Alias semântico | Uso |
| ----- | ---------------- | --- |
| `component.radio-button.label.default` | `color.text.helper` | Label principal — estado default |
| `component.radio-button.label.hover` | `color.text.brand-strong` | Label — hover |
| `component.radio-button.label.checked` | `color.text.brand-strong` | Label — selecionado |
| `component.radio-button.label.focus` | `color.text.brand-strong` | Label — foco (anel vazio) |
| `component.radio-button.label.focus-selected` | `color.text.brand-strong` | Label — foco com seleção |
| `component.radio-button.label.error` | `color.text.error` | Label — erro |
| `component.radio-button.label.disabled` | `color.text.tertiary` | Label — disabled |
| `component.radio-button.label.disabled-checked` | `color.text.disabled` | Label — disabled + checked |
| `component.radio-button.divider` | `color.border.default` | Linha `Shape-line` entre itens |
| `component.radio-button.focus-ring.border` | `color.border.focus-secondary` | Borda do wrapper em Focused / Focus-selected |
| `component.radio-button.microcopy.default` | `color.text.tertiary` | Microcopy auxiliar (camadas ocultas) |
| `component.radio-button.link.optional` | `color.text.brand` | Link opcional em `auxiliary-labels` |
| `component.radio-button.feedback.error-icon` | `color.text.error` | Ícone de erro auxiliar |
| `component.radio-button.feedback.error-text` | `color.text.error` | Texto de erro auxiliar |
| `component.radio-button.feedback.success-icon` | `color.text.success` | Ícone de sucesso (`checkbox-circle-line`) |

> **Nota:** Antes, todas as cores vinham de variáveis remotas `Design System Tokens` (`Color/Ambient/Grayscales/80`, `Color/Function/Primary/Action`, `Error/Error`, etc.). Spacing, padding e radius permanecem em `Spacing/*`, `BaseTokens/Spacing/*` e `Border/Radius/*` (aceitável — coleção DST). Novo semântico: `color.border.focus-secondary`.

### 5.26 Card-options

`COMPONENT_SET` **Card-options** (`7555:13212`) — variantes: `State=Selected`, `State=Default`.

| Token | Alias semântico | Uso |
| ----- | ---------------- | --- |
| `component.card-options.container.bg` | `color.surface.default` | Fundo do card |
| `component.card-options.container.border.default` | `color.border.default` | Borda default (cinza claro) |
| `component.card-options.container.border.selected` | `color.border.hover` | Borda selecionada (primary/action) |
| `component.card-options.icon.leading` | `color.icon.brand` | Ícone `union` à esquerda |
| `component.card-options.title` | `color.text.default` | Título (E-MAIL / SMS) |
| `component.card-options.subtitle` | `color.text.supporting` | Subtítulo / metadado (#808080) |

> **Nota:** O rádio embutido reutiliza os mesmos `component.radio-icon.*` da **5.24** nas instâncias internas. Antes: fills/strokes remotos `Design System Tokens`. O semântico `color.text.default` no Figma foi **re-apontado** do alias remoto `Color/Ambient/Grayscales/90` para o primitivo local `color.ambient.grayscales.90` (cadeia Semantic → Primitive consistente).

### 5.27 Bottom Sheet

`COMPONENT_SET` **BottomSheet** (`7555:12998`) — variantes: `Type=Simple`, `Type=Benefits list`, `Type=Form`, `Type=Radio options`. Tokens cobrem superfície do sheet, handle, textos, ícones, listas de benefícios, scrollbar, divisória `Brk`, ícones de sucesso em formulário e reutilização de **Button**, **Card-options** e **Radio-icon** onde aplicável.

| Token | Alias semântico | Uso resumido |
| ----- | ---------------- | ------------ |
| `component.bottom-sheet.surface.shell` | `color.surface.card` | Fundo principal do sheet (#FAFAFA) |
| `component.bottom-sheet.surface.muted` | `color.surface.subtle` | Fundo de linhas de benefício / áreas suaves |
| `component.bottom-sheet.surface.footer` | `color.surface.card` | Faixa inferior / mixins de rodapé |
| `component.bottom-sheet.chrome.tab` | `color.border.default` | Indicador (handle) superior e traços de apoio |
| `component.bottom-sheet.divider` | `color.border.default` | Linha `Brk` entre seções |
| `component.bottom-sheet.text.title` | `color.text.primary` | Títulos principais |
| `component.bottom-sheet.text.body` | `color.text.helper` | Descrições em cinza |
| `component.bottom-sheet.text.brand` | `color.text.brand` | Destaques de marca em texto |
| `component.bottom-sheet.text.title-accent` | `color.text.brand-strong` | Título com ênfase em primary/action |
| `component.bottom-sheet.text.list-title` | `color.text.strong` | Título de item de benefício |
| `component.bottom-sheet.text.description` | `color.text.default` | Corpo de item (cinza escuro) |
| `component.bottom-sheet.text.caption` | `color.text.secondary` | Metadado / prazo |
| `component.bottom-sheet.text.supporting` | `color.text.supporting` | Texto secundário adicional |
| `component.bottom-sheet.text.inverse` | `color.text.inverse` | Texto claro sobre fundos escuros |
| `component.bottom-sheet.text.value` | `color.text.value` | Texto de alto contraste (deep dark) |
| `component.bottom-sheet.icon.primary` | `color.icon.brand` | Ícones de promoção / estrela / destaque |
| `component.bottom-sheet.icon.action` | `color.icon.brand-strong` | Traços fortes em primary/action |
| `component.bottom-sheet.icon.secondary` | `color.icon.secondary` | Ícones secundários em lista |
| `component.bottom-sheet.icon.muted` | `color.icon.muted` | Ícones em cinza médio |
| `component.bottom-sheet.icon.close` | `color.text.primary` | Ícone fechar (mesmo contraste do texto escuro) |
| `component.bottom-sheet.decoration.on-primary` | `color.surface.default` | Elipses / destaque sobre fundo primário |
| `component.bottom-sheet.form.icon.success` | `color.icon.success` | Check de sucesso no `Type=Form` |
| `component.bottom-sheet.form.icon.muted` | `color.icon.neutral-mid` | Vetores neutros médios (inputs) |
| `component.bottom-sheet.form.icon.secondary` | `color.icon.neutral-deep` | Vetores neutros mais escuros |
| `component.bottom-sheet.scrollbar.surface` | `color.surface.default` | Trilho claro da scrollbar |
| `component.bottom-sheet.scrollbar.thumb` | `color.border.strong` | Polegar da scrollbar |
| `component.bottom-sheet.scrollbar.rail` | `color.border.input-disabled` | Borda do trilho (`Grayscales/30`) |
| `component.bottom-sheet.scrollbar.label` | `color.text.tertiary` | Texto técnico interno da scrollbar |

> **Nota:** Antes, a maior parte das cores vinha de `Design System Tokens` remotos (`Color/Ambient/Base/Light`, `Color/Function/Primary/Default`, etc.) ou sem variável (`Brk`). Instâncias de **Button** usam tokens já existentes (`component.button.secondary.*`); **Card-options** e **Radio-icon** embutidos usam `component.card-options.*` e `component.radio-icon.*`. Novos semânticos: `color.icon.neutral-mid`, `color.icon.neutral-deep`.

### 5.28 Modal mobile

`COMPONENT_SET` **Modal mobile** (`7601:18126`) — variantes: `type=simples`, `type=destructive`, `type=illustration`. Diálogo central (328px) com ícone ou ilustração, título, corpo, ações (Button + Link) e fechar. **Correções de token (19/04/2026):** título e corpo deixaram de usar variáveis soltas da coleção `Design System Tokens` (`Color/Ambient/Base/Dark`, `Color/Ambient/Grayscales/70`); o fundo do card deixou de usar `Color/Ambient/Base/Deep Light` direto; o ícone **fechar** e o **info-outline** deixaram de usar `Color/Ambient/Base/Dark` e `Color/Function/Primary/Action` diretos.

| Token | Alias semântico | Uso |
| ----- | ---------------- | --- |
| `component.modal-mobile.surface.bg` | `color.surface.default` | Fundo branco do container do modal |
| `component.modal-mobile.text.body` | `color.text.secondary` | Parágrafo descritivo (corpo 14px, #666 no Neutral) |

**Reutilização (sem token novo):**

- **Título:** `component.bottom-sheet.text.title` → `color.text.primary` (mesmo contraste que o título do Bottom Sheet).
- **Ícone fechar:** `component.bottom-sheet.icon.close` → `color.text.primary`.
- **Ícone informativo (`info-outline`):** `component.feedback.info.icon` → `color.icon.default`.
- **Ícone destrutivo (`error-outline`):** já estava em `component.feedback.error.icon`.
- **Botões e link:** continuam com `component.button.*` e `component.link.primary.text.default`.

> **Ilustração (`type=illustration`):** os vetores internos da arte **cinema** permanecem com preenchimentos locais (paleta ilustrativa / marketing). Não faz parte da cadeia de tokens de produto — aceito como exceção documentada até eventual troca por asset com slots de cor de marca.

---

## 6. Tipografia

**Família:** Be Vietnam Pro (única família em todos os temas)
**Modos:** Mobile e Desktop (valores responsivos)
**Coleção Figma:** `Typography` — 47 variáveis

### Font Family (por role)


| Token                    | Valor            |
| ------------------------ | ---------------- |
| `font.family.display`    | Be Vietnam Pro   |
| `font.family.heading`    | Be Vietnam Pro   |
| `font.family.bodytext`   | Be Vietnam Pro   |
| `font.family.subtitle`   | Be Vietnam Pro   |
| `font.family.caption`    | Be Vietnam Pro   |
| `font.family.button`     | Be Vietnam Pro   |
| `font.family.input`      | Be Vietnam Pro   |
| `font.family.overline`   | Be Vietnam Pro   |
| `font.family.helper-text`| Be Vietnam Pro   |
| `font.family.link`       | Be Vietnam Pro   |

> Todas apontam para a mesma fonte hoje (D-001). Existem como variáveis separadas para permitir diferenciação futura por role sem breaking change.

### Tamanhos


| Token           | Mobile | Desktop | Uso típico          |
| --------------- | ------ | ------- | ------------------- |
| `font.size.xxs` | 9px    | 10px    | Legal text, badges  |
| `font.size.xs`  | 10px   | 12px    | Captions, overlines |
| `font.size.sm`  | 12px   | 14px    | Helper text, labels |
| `font.size.md`  | 14px   | 16px    | Body text, inputs   |
| `font.size.lg`  | 16px   | 20px    | Subtítulos, leads   |
| `font.size.xl`  | 18px   | 24px    | Headings pequenos   |
| `font.size.2xl` | 20px   | 32px    | Headings médios     |
| `font.size.3xl` | 24px   | 36px    | Headings grandes    |
| `font.size.4xl` | 28px   | 40px    | Display pequeno     |
| `font.size.5xl` | 32px   | 44px    | Display médio       |
| `font.size.6xl` | 36px   | 48px    | Display grande      |
| `font.size.7xl` | 40px   | 60px    | Hero titles         |
| `font.size.8xl` | 44px   | 72px    | Hero titles grandes |
| `font.size.9xl` | 48px   | 80px    | Hero máximo         |


### Pesos


| Token                         | Valor           |
| ----------------------------- | --------------- |
| `font.weight.regular`         | Regular (400)   |
| `font.weight.medium`          | Medium (500)    |
| `font.weight.semibold`        | Semibold (600)  |
| `font.weight.bold`            | Bold (700)      |
| `font.weight.italic`          | Italic          |
| `font.weight.medium-italic`   | Medium Italic   |
| `font.weight.semibold-italic` | Semibold Italic |
| `font.weight.bold-italic`     | Bold Italic     |


### Alturas de linha


| Token                  | Valor |
| ---------------------- | ----- |
| `font.line-height.xxs` | 12px  |
| `font.line-height.xs`  | 14px  |
| `font.line-height.sm`  | 16px  |
| `font.line-height.md`  | 20px  |
| `font.line-height.lg`  | 24px  |
| `font.line-height.xl`  | 32px  |
| `font.line-height.2xl` | 36px  |
| `font.line-height.3xl` | 40px  |
| `font.line-height.4xl` | 48px  |
| `font.line-height.5xl` | 56px  |


### Letter Spacing


| Token                        | Valor  | Uso               |
| ---------------------------- | ------ | ----------------- |
| `font.letter-spacing.tight`  | -0.5px | Headings grandes  |
| `font.letter-spacing.normal` | 0px    | Body text padrão  |
| `font.letter-spacing.wide`   | 0.5px  | Subtítulos        |
| `font.letter-spacing.wider`  | 1px    | Overlines, labels |
| `font.letter-spacing.widest` | 2px    | All-caps, badges  |


### Combinações recomendadas


| Role        | Size            | Weight   | Line Height            |
| ----------- | --------------- | -------- | ---------------------- |
| Display     | `font.size.5xl` | Bold     | `font.line-height.5xl` |
| H1          | `font.size.3xl` | Bold     | `font.line-height.4xl` |
| H2          | `font.size.2xl` | Semibold | `font.line-height.3xl` |
| H3          | `font.size.xl`  | Semibold | `font.line-height.2xl` |
| Subtitle 1  | `font.size.lg`  | Medium   | `font.line-height.xl`  |
| Subtitle 2  | `font.size.md`  | Medium   | `font.line-height.lg`  |
| Body 1      | `font.size.md`  | Regular  | `font.line-height.lg`  |
| Body 2      | `font.size.sm`  | Regular  | `font.line-height.md`  |
| Button      | `font.size.md`  | Semibold | `font.line-height.md`  |
| Caption     | `font.size.xs`  | Regular  | `font.line-height.xs`  |
| Overline    | `font.size.xs`  | Semibold | `font.line-height.xs`  |
| Helper Text | `font.size.sm`  | Regular  | `font.line-height.sm`  |


---

## 7. Espaçamento

**Base:** Grid de 4px · Sem variação por tema

### Escala positiva


| Token                           | Valor | Uso típico                        |
| ------------------------------- | ----- | --------------------------------- |
| `spacing.padding.positive.none` | 0px   | Reset                             |
| `spacing.padding.positive.3xs`  | 4px   | Gap entre ícone e label           |
| `spacing.padding.positive.2xs`  | 8px   | Padding interno de chips, badges  |
| `spacing.padding.positive.xs`   | 12px  | Padding lateral de itens de lista |
| `spacing.padding.positive.sm`   | 16px  | Padding padrão de cards, seções   |
| `spacing.padding.positive.md`   | 20px  | Padding de inputs, botões         |
| `spacing.padding.positive.lg`   | 24px  | Padding de seções médias          |
| `spacing.padding.positive.xl`   | 32px  | Padding de seções grandes         |
| `spacing.padding.positive.2xl`  | 40px  | Separação entre blocos            |
| `spacing.padding.positive.3xl`  | 48px  | Padding de headers                |
| `spacing.padding.positive.4xl`  | 56px  | Separação de seções maiores       |
| `spacing.padding.positive.5xl`  | 64px  | Seções hero                       |
| `spacing.padding.positive.6xl`  | 96px  | Seções de destaque                |


### Escala negativa


| Token                          | Valor |
| ------------------------------ | ----- |
| `spacing.padding.negative.3xs` | -4px  |
| `spacing.padding.negative.2xs` | -8px  |
| `spacing.padding.negative.xs`  | -12px |
| `spacing.padding.negative.sm`  | -16px |
| `spacing.padding.negative.md`  | -20px |
| `spacing.padding.negative.lg`  | -24px |
| `spacing.padding.negative.xl`  | -32px |
| `spacing.padding.negative.2xl` | -40px |
| `spacing.padding.negative.3xl` | -48px |
| `spacing.padding.negative.4xl` | -56px |
| `spacing.padding.negative.5xl` | -64px |
| `spacing.padding.negative.6xl` | -96px |


---

## 8. Bordas

### Radius


| Token                 | Valor  | Uso                          |
| --------------------- | ------ | ---------------------------- |
| `border.radius.sharp` | 0px    | Elementos sem arredondamento |
| `border.radius.2xs`   | 1–2px* | Pequenos destaques           |
| `border.radius.xs`    | 2–4px* | Tags, badges pequenos        |
| `border.radius.sm`    | 8px    | Inputs, botões               |
| `border.radius.md`    | 12px   | Cards, modais                |
| `border.radius.lg`    | 16px   | Bottom sheets, drawers       |
| `border.radius.xl`    | 24px   | Overlays grandes             |
| `border.radius.2xl`   | 32px   | Containers especiais         |
| `border.radius.3xl`   | 48px   | Elementos circulares grandes |
| `border.radius.round` | 999px  | Chips, avatars, botões pill  |


`*2xs` e `xs` variam por tema — ver [Temas Multi-Brand](#12-temas-multi-brand)

### Stroke


| Token                           | Valor | Uso                     |
| ------------------------------- | ----- | ----------------------- |
| `border.stroke.stroke-none`     | 0px   | Sem borda               |
| `border.stroke.stroke-hairline` | 0.5px | Divisores sutis         |
| `border.stroke.stroke-thin`     | 1px   | Bordas de inputs, cards |
| `border.stroke.stroke-medium`   | 2px   | Estado de foco, ênfase  |
| `border.stroke.stroke-thick`    | 4px   | Destaques especiais     |


---

## 9. Elevation Tokens

> Coleção `Elevation Tokens` · modo Universal (sem variação por tema)


| Token            | Valor (shadow)                 | Uso                        |
| ---------------- | ------------------------------ | -------------------------- |
| `elevation.none` | `none`                         | Sem elevação               |
| `elevation.xs`   | `0 1px 2px rgba(0,0,0,0.08)`   | Cards flat, itens de lista |
| `elevation.sm`   | `0 2px 8px rgba(0,0,0,0.10)`   | Cards padrão, dropdowns    |
| `elevation.md`   | `0 4px 16px rgba(0,0,0,0.12)`  | Bottom sheets, popovers    |
| `elevation.lg`   | `0 8px 24px rgba(0,0,0,0.16)`  | Modals, side panels        |
| `elevation.xl`   | `0 16px 40px rgba(0,0,0,0.20)` | Overlays de destaque       |


---

## 10. Motion Tokens

> Coleção `Motion Tokens` · modo Universal

### Durations


| Token                     | Valor | Uso                                  |
| ------------------------- | ----- | ------------------------------------ |
| `motion.duration.instant` | 100ms | Feedback imediato (toggle, checkbox) |
| `motion.duration.fast`    | 200ms | Hovers, micro-interações             |
| `motion.duration.normal`  | 300ms | Transições padrão (modals, sheets)   |
| `motion.duration.slow`    | 500ms | Entradas de tela, onboarding         |
| `motion.duration.slower`  | 700ms | Animações de destaque                |


### Easings


| Token                      | Valor                            | Uso                                           |
| -------------------------- | -------------------------------- | --------------------------------------------- |
| `motion.easing.standard`   | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Movimento padrão                              |
| `motion.easing.decelerate` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Entradas (elementos chegando)                 |
| `motion.easing.accelerate` | `cubic-bezier(0.4, 0.0, 1, 1)`   | Saídas (elementos indo embora)                |
| `motion.easing.spring`     | `spring(1, 100, 10, 0)`          | Animações elásticas (React Native Reanimated) |


---

## 11. Z-Index Tokens

> Coleção `Z-Index Tokens` · modo Universal


| Token              | Valor | Uso                            |
| ------------------ | ----- | ------------------------------ |
| `z-index.base`     | 0     | Conteúdo padrão                |
| `z-index.raised`   | 10    | Cards flutuantes, FAB          |
| `z-index.dropdown` | 100   | Menus, selects, autocomplete   |
| `z-index.sticky`   | 200   | Headers fixos, tab bars        |
| `z-index.overlay`  | 300   | Backdrops de modal             |
| `z-index.modal`    | 400   | Modals, dialogs, bottom sheets |
| `z-index.toast`    | 500   | Toasts, snackbars              |
| `z-index.tooltip`  | 600   | Tooltips (sempre no topo)      |


---

## 12. Temas Multi-Brand

### Visão geral


| Atributo       | NeutralTheme           | LeblonTheme           | RedTheme             | GreenTheme           |
| -------------- | ---------------------- | --------------------- | -------------------- | -------------------- |
| Cor primária   | Azul `#4274D6`         | Marrom/ouro `#BF8240` | Vermelho `#B11B2F`   | Verde `#367D4D`      |
| Cor secundária | Teal `#1B8998`         | Verde musgo `#609F80` | Terracota `#AD7352`  | Teal claro `#40BFB4` |
| Personalidade  | Tecnológico, confiável | Clássico, premium     | Dinâmico, energético | Natural, sustentável |
| Radius 2xs     | 1px                    | 1px                   | 2px                  | 2px                  |
| Radius xs      | 4px                    | 2px                   | 4px                  | 4px                  |


### Implementação em React Native

```typescript
// theme.ts — estrutura base de tema
interface Theme {
  colors: {
    function: {
      primary: ColorScale;
      secondary: ColorScale;
    };
    ambient: {
      neutral: ColorScale;
    };
  };
  border: {
    radius: BorderRadius;
  };
}

// Exemplo: NeutralTheme
export const NeutralTheme: Theme = {
  colors: {
    function: {
      primary: {
        dark: '#09142A',
        light: '#D5E0F6',
        active: '#81A2E4',
        default: '#4274D6',
        action: '#1B3C7E',
      },
      // ...
    },
  },
  border: {
    radius: {
      sharp: 0, '2xs': 1, xs: 4, sm: 8,
      md: 12, lg: 16, xl: 24, '2xl': 32,
      '3xl': 48, round: 999,
    },
  },
};

// ThemeContext
const ThemeContext = React.createContext<Theme>(NeutralTheme);
export const useTheme = () => React.useContext(ThemeContext);
```

---

---

## 13. Visual Theme & Atmosfera

> Esta seção captura a personalidade e filosofia visual de cada tema — essencial para que agentes de IA e designers tomem decisões coerentes sem consultar o Figma.

### Personalidade por tema

| Atributo       | NeutralTheme                   | LeblonTheme                    | RedTheme                        | GreenTheme                      |
| -------------- | ------------------------------ | ------------------------------ | ------------------------------- | ------------------------------- |
| Personalidade  | Tecnológico, confiável         | Clássico, premium              | Dinâmico, energético            | Natural, sustentável            |
| Densidade      | Compacta a média               | Média, arejada                 | Compacta, alta energia          | Média, orgânica                 |
| Arredondamento | Sutil — radius 2xs=1px, xs=4px | Mínimo — radius 2xs=1px, xs=2px| Moderado — radius 2xs=2px, xs=4px | Moderado — radius 2xs=2px, xs=4px |
| Cor primária   | Azul `#4274D6`                 | Marrom/ouro `#BF8240`          | Vermelho `#B11B2F`              | Verde `#367D4D`                 |
| Filosofia      | Funcional e direto             | Elegante e refinado            | Impactante e bold               | Equilibrado e acolhedor         |

### Princípios de design

- **Mobile-first:** toda decisão de densidade, tamanho de toque e tipografia parte do contexto React Native (iOS + Android).
- **Hierarquia de tokens:** 3 camadas garantem que componentes nunca usem valores crus — primitivo → semântico → componente.
- **Marca adaptável:** 4 temas compartilham a mesma estrutura de tokens; apenas os valores de `color.function.*` e `color.ambient.neutral.*` variam por tema.
- **Consistência tipográfica:** fonte única Be Vietnam Pro em todos os temas — personalidade visual é expressa por cor e forma, não por tipografia.
- **Acessibilidade por padrão:** cores de feedback (error, success, warning, info) são universais entre temas para garantir que o significado semântico não seja sobrescrito por branding.

---

## 14. Do's and Don'ts

### Cores

| ✅ Faça                                                                                        | ❌ Não faça                                                                  |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Use `color.text.warning` → `warning.action` (#916000) para texto                              | Use `warning.default` (#FFA800) como cor de texto — contraste WCAG AA insuficiente |
| No LeblonTheme, use `primary.action` (#734E26) para texto colorido de marca                   | Use `primary.default` (#BF8240) do LeblonTheme como texto sobre branco (~2.9:1) |
| Use `color.interactive.ghost.hover.bg` como o único uso de `primary.light` em estado interativo | Use `primary.light` como hover de botão preenchido                         |
| Componentes referenciam sempre tokens semânticos ou de componente                              | Referencie tokens primitivos diretamente em componentes React Native         |
| Use `warning.action` (#916000) em textos; `warning.default` apenas em ícones e backgrounds    | Inverta os papéis de `default` e `action` nos tokens de feedback             |

### Espaçamento

| ✅ Faça                                                                   | ❌ Não faça                                          |
| ------------------------------------------------------------------------- | --------------------------------------------------- |
| Use múltiplos de 4px via tokens: `spacing.padding.positive.sm` (16px)    | Hardcode valores fora do grid: 6px, 10px, 14px      |
| Referencie tokens de spacing em todos os componentes                      | Use valores mágicos de padding/margin sem token     |

### Tokens e naming

| ✅ Faça                                                                   | ❌ Não faça                                          |
| ------------------------------------------------------------------------- | --------------------------------------------------- |
| Siga a convenção: `color.ambient.base.deep-light`, `font.letter-spacing.tight` | Misture camelCase com dot-notation ou use PascalCase |
| Segmentos compostos usam kebab-case: `deep-light`, `brand-subtle`        | Use underscore ou camelCase em segmentos: `deepLight`, `deep_light` |
| Use `useTheme()` para acessar tokens do tema ativo                        | Importe cores diretamente de constantes estáticas    |

### Hover e interatividade

| ✅ Faça                                                                   | ❌ Não faça                                          |
| ------------------------------------------------------------------------- | --------------------------------------------------- |
| Inclua tokens `*/hover` na camada semântica (fonte única para RN + web)  | Implemente lógica de hover em componentes React Native |
| Aplique hover state apenas na versão web futura                           | Use `primary.light` como hover de qualquer botão preenchido |

### Tipografia

| ✅ Faça                                                                   | ❌ Não faça                                          |
| ------------------------------------------------------------------------- | --------------------------------------------------- |
| Use as combinações recomendadas da tabela de roles (seção 6)             | Combine tamanhos e pesos arbitrários fora da escala  |
| Varie apenas peso e tamanho entre temas                                   | Adicione fontes alternativas por tema                |

---

## 15. Comportamento Responsivo

**Plataforma atual:** React Native (iOS + Android). Web é planejado para o futuro — os tokens já contemplam ambos os modos.

### Tipografia responsiva

Todos os tokens de `font.size.*` e `font.line-height.*` têm dois modos: **Mobile** e **Desktop**. Em React Native, use sempre o modo Mobile.

| Modo    | Contexto                                       |
| ------- | ---------------------------------------------- |
| Mobile  | React Native (iOS + Android) — padrão atual    |
| Desktop | Web future — escala maior em todas as dimensões |

### Touch targets

- Altura mínima de elementos tocáveis: **44px** (iOS HIG) / **48dp** (Material Design)
- Espaçamento mínimo entre elementos tocáveis adjacentes: **8px** (`spacing.padding.positive.2xs`)
- Área de toque mínima para ícones isolados: **44×44px** mesmo que o ícone visual seja menor

### Breakpoints (Web future)

| Breakpoint | Largura | Tokens recomendados         |
| ---------- | ------- | --------------------------- |
| `sm`       | 375px   | Modo Mobile de tipografia   |
| `md`       | 768px   | Modo Desktop de tipografia  |
| `lg`       | 1024px  | Modo Desktop de tipografia  |
| `xl`       | 1440px  | Modo Desktop de tipografia  |

### Comportamento de hover

Tokens `*/hover` existem na coleção semântica e de componentes mas **não têm efeito em React Native** (sem cursor). Serão utilizados na versão web. Não implemente lógica de hover em componentes RN — os tokens existem apenas para que o arquivo seja fonte única para ambas as plataformas.

---

## 16. Agent Prompt Guide

> Use esta seção para instruir agentes de IA (Claude Code, GitHub Copilot, etc.) a gerar UI consistente com este Design System.

### Instrução padrão para agentes

```
Este projeto usa o Design System React Native documentado em design.md.
Há 4 temas: NeutralTheme, LeblonTheme, RedTheme e GreenTheme.
Regras obrigatórias:
- Sempre use tokens semânticos ou de componente — nunca tokens primitivos diretamente em componentes.
- A fonte é Be Vietnam Pro em toda a aplicação (única família).
- O grid é baseado em 4px: use apenas múltiplos de 4 (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px).
- Acesse o tema via useTheme() — nunca importe cores estáticas.
- Consulte a seção 14 (Do's and Don'ts) antes de implementar qualquer componente.
```

### Referência rápida de cores por tema

| Propósito             | NeutralTheme | LeblonTheme        | RedTheme    | GreenTheme  |
| --------------------- | ------------ | ------------------ | ----------- | ----------- |
| Ação primária (texto) | `#4274D6`    | `#734E26`*         | `#B11B2F`   | `#367D4D`   |
| Ação secundária       | `#1B8998`    | `#609F80`          | `#AD7352`   | `#40BFB4`   |
| Texto principal       | `#333333`    | `#333333`          | `#333333`   | `#333333`   |
| Fundo padrão          | `#FFFFFF`    | `#FFFFFF`          | `#FFFFFF`   | `#FFFFFF`   |
| Erro                  | `#DF2020`    | `#DF2020`          | `#DF2020`   | `#DF2020`   |
| Sucesso               | `#33CC33`    | `#33CC33`          | `#33CC33`   | `#33CC33`   |
| Aviso (texto)         | `#916000`    | `#916000`          | `#916000`   | `#916000`   |

*LeblonTheme: use `primary.action` (#734E26) para texto, não `primary.default` (#BF8240) — contraste insuficiente sobre branco (~2.9:1, falha WCAG AA).

### Prompts prontos

**Criar um novo componente:**
> "Crie o componente [Nome] para React Native seguindo os tokens em design.md. Use component tokens (camada 3) e nunca tokens primitivos diretamente. Tema padrão: NeutralTheme."

**Auditar um componente existente:**
> "Audite [Nome do componente] contra design.md: verifique se todos os valores de cor, spacing e tipografia usam tokens semânticos ou de componente corretos. Liste qualquer valor hardcoded ou fora do grid."

**Criar variante de tema:**
> "Adapte [Componente] para o LeblonTheme. Atenção: primary.default (#BF8240) não tem contraste WCAG AA como texto sobre branco — use primary.action (#734E26) para qualquer texto colorido com a marca."

**Revisar acessibilidade:**
> "Revise [Componente] para acessibilidade seguindo design.md: confirme que warning.default (#FFA800) não é usado como texto, que touch targets têm mínimo 44px, e que estados disabled usam os tokens corretos."

---

*Última atualização: 10/04/2026 · Fonte: arquivo Figma `01 - Tokens - React Native` (ZUEzW52KbL0DN9aKGSqwAs) · Auditado via Plugin API*
