export enum DOMMessageTypes {
    LANDED_ON_BLOCKED_SITE = 'LANDED_ON_BLOCKED_SITE',
    FETCH_DOMAIN_INFO = 'FETCH_DOMAIN_INFO',
    FETCH_BRAND_INFO = 'FETCH_BRAND_INFO',
    URL_CHANGED = 'URL_CHANGED'
}

export type DOMMessage = {
    type: DOMMessageTypes;
    siteName?: string;
    description?: string;
    brandNames?: string[];
}

export type DOMMessageResponse = {
    title: string;
    headlines: string[];
}

export type BrandInfo = {
    id: string,
    domain: string;
    name: string;
    description: string;
};

export type BulkBrandInfo = {
    // brand name to uuid
    accessKeys: Record<string, string>
    brands: Record<string, BrandInfo>
}

export type BrandInfoCacheItem = {
    status: number;
    blocked: boolean;
    timestamp: string;  // ISO 8601
    body: BrandInfo | undefined;  // if blocked is true, then this will be defined
}