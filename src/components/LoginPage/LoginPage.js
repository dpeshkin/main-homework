import React, { Component } from "react";
import styled from "styled-components";
import logo from "../../images/icons/Logo.svg";
import Particles from "react-particles-js";
import particlesParams from "../../particles-params";
import { Button, Segment, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { authLoginRequest, authRegistrationRequest } from "../../actions/auth";
import {
  getIsAuthorized,
  getLoginError,
  getRegistrationError
} from "../../reducers/auth";

//styles
const Wrapper = styled.main`
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  width: 300px;
  height: 150px;
  margin: auto;
`;

const ResponsiveImg = styled.img`
  src: url(${props => props.src});
  alt: url(${props => props.alt});
  width: 100%;
  height: 100%;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 440px;
`;

const CustomInput = styled(Input)`
  margin-bottom: 25px;
`;
//styles-end

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    isAuthorized: true
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { isAuthorized, email, password } = this.state;
    isAuthorized
      ? this.props.authLoginRequest({ email, password })
      : this.props.authRegistrationRequest({ email, password });
    console.log();
  };

  toggleForm = () => {
    const { isAuthorized } = this.state;
    this.setState({ isAuthorized: !isAuthorized });
  };

  render() {
    const { isAuthorized } = this.state;
    return (
      <Wrapper>
        <Particles
          params={particlesParams}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <FormWrapper>
          <Logo>
            <ResponsiveImg src={logo} alt="j-trading logo" />
          </Logo>

          <Segment raised style={{ padding: "20px 20px 30px" }}>
            <form>
              <CustomInput
                fluid
                icon="user"
                iconPosition="left"
                placeholder="email"
                size="large"
                onChange={this.handleChange}
                name="email"
              />
              <CustomInput
                fluid
                icon="unlock alternate"
                iconPosition="left"
                placeholder="password"
                type="password"
                size="large"
                onChange={this.handleChange}
                name="password"
              />
              <Button color="blue" fluid size="big" onClick={this.handleSubmit}>
                {isAuthorized ? "Войти" : "Зарегистрироваться"}
              </Button>
            </form>
          </Segment>

          <Segment raised textAlign="center" size="large">
            {isAuthorized ? (
              <div>
                Впервые на сайте?{" "}
                <a href="#" onClick={this.toggleForm}>
                  Регистрация
                </a>
              </div>
            ) : (
              <div>
                Уже зарегистрированы?{" "}
                <a href="#" onClick={this.toggleForm}>
                  Войти
                </a>
              </div>
            )}
          </Segment>
        </FormWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  loginError: getLoginError(state),
  registationError: getRegistrationError(state)
});

const mapDispatchToProps = {
  authLoginRequest,
  authRegistrationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
