export function storeIngredient(ingredients){
    return{
        type: 'STORE_INGREDIENTS',
        value: ingredients
    };
}
export function storeInstruction(instructions){
    return{
        type : 'STORE_INSTRUCTIONS',
        value : instructions
    }
}
