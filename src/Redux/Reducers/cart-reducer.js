const initialState = {
}


const cartReducer = (state= initialState, action)=> {
    // console.log([action])
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
            const itemNameToRemove = action.payload.name;
            const { [itemNameToRemove]: itemToRemove, ...updatedCart } = state;
            state = updatedCart
            console.log('state', updatedCart)
            return {
                ...updatedCart,
            };
        case 'INCREMENT':
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    count: state[action.payload.name].count + 1
                }
            }
        case 'DECREMENT':
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    count: state[action.payload.name].count - 1
                }
            }
        default:
            return state
    }
}

export default cartReducer