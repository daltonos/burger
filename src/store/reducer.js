import * as actionTypes from './actions';

const initialState = {
    ingredients : [],
    totalPrice: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            console.log(action.ingredientName, state)
            const indexToRemove = state.ingredients.indexOf(action.ingredientName);
            console.log(indexToRemove);
            if(indexToRemove >= -1) {
                return {
                    ...state,
                    ingredients: [...state.ingredients.slice(0, indexToRemove), ...state.ingredients.slice(indexToRemove + 1)]
                }
            } else {
                return state;
            }
        default: return state;
    }
};

export default reducer;