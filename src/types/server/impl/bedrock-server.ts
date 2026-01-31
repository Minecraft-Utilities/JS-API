import type { Server } from "../server";

export interface BedrockServer extends Server {
  id: string;
  edition: ServerEdition;
  version: ServerVersion;
  gamemode: ServerGamemode;
}

export type ServerEdition = "MCPE" | "MCEE";

export type ServerVersion = {
  protocol: number;
  name: string;
}

export type ServerGamemode = {
  name: string;
  numericId: number;
}
