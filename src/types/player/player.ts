export type SkinModel = "DEFAULT" | "SLIM";

export type SkinPart = "HEAD" | "FULLBODY_FRONT" | "FULLBODY_BACK" | "FACE" | "BODY";
export type SkinParts = Record<SkinPart, string>;

export type Skin = {
  model: SkinModel;
  legacy: boolean;
  textureUrl: string;
  parts: SkinParts;
};

export type Cape = {
  textureUrl: string;
};

export type ProfileProperty = {
  name: string;
  value: string;
  signature?: string;
};

export type Player = {
  uniqueId: string;
  username: string;
  legacyAccount: boolean;
  skin: Skin;
  cape?: Cape;
  rawProperties?: ProfileProperty[];
};
