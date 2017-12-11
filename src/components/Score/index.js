import React, { Component } from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  width: 100%;
  padding-top: 50px;
`;

const Right = styled.div`
  max-width: 720px;
  flex: 1;
  margin: 0 20px 0 auto;
`;

const RightHeader = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`;

class Score extends Component {
  render() {
    return (
      <Content>
        <Right>
          <RightHeader>Окно графика</RightHeader>
        </Right>
      </Content>
    );
  }
}

export default Score;
