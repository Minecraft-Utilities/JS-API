import { CapePart } from "./cape-part";

export type Cape = {
  textureId: string;
  textureUrl: string;
  parts: Record<CapePart, string>;
};

export type CapeData = {
  name: string;
  textureId: string;
  textureUrl: string;
  parts: Record<CapePart, string>;
};
