import { Skin } from "./skin";

export type SkinHistory = Skin & {
  firstUsed: Date;
  lastUsed: Date;
};
