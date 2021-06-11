import React, { Component } from "react";

class SingleItem extends Component {

    constructor (props){
        super(props);
        this.state = {
            sendData: {token: localStorage.getItem('token')},
            price: 0,
            quantity: 0
        };
    }

    componentDidMount() {
        fetch("/app/cart/topBar", {
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
                        let quantity=0, price=0;
                        itemsArr.forEach(item => {
                            quantity += item.quantity;
                            price += item.total_price;
                        });
                        this.setState({quantity: quantity});
                        this.setState({price: Math.round(price * 100) / 100});
                    });
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
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                <li>{this.state.quantity} item(s) in cart</li>
                <li>Total price: {this.state.price}</li>
            </ul>
        );
      }
}

export default SingleItem;