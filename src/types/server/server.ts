import type { Cache } from "../cache/cache";
import type { DnsRecord } from "../dns/dns-record";

export interface Server extends Cache {
  hostname: string;
  ip: string;
  port: number;
  motd: ServerMotd;
  players: ServerPlayers;
  records: DnsRecord[];
  location?: GeoLocation | null;
  asn?: AsnLookup | null;
}

export type ServerMotd = {
  raw: string[];
  clean: string[];
  html: string[];
  preview: string;
  htmlPreview: string;
};

export type ServerPlayerSampleName = {
  raw: string;
  clean: string;
  html: string;
};

export type ServerPlayerSample = {
  id: string;
  name: ServerPlayerSampleName;
  url: string;
};

export type ServerPlayers = {
  online: number;
  max: number;
  sample?: ServerPlayerSample[];
};

export type GeoLocation = {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  flagUrl: string;
};

export type AsnLookup = {
  asn: string;
  asnOrg: string;
};