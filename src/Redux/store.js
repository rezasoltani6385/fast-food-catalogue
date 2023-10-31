import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Reducers/cart-reducer';


const rootReducer = {
    // count: countReducer,
    // flightClass: flightClassReducer,
    // flightDate: flightDateReducer,
    // flightNumber: flightNumberReducer,
    // baggageCount: baggageCountReducer,
    // mobileView: mobileViewReducer,
    // loginModal: loginModal,
    // modalStatus:modalStatusReducer,
    // captcha: captchaReducer,
    cart: cartReducer
};

// Load state from local storage
const loadState = () => {
try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
    return undefined;
    }
    return JSON.parse(serializedState);
} catch (err) {
    return undefined;
}
};

// Save state to local storage
const saveState = (state) => {
try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
} catch (error) {
    console.log(error)
}
};

const store = configureStore({
reducer: rootReducer,
preloadedState: loadState(), // Load state from local storage
});

// Subscribe to store changes and save state to local storage
store.subscribe(() => {
saveState(store.getState());
});

export default store;
