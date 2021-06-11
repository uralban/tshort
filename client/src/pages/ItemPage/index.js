import React from 'react';
import { useParams } from 'react-router';
import './item.css';
import SingleItem from '../../components/items/SingleItem';

const ItemPage = () => {    
    const { id } = useParams();

    return (
        <div className="container">
            <div className="row singleItem">
            <SingleItem id={id}/>
            </div>
        </div>
    )
}

export default ItemPage;