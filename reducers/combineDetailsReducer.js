//To Return Ingredient and Instructions from Redux Store
function AddCombineDetails(state = { ingredients: [], instructions: [] }, action = {}) {
    switch (action.type) {
        case 'STORE_INGREDIENTS':
            return { ...state, ingredients: action.value }
        case 'STORE_INSTRUCTIONS':
            return { ...state, instructions: action.value }
        default: return state
    }
}
export default AddCombineDetails