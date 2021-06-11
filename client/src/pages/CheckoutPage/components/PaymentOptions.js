import React from "react";

const PaymentOptions = ({items}) => {
    let itemRow = '';
    if (items.length >= 1) {
        itemRow = Object.keys(items).map((fieldName, i) => {
            return (
                <option key={i} value={items[i].id}>{items[i].payment}</option>
            );  
        });
    }
    return (
        <div className="mb-3">
            <select 
                className="form-select" 
                aria-label="Payment select"
                name="payment"
            >
                <option>Select payment method</option>
                {itemRow}
            </select>
        </div>
    );
}
export default PaymentOptions;