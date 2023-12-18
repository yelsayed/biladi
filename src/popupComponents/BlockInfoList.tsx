import BlockInfo from "./BlockInfo";

import styled from "styled-components";

const BlockInfoContainer = styled.div`
  .inner {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .additional-text {
    color: #A2A3A6;
    font-size: 15px;
    font-weight: 500;
    line-height: 21px;
    text-align: center;
  }
`;

const BlockInfoList = () => {
  return (
    <BlockInfoContainer>
      <div className="inner">
        <BlockInfo
          icon="🏘️"
          title="Marketplaces"
          tooltipPosition="right"
          tooltip="Shop on marketplaces like Amazon and we'll flag the products that support apartheid"
        />
        <BlockInfo
          icon="🏠"
          title="Brand Websites"
          tooltipPosition="left"
          tooltip="Visit any brand website and we'll notify you if it supports, deals or funds apartheid"
        />
        <BlockInfo
          icon="🔍"
          title="Search Engines"
          tooltipPosition="left"
          tooltip="As you search Google, we'll flag search results of brands that support apartheid"
        />
      </div>
      <p className="additional-text">
        Boycotting is the best way to provide support and solidarity to the Palestinian struggle for freedom, justice
        and equality. No matter where you are. You can make a change! ✌️
      </p>
    </BlockInfoContainer>
  )
}

export default BlockInfoList;
