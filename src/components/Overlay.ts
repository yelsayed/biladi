import { htmlToElement } from "../utils";
import BiladiIcon from "../icons/biladi-icon";
import OverlayStyle from "./OverlayStyle";
import { BrandInfo, SupportTypeStrings } from "../types";

const Overlay = (id: string, brandInfo: BrandInfo) => {
  const type = brandInfo.type || "B";
  OverlayStyle(type);

  return (
    htmlToElement(`
    <div class="biladi-barred-overlay" id="${id}">
      <span class="__text">
        <div class="__support-type">${SupportTypeStrings[type]}</div>
        <div>🩸 ${brandInfo.name} supports Apartheid.</div>
      </span>
      <div class="__icon">
        ${BiladiIcon}
      </div>
      <div class="__cta">
        <button id="dismiss">&#10005;</button>
      </div>
    </div>
  `)
  )
}

export default Overlay;
