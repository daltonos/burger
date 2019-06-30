import * as actionTypes from './actions';

const initialState = {
    ingredients : [],
    totalPrice: 0
};

const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 1,
    cheese: 2.5,
    meat: 3.75
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredientName],
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            console.log(action.ingredientName, state)
            const indexToRemove = state.ingredients.indexOf(action.ingredientName);
            console.log(indexToRemove);
            if(indexToRemove >= -1) {
                return {
                    ...state,
                    ingredients: [...state.ingredients.slice(0, indexToRemove), ...state.ingredients.slice(indexToRemove + 1)],
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
                }
            } else {
                return state;
            }
        default: return state;
    }
};

export default reducer;