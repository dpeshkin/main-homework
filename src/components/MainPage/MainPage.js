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
const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
`;

export class MainPage extends Component {
  render() {
    return (
      <Main>
        <MainHeader />
        <Content>
          <Container>
            <Score />
          </Container>
        </Content>

        <MainFooter />
      </Main>
    );
  }
}

export default MainPage;
