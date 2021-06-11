import React, { Component } from "react";
import CartItems from "../../components/items/CartItems"

class CartPage extends Component {

    constructor (props){
        super(props);
        this.state = {
            cartInfo: [],
            sendData: {token: localStorage.getItem('token')},
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch("/app/cart/show", {
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
                        this.setState({cartInfo: itemsArr});
                        this.setState({isLoaded: true});
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

    addOneHandler = (e) => {        
        const idsArr = e.target.value.split('&');
        const sendData = {
            token: localStorage.getItem('token'),
            item_id: idsArr[0],
            option_id: idsArr[1],
            quantity: idsArr[2],
            cost: idsArr[3],
        };
        fetch("/app/cart/addOne", {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            switch (res.status) {
                case (201): {
                    document.location.reload();
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

    removeOneHandler = (e) => {
        const idsArr = e.target.value.split('&');
        const sendData = {
            token: localStorage.getItem('token'),
            item_id: idsArr[0],
            option_id: idsArr[1],
            quantity: idsArr[2],
            cost: idsArr[3],
        };
        fetch("/app/cart/removeOne", {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            switch (res.status) {
                case (201): {
                    document.location.reload();
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

    render () {        
        return (
            <>
                <h2>Your cart:</h2>
                <div className="row">
                    <div className="col-md-5">
                        Item:                    
                    </div>
                    <div className="col-md-3">
                        Quantity:
                    </div>
                    <div className="col-md-2">
                        Cost:
                    </div>
                    <div className="col-md-2">
                        Total:
                    </div>
                    <hr />
                </div>    
                <div className="cartSection">
                    <CartItems 
                        items={this.state.cartInfo} 
                        addOneHandler={this.addOneHandler}
                        removeOneHandler={this.removeOneHandler}
                    />       
                </div>         
            </>
        );
    }
}

export default CartPage;