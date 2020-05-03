/* eslint-disable no-shadow */
import React, { Component } from "react";
import Axios from "axios";
import "./login.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ValidationError from "../ValidationError/ValidationError";
import { setUser } from "../../actions/actionCreator";
import Input from "../Input/Input";

class Login extends Component {
    state ={
        formControls: {
            username: {
                value: "",
                type: "text",
            },
            password: {
                value: "",
                type: "password",
            },
        },
        token: "",
        textError: undefined,
        typeError: undefined,
    }


    handleChange(event) {
        this.setState({
            value: event.target.value,
            password: event.target.password,
        });
    }

      SignUp = () => {
          const { setUser } = this.props;
          Axios.post("http://smktesting.herokuapp.com/api/register/", JSON.stringify({
              username: this.state.formControls.username.value,
              password: this.state.formControls.password.value,
          }), {
              headers: {
                  "Content-Type": "application/json",
              },
          }).then((response) => {
              switch (response.data.success) {
              case true:
                  setUser(this.state.formControls.username.value, response.data.token);
                  this.setState({
                      token: response.data.token,
                      textError: "Вы удачно авторизировались",
                      typeError: "success",
                  });
                  localStorage.setItem(0, this.state.token);
                  localStorage.setItem(1, this.state.formControls.username.value);
                  break;
              case false:
                  this.setState({
                      textError: "Пользователь с таким логином уже существует",
                      typeError: "failure",
                  });
                  break;
              default:
                  this.setState({
                      textError: "Извините, системная ошибка",
                      typeError: "failure",
                  });
              }
          });
      }

    logIn = () => {
        const { setUser } = this.props;
        Axios.post("http://smktesting.herokuapp.com/api/login/", JSON.stringify({
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
        }), {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            switch (response.data.success) {
            case true:
                setUser(this.state.formControls.username.value, response.data.token);
                this.setState({
                    token: response.data.token,
                    textError: "Вы удачно авторизировались",
                    typeError: "success",
                });
                localStorage.setItem(0, this.state.token);
                localStorage.setItem(1, this.state.formControls.username.value);
                break;
            case false:
                this.setState({
                    textError: "Вы ввели неверные данные",
                    typeError: "failure",
                });
                break;
            default:
                this.setState({
                    textError: "Извините, системная ошибка",
                    typeError: "failure",
                });
            }
        }).catch(() => {
            this.setState({
                isError: true,
            });
        });
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        formControls[controlName] = control;
        this.setState({
            formControls,
        });
    }

    renderInputs = () => Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            onChange={(event) => this.onChangeHandler(event, controlName)}
        />;
    })

    render() {
        const { textError, typeError } = this.state;
        return (
            <div className="login__panel">

                <div className="login_wrapper">
                    <p className="login_text">Панель авторизации</p>
                    {textError !== undefined
                    && <ValidationError
                        text={textError}
                        type={typeError}
                    />
                    }
                    {this.renderInputs()}
                    <button onClick={this.logIn} className="button_sign">Авторизироваться</button>
                    <button onClick={this.SignUp} className="button_sign">Зарегистрироваться</button>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    user: state.user,
}), { setUser })(Login);

Login.propTypes = {
    setUser: PropTypes.func,
};
