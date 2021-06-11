import React from "react";

const OrderItemsList = ({items}) => {
    let orderRows = '';    

    if (items.length >= 1) {        
        orderRows = Object.keys(items).map((fieldName, i) => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={i}>
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">{items[i].name}</div>
                        <ul style={{listStyle: "none"}}>
                            <li>{items[i].composition}</li>
                            <li>{items[i].type}</li>
                            <li>{items[i].size}</li>
                            <li>{items[i].color}</li>
                            <li>{items[i].quantity} item(s)</li>
                        </ul>
                    </div>
                    <span class="badge bg-primary rounded-pill">{Math.round(items[i].cost * 100) / 100} $</span>
                </li>
            );  
        });
    }
    return (
        <ol className="list-group list-group-numbered">
            {orderRows}
        </ol>
    );

}
export default OrderItemsList;