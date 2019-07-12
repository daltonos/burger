import axios from "../../axios-orders";
import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

const setIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get("/initial-state/ingredients.json").then(
            res => {
                console.log({res});
                const ingredientsToSet = res.data && res.data.length ? res.data : [];
                dispatch(setIngredients(ingredientsToSet));
            }
        ).catch(
            err => {
                dispatch(setIngredientsFailed());
                console.error(err);
            }
        );
    }
}