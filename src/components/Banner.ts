import { htmlToElement } from "../utils";
import BiladiIcon from "../icons/biladi-icon";

const Banner = ({ brandName }: { brandName: string }) => (
  htmlToElement(`
    <div class="biladi-barred-banner">
      <span>🩸 ${brandName} supports Israel.</span>
      <div class="__icon">
        ${BiladiIcon}
      </div>
    </div>
  `)
)

export default Banner;
