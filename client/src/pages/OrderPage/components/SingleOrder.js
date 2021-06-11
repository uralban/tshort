import React, { Component } from "react";
import OrderItemsList from './OrderItemsList';

class SingleOrder extends Component {

    constructor (props) {
        super(props);
        this.state = {
          sendData: {
              token: localStorage.getItem('token'),
              id: this.props.id
            },
          order: [],
          items: []
        }
      }

    componentDidMount() {
        fetch("/app/order/showOrder", {
            method: 'POST',
            body: JSON.stringify(this.state.sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            switch (res.status) {
                case (201): {
                    res.json().then((data) => {
                        const orderArr = JSON.parse(data.message);
                        this.setState({order: orderArr[0][0]});
                        console.log(orderArr[1]);
                        this.setState({items: orderArr[1]});
                    });
                    break;
                }
                case(401): {
                    localStorage.removeItem('token');
                    document.location.href = '/';
                    break;
                }                
                case(402): {
                    const orderDatails = document.querySelector('.orderDatails');
                    orderDatails.innerHTML = "<p>This is not your order. Get out of here.</p>";
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
            <div className="container orderDatails">
                <div className="row">
                    <div className="col">
                        <p>
                            <strong>Status: </strong>{this.state.order.status}
                        </p>
                        <p>
                            <strong>Date: </strong>{this.state.order.order_date}
                        </p>
                        <p>
                            <strong>Payment method: </strong>{this.state.order.payment}
                        </p>
                        <p>
                            <strong>Shipping: </strong>{this.state.order.shipping}
                        </p>  
                        <p>
                            <strong>Items list: </strong>
                            <OrderItemsList items={this.state.items}/>
                        </p>                      
                        <p>
                            <strong>Total price: </strong>{Math.round(this.state.order.price * 100) / 100} $
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleOrder;