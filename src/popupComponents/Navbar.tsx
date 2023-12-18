import React from "react";
import styled from "styled-components";

const NavbarStyled = styled.div`
  text-align: center;
  width: 100%;

  .logo {
    width: 60px;
  }
`;

const Navbar = () => {
  return (
    <NavbarStyled>
      <img src="/images/biladi-logo.svg" className="logo" alt="Biladi Logo"/>
    </NavbarStyled>
  );
};

export default Navbar;
