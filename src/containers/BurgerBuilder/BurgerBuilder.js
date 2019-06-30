import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "../../axios-orders";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from '../../store/actions'

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

    componentDidMount = () => {
        console.log(this.props);
        axios.get("/initial-state/ingredients.json").then(
            res => {
                this.setState({ingredients: [] /*res.data*/}); //ToDo
            }
        ).catch(
            err => {
                console.error(err);
            }
        );
    }

    updatePurchasable = (aIngredients) => {
        const bPurchasable = aIngredients.length > 0
        this.setState({purchasable: !bPurchasable});
    }

    addIngredientHandler = (sType) => {
        const aNewIngredients = [sType, ...this.props.ings];
        const dCurrPrice = this.state.totalPrice; 
        const dNewPrice = dCurrPrice + INGREDIENT_PRICES[sType];
        this.setState({
            ingredients: aNewIngredients,
            totalPrice: dNewPrice
        });
        this.updatePurchasable(aNewIngredients);
    };

    removeIngredientHandler = (sType) => {
        const aNewIngredients = [...this.props.ings];
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
        const queryParams = [];
        this.props.ings.forEach((el, i) => {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        });
        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    }

    render () {
        const oDisabledInfo = {...INGREDIENT_PRICES};
        for (let key in oDisabledInfo) {
            oDisabledInfo[key] = this.props.ings.indexOf(key) < 0;
        }

        let oOrderSummary = ( <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.state.totalPrice}
            orderContinued={this.orderContinued}
            orderCanceled={this.hideModal}/> );

        if (this.state.loading) {
            oOrderSummary = <Spinner />
        }

        return (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <Modal purchasing={this.state.purchasing} hideModal={this.hideModal}>
                    {oOrderSummary}
                </Modal>
                <BuildControls 
                    addedIngredient={this.props.onIngredientAdded}
                    removedIngredient={this.props.onIngredientRemoved}
                    disabled={oDisabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    showOrder={this.showModal}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const mapDispatachToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatachToProps)(BurgerBuilder);