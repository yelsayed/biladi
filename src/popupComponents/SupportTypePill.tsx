import styled from "styled-components";
import { BrandInfo, SupportType, SupportTypeColors, SupportTypeStrings } from "../types";
import React from "react";

const SupportTypeStyled = styled.div<{ type: keyof typeof SupportType}>`
  background: ${props => SupportTypeColors[props.type]};
  color: ${props => SupportType[props.type] === SupportType.I ? "white" : "black"};
  padding: 5px 15px;
  font-weight: 500;
  font-size: 12px;
  border-radius: 22px;
  line-height: 14px;
  width: fit-content;
  align-self: center;
`;

const SupportTypePill: React.FC<{ brandInfo: BrandInfo }> = (props) => {
  const type = props.brandInfo?.type || "B";

  return (
    <SupportTypeStyled type={type}>
      {SupportTypeStrings[type]}
    </SupportTypeStyled>
  );
}

export default SupportTypePill;
