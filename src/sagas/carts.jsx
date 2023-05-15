import {
    fetchListCartsApi,
    fetchAddToCartApi,
    fetchDeleteInCartApi,
} from '../api/cartsAPI';

import {
    fetchListCarts, fetchListCartsSuccess, fetchListCartsFailed,
    fetchAddToCart, fetchAddToCartSuccess, fetchAddToCartFailed,
    fetchDeleteInCart, fetchDeleteInCartSuccess, fetchDeleteInCartFailed
} from '../reducers/carts';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';



// Add to cart
function* actionFetchAddToCart(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchAddToCartApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchAddToCartSuccess(data));
        } else {
            yield put(fetchAddToCartFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchAddToCartFailed(error));
    }
}
// List
function* actionFetchListCarts(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchListCartsApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchListCartsSuccess(data));
        } else {
            yield put(fetchListCartsFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchListCartsFailed(error));
    }
}
// Delete in cart
function* actionFetchDeleteInCart(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchDeleteInCartApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchDeleteInCartSuccess(data));
        } else {
            yield put(fetchDeleteInCartFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchDeleteInCartFailed(error));
    }
}

export function* watchCart() {
    yield takeLatest(fetchAddToCart.type, actionFetchAddToCart);
    yield takeLatest(fetchListCarts.type, actionFetchListCarts);
    yield takeLatest(fetchDeleteInCart.type, actionFetchDeleteInCart);
}
