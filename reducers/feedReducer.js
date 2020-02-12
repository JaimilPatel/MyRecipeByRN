const feedReducer = (state = {
    feed: []
}, action) => {

    switch (action.type) {
        case 'STORE_FEED':

            return { feed: action.value }

        default: { feed: state.feed }
    }
    return { feed: state.feed }
}

export default feedReducer;