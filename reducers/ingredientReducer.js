const ingredientReducer = (state = {
    ingredients: [],
}, action) => {

    switch (action.type) {
        case 'STORE_INGREDIENTS':
            return { ingredients: action.value }    
        default : {ingredients: state.ingredients}
    }
    return { ingredients: state.ingredients}
}

export default ingredientReducer;
