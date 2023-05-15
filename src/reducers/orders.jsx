import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../components/ToastHelper/toastHelper';

const initialState = {
    listOrders: [],
    isLoading: true,
    pagination: {},
    isDelete: false,
};
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        //List
        fetchListOrders(state, params) {
            state.listOrders = [];
            state.error = null;
        },
        fetchListOrdersSuccess: (state, action) => {
            const { data } = action.payload;
            state.pagination = data.paginator;
            state.listOrders = data.items;
        },
        fetchListOrdersFailed: (state, action) => {
            const { error } = action.payload;
            state.error = error;
        },
        // Purchase
        fetchPurchase(state, params) {
            state.error = null;
            state.isLoading = true;
        },
        fetchPurchaseSuccess: (state, action) => {
            const { message } = action.payload;
            toastSuccess(message);
            state.isLoading = false;
        },
        fetchPurchaseFailed: (state, action) => {
            const { error } = action.payload;
            toastError(action.payload);
            state.isLoading = false;
            state.error = error;
        },
    },
});
export const {
    fetchListOrders, fetchListOrdersSuccess, fetchListOrdersFailed,
    fetchPurchase, fetchPurchaseSuccess, fetchPurchaseFailed,
} = ordersSlice.actions;

export default ordersSlice.reducer;
