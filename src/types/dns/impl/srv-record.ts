export interface SRVRecord {
  type: "SRV";
  ttl: number;
  name: string;
  target: string;
  priority: number;
  weight: number;
  port: number;
}
