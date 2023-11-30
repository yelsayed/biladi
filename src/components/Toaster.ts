import { htmlToElement } from "../utils";

const Toaster = ({ name, description }: { name?: string, description: string}) => {
  return htmlToElement(`
    <div class="qaate3-toast" id="warningToast">
      <div>
        <div class="__info">
          <h5 class="__title">
            🩸 ${name || "This site"} supports Israel.
          </h5>
        </div>
        <div>
          ${description && `
            <p class="__subtitle">
              ${description}.
            </p>
          `}
        </div>
      </div>
      <div class="__cta">
        <button id="dismiss">&#10005;</button>
      </div>
    </div>
  `);
}

export default Toaster;
