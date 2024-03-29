import { DOMMessageTypes } from '../types';
import { startObserver, stopObserver } from "../utils/observer";
import { BrandDomMap, setBoycottOverlays } from "../utils";

/**
 *
 * @param elementBrandSelectors - Array of a tuple of selectors to find the brand name
 */
const getBrandsFromDOM = (elementBrandSelectors: Array<[string, string | ((parentElement: Element) => string | null)]>) => {
  const brandElementMap: BrandDomMap = {};

  elementBrandSelectors.forEach(([elementSelector, brandSelector]) => {
    const domElements = document.querySelectorAll(elementSelector);

    Array.prototype.map.call(domElements, (e: HTMLElement) => {
      let brandName: string | null = null;
      if (!e) return;

      if (typeof(brandSelector) === "function") {
        brandName = brandSelector(e);
        if (!brandName) return;
      } else {
        const brandElement = e.querySelector(brandSelector);
        if (!brandElement) return;

        brandName = brandElement.innerHTML.toLowerCase();
      }

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

/**
 * Used to get the manufacturer from the parent element
 * @param parentElement
 */
const getManufacturerFromParentElement = () => {
  let manufacturer: string | null = null;
  const productDetailList = document.querySelectorAll('.a-list-item');
  if (!productDetailList) return null;

  Array.prototype.map.call(productDetailList, (e: Element) => {
    const innerLabel = e.querySelector('.a-text-bold');
    if (!innerLabel) return;

    const hasManufacturerString = innerLabel.innerHTML.toLowerCase().includes("manufacturer");
    if (!hasManufacturerString) return;

    const nextSiblingString = innerLabel.nextElementSibling?.innerHTML;
    if (!nextSiblingString) return;

    manufacturer = nextSiblingString.toLowerCase();
  })

  return manufacturer;
}

const fetchBoycottInfo = async () => {
  const brandElementMap = getBrandsFromDOM(
    [
      [".s-result-item", ".a-size-base-plus.a-color-base"],
      [".a-carousel-card", ".a-truncate-cut"],
      [".a-unordered-list.a-nostyle.a-horizontal.list.maintain-height", getManufacturerFromParentElement]
    ]
  );

  if (!brandElementMap) return;

  stopObserver();

  const brandNames = Object.keys(brandElementMap);

  chrome.runtime.sendMessage({type: DOMMessageTypes.FETCH_BRAND_INFO, brandNames: brandNames}).then((response) => {
    if (!response) return;
    setBoycottOverlays(brandElementMap, response);
  })
}

startObserver(fetchBoycottInfo);
