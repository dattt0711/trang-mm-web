import {
    fetchPurchaseApi,
    fetchListOrdersApi,
} from '../api/ordersAPI';

import {
    fetchPurchase, fetchPurchaseSuccess, fetchPurchaseFailed,
    fetchListOrders, fetchListOrdersSuccess, fetchListOrdersFailed,
} from '../reducers/orders';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';



// purchase
function* actionFetchPurchase(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchPurchaseApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchPurchaseSuccess(data));
        } else {
            yield put(fetchPurchaseFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchPurchaseFailed(error));
    }
}
// list
function* actionFetchListOrders(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchListOrdersApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchListOrdersSuccess(data));
        } else {
            yield put(fetchListOrdersFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchListOrdersFailed(error));
    }
}



export function* watchOrder() {
    yield takeLatest(fetchPurchase.type, actionFetchPurchase);
    yield takeLatest(fetchListOrders.type, actionFetchListOrders);
}
