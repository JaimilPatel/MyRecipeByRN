export function storeFeed(feed){
    return{
        type: 'STORE_FEED',
        value: feed
    };
}
export function storeFavouriteFeed(favouriteFeed){
    return{
        type: 'STORE_FAVOURITE_FEED',
        value :favouriteFeed
    }
}
