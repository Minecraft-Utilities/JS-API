import { Skin } from "./skin";

export type SkinHistory = Skin & {
  firstSeen: Date;
  lastUsed: Date;
};
