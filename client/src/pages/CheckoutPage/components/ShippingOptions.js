import React from "react";

const ShippingOptions = ({items}) => {
    let itemRow = '';
    if (items.length >= 1) {
        itemRow = Object.keys(items).map((fieldName, i) => {
            return (
                <option key={i} value={items[i].id}>{items[i].shipping}</option>
            );  
        });
    }
    return (
        <div className="mb-3">
            <select 
                className="form-select" 
                aria-label="Shipping select"
                name="shipping"
            >
                <option>Select shipping method</option>
                {itemRow}
            </select>
        </div>
    );
}
export default ShippingOptions;