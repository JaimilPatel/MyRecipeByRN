export function storeToken(token){
    return {
        type : 'STORE_TOKEN',
        payload : token
    }
}