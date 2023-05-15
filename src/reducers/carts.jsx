import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../components/ToastHelper/toastHelper';

const initialState = {
    listProducts: [],
    isAdded: false,
    isLoading: true,
    pagination: {},
    isDelete: false,
};
const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        //List
        fetchListCarts(state, params) {
            state.listProducts = [];
            state.error = null;
        },
        fetchListCartsSuccess: (state, action) => {
            const { data } = action.payload;
            state.pagination = data.paginator;
            state.listProducts = data.items[0].productObjIds;
        },
        fetchListCartsFailed: (state, action) => {
            const { error } = action.payload;
            state.error = error;
        },
        // Add to cart
        fetchAddToCart(state, params) {
            state.error = null;
            state.isLoading = true;
            state.isCreateSuccess = false;
        },
        fetchAddToCartSuccess: (state, action) => {
            const { message } = action.payload;
            toastSuccess(message);
            state.isCreateSuccess = true;
            state.isLoading = false;
        },
        fetchAddToCartFailed: (state, action) => {
            const { error } = action.payload;
            toastError(error);
            state.isLoading = false;
            state.isCreateSuccess = false;
            state.error = error;
        },
        // Delete product in cart
        fetchDeleteInCart(state, params) {
            state.error = null;
            state.isLoading = true;
        },
        fetchDeleteInCartSuccess: (state, action) => {
            const { message } = action.payload;
            toastSuccess(message);
            state.isLoading = false;
        },
        fetchDeleteInCartFailed: (state, action) => {
            const { error } = action.payload;
            toastError(error);
            state.isLoading = false;
            state.error = error;
        },
    },
});
export const {
    fetchListCarts, fetchListCartsSuccess, fetchListCartsFailed,
    fetchAddToCart, fetchAddToCartSuccess, fetchAddToCartFailed,
    fetchDeleteInCart, fetchDeleteInCartSuccess, fetchDeleteInCartFailed
} = cartsSlice.actions;

export default cartsSlice.reducer;
