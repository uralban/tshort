import React from 'react';
import { useParams } from 'react-router';
import img from '../../img/11370_print_243.jpg';

const CategoryPage = () => {    
    const { category } = useParams(); 

    const sendData = {
        category: category
    };

    fetch("/app/category", {
        method: 'POST',
        body: JSON.stringify(sendData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {            
        let itemsList = '';        
        const categoryItemsContainer = document.querySelector(".categoryItems");
        switch (res.status) {
            case (201): {
                res.json().then((data) => {
                    const ordersListArr = JSON.parse(data.message);
                    ordersListArr.forEach(item => {
                        itemsList += `
                            <div class="col-lg-3 col-md-4 col-sm-2">
                            <div class="card">
                                <img src=${img} class="card-img-top" alt="Category img" />
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p>${Math.round(item.cost * 100) / 100} $</p>
                                    <a href="/item/${item.id}"} class="btn btn-primary">More Details</a>
                                </div>
                            </div>
                        </div>
                        `;
                    categoryItemsContainer.innerHTML=itemsList;
                });

                });
                break;
            }
            case(400): {
                itemsList = `
                    <p>Sorry, but category is empty</p>
                `;
                categoryItemsContainer.innerHTML=itemsList;
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
        };
    }); 
    
    return (
        <div className="container"> 
            <div className="row categoryItems"></div>       
        </div>
    )
}

export default CategoryPage;
