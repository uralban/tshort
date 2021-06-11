import React, { Component } from "react";
import FormErrors from './FormErrors';

class RegistrationForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
          name: '',
          tel: '',
          email: '',
          pass: '',
          formErrors: {name: '', tel: '', email: '', pass: ''},
          nameValid: false,
          telValid: false,
          emailValid: false,
          passValid: false,
          formValid: false
        }
      }

    validateForm() {
    this.setState({formValid: this.state.nameValid &&
                                this.state.telValid &&
                                this.state.emailValid &&
                                this.state.passValid});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let telValid = this.state.telValid;
        let emailValid = this.state.emailValid;
        let passValid = this.state.passValid;
      switch(fieldName) {
        case 'name':
            if (value.length <= 25){
                if (value.length >= 3){
                    fieldValidationErrors.name = '';
                    nameValid = true;
                } else {
                    fieldValidationErrors.name = ' too short';
                    nameValid = false;
                }
            } else {
                fieldValidationErrors.name = ' too long';
                nameValid = false;
            }
            break;
        case 'tel':
            telValid = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/im);
            fieldValidationErrors.tel = telValid ? '' : ' is invalid';
            break;
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
                        nameValid: nameValid,
                        telValid: telValid,
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

    registrationHandler(e) {
        e.preventDefault();

        let md5 = require('md5');

        const sendData = {
            name: e.target.form.name.value.trim(),
            tel: e.target.form.tel.value.trim(),
            email: e.target.form.email.value.trim(),
            pass: md5(e.target.form.pass.value.trim()),
        };

        fetch("/app/auth/create", {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            
            const errorDiv = document.querySelector(".regErrors");

            switch (res.status) {
                case(201): {
                    console.log('Registration complete');
                    errorDiv.innerHTML = '';
                    document.location.href = '/login';
                    break;
                }
                case(400): {
                    res.json().then(function (data) {
                        errorDiv.innerHTML = `
                            <div class="alert alert-danger">${data.message}. Please try again</div>                
                        `;
                    });                    
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
             <label htmlFor="registrationName" className="form-label">Name</label>
             <input 
                type="text" 
                name="name" 
                className={`form-control 
                    ${this.errorClass(this.state.formErrors.name)}`} 
                id="registrationName" 
                value={this.state.name}
                onChange={this.handlerInput}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="registrationTel" className="form-label">Phone</label>
            <input 
                type="text" 
                name="tel" 
                className={`form-control 
                    ${this.errorClass(this.state.formErrors.tel)}`}
                id="registrationTel" 
                value={this.state.tel}
                onChange={this.handlerInput}
            />
        </div>
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
            <div className="regErrors"></div>
        <button type="submit"
            disabled={!this.state.formValid} 
            onClick={(e) => {
                this.registrationHandler(e)
            }}
            className="btn btn-primary">
            Create
        </button>
    </form>
      )
    }
   }
   export default RegistrationForm;