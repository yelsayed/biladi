import { htmlToElement } from "../utils";
import BiladiIcon from "../icons/biladi-icon";
import BannerStyle from "./BannerStyle";

const Banner = ({ brandName }: { brandName: string }) => {
  BannerStyle();
  return (
    htmlToElement(`
    <div class="biladi-barred-banner">
      <span class="__text">🩸 ${brandName} supports Apartheid.</span>
      <div class="__icon">
        ${BiladiIcon}
      </div>
    </div>
  `)
  )
}

export default Banner;
