import type { GeoLocation } from "../server/server";
import type { AsnLookup } from "../server/server";

export type IpLookupResponse = {
  ip: string;
  location: GeoLocation | null;
  asn: AsnLookup | null;
};
