import ky from "ky";
import domainCache from "./cache";
import {DomainInfo} from "../types";

const BASE_URL = "https://8k5qjp8wea.execute-api.us-east-2.amazonaws.com/domains";

/**
 * Will get the top level domain from the current window location
 * Example: https://www.google.com/search?q=hello
 *          will return google.com
 */
export const getTLDFromCurrentSite = (currentSite: string) => {
  const url = new URL(currentSite);
  const hostname = url.hostname;
  return hostname.split('.').slice(-2).join('.');
};

/**
 * Will check if the current site is blocked
 * @param {string} href - The URL of the current site
 * @returns true if the site is blocked, false otherwise
 */
export const fetchBlockInformation = async (href: string | undefined): Promise<DomainInfo | undefined> => {
  if (!href) return;

  const domain = getTLDFromCurrentSite(href);

  // This should not be unknown
  const result = domainCache.get(domain);

  if (result) {
    if (result.blocked) {
      return result.body;
    } else {
      return;
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
    return;
  }

  const domainInfo = await resp.json() as DomainInfo;

  domainCache.set(domain, {
    "status": resp.status,
    "blocked": true,
    "body": domainInfo,
    "timestamp": new Date().toISOString()
  });

  // If the response is 200, then the site is blocked
  return domainInfo;
}
