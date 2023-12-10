import { DOMMessageTypes } from '../types';
import { startObserver, stopObserver } from "../utils/observer";
import { BrandDomMap, setBoycottDivs } from "../utils";

/**
 *
 * @param elementBrandSelectors - Array of a tuple of selectors to find the brand name
 */
const getBrandsFromDOM = (elementBrandSelectors: Array<[string, string]>) => {
  const brandElementMap: BrandDomMap = {};

  elementBrandSelectors.forEach(([elementSelector, brandSelector]) => {
    const domElements = document.getElementsByClassName(elementSelector);

    Array.prototype.map.call(domElements, (e: HTMLElement) => {
      if (!e) return;

      const brandElement = e.querySelector(brandSelector);

      if (!brandElement) return;

      const brandName = brandElement.innerHTML.toLowerCase();

      if (brandElementMap[brandName]) {
        brandElementMap[brandName].push(e);
      } else {
        brandElementMap[brandName] = [e];
      }
    });

    if (Object.keys(brandElementMap).length === 0) return;
  });

  return brandElementMap;
}

const fetchBoycottInfo = async () => {
  const brandElementMap = getBrandsFromDOM(
    [
      ["template=SEARCH_RESULTS", ".a-size-base-plus.a-color-base"],
      ["a-carousel-card", ".a-truncate-cut"]
    ]
  );

  if (!brandElementMap) return;

  stopObserver();

  const brandNames = Object.keys(brandElementMap);

  chrome.runtime.sendMessage({type: DOMMessageTypes.FETCH_BRAND_INFO, brandNames: brandNames}).then((response) => {
    if (!response) return;
    setBoycottDivs(brandElementMap, response);
  })
}

startObserver(fetchBoycottInfo);
