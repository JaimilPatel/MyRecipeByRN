const authReducer = (state = {
    token: ''
}, action) => {

    switch (action.type) {
        case 'STORE_TOKEN':

            return { token: action.value }

        default: { token: state.token }
    }
    return { token: state.token }
}

export default authReducer;