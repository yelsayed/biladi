
import styled from "styled-components";

const BlockStyled = styled.div`
  background: #e6f4e6;
  border-radius: 5px;
  padding: 10px 10px 20px;
  position: relative;
  flex: 1;
  
  .icon {
    font-size: 30px;
  }
  
  .block-header {
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 0;
  }
  
  .tooltip-marker {
    font-size: 12px;
    color: #282828;
    border: 1px solid #282828;
    border-radius: 21px;
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 3px 7px;
    
    &:hover {
      .tooltip-body {
        display: block;
      }
    }
    
    .tooltip-body {
      position: absolute;
      display: none;
      background: #282828;
      color: white;
      border-radius: 5px;
      padding: 10px;
      line-height: 21px;
      font-size: 12px;
      font-weight: 400;
      z-index: 10;
      width: 250px;
      &.left {
        left: 0;
        transform: translateX(-100%);
      }
      &.right {
        right: 0;
        transform: translateX(100%);
    }
  }
`;

interface BlockInfoProps {
  icon: string;
  title: string;
  tooltipPosition: "left" | "right";
  tooltip: string;
}

const BlockInfo: React.FC<BlockInfoProps> = (props) => {
  return (
    <BlockStyled>
      <div className="icon">{props.icon}</div>
      <h3 className="block-header">{props.title}</h3>
      <div className="tooltip-marker">
        <span>?</span>
        <div className={`tooltip-body ${props.tooltipPosition}`}>
          {props.tooltip}
        </div>
      </div>
    </BlockStyled>
  );
}

export default BlockInfo;
