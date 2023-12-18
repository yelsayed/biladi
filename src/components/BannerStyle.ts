import { SupportType, SupportTypeColors } from "../types";
import { htmlToElement } from "../utils";

const BannerStyle = (type: keyof typeof SupportType) => {
  const color = SupportTypeColors[type];
  const textColor = type === "I" ? "white" : "black";
  const styleId = "biladiBanner";

  const bannerStyles = htmlToElement(`
    <style id="${styleId}">
      .biladi-barred-banner {
        background: ${color};
        color: ${textColor};
        position: absolute;
        z-index: 10;
        padding: 10px 15px;
        font-weight: 600;
        font-size: 14px;
        text-align: right;
        border-radius: 4px;
        top: 0;
        right: 0;
      }
      .biladi-barred-banner .__icon {
        background: white;
        padding: 4px;
        display: inline-block;
        border-radius: 100%;
        width: 20px;
        height: 20px;
        text-align: center;
        margin-right: 8px;
      }
      .biladi-barred-banner .__icon svg {
        width: 12px;
        height: 12px;
        display: inline;
      }
    </style>
  `);

  // Add banner styles to the head if none with the id exists
  if (!document.getElementById(styleId)) {
    return document.head.appendChild(bannerStyles);
  }
}

export default BannerStyle;
