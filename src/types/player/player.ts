import { Cape } from "./cape/cape";
import { ProfileProperty } from "./profile-property";
import { Skin } from "./skin/skin";

export type Player = {
  uniqueId: string;
  username: string;
  legacyAccount: boolean;
  skin: Skin;
  cape?: Cape;
  rawProperties?: ProfileProperty[];
};
