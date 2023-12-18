import { htmlToElement } from "../utils";
import BiladiLogo from "../icons/biladi-logo";
import { BrandInfo, SupportTypeStrings } from "../types";
import ToasterStyle from "./ToasterStyle";

const Toaster = (brandInfo: BrandInfo) => {
  const type = brandInfo.type || "B";
  ToasterStyle(type);

  return htmlToElement(`
    <div class="biladi-toast" id="warningToast">
      <div class="__banner">
        ${BiladiLogo}
      </div>
      <div class="__info">
        <span class="__support-type">${SupportTypeStrings[type]}</span>
        <h5 class="__title">
          🩸 ${brandInfo.name || "This site"} supports Apartheid.
        </h5>
        ${brandInfo.description && `
          <p class="__subtitle">
            ${brandInfo.description}.
          </p>
        `}
      </div>
      <div class="__cta">
        <button id="dismiss">&#10005;</button>
      </div>
    </div>
  `);
}

export default Toaster;
