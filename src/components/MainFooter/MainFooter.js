import React, { Component } from "react";
import styled from "styled-components";
import logoWhite from "../../images/icons/Logo-white.svg";

const Logo = styled.img`
  width: 160px;
  height: 100%;
  margin: 0 20px 0 auto;
`;

const Footer = styled.footer`
  width: 100vw;
  height: 100px;
  background-color: #000;
  color: #fff;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

class MainFooter extends Component {
  render() {
    return (
      <Footer>
        <Container>
          <Logo src={logoWhite} alt="j-trading logo" />
        </Container>
      </Footer>
    );
  }
}

export default MainFooter;
