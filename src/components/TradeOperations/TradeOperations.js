import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  buyCurrencyRequest,
  sellCurrencyRequest
} from "../../actions/currency";
import {
  sellBtc,
  purchaseBtc,
  sellEth,
  purchaseEth,
  getSelected
} from "../../reducers/currency";

const Contaner = styled.div`
  padding-top: 50px;
`;
class TradeOperations extends Component {
  render() {
    return <Contaner>Hello</Contaner>;
  }
}
const mapStateToProps = state => ({
  purchaseBtc: purchaseBtc(state),
  purchaseEth: purchaseEth(state),
  sellBtc: sellBtc(state),
  sellEth: sellEth(state),
  selected: getSelected(state)
});

const mapDispatchToProps = {
  buyCurrencyRequest,
  sellCurrencyRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeOperations);
