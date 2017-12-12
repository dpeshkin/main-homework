import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBtc, selectEth } from "../../actions/currency";
import { currentBtcSell, currentEthSell } from "../../reducers/currency";
import { withRouter, Link } from "react-router-dom";
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

const CurrencyLink = styled(Link)`
  width: 140px;
  height: 100%;
  background-color: #404243;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: 20px;
  color: ${props => (props.className === "active" ? "#fff" : "#c3c3c3")};
  // color: #c3c3c3;
  &:hover {
    color: #fff;
  }
`;

const RoundedButton = styled.div`
  padding: 5px 25px;
  background-color: #404243;
  border-radius: 300px;
  margin: 0 25px;
`;

class MainHeader extends Component {
  state = {
    Btc: 0,
    Eth: 0
  };

  getCurrencyValue = props => {
    const { Btc, Eth } = props;
    if (Btc) this.setState({ Btc: Math.round(Btc) });
    if (Eth) this.setState({ Eth: Math.round(Eth) });
  };

  setCurrency = link => {
    const { selectBtc, selectEth } = this.props;
    if (link === "btc") {
      selectBtc();
    } else {
      selectEth();
    }
  };

  componentDidMount() {
    const link = this.props.match.params.currency;
    this.setCurrency(link);
  }

  componentWillReceiveProps(nextProps) {
    const link = this.props.match.params.currency;
    const nextLink = nextProps.match.params.currency;
    if (link && link !== nextLink) {
      this.setCurrency(nextLink);
    }
    this.getCurrencyValue(nextProps);
  }

  render() {
    const currency = this.props.match.params.currency;
    return (
      <div>
        <Topline>
          <Container>
            <Logo src={logoWhite} alt="j-trading logo" />
            <CurrencyLink
              className={currency === "btc" ? "active" : null}
              to="/trade/btc"
            >
              <b>{this.state.Btc}</b>
              <b>1 BTC</b>
            </CurrencyLink>
            <CurrencyLink
              className={currency === "eth" ? "active" : null}
              to="/trade/eth"
            >
              <b>{this.state.Eth}</b>
              <b>1 ETH</b>
            </CurrencyLink>
            <RoundedButton>user123@mail.ru</RoundedButton>
          </Container>
        </Topline>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Btc: currentBtcSell(state),
  Eth: currentEthSell(state)
});

const mapDispatchToProps = {
  selectBtc,
  selectEth
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainHeader)
);
