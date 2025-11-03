import type { Cache } from "../cache";

export interface Server extends Cache {
  hostname: string;
  ip: string;
  port: number;
  motd: ServerMotd;
  players: ServerPlayers;
  records: Array<DnsRecord>;
  version: ServerVersion;
  favicon: ServerFavicon;
  preventsChatReports: boolean;
  enforcesSecureChat: boolean;
  previewsChat: boolean;
  location: ServerLocation;
  asn: AsnData;
  mojangBlocked: boolean;
};

export type ServerMotd = {
  raw: string[];
  clean: string[];
  html: string[];
}

export type ServerPlayers = {
  online: number;
  max: number;
}

export type DnsRecord = {
  type: string;
  ttl: number;
  address: string;
}

export type ServerVersion = {
  name: string;
  platform: string;
  protocol: number;
  protocolName: string;
}

export type ServerFavicon = {
  base64: string;
  url: string;
}

export type ServerLocation = {
  country: string;
  region: string;
  latitude: number;
  longitude: number;
};

export type AsnData = {
  asn: string;
  asnOrg: string;
}