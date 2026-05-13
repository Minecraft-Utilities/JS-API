import { CapePart } from "./cape-part";

export type Cape = {
  id: string;
  name?: string;
  textureId: string;
  textureUrl: string;
  parts: Record<CapePart, string>;
  accountsOwned: number;
  firstSeenUsing?: string;
  accountsSeenOwning?: string[];
};
