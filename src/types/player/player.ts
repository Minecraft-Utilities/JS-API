import { Cape } from "./cape/cape";
import { Skin } from "./skin/skin";

export type Player = {
  uniqueId: string;
  username: string;
  legacyAccount: boolean;
  skin: Skin;
  skinHistory: Skin[];
  cape?: Cape;
  capeHistory?: Cape[];
  optifineCape?: Cape;
};
