import type { Cape } from "./cape/cape";
import type { CapeHistory } from "./cape/cape-history";
import type { Skin } from "./skin/skin";
import type { SkinHistory } from "./skin/skin-history";
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
  skinHistory: SkinHistory[];
  capeHistory?: CapeHistory[];
  usernameHistory?: UsernameHistory[];
  lastUpdated: string;
};
