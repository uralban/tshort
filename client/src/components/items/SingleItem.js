import React, { Component } from "react";
import img from '../../img/11370_print_243.jpg'
import TypesOptions from './TypesOptions';
import SizesOptions from './SizesOptions';
import ColorsOptions from './ColorsOptions';
import FormErrors from '../forms/FormErrors';

class SingleItem extends Component {

    constructor (props){
        super(props);
        this.state = {
            itemInfo: [],
            colors: [],
            types: '',
            sizes: [],
            isLoaded: false,
            sendData: {id: this.props.id},
            formErrors: {type: '', size: '', color: ''},
        };
    }

    componentDidMount() {
        fetch("/app/item", {
            method: 'POST',
            body: JSON.stringify(this.state.sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            switch (res.status) {
                case (201): {
                    res.json().then((data) => {
                        const itemsArr = JSON.parse(data.message);
                        this.setState({itemInfo: itemsArr[0][0]});
                        this.setState({colors: itemsArr[1]});
                        this.setState({types: itemsArr[2]});
                        this.setState({sizes: itemsArr[3]});
                        this.setState({isLoaded: true});
                    });
                    break;
                }
                case(400): {
                    const singleItemContainer = document.querySelector('.singleItem');
                    const itemsList = `
                        <p>Sorry, but item is not found</p>
                    `;
                    singleItemContainer.innerHTML=itemsList;
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

    addToCartHandler = (e) => {
        e.preventDefault();
        const typeValue = e.target.form.type.value;
        const sizeValue = e.target.form.size.value;
        const colorValue = e.target.form.color.value;

        let fieldValidationErrors = this.state.formErrors;

        fieldValidationErrors.type = (typeValue === 'Select type') ? 'select please' : '';
        fieldValidationErrors.size = (sizeValue === '') ? 'select please' : '';
        fieldValidationErrors.color = (colorValue === '') ? 'select please' : '';

        this.setState({formErrors: fieldValidationErrors});

        if (fieldValidationErrors.type+fieldValidationErrors.size+fieldValidationErrors.color === '') {
            const sendData = {
                id: this.state.itemInfo.id,
                cost: this.state.itemInfo.cost,
                type: typeValue,
                size: sizeValue,
                color: colorValue,
                token: localStorage.getItem('token')
            };
            fetch("/app/cart/add", {
                method: 'POST',
                body: JSON.stringify(sendData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                switch (res.status) {
                    case(201): {
                        window.history.go(-1);
                        break;
                    }
                    case(400): {
                        const singleItemContainer = document.querySelector('.addToCartErrors');
                        const itemsList = `
                            <p>Something was wrong, please try again</p>
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
    }

    render () {        
        return (
            <>
            <div className="col-md-5">
                <img src={img} className="img-thumbnail" alt="tshort" />
            </div>
            <div className="col-md-7">
                <h4 className="itemName">{`${(this.state.isLoaded) ? this.state.itemInfo.name : ''}`}</h4>
                <form>
                    <div className="mb-3">                        
                        <TypesOptions types={this.state.types}/>
                    </div>
                    <div className="mb-3">
                        <SizesOptions sizes={this.state.sizes}/>
                    </div>
                    <div className="mb-3">
                        <ColorsOptions colors={this.state.colors}/>
                    </div>
                    <div className="mb-3">
                        <strong>Composition: </strong>{this.state.itemInfo.composition}
                    </div>
                    <strong>Cost: </strong>{`${(this.state.isLoaded) ? Math.round(this.state.itemInfo.cost * 100) / 100 : ''}`}$
                    <button 
                        type="submit" 
                        className="btn btn-success add-to-cart-btn"
                        onClick = {(e) => this.addToCartHandler(e)}
                    >Add to cart</button>
                    <FormErrors formErrors={this.state.formErrors} />
                    <div className="addToCartErrors"></div>
                </form>
            </div>
            </>
        );
      }
}

export default SingleItem;