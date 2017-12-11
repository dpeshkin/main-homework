import React, { Component } from "react";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";
import styled from "styled-components";
import Score from "../Score";
const Main = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
const Content = styled.div`
  flex: 1;
`;

export class MainPage extends Component {
  render() {
    return (
      <Main>
        <MainHeader />
        <Content>
          <Score />
        </Content>
        <MainFooter />
      </Main>
    );
  }
}

export default MainPage;
