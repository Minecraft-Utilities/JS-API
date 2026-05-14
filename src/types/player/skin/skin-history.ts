import { Skin } from "./skin";

export type SkinHistory = Skin & {
  lastUsed: string;
};
