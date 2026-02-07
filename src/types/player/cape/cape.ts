import { CapePart } from "./cape-part";

export type Cape = {
  name?: string;
  textureId: string;
  textureUrl: string;
  parts: Record<CapePart, string>;
};