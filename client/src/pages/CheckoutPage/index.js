import React, { Component } from "react";
import FormErrors from '../../components/forms/FormErrors';
import CheckoutItems from '../../components/items/CheckoutItems'
import PaymentOptions from './components/PaymentOptions';
import ShippingOptions from './components/ShippingOptions';

class CheckoutPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
          sendData: {token: localStorage.getItem('token')},
          checkoutInfo: [],
          order_price: 0,
          isLoaded: false,
          payments: [],
          shippings: [],
          formErrors: {payment: '', shipping: ''},
        }
      }

    componentDidMount() {
        fetch("/app/cart/showForCheckout", {
            method: 'POST',
            body: JSON.stringify(this.state.sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            switch (res.status) {
                case (201): {
                    res.json().then((data) => {
                        const itemsArr = JSON.parse(data.message);
                        this.setState({checkoutInfo: itemsArr[0]});
                        this.setState({payments: itemsArr[1]});
                        this.setState({shippings: itemsArr[2]});
                        this.setState({isLoaded: true});

                        let totalPrice = 0;
                        const checkoutItems = this.state.checkoutInfo;
                        checkoutItems.forEach(item => {
                            totalPrice += item.total_price*1;
                        });
                        this.setState({order_price: totalPrice});
                    });
                    break; 
                }
                case(400): {
                    const singleItemContainer = document.querySelector('.cartSection');
                    const itemsList = `
                        <p>Your cart is empty</p>
                    `;
                    singleItemContainer.innerHTML=itemsList;
                    break;
                }
                case(401): {
                    localStorage.removeItem('token');
                    document.location.href = '/';
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

    checkoutHandler = (e) => {
        e.preventDefault();
        const paymentMethodId = e.target.form.payment.value;
        const shippingMethodId = e.target.form.shipping.value;  

        let fieldValidationErrors = this.state.formErrors;
        fieldValidationErrors.payment = (paymentMethodId === 'Select payment method') ? 'select please' : '';
        fieldValidationErrors.shipping = (shippingMethodId === 'Select shipping method') ? 'select please' : '';
        
        this.setState({formErrors: fieldValidationErrors});

        if (fieldValidationErrors.payment+fieldValidationErrors.shipping === '') {
            const sendData = {
                paymentId: paymentMethodId,
                shippingId: shippingMethodId,
                order_price: this.state.order_price,
                token: localStorage.getItem('token')
            };
            fetch("/app/order/new", {
                method: 'POST',
                body: JSON.stringify(sendData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                switch (res.status) {
                    case(201): {
                        document.location.href = '/complete';
                        break;
                    }
                    case(400): {
                        const singleItemContainer = document.querySelector('.addToCartErrors');
                        const itemsList = `
                            <p>Something was wrong, please try again</p>
                        `;
                        singleItemContainer.innerHTML=itemsList;
                        break;
                    }
                    case(401): {
                        localStorage.removeItem('token');
                        document.location.href = '/';
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
    }

    render () {        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <h4>Your order:</h4>
                        <CheckoutItems items={this.state.checkoutInfo} />
                    </div>
                    <div className="col-md-5">
                        <form> 
                        <div className="mb-3">  
                            <PaymentOptions items={this.state.payments} />   
                        </div>
                        <div className="mb-3">
                            <ShippingOptions items={this.state.shippings}  />
                        </div>
                        <div className="mb-3 text-end">
                            <button type="submit"
                                onClick={(e) => {
                                    this.checkoutHandler(e)
                                }}
                                className="btn btn-primary">
                                Complete
                            </button>
                        </div>
                        <FormErrors formErrors={this.state.formErrors} />
                        <div className="loginErrors"></div>
                        </form>                     
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckoutPage;