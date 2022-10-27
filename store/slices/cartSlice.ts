import { createSlice } from '@reduxjs/toolkit';
import { type } from 'os';

// type Cart = {
//     items: []
// }
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
