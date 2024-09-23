import { createStore } from 'redux';
import { loadState, saveState } from './cartPage/localstorage';

const initialState = {
    cart: []
};

function cartReducer(state = loadState() || initialState, action) {
    console.log('Previous state:', state);
    console.log('Action:', action);
    switch (action.type) {
        case 'ADD_TO_CART':
            const isInCart = state.cart.find(item => item.id === action.payload.id);
            if (!isInCart) {
                const newStateAdd = {
                    ...state,
                    cart: [...state.cart, { ...action.payload, count: 1 }]
                };
               
                return newStateAdd;
            } else {
                return state; // No change if item is already in cart
            }

        case 'REMOVE_FROM_CART':
            const newStateRemove = {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            };
           
            return newStateRemove;

        case 'INCREASE_COUNT':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            count: item.count < item.availableItems ? item.count + 1 : item.count
                        }
                        : item
                )
            };

        case 'DECREASE_COUNT':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id && item.count > 1
                        ? { ...item, count: item.count - 1 }
                        : item
                )
            };

        default:
            return state;
    }
}

const store = createStore(cartReducer);

store.subscribe(() =>{
    console.log('Current state:', store.getState());
    saveState(store.getState());
})
export default store;
