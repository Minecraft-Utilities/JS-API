import { SkinModel } from "./skin-model";
import { SkinPart } from "./skin-part";

export type Skin = {
    textureId: string;
    model: SkinModel;
    legacy: boolean;
    textureUrl: string;
    parts: Record<SkinPart, string>;
};
