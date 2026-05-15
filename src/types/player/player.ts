import type { Cape } from "./cape/cape";
import type { Skin } from "./skin/skin";
import type { UsernameHistory } from "./username-history";

export type PlayerType = "FULL" | "BASIC";

export type BasicPlayer = {
  uniqueId: string;
  username: string;
  skin: Skin;
  cape?: Cape;
  firstSeen: string;
};

export type FullPlayer = BasicPlayer & {
  legacyAccount: boolean;
  submittedUuids: number;
  skinHistory: Skin[];
  capeHistory?: Cape[];
  usernameHistory?: UsernameHistory[];
  lastUpdated: string;
};
