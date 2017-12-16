import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserInfoRequest } from "../../actions/user";
import { selectBtc, selectEth } from "../../actions/currency";
import { logout } from "../../actions/auth";
import { getCurrentBtcSell, getCurrentEthSell } from "../../reducers/currency";
import { getUserEmail } from "../../reducers/user";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import logoWhite from "../../images/icons/Logo-white.svg";

const Topline = styled.div`
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
  flex-wrap: wrap;
`;

const Logo = styled.img`
  width: 160px;
  height: 100%;
  margin-right: auto;
`;

const CurrencyLink = styled(Link)`
  width: 140px;
  padding: 20px 0;
  background-color: #404243;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  margin-right: 20px;
  color: ${props => (props.className === "active" ? "#fff" : "#c3c3c3")};
  &:hover {
    color: #fff;
  }
`;
const UserButtons = styled.div`
  margin: 20px 0 20px 25px;
  display: flex;
  align-items: center;
`;
const Button = styled.div`
  padding: 5px 25px;
  background: #404243;
  border-radius: 300px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
`;

const LogoutButton = Button.extend`
  text-decoration: underline;
  margin-right: 20px;
`;

const UserButton = Button.extend`
&::after {
  content: "";
  display: inline-block;
  vertical-align: baseline;
  width: 0;
  height: 0;
  border-top: solid #fff 5px;
  border-left: solid transparent 5px;
  border-right: solid transparent 5px;
  margin-left: 5px;
`;

class MainHeader extends Component {
  state = {
    Btc: 0,
    Eth: 0
  };

  getCurrencyValue = props => {
    const { Btc, Eth } = props;
    this.setState({ Btc: Math.round(Btc) });
    this.setState({ Eth: Math.round(Eth) });
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
    this.props.fetchUserInfoRequest();
  }

  componentWillReceiveProps(nextProps) {
    const link = this.props.match.params.currency;
    const nextLink = nextProps.match.params.currency;
    if (link && link !== nextLink) {
      this.setCurrency(nextLink);
    }
    this.getCurrencyValue(nextProps);
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const currency = this.props.match.params.currency;
    const { userEmail } = this.props;
    return (
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
          <UserButtons>
            <UserButton>{userEmail}</UserButton>
            <LogoutButton onClick={this.handleLogout}>Выйти</LogoutButton>
          </UserButtons>
        </Container>
      </Topline>
    );
  }
}

const mapStateToProps = state => ({
  Btc: getCurrentBtcSell(state),
  Eth: getCurrentEthSell(state),
  userEmail: getUserEmail(state)
});

const mapDispatchToProps = {
  selectBtc,
  selectEth,
  fetchUserInfoRequest,
  logout
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainHeader)
);
