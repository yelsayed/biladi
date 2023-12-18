import { startObserver, stopObserver } from "../utils/observer";
import { BrandDomMap, getTLDFromSite, setBoycottOverlays } from "../utils";
import { DOMMessageTypes } from "../types";

const getBrandsFromDOM = () => {
  const els = document.querySelectorAll('a > h3');
  let brandElementMap: BrandDomMap = {};
  Array.prototype.forEach.call(els, e => {
    const parent = e.parentElement;
    if (!parent) return;

    // Funny way of doing it but it avoids using explicit class names
    const container = parent?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
    if (!container) return;

    const href = parent.getAttribute("href");
    if (!href) return;

    const domain = getTLDFromSite(href);

    if (brandElementMap[domain]) {
      brandElementMap[domain].push(container);
    } else {
      brandElementMap[domain] = [container];
    }
  });

  if (Object.keys(brandElementMap).length === 0) return;

  return brandElementMap;
}

const fetchBoycottInfo = async () => {
  console.log("fetching boycott info");
  const brandElementMap = getBrandsFromDOM();
  if (!brandElementMap) return;

  stopObserver();

  const brandNames = Object.keys(brandElementMap);

  chrome.runtime.sendMessage({ type: DOMMessageTypes.FETCH_BRAND_INFO, brandNames }).then((response) => {
    console.log("response", response);
    if (!response) return;

    setBoycottOverlays(brandElementMap, response);
  });
}

startObserver(fetchBoycottInfo, 300);