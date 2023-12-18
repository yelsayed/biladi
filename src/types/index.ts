import { BaseCacheItem } from "../utils/cache";

export enum DOMMessageTypes {
    LANDED_ON_BLOCKED_SITE = 'LANDED_ON_BLOCKED_SITE',
    FETCH_DOMAIN_INFO = 'FETCH_DOMAIN_INFO',
    FETCH_BRAND_INFO = 'FETCH_BRAND_INFO',
    URL_CHANGED = 'URL_CHANGED'
}

export type DOMMessage = {
    type: DOMMessageTypes;
    brandInfo?: BrandInfo;
    description?: string;
    brandNames?: string[];
}

export type DOMMessageResponse = {
    title: string;
    headlines: string[];
}

export enum SupportTypeColors {
    I = "#c71224",
    D = "#f6b26a",
    B = "#ffe597"
}

export enum SupportTypeStrings {
    I = "Founded in apartheid",
    D = "Directly funds apartheid",
    B = "Does business in apartheid"
}

export enum SupportType {
    I = "Apartheid Founded",
    D = "Funds Apartheid",
    B = "Does Business"
}

export type BrandInfo = {
    id: string,
    domain: string;
    name: string;
    description: string;
    type: keyof typeof SupportType;
};

export type BulkBrandInfo = {
    // brand name to uuid
    accessKeys: Record<string, string>
    brands: Record<string, BrandInfo>
}

export interface DomainCacheItem extends BaseCacheItem {
    status: number;
    blocked: boolean;
    body: BrandInfo | undefined;  // if blocked is true, then this will be defined
}

export interface BrandCacheItem extends BaseCacheItem {
    body: BrandInfo | undefined;
}
