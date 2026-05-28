# Showcase — Vitrine DS

App Expo Router para visualizar os componentes de `@vitrine-ds/react-native`.

## Como rodar

**Sempre execute os comandos a partir desta pasta** (`showcase/`) **ou** use os scripts na raiz do monorepo.

```bash
# Na raiz do repositório
npm run showcase:web

# Ou dentro de showcase/
cd showcase
npm run web
```

Abre o bundler e a versão web em **http://localhost:8082** (porta 8082 evita conflito com outros apps Expo que costumam usar 8081).

## Problemas comuns

### `Input is required` / porta em uso

Outro processo pode estar usando a mesma porta. Escolha outra explicitamente:

```bash
cd showcase
EXPO_OFFLINE=1 npx expo start --web --port 8083
```

### `TypeError: fetch failed` ao iniciar

O CLI do Expo tenta validar dependências na API da Expo. Em rede restrita, VPN ou offline isso falha. Os scripts `npm run web` e `npm run start` já usam `EXPO_OFFLINE=1` para evitar isso. Se rodar `npx expo` direto, prefira:

```bash
EXPO_OFFLINE=1 npx expo start --web
```

### Comando na pasta errada

`npx expo start --web` na **raiz** do monorepo não encontra o app Expo. Use `npm run showcase:web` na raiz ou entre em `showcase/` antes do comando.

### Dependências não instaladas

```bash
cd showcase
npm install
```
