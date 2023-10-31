const initialState = {
}


const cartReducer = (state= initialState, action)=> {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                    ...state,
                    [action.payload.name]: {
                        price: action.payload.price,
                        count: action.payload.count,
                    }

            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                state: delete state.cart[action.payload.name]
            }
        default:
            return state
    }
}

export default cartReducer