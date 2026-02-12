import { Page } from "../pagination/pagination";

export type SkinsResponse = {
    id: string;
    imageUrl: string;
    accountsUsed: number;
}

export type SkinsResponsePage = Page<SkinsResponse>;