# Minecraft Utilities - JavaScript API

TypeScript client for the [McUtils API](https://mc.fascinated.cc/api) - server status, player lookups, skins, that sort of thing.

```bash
bun add mcutils-js-api
```

```typescript
import McUtilsAPI from "mcutils-js-api";

const api = new McUtilsAPI();
const { player, error } = await api.fetchPlayer("ImFascinated");

if (error) {
  console.error(error.message);
} else {
  console.log(player?.username);
}
```
