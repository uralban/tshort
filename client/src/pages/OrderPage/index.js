import React from "react";
import { useParams } from 'react-router';
import SingleOrder from './components/SingleOrder';

const OrderPage = () => {    
    const { id } = useParams();

    return (
        <div className="container">
            <div className="row">
            <SingleOrder id={id}/>
            </div>
        </div>
    )
}

export default OrderPage;

