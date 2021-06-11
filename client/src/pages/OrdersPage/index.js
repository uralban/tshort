import React, { Component } from "react";
import ListOrders from './components/ListOrders';

class OrdersPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
          sendData: {token: localStorage.getItem('token')},
          list: true,
          orders: [],
        }
      }

    componentDidMount() {
        fetch("/app/order/showOrdersList", {
            method: 'POST',
            body: JSON.stringify(this.state.sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            switch (res.status) {
                case (201): {
                    res.json().then((data) => {
                        const ordersListArr = JSON.parse(data.message);
                        this.setState({orders: ordersListArr});
                    });
                    break; 
                }
                case(400): {
                    const singleItemContainer = document.querySelector('.yourOrdersSection');
                    const itemsList = `
                        <p>You have not orders yet</p>
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

    render () {        
        return (
            <div className="container yourOrdersSection">
                <div className="row">
                    <div className="col-md-10">
                        <h4>Your orders:</h4>
                    </div>
                    <div className="col-md-2">
                        <button 
                            className="btn btn-success"
                            onClick={() => {
                                this.setState({list: true})
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                        <button 
                            className="btn btn-success"
                            onClick={() => {
                                this.setState({list: false})
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ListOrders 
                            list={this.state.list} 
                            orders={this.state.orders}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default OrdersPage;