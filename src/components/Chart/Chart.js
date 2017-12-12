import React, { Component } from "react";
import { connect } from "react-redux";
import { LineChart } from "react-chartkick";
import styled from "styled-components";
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
import { selectOffset } from "../../actions/currency";
import { Preloader } from "../Preloader";

const offsets = {
  "2h": "2ч",
  "4h": "4ч",
  "8h": "8ч",
  "1d": "День",
  "7d": "Неделя"
};

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const ChartHeader = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`;

const ChartWrapper = styled.div`
  margin-bottom: 50px;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

const ButtonsWrapper = styled.div`
  height: 40px;
  background-color: #edf0f1;
  margin-bottom: 10px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.button`
  font-weight: 500;
  border: none;
  background-color: ${props => (props.active ? "#4db6e2" : "inherit")};
  color: ${props => (props.active ? "#fff" : "#958b94")};
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4db6e2;
    color: #fff;
  }
`;

class Chart extends Component {
  handleClick = e => {
    const { selectOffset } = this.props;
    selectOffset(e.target.dataset.name);
  };

  render() {
    const {
      maxBtc,
      minBtc,
      maxEth,
      minEth,
      purchaseBtc,
      purchaseEth,
      sellBtc,
      sellEth,
      offset,
      isEthLoading,
      isBtcLoading,
      selected
    } = this.props;

    const buttons = Object.keys(offsets).map(el => (
      <Button
        onClick={this.handleClick}
        key={el}
        data-name={el}
        active={offset === el ? true : false}
      >
        {offsets[el]}
      </Button>
    ));

    return (
      <Container>
        <ChartHeader>Окно графика</ChartHeader>
        <ButtonsWrapper>{buttons}</ButtonsWrapper>
        {isEthLoading || isBtcLoading ? (
          <ChartWrapper>
            <Preloader />
          </ChartWrapper>
        ) : (
          <ChartWrapper>
            {selected === "btc" ? (
              <LineChart
                data={[
                  { name: "Продажа", data: sellBtc },
                  { name: "Покупка", data: purchaseBtc }
                ]}
                min={minBtc}
                max={maxBtc}
                width={100 + "%"}
                height={100 + "%"}
              />
            ) : (
              <LineChart
                data={[
                  { name: "Продажа", data: sellEth },
                  { name: "Покупка", data: purchaseEth }
                ]}
                min={minEth}
                max={maxEth}
                width={100 + "%"}
                height={100 + "%"}
              />
            )}
          </ChartWrapper>
        )}
      </Container>
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
  sellEth: sellEth(state),
  offset: getOffset(state),
  isBtcLoading: getIsBtcLoading(state),
  isEthLoading: getIsEthLoading(state),
  selected: getSelected(state)
});

const mapDispatchToProps = {
  selectOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
