import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginUserPage from './pages/LoginUserPage';
import CreateUserPage from './pages/CreateUserPage';
import LogoutPage from './pages/LogoutPage';
import CategoryPage from './pages/CategoryPage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CompletePage from './pages/CompletePage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';

const useRoutes = isAutentificated => {
    
    if (isAutentificated) {

        return (
            <Switch>
                <Route path="/logout" exact>
                    <LogoutPage />
                </Route>                
                <Route path="/orders" exact>
                    <OrdersPage />
                </Route>
                <Route path="/cart" exact>
                    <CartPage />
                </Route>
                <Route path="/checkout" exact>
                    <CheckoutPage />
                </Route>
                <Route path="/complete" exact>
                    <CompletePage />
                </Route>
                <Route path="/category/:category" exact>
                    <CategoryPage />
                </Route>
                <Route path="/item/:id" exact>
                    <ItemPage />
                </Route>
                <Route path="/order/:id" exact>
                    <OrderPage />
                </Route>
                <Route path="/" exact>
                    <div className="container">
                        <div className="row">
                            <div className="col homeSection">
                                <h2>Welcome to our shop</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col homeSection">
                                <strong>Now, you may select the category</strong>
                            </div>
                        </div>
                    </div>
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/login" exact>
                <LoginUserPage />
            </Route>
            <Route path="/create" exact>
                <CreateUserPage />
            </Route>
            <Route path="/" exact>                
                <div className="container">
                    <div className="row">
                        <div className="col homeSection">
                            <h2>This is our maket of shop</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col homeSection">
                            <strong>Please, login or registration first.</strong>
                        </div>
                    </div>
                </div>
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default useRoutes;