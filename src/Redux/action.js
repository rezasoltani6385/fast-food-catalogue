export const addToCartAction = (data)=> ({
    type: 'ADD_TO_CART',
    payload: data
})


export const removeFromCart = (data)=> ({
    type: 'REMOVE_FROM_CART',
    payload: data
})

export const increaseCount = (data)=> ({
    type: 'INCREMENT',
    payload: data
})

export const decreaseCount = (data)=> ({
    type: 'DECREMENT',
    payload: data
})