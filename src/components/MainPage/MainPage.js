import React, { Component } from "react";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";
import styled from "styled-components";
import Chart from "../Chart";
import TradeOperations from "../TradeOperations";

const Main = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #f5f5f6;
`;
const Container = styled.div`
  flex: 1;
  display: flex;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  flex-wrap: wrap;
`;

const Right = styled.div`
  max-width: 720px;
  flex: 1;
  margin: 0 20px 0 auto;
`;

const Left = styled.div`
  margin: 0 20px;
`;

export class MainPage extends Component {
  render() {
    return (
      <Main>
        <MainHeader />
        <Container>
          <Left>
            <TradeOperations />
          </Left>
          <Right>
            <Chart />
          </Right>
        </Container>
        <MainFooter />
      </Main>
    );
  }
}

export default MainPage;
