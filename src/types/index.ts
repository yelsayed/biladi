export enum DOMMessageTypes {
    LANDED_ON_BLOCKED_SITE = 'LANDED_ON_BLOCKED_SITE',
    FETCH_DOMAIN_INFO = 'FETCH_DOMAIN_INFO',
}

export type DOMMessage = {
    type: DOMMessageTypes;
    siteName?: string;
    description?: string;
}

export type DOMMessageResponse = {
    title: string;
    headlines: string[];
}

export type DomainInfo = {
    domain: string;
    description: string;
    name: string;
};

export type DomainInfoCacheItem = {
    status: number;
    blocked: boolean;
    timestamp: string;  // ISO 8601
    body: DomainInfo | undefined;  // if blocked is true, then this will be defined
}