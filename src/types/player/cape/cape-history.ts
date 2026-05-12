import { Cape } from "./cape";

export type CapeHistory = Cape & {
  firstUsed: Date;
  lastUsed: Date;
};
