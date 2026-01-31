export interface ARecord {
  type: "A";
  ttl: number;
  name?: string;
  address?: string;
}
