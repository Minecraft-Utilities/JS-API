import type { Cache } from "../cache";

export interface Server extends Cache {
  hostname: string;
  ip: string;
  port: number;
  motd: ServerMotd;
  players: ServerPlayers;
  records: Array<DnsRecord>;
  location: ServerLocation;
  asn: AsnData;
}

export type ServerMotd = {
  raw: string[];
  clean: string[];
  html: string[];
};

export type ServerPlayers = {
  online: number;
  max: number;
};

export type DnsRecord = {
  type: string;
  ttl: number;
  address: string;
};

export type ServerLocation = {
  country: string;
  countryCode: string;
  region: string;
  latitude: number;
  longitude: number;
};

export type AsnData = {
  asn: string;
  asnOrg: string;
}