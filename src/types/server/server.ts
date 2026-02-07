import type { Cache } from "../cache/cache";
import type { DnsRecord } from "../dns/dns-record";
import { ServerRegistryEntry } from "../server-registry/server-registry-entry";

export type ServerPlatform = "java" | "bedrock";

export interface Server extends Cache {
  hostname: string;
  ip: string;
  port: number;
  motd: ServerMotd;
  players: ServerPlayers;
  records: DnsRecord[];
  location?: GeoLocation;
  asn?: AsnLookup;
  registryEntry?: ServerRegistryEntry;
}

export type ServerMotd = {
  raw: string[];
  clean: string[];
  html: string[];
  preview: string;
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
  timeZone: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  flagUrl: string;
};

export type AsnLookup = {
  asn: string;
  asnOrg: string;
  cidr: string;
};