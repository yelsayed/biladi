import { BrandCacheItem, DomainCacheItem } from "../types";

const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour

type BaseCacheItem = {
  timestamp: string;
  fromCache?: boolean;
};

class DomainCache<T extends BaseCacheItem> {
  private cache: { [key: string]: T } = {};
  private ttl: number = DEFAULT_TTL;

  DomainCache(_ttl?: number) {
    this.ttl = _ttl || this.ttl;
  }

  public get(key: string): T | undefined {
    const element = this.cache[key];

    if (element && element.timestamp) {
      const now = new Date();
      const then = new Date(element.timestamp);
      const diff = now.getTime() - then.getTime();
      if (diff > this.ttl) {
        return undefined;
      }
      return { ...element, fromCache: true };
    }
    return undefined;
  }

  public set(key: string, value: T): void {
    this.cache[key] = value;
  }

  public clear(): void {
    this.cache = {};
  }
}

export const domainCache = new DomainCache<DomainCacheItem>();
export const brandCache = new DomainCache<BrandCacheItem>();

