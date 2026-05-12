import { Cape } from "./cape/cape";
import { CapeHistory } from "./cape/cape-history";
import { Skin } from "./skin/skin";
import { SkinHistory } from "./skin/skin-history";

export type Player = {
  uniqueId: string;
  username: string;
  legacyAccount: boolean;
  skin: Skin;
  skinHistory: SkinHistory[];
  cape?: Cape;
  capeHistory?: CapeHistory[];
  optifineCape?: Cape;
  submittedUuids: number;
  lastUpdated: Date;
  firstSeen: Date;
};
