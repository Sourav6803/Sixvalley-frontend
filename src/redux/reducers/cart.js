import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    openCart: false, // New state for openCart
};

export const cartReducer = createReducer(initialState, {
    addToCart: (state, action) => {
        const item = action.payload;
        const isItemExist = state?.cart?.find((i) => i?._id === item?._id);
        if (isItemExist) {
            return {
                ...state, cart: state?.cart?.map((i) => (i._id === isItemExist._id ? item : i)),
            };
        } else {
            return {
                ...state, cart: [...state?.cart, item],
            };
        }
    },

    removeFromCart: (state, action) => {
        return {
            ...state,
            cart: state?.cart?.filter((i) => i?._id !== action.payload),
        };
    },

    toggleCart: (state) => {
        state.openCart = !state.openCart; // Toggle the openCart state
      },
      setCartOpen: (state, action) => {
        if (state.openCart !== action.payload) {
          state.openCart = action.payload;
        }
      },
});