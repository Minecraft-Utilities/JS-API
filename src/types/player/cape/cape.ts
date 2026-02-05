import { CapePart } from "./cape-part";

export type Cape = {
    textureUrl: string;
    parts: Record<CapePart, string>;
};
