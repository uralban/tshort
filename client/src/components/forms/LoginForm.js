import React, { Component } from "react";
import FormErrors from './FormErrors';

class LoginForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
          email: '',
          pass: '',
          formErrors: {email: '', pass: ''},
          emailValid: false,
          passValid: false,
          formValid: false
        }
      }

    validateForm() {
        this.setState({formValid: this.state.emailValid &&
                                this.state.passValid});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passValid = this.state.passValid;
      switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'pass':
            passValid = value.length >= 6;
            fieldValidationErrors.pass = passValid ? '': ' is too short';
            break;
        default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passValid: passValid
                      }, this.validateForm);
    }
    
    handlerInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                        () => { this.validateField(name, value) });
    };

    errorClass(error) {
        return(error.length === 0 ? '' : 'is-invalid');
    }

    loginHandler(e) {
        e.preventDefault();

        let md5 = require('md5');

        const sendData = {
            email: e.target.form.email.value.trim(),
            pass: md5(e.target.form.pass.value.trim()),
        };

        fetch("/app/auth/login", {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {            
            switch (res.status) {
                case(201): {
                    console.log('Login ok');
                    res.json().then(function (data) {
                        localStorage.setItem('token', data.message);
                        document.location.href = '/';
                    }); 
                    break;
                }
                case(400): {
                    const errorDiv = document.querySelector(".loginErrors");
                    errorDiv.innerHTML = `
                        <div class="alert alert-danger">Wrong data. Please try again</div>                
                    `;
                    break;
                }
                case(500): {
                    console.log('Server error');
                    break;
                }
                default: {
                    console.log('error');
                    break;
                }
            }
        });

    }

    render () {
      return (
        <form> 
        <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email address</label>
            <input 
                type="email" 
                name="email" 
                className={`form-control 
                    ${this.errorClass(this.state.formErrors.email)}`}
                id="loginEmail" 
                value={this.state.email}
                onChange={this.handlerInput}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input 
                type="password" 
                name="pass" 
                className={`form-control 
                    ${this.errorClass(this.state.formErrors.pass)}`}
                id="loginPassword" 
                value={this.state.pass}
                onChange={this.handlerInput}
            />
        </div>
            <FormErrors formErrors={this.state.formErrors} />
            <div className="loginErrors"></div>
        <button type="submit"
            disabled={!this.state.formValid} 
            onClick={(e) => {
                this.loginHandler(e)
            }}
            className="btn btn-primary">
            Login
        </button>
    </form>
      )
    }
   }
   export default LoginForm;