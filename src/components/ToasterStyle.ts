import { htmlToElement } from "../utils";

const ToasterStyle = () => (
  htmlToElement(`
    <style>
      .qaate3-toast {
        position: fixed;
        top: 12px;
        right: 12px;
        color: black;
        border: 2px solid #d73e3e;
        width: 500px;
        display: flex;
        flex-direction: row;
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
      .qaate3-toast svg {
        flex-basis: 50px;
        min-width: 50px;
      }
      .qaate3-toast .__info {
        padding: 15px;
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .qaate3-toast .__info .__title {
        margin: 0;
        font-weight: 600;
        font-size: 18px;
      }
      .qaate3-toast .__subtitle {
        font-size: 12px;
        font-weight: 300;
        line-height: 1.5;
        margin: 2px 0 0;
      }
      .qaate3-toast .__info .__icon--bad {
        background: #f7d8d8;
        font-size: 32px;
        width: 50px;
        height: 50px;
        display: inline-block;
        border-radius: 12px;
        text-align: center;
        color: #d73e3e;
      }
      .qaate3-toast .__cta button {
        flex: 1;
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
      .qaate3-toast .__cta button:hover {
        color: #929292;
      }
      .qaate3-toast .__cta button:active {
        background: #2A2A2A;
      }
    </style>
  `)
)

export default ToasterStyle;