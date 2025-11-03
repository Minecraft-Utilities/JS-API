import type { Server } from "./server";

export interface JavaServer extends Server {
  version: ServerVersion;
  favicon: ServerFavicon;
  preventsChatReports: boolean;
  enforcesSecureChat: boolean;
  previewsChat: boolean;
  mojangBlocked: boolean;
};

export type ServerVersion = {
  name: string;
  platform: string;
  protocol: number;
  protocolName: string;
};

export type ServerFavicon = {
  base64: string;
  url: string;
}