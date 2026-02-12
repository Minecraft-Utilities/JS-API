import { Page } from "../pagination/pagination";

export type SkinsResponse = {
    imageUrl: string;
    accountsUsed: number;
}

export type SkinsResponsePage = Page<SkinsResponse>;