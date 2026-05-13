import { Page } from "../../pagination/pagination";

export type CapesResponse = {
  id: string;
  imageUrl: string;
  accountsOwned: number;
};

export type CapesResponsePage = Page<CapesResponse>;
