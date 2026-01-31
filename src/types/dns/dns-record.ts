import type { ARecord } from "./impl/a-record";
import type { SRVRecord } from "./impl/srv-record";

export type { ARecord } from "./impl/a-record";
export type { SRVRecord } from "./impl/srv-record";

export type DnsRecord = ARecord | SRVRecord;
