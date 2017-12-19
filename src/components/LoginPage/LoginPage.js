import React, { Component } from "react";
import styled from "styled-components";
import logo from "../../images/icons/Logo.svg";
import userIcon from "../../images/icons/user-icon.svg";
import unlockIcon from "../../images/icons/unlock-icon.svg";
import Particles from "react-particles-js";
import particlesParams from "../../particles-params";
import { connect } from "react-redux";
import { authLoginRequest, authRegistrationRequest } from "../../actions/auth";
import { getLoginError, getRegistrationError } from "../../reducers/auth";

//styles
const Main = styled.main`
  min-height: 100vh;
  background-color: #f5f5f6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainWrapper = styled.div`
  width: 100%;
  max-width: 440px;
  z-index: 1;
`;

const Logo = styled.div`
  max-width: 300px;
  flex: 1;
  margin: 0 auto;
`;

const ResponsiveImg = styled.img`
  width: 100%;
  height: auto;
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 10px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
  margin-bottom: 20px;
  padding: 20px 20px;
  border-radius: 7px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  text-align: center;
  font-size: 18px;
`;

const FormWrapper = Wrapper.extend`
  padding: 30px 20px;
  display: flex;
`;

const Form = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
`;

export const Input = styled.input`
  padding: 10px 10px 10px 50px;
  border-radius: 5px;
  width: 100%;
  border: solid 1px #555;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-position: 15px center;
  background-size: 20px;
  opacity: 0.5;
  &:focus {
    opacity: 1;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #4db6e2;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #36a3d1;
  }
`;

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    isAuthorized: true,
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { isAuthorized, email, password } = this.state;
    isAuthorized
      ? this.props.authLoginRequest({ email, password })
      : this.props.authRegistrationRequest({ email, password });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    });
  }

  toggleForm = e => {
    e.preventDefault();
    const { isAuthorized } = this.state;
    this.setState({ isAuthorized: !isAuthorized });
  };

  render() {
    const { isAuthorized } = this.state;
    const { loginError, registrationError } = this.props;
    return (
      <Main>
        <Particles
          params={particlesParams}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <MainWrapper>
          <Logo>
            <ResponsiveImg src={logo} alt="j-trading logo" />
          </Logo>

          <FormWrapper>
            <Form>
              <InputWrapper>
                <Input
                  icon={userIcon}
                  placeholder="email"
                  onChange={this.handleChange}
                  name="email"
                  value={this.state.email}
                  type="text"
                  onBlur={this.handleValidate}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  icon={unlockIcon}
                  placeholder="password"
                  type="password"
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                  onBlur={this.handleValidate}
                />
              </InputWrapper>
              <Button onClick={this.handleSubmit}>
                {isAuthorized ? "Войти" : "Зарегистрироваться"}
              </Button>
            </Form>
          </FormWrapper>

          {loginError || registrationError ? (
            <Wrapper>
              {(loginError && <p className="error-message">{loginError}</p>) ||
                (registrationError &&
                  Object.keys(registrationError).map(type => (
                    <p className="error-message" key={type}>{`${type}: ${
                      registrationError[type]
                    }`}</p>
                  )))}
            </Wrapper>
          ) : null}

          <Wrapper>
            {isAuthorized ? (
              <div>
                Впервые на сайте?{" "}
                <a href="" onClick={this.toggleForm}>
                  Регистрация
                </a>
              </div>
            ) : (
              <div>
                Уже зарегистрированы?{" "}
                <a href="" onClick={this.toggleForm}>
                  Войти
                </a>
              </div>
            )}
          </Wrapper>
        </MainWrapper>
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  loginError: getLoginError(state),
  registrationError: getRegistrationError(state)
});

const mapDispatchToProps = {
  authLoginRequest,
  authRegistrationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
