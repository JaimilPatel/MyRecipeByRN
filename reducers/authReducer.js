const initialState = {token : ''}
export default authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'STORE_TOKEN':
        return { token: state.token }
    }
    return { token: state.token }
  }