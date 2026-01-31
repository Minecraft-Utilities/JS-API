export interface ARecord {
  type: "A";
  ttl: number;
  name?: string;
  address?: string;
}

export interface SRVRecord {
  type: "SRV";
  ttl: number;
  name: string;
  target: string;
  priority: number;
  weight: number;
  port: number;
}

export type DnsRecord = ARecord | SRVRecord;
