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
        ingredients : [
            "salad",
            "bacon",
            "cheese",
            "meat"
        ],
        totalPrice: 4
    };

    addIngredientHandler = (sType) => {
        const aNewIngredients = [sType, ...this.state.ingredients];
        this.setState({
            ingredients: aNewIngredients,
        });
    };

    removeIngredientHandler = (sType) => {
        const aNewIngredients = [...this.state.ingredients];
        if(aNewIngredients.length > 0) {
            if(aNewIngredients.indexOf(sType) >= 0) {
                aNewIngredients.splice(aNewIngredients.indexOf(sType), 1 );
                this.setState({
                    ingredients: aNewIngredients
                });
            }
        }
    };

    render () {
        const oDisabledInfo = {...INGREDIENT_PRICES};
        console.log("oDisabledInfo",oDisabledInfo);
        for (let key in oDisabledInfo) {
            oDisabledInfo[key] = this.state.ingredients.indexOf(key) < 0;
        }
        console.log("oDisabledInfo",oDisabledInfo);

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addedIngredient={this.addIngredientHandler}
                    removedIngredient={this.removeIngredientHandler}
                    disabled={oDisabledInfo}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;