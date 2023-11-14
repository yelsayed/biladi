import ky from "ky";
import domainCache from "./cache";
import {DomainInfo} from "../types";
import {getDomainWithoutSuffix} from "tldts";

const BASE_URL = "https://8k5qjp8wea.execute-api.us-east-2.amazonaws.com/domains";

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
 * @returns {[DomainInfo, boolean]} - Will return the domain info and whether it was retrieved from the cache
 */
export const fetchBlockInformation = async (href: string | undefined): Promise<[DomainInfo| undefined, boolean]> => {
  if (!href) return [undefined, false];

  const domain = getTLDFromCurrentSite(href);

  console.log(domain);

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
  const resp = await ky.get(`${BASE_URL}/${domain}`, {
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

  const domainInfo = await resp.json() as DomainInfo;

  domainCache.set(domain, {
    "status": resp.status,
    "blocked": true,
    "body": domainInfo,
    "timestamp": new Date().toISOString()
  });

  // If the response is 200, then the site is blocked
  return [domainInfo, false];
}
