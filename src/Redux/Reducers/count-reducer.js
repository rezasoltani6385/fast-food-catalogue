const initialState = 1

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT':
        return {
            ...state,
            count: {
            ...state.count,
            [action.payload]: state.count[action.payload] + 1,
            },
        };
        case 'DECREMENT_COUNT':
        return {
            ...state,
            count: {
            ...state.count,
            [action.payload]: state.count[action.payload] - 1,
            },
        };
        default:
        return state;
    }
};


export default countReducer;