import { BulkBrandInfo, DOMMessage, DOMMessageTypes } from '../types';
import { htmlToElement } from "../utils";

let observer: MutationObserver;
const OBSERVER_CONFIG = { attributes: true, childList: true, characterData: true, subtree: true };

type BrandDomMap = Record<string, Element>;

const getBrandsFromDOM = () => {
  const elements = document.getElementsByClassName("template=SEARCH_RESULTS");
  const brandElementMap: BrandDomMap = {};

  Array.prototype.map.call(elements, (e: HTMLElement) => {
    if (!e) return;

    const brandElement = e.querySelector(".a-size-base-plus.a-color-base");

    if (!brandElement) return;

    const brandName = brandElement.innerHTML.toLowerCase();

    brandElementMap[brandName] = e;
  });

  if (Object.keys(brandElementMap).length === 0) return;

  return brandElementMap;
}

/**
 * Will manipulate the DOM to show boycott information
 * @param brandDomMap - A map of brand names to DOM elements
 */
const setBoycottDivs = (brandDomMap: BrandDomMap, brandBoycottData: BulkBrandInfo) => {
  Object.entries(brandDomMap).forEach(([brandName, brandDom]) => {
    const uuid = brandBoycottData.accessKeys[brandName];
    if (!uuid) return;

    const brandInfo = brandBoycottData.brands[uuid];
    const addendum = htmlToElement(`<div id="boot-1224">hello there, kenobi! ${brandInfo.domain}</div>`)
    brandDom.setAttribute("style", "background-color: red;position: relative;");
    brandDom.appendChild(addendum);
  })
}

const fetchBoycottInfo = async () => {
  const brands = getBrandsFromDOM();
  if (!brands) return;

  observer.disconnect();

  const brandNames = Object.keys(brands);

  chrome.runtime.sendMessage({type: DOMMessageTypes.FETCH_BRAND_INFO, brandNames: brandNames}).then((response) => {
    if (!response) return;
    setBoycottDivs(brands, response);
  })
}

function resetObserver() {
  observer?.disconnect();

  if (observer == null)
    observer = new MutationObserver(fetchBoycottInfo);

  observer.observe(document, OBSERVER_CONFIG);
}

resetObserver();

chrome.runtime.onMessage.addListener(
  function(message: DOMMessage, sender, sendResponse) {
    if (message.type === DOMMessageTypes.URL_CHANGED) {
      resetObserver();
    }
  });
