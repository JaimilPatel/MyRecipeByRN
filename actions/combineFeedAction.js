//To Store RecipeFeed into Redux Store
export function storeFeed(feed) {
    return {
        type: 'STORE_FEED',
        value: feed
    };
}

//To Store RecipeFavouriteFeed into Redux Store
export function storeFavouriteFeed(favouriteFeed) {
    return {
        type: 'STORE_FAVOURITE_FEED',
        value: favouriteFeed
    }
}
