export type SkinModel = "DEFAULT" | "SLIM";

export type SkinParts = Record<string, string>;

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
  skin?: Skin | null;
  cape?: Cape | null;
  rawProperties?: ProfileProperty[];
};
