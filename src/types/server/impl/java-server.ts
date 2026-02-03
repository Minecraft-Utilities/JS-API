import type { Server } from "../server";

export interface JavaServer extends Server {
  version: ServerVersion;
  favicon?: ServerFavicon;
  modInfo?: ForgeModInfo;
  forgeData?: ForgeData;
  preventsChatReports: boolean;
  enforcesSecureChat: boolean;
  previewsChat: boolean;
  mojangBlocked: boolean;
  isModded: boolean;
}

export type ServerVersion = {
  name: string;
  platform: string;
  protocol: number;
  protocolName: string;
};

export type ServerFavicon = {
  base64: string;
  url: string;
};

export type ForgeModInfo = {
  type: string;
  modList?: ForgeMod[];
};

export type ForgeData = {
  channels?: ForgeChannel[];
  mods?: ForgeMod[];
  truncated: boolean;
  fmlNetworkVersion: number;
};

export type ForgeChannel = {
  name: string;
  version: string;
  required?: boolean;
};

export type ForgeMod = {
  name: string;
  version: string;
};
