export function storeToken(token){
    return{
        type: 'STORE_TOKEN',
        value: 'Bearer '+token
    };
}
