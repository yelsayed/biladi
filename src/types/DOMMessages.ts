export enum DOMMessageTypes {
    LANDED_ON_BLOCKED_SITE = 'LANDED_ON_BLOCKED_SITE'
}

export type DOMMessage = {
    type: DOMMessageTypes;
}

export type DOMMessageResponse = {
    title: string;
    headlines: string[];
}