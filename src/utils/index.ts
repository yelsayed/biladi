import { getDomainWithoutSuffix } from "tldts";
import { BulkBrandInfo } from "../types";
import Banner from "../components/Banner";

export type BrandDomMap = Record<string, Element[]>;

/**
 * Will get the top level domain from the current window location. Will also parse out anything past the first
 * subdomain
 * Example: "https://www.google.com/search?q=hello"
 *          will return "google.com"
 *
 *          "https://www.mcdonalds.com.lb/en/home"
 *          will return "mcdonalds.com"
 */
export const getTLDFromSite = (currentSite: string) => {
  return getDomainWithoutSuffix(currentSite) as string;
};

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

/**
 * Will manipulate the DOM to show boycott information
 * @param brandDomMap - A map of brand names to DOM elements
 * @param brandBoycottData - The boycott data to use to manipulate the DOM
 */
export const setBoycottDivs = (brandDomMap: BrandDomMap, brandBoycottData: BulkBrandInfo) => {
  Object.entries(brandDomMap).forEach(([brandName, brandDomElements]) => {
    const uuid = brandBoycottData.accessKeys[brandName];

    if (!uuid) return;

    brandDomElements.forEach((brandDomElement) => {
      const brandInfo = brandBoycottData.brands[uuid];
      const addendum = Banner({ brandName: brandInfo.name });
      brandDomElement.setAttribute("style", "position: relative;");
      brandDomElement.appendChild(addendum);
    });
  })
}
