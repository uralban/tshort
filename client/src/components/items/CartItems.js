import React from "react";
import { Link } from "react-router-dom";

const CartItems = ({items, addOneHandler, removeOneHandler}) => {
    let itemRow = '';
    let totalPrice = 0;
    if (items.length >= 1) {
        itemRow = Object.keys(items).map((fieldName, i) => {
        totalPrice += items[i].total_price;
        const value = items[i].item_id + '&' + items[i].option_id + '&' + items[i].quantity + '&' + items[i].cost;
            return (
                <div className="row" key={i}>
                    <div className="col-md-5">
                        <p><strong>{items[i].name}</strong></p>
                        <p>{items[i].composition}</p>
                        <p>{items[i].type} / {items[i].size} / {items[i].color}</p>
                    </div>
                    <div className="col-md-3">
                        <p>{items[i].quantity}</p>
                        <p>
                            <button 
                                value={value} 
                                className="btn btn-danger" 
                                onClick={removeOneHandler}
                                title="Remove one"
                            >
                                -
                            </button>   
                            <button 
                                value={value} 
                                className="btn btn-success" 
                                onClick={addOneHandler}
                                title="Add one"
                            >
                                +
                            </button>       
                        </p>
                    </div>
                    <div className="col-md-2">
                        <p>{Math.round(items[i].cost * 100) / 100} $</p>
                    </div>
                    <div className="col-md-2">
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
                <Link
                    className="btn btn-primary" 
                    to='/checkout'
                >
                    Checkout
                </Link>  
            </div>
            <div className="col-md-4">
                <p><strong>Total price: </strong>{Math.round(totalPrice * 100) / 100} $</p>
            </div>
        </div>
        </>
    );
}
export default CartItems;