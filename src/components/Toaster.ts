import { htmlToElement } from "../utils";
import BiladiLogo from "../icons/biladi-logo";

const Toaster = ({ name, description }: { name?: string, description: string}) => {
  return htmlToElement(`
    <div class="biladi-toast" id="warningToast">
      <div class="__banner">
        ${BiladiLogo}
      </div>
      <div class="__info">
        <h5 class="__title">
          🩸 ${name || "This site"} supports Israel.
        </h5>
        ${description && `
          <p class="__subtitle">
            ${description}.
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
