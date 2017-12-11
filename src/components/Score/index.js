import React, { Component } from "react";
import { LineChart } from "react-chartkick";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getOffset,
  getSelected,
  getIsBtcLoading,
  getIsEthLoading,
  sellBtc,
  purchaseBtc,
  sellEth,
  purchaseEth,
  getMax,
  getMin
} from "../../reducers/currency";

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
    const {
      maxBtc,
      minBtc,
      maxEth,
      minEth,
      purchaseBtc,
      purchaseEth,
      sellBtc,
      sellEth
    } = this.props;
    return (
      <Content>
        <Right>
          <RightHeader>Окно графика</RightHeader>
          <LineChart
            data={[
              { name: "Продажа", data: sellEth },
              { name: "Покупка", data: purchaseEth }
            ]}
            min={minEth}
            max={maxEth}
            width={750}
            height={400}
          />
        </Right>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  maxBtc: getMax(state.currency.btc),
  maxEth: getMax(state.currency.eth),
  minBtc: getMin(state.currency.btc),
  minEth: getMin(state.currency.eth),
  purchaseBtc: purchaseBtc(state),
  purchaseEth: purchaseEth(state),
  sellBtc: sellBtc(state),
  sellEth: sellEth(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Score);
