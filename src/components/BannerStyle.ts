import { htmlToElement } from "../utils";

const BannerStyle = () => (
  htmlToElement(`
    <style>
      .biladi-barred-banner {
        display: flex;
        justify-content: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        background: #d73e3e87;
        backdrop-filter: blur(7px);
        font-size: 14px;
        font-weight: 400;
        z-index: 10;
        padding: 6px 5px;
        align-items: center;
      }
      .biladi-barred-banner .__text {
        background: white;
        padding: 10px 15px;
        color: black;
        border-radius: 4px;
        font-weight: 600;
        font-size: 16px;
      }
      .biladi-barred-banner .__icon {
        background: white;
        padding: 8px;
        border-radius: 20px;
        position: absolute;
        top: 7px;
        right: 7px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .biladi-barred-banner .__icon svg {
        width: 20px;
        height: 20px;
        display: inline;
      }
    </style>
  `)
);

export default BannerStyle;
