import { htmlToElement } from "../utils";
import { SupportType, SupportTypeColors } from "../types";

const ToasterStyle = (type: keyof typeof SupportType) => {
  const color = SupportTypeColors[type];
  const textColor = type === "I" ? "white" : "black";
  const styleId = "biladiToaster";

  const bannerStyles = (
    htmlToElement(`
      <style id="${styleId}">
        .biladi-toast {
          position: fixed;
          top: 12px;
          right: 12px;
          color: black;
          border: 2px solid #d73e3e;
          width: 500px;
          border-radius: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          justify-content: space-between;
          align-items: center;
          background: white;
          z-index: 100000000000;
        }
        .biladi-toast .__banner {
          width: 100%;
          text-align: center;
          padding: 15px 0;
          line-height: 1;
        }
        .biladi-toast .__banner svg {
          width: 60px;
          height: 26px;
          display: inline;
        }
        .biladi-toast .__info {
          display: flex;
          padding: 0 15px 15px;
          gap: 10px;
          flex-direction: column;
        }
        .biladi-toast .__info .__title {
          margin: 0;
          font-weight: 700;
          font-size: 18px;
        }
        .biladi-toast .__info .__subtitle {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          margin: 2px 0 0;
        }
        .biladi-toast .__info .__support-type {
          background: ${color};
          color: ${textColor};
          font-weight: 500;
          font-size: 12px;
          border-radius: 22px;
          line-height: 14px;
          padding: 5px 15px !important;
          width: fit-content;
          align-self: center;
        }
        .biladi-toast .__info .__icon--bad {
          background: #f7d8d8;
          font-size: 32px;
          width: 50px;
          height: 50px;
          display: inline-block;
          border-radius: 12px;
          text-align: center;
          color: #d73e3e;
        }
        .biladi-toast .__cta button {
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
        .biladi-toast .__cta button:hover {
          color: #929292;
        }
        .biladi-toast .__cta button:active {
          background: #2A2A2A;
        }
      </style>
    `)
  );

  // Add banner styles to the head if none with the id exists
  if (!document.getElementById(styleId)) {
    return document.head.appendChild(bannerStyles);
  }
}

export default ToasterStyle;