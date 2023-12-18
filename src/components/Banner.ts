import { BrandInfo, SupportTypeStrings } from "../types";
import BannerStyle from "./BannerStyle";
import { htmlToElement } from "../utils";
import BiladiIcon from "../icons/biladi-icon";

const Banner = (id: string, brandInfo: BrandInfo) => {
  const type = brandInfo.type || "B";
  BannerStyle(type);

  return (
    htmlToElement(`
      <div class="biladi-barred-banner" id="${id}">
        <span class="__icon">
          ${BiladiIcon}
        </span>
        ${brandInfo.name} supports Apartheid. 
      </div>
    `)
  )
}

export default Banner;
