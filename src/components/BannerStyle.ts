import { htmlToElement } from "../utils";

const BannerStyle = () => (
  htmlToElement(`
    <style>
      .biladi-barred-banner {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
        background: #306f3e;
        color: white;
        font-size: 14px;
        font-weight: 400;
        padding: 6px 5px;
      }
      .biladi-barred-banner .__icon {
        background: white;
        padding: 0 5px;
        border-radius: 20px;
      }
      .biladi-barred-banner .__icon svg {
        width: 10px;
        height: 10px;
        display: inline;
      }
    </style>
  `)
);

export default BannerStyle;
