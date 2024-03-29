import * as actionType from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
    building: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionType.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case (actionType.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case (actionType.SET_INGREDIENTS):
            return {
                ...state,
                ingredients: action.ingredients,
                price: 4,
                error: false,
                building: false
            };
        case (actionType.FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;