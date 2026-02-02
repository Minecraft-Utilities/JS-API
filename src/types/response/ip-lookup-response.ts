import type { GeoLocation } from "../server/server";
import type { AsnLookup } from "../server/server";

export type IpLookup = {
  ip: string;
  location: GeoLocation | null;
  asn: AsnLookup | null;
};
