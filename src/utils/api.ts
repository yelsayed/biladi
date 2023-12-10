import ky from "ky";
import { BrandInfo, BulkBrandInfo, DomainCacheItem } from "../types";
import { brandCache, domainCache } from "./cache";
import { getTLDFromSite } from "./index";

const BASE_URL = "https://99vw6f1om9.execute-api.us-east-2.amazonaws.com";

/**
 * Will check if the current site is blocked
 * @param {string} href - The URL of the current site
 * @returns {[BrandInfo, boolean]} - Will return the domain info and whether it was retrieved from the cache
 */
export const fetchDomainInformation = async (href: string | undefined): Promise<DomainCacheItem | undefined> => {
  if (!href) return undefined;

  const domain = getTLDFromSite(href);

  // This should not be unknown
  const result = domainCache.get(domain);

  if (result) {
    if (result.blocked) {
      return result;
    } else {
      return result;
    }
  }

  // Use ky to make the request
  const resp = await ky.get(`${BASE_URL}/brand?brand=${domain}`, {
    throwHttpErrors: false
  });

  if (!resp.ok) {
    domainCache.set(domain, {
      "status": resp.status,
      "blocked": false,
      "body": undefined
    });
    return undefined;
  }

  const domainInfo = await resp.json() as BrandInfo;

  console.log("domainInfo", domainInfo);

  const domainCacheItem = domainCache.set(domain, {
    "status": resp.status,
    "blocked": true,
    "body": domainInfo
  });

  console.log("domain cache item", domainCacheItem);

  // If the response is 200, then the site is blocked
  return domainCacheItem;
}
export const bulkFetchBrandInformation = async (brandNames: string[]) => {
  const searchParams = new URLSearchParams();
  const fromCache: BulkBrandInfo = {
    accessKeys: {},
    brands: {}
  };


  brandNames.forEach((brandName) => {
    if (!brandName) return;

    const brandInfo = brandCache.get(brandName);


    if (brandInfo) {
      const brandId = brandInfo?.body?.id || "";
      fromCache.accessKeys[brandName] = brandId;
      fromCache.brands[brandId] = brandCache.get(brandName)?.body as BrandInfo;
      return;
    }

    searchParams.append("brand", brandName);
  });


  if (searchParams.toString() === "") {
    return fromCache;
  }

  const resp = await ky.get(`${BASE_URL}/brand/batch?${searchParams.toString()}`);

  const brandInfo = await resp.json() as BulkBrandInfo;


  // Set in the cache the hits
  if (brandInfo.accessKeys) {
    Object.entries(brandInfo.accessKeys).forEach(([key, uuid]) => {
      brandCache.set(key, {
        "body": brandInfo.brands[uuid],
      });
    });
  }

  // Set in the cache the misses as undefined
  brandNames.forEach((brandName) => {
    if (!brandName) return;

    if ((!brandInfo.accessKeys || !brandInfo.accessKeys[brandName]) && !brandCache.get(brandName)) {
      brandCache.set(brandName, {
        "body": undefined,
      });
    }
  });

  return {
    accessKeys: {
      ...fromCache.accessKeys,
      ...brandInfo.accessKeys
    },
    brands: {
      ...fromCache.brands,
      ...brandInfo.brands
    }
  };
}