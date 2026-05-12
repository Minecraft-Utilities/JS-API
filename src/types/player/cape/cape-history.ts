import { Cape } from "./cape";

export type CapeHistory = Cape & {
  firstSeen: Date;
  lastUsed: Date;
};
