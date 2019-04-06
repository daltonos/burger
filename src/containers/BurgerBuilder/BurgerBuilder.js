import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 1,
    cheese: 2,
    meat: 2
}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 4
    };

    addIngredientHandler = (sType) => {
        const iOldCount = this.state.ingredients[sType];
        const iNewCount = iOldCount + 1;
        const oUpdatedIngredients = {
            ...this.state.ingredients
        };
        oUpdatedIngredients[sType] = iNewCount;
        const iNewPrice = this.state.totalPrice + INGREDIENT_PRICES[sType];

        this.setState({
            ingredients: oUpdatedIngredients,
            totalPrice: iNewPrice
        });
    };

    removeIngredientHandler = (sType) => {
        const iOldCount = this.state.ingredients[sType];
        if(iOldCount > 0) {
            const iNewCount = iOldCount - 1;
            const oUpdatedIngredients = {
                ...this.state.ingredients
            };
            oUpdatedIngredients[sType] = iNewCount;
            const iNewPrice = this.state.totalPrice - INGREDIENT_PRICES[sType];
    
            this.setState({
                ingredients: oUpdatedIngredients,
                totalPrice: iNewPrice
            });
        }
    };

    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addedIngredient={this.addIngredientHandler}
                    removedIngredient={this.removeIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;