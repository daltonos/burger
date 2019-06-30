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
        return aIngredients.length > 0
    }

    showModal = () => {
        console.log("hey");
        this.setState({purchasing: true});
    }

    hideModal = () => {
        this.setState({purchasing: false});
    }

    orderContinued = () => {
        this.props.history.push("/checkout");
    }

    render () {
        const oDisabledInfo = {...INGREDIENT_PRICES};
        for (let key in oDisabledInfo) {
            oDisabledInfo[key] = this.props.ings.indexOf(key) < 0;
        }

        let oOrderSummary = ( <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.tPrice}
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
                    price={this.props.tPrice}
                    purchasable={!this.updatePurchasable(this.props.ings)}
                    showOrder={this.showModal}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        tPrice: state.totalPrice
    }
}

const mapDispatachToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatachToProps)(BurgerBuilder);