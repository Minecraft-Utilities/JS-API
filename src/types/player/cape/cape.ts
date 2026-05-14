import { CapePart } from "./cape-part";

export type Cape = {
  id: string;
  name?: string;
  textureId: string;
  textureUrl: string;
  parts: Record<CapePart, string>;
  uniqueOwners: number;
  firstSeen: string;
  firstSeenUsing?: string;
  accountsSeenOwning?: string[];
};
