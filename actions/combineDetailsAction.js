//To Store Ingredient into Redux Store
export function storeIngredient(ingredients) {
    return {
        type: 'STORE_INGREDIENTS',
        value: ingredients
    };
}
//To Store Instruction into Redux Store
export function storeInstruction(instructions) {
    return {
        type: 'STORE_INSTRUCTIONS',
        value: instructions
    }
}
