import React from "react";

const CheckoutItems = ({items}) => {
    let itemRow = '';
    let totalPrice = 0;
    if (items.length >= 1) {
        itemRow = Object.keys(items).map((fieldName, i) => {
            totalPrice += items[i].total_price;
            return (
                <div className="row" key={i}>
                    <div className="col-md-6">
                        <p><strong>{items[i].name}</strong></p>
                        <p>{items[i].composition}</p>
                        <p>{items[i].type} / {items[i].size} / {items[i].color}</p>
                    </div>
                    <div className="col-md-3">
                        <p>{items[i].quantity} item(s)</p>
                    </div>
                    <div className="col-md-3">
                        <p>{Math.round(items[i].total_price * 100) / 100} $</p>
                    </div>
                    <hr />
                </div>
            );  
        });
    }
    return (
        <>
        {itemRow}
        <div className="row">
            <div className="col-md-8">
            </div>
            <div className="col-md-4">
                <p><strong>Total price: </strong>{Math.round(totalPrice * 100) / 100} $</p>
            </div>
        </div>
        </>
    );
}
export default CheckoutItems;