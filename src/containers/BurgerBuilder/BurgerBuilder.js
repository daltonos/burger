import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 1,
    cheese: 2.5,
    meat: 3.75
}

class BurgerBuilder extends Component {
    state = {
        ingredients : [],
        totalPrice: 0,
        purchasable: true,
        purchasing: false
    };

    updatePurchasable = (aIngredients) => {
        const bPurchasable = aIngredients.length > 0
        this.setState({purchasable: !bPurchasable});
    }

    addIngredientHandler = (sType) => {
        const aNewIngredients = [sType, ...this.state.ingredients];
        const dCurrPrice = this.state.totalPrice; 
        const dNewPrice = dCurrPrice + INGREDIENT_PRICES[sType];
        this.setState({
            ingredients: aNewIngredients,
            totalPrice: dNewPrice
        });
        this.updatePurchasable(aNewIngredients);
    };

    removeIngredientHandler = (sType) => {
        const aNewIngredients = [...this.state.ingredients];
        const dCurrPrice = this.state.totalPrice; 
        const dNewPrice = dCurrPrice - INGREDIENT_PRICES[sType];
        if(aNewIngredients.length > 0) {
            if(aNewIngredients.indexOf(sType) >= 0) {
                aNewIngredients.splice(aNewIngredients.indexOf(sType), 1 );
                this.setState({
                    ingredients: aNewIngredients,
                    totalPrice:dNewPrice
                });
            }
        }
        this.updatePurchasable(aNewIngredients);
    };

    showModal = () => {
        console.log("hey");
        this.setState({purchasing: true});
    }

    hideModal = () => {
        this.setState({purchasing: false});
    }

    orderContinued = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Dalton",
                address: {
                    street: "test street",
                    zipcode: "04442-000",                    
                },
                email: "dalton@test.com"
            },
            delivery_method: "fastest"
        };
        axios.post("/orders.json", order)
        .then(res => this.setState({loading: false, purchasing: false}))
        .catch(err => {
            this.setState({loading: false, purchasing: false});
            console.error(err);
        });
    }

    render () {
        const oDisabledInfo = {...INGREDIENT_PRICES};
        for (let key in oDisabledInfo) {
            oDisabledInfo[key] = this.state.ingredients.indexOf(key) < 0;
        }

        let oOrderSummary = ( <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            orderContinued={this.orderContinued}
            orderCanceled={this.hideModal}/> );

        if (this.state.loading) {
            oOrderSummary = <Spinner />
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <Modal purchasing={this.state.purchasing} hideModal={this.hideModal}>
                    {oOrderSummary}
                </Modal>
                <BuildControls 
                    addedIngredient={this.addIngredientHandler}
                    removedIngredient={this.removeIngredientHandler}
                    disabled={oDisabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    showOrder={this.showModal}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;