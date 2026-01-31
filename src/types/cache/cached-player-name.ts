import type { Cache } from "./cache";

export type CachedPlayerNameData = {
  username: string;
  uniqueId: string;
};

export type CachedPlayerName = Cache & CachedPlayerNameData;
