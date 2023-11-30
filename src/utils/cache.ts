import { BrandInfoCacheItem } from "../types";

const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour

class DomainCache {
  private cache: { [key: string]: BrandInfoCacheItem } = {};
  private ttl: number = DEFAULT_TTL;

  DomainCache(_ttl?: number) {
    this.ttl = _ttl || this.ttl;
  }

  public get(key: string): BrandInfoCacheItem | undefined {
    const domain = this.cache[key];

    if (domain && domain.timestamp) {
      const now = new Date();
      const then = new Date(domain.timestamp);
      const diff = now.getTime() - then.getTime();
      if (diff > this.ttl) {
        return undefined;
      }
    }
    return domain;
  }

  public set(key: string, value: BrandInfoCacheItem): void {
    this.cache[key] = value;
  }

  public clear(): void {
    this.cache = {};
  }
}

const domainCache = new DomainCache();

export default domainCache;
