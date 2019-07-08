import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
//import * as actionTypes from '../../store/actions/actionTypes'
import * as burgerBuilderActions from '../../store/actions/index';

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
        console.log('Burger Builder componentDidMount', this.props);
        this.props.onInitIngredients();
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

            let burger = null;
            if (this.props.ings && this.props.ings.length) {
                burger =  <Burger ingredients={this.props.ings}/>
            }

            return (
                <Aux>
                    {burger}
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
            );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        tPrice: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}


//ToDo add axios withError
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);