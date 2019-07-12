import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
    state = {
        ingredients: ["meat", "meat", "cheese", "bacon", "salad"],
        price: 0
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render = () => {
        let summary = <Redirect to="/" />;
        if (this.props.ings.length) {
            const purchaseRedirect = this.props.purchased ? 
            <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + "/contact-data"}
                        render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}/>
                </div>
            );
            
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);