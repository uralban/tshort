import React from "react";

const ListOrders = ({list, orders}) => {
    let ordersRows = '';
    
    if (list) {
        if (orders.length >= 1) {        
            ordersRows = Object.keys(orders).map((fieldName, i) => {
                return (
                    <li className="list-group-item" key={i}>
                        <p><strong>Status: </strong>{orders[i].status}</p>
                        <p><strong>Date: </strong>{orders[i].order_date}</p>
                        <p><strong>Price: </strong>{Math.round(orders[i].price * 100) / 100} $</p>
                        <p><a href={`/order/${orders[i].id}`} className="btn btn-info">More details</a></p>
                    </li>
                );  
            });
        }
        return (
            <ul className="list-group list-group-flush">
                {ordersRows}
            </ul>
        );
    } else {
        if (orders.length >= 1) {        
            ordersRows = Object.keys(orders).map((fieldName, i) => {
                return (
                    <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{orders[i].status}</td>
                        <td>{orders[i].order_date}</td>
                        <td>{Math.round(orders[i].price * 100) / 100} $</td>
                        <td><a href={`/order/${orders[i].id}`} className="btn btn-info">More details</a></td>
                    </tr>
                );  
            });
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {ordersRows}
                </tbody>
            </table>
        );
    }
}
export default ListOrders;