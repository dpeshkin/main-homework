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
const UserInfo = styled.div`
  position: relative;
  z-index: 0;
  &:hover div {
    top: 100%;
  }
`;
const UserEmail = styled.div`
  padding: 5px 25px;
  background: #404243;
  border-radius: 300px;
  margin: 0 25px;

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
  }
`;
const UserPopup = styled.div`
  transition: top 0.5s ease-in-out;
  background: #404243;
  position: absolute;
  top: 0;
  padding: 4px 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  cursor: pointer;
  text-decoration: underline;
  border-top: solid 2px #515252;
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
            <UserInfo>
              <UserEmail>{userEmail}</UserEmail>
              <UserPopup onClick={this.handleLogout}>Выйти</UserPopup>
            </UserInfo>
          </Container>
        </Topline>
      </div>
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
