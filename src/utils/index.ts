import ky from "ky";
import domainCache from "./cache";
import { BrandInfo, BulkBrandInfo } from "../types";
import { getDomainWithoutSuffix } from "tldts";

const BASE_URL = "https://99vw6f1om9.execute-api.us-east-2.amazonaws.com";

/**
 * Will get the top level domain from the current window location. Will also parse out anything past the first
 * subdomain
 * Example: "https://www.google.com/search?q=hello"
 *          will return "google.com"
 *
 *          "https://www.mcdonalds.com.lb/en/home"
 *          will return "mcdonalds.com"
 */
export const getTLDFromCurrentSite = (currentSite: string) => {
  return getDomainWithoutSuffix(currentSite) as string;
};

/**
 * Will check if the current site is blocked
 * @param {string} href - The URL of the current site
 * @returns {[BrandInfo, boolean]} - Will return the domain info and whether it was retrieved from the cache
 */
export const fetchDomainInformation = async (href: string | undefined): Promise<[BrandInfo| undefined, boolean]> => {
  if (!href) return [undefined, false];

  const domain = getTLDFromCurrentSite(href);

  // This should not be unknown
  const result = domainCache.get(domain);

  if (result) {
    if (result.blocked) {
      return [result.body, true];
    } else {
      return [undefined, true];
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
      "body": undefined,
      "timestamp": new Date().toISOString()
    });
    return [undefined, false];
  }

  const domainInfo = await resp.json() as BrandInfo;

  domainCache.set(domain, {
    "status": resp.status,
    "blocked": true,
    "body": domainInfo,
    "timestamp": new Date().toISOString()
  });

  // If the response is 200, then the site is blocked
  return [domainInfo, false];
}

export const bulkFetchBrandInformation = async (brandNames: string[]) => {
  const searchParams = new URLSearchParams();
  brandNames.forEach((brandName) => {
    searchParams.append("brand", brandName);
  });

  const resp = await ky.get(`${BASE_URL}/brand/batch?${searchParams.toString()}`);

  const brandInfo = await resp.json() as BulkBrandInfo;

  console.log("resp from api gateway: ");
  console.dir(resp);
  console.log("brandInfo from api gateway: ", brandInfo);

  return brandInfo;
}
/**
 * @param {string} html representing a single element
 * @return {Element}
 */
export const htmlToElement = (html: string): Node => {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild as Node;
}