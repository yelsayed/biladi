import { htmlToElement } from "../utils";
import { SupportType, SupportTypeColors } from "../types";

const OverlayStyle = (type: keyof typeof SupportType) => {
  const color = SupportTypeColors[type];
  const textColor = type === "I" ? "white" : "black";
  const styleId = "biladiOverlay";

  const bannerStyles = htmlToElement(`
    <style id="${styleId}">
      .biladi-barred-overlay {
        display: flex;
        justify-content: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        background: ${color + "4d"};
        backdrop-filter: blur(7px);
        font-size: 14px;
        font-weight: 400;
        padding: 6px 5px;
        align-items: center;
        z-index: 10;
      }
      .biladi-barred-overlay .__text {
        background: white;
        padding: 10px 15px;
        color: black;
        border-radius: 4px;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        width: 100%;
        max-width: 300px;
      }
      .biladi-barred-overlay .__text .__support-type {
        background: ${color};
        color: ${textColor};
        padding: 10px 15px !important;
        font-weight: 500;
        font-size: 14px;
        border-radius: 22px;
        line-height: 14px;
        margin-bottom: 10px !important;
      }
      .biladi-barred-overlay .__icon {
        background: white;
        padding: 8px;
        border-radius: 100%;
        position: absolute;
        bottom: 7px;
        right: 7px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .biladi-barred-overlay .__icon svg {
        width: 20px;
        height: 20px;
        display: inline;
      }
      .biladi-barred-overlay .__cta button {
        line-height: 1;
        color: #2a2a2a;
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease;
        font-size: 22px;
        position: absolute;
        top: 5px;
        right: 5px;
      }
    </style>
  `);

  // Add banner styles to the head if none with the id exists
  if (!document.getElementById(styleId)) {
    return document.head.appendChild(bannerStyles);
  }
};

export default OverlayStyle;
