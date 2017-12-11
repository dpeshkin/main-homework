import React, { Component } from "react";
import styled from "styled-components";
import logoWhite from "../../images/icons/Logo-white.svg";

const Topline = styled.div`
  width: 100vw;
  height: 80px;
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

const Logo = styled.img`
  width: 160px;
  height: 100%;
  margin-right: auto;
`;

const CurrencyToggle = styled.div`
  width: 140px;
  height: 100%;
  background-color: #404243;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: 20px;
`;

const RoundedButton = styled.div`
  padding: 5px 25px;
  background-color: #404243;
  border-radius: 300px;
  margin: 0 25px;
`;

class MainHeader extends Component {
  render() {
    return (
      <div>
        <Topline>
          <Container>
            <Logo src={logoWhite} alt="j-trading logo" />
            <CurrencyToggle>
              22355
              <b>1 BTC</b>
            </CurrencyToggle>
            <CurrencyToggle>
              451
              <b>1 ETH</b>
            </CurrencyToggle>
            <RoundedButton>user123@mail.ru</RoundedButton>
          </Container>
        </Topline>
      </div>
    );
  }
}

export default MainHeader;
