import {
    fetchCreateProductApi,
    fetchListProductApi,
    fetchInfoProductApi,
    fetchDeleteProductApi,
    fetchUpdateProductApi,
} from '../api/productsAPI';

import {
    fetchCreateProduct, fetchCreateProductSuccess, fetchCreateProductFailed,
    fetchUpdateProduct, fetchUpdateProductSuccess, fetchUpdateProductFailed,
    fetchListProduct, fetchListProductSuccess, fetchListProductFailed,
    fetchInfoProduct, fetchInfoProductSuccess, fetchInfoProductFailed,
    fetchDeleteProduct, fetchDeleteProductSuccess, fetchDeleteProductFailed,
} from '../reducers/products';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';



// Create
function* actionFetchCreateProduct(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchCreateProductApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchCreateProductSuccess(data));
        } else {
            yield put(fetchCreateProductFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchCreateProductFailed(error));
    }
}
// Update
function* actionFetchUpdateProduct(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchUpdateProductApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchUpdateProductSuccess(data));
        } else {
            yield put(fetchUpdateProductFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchUpdateProductFailed(error));
    }
}
// List
function* actionFetchListProduct(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchListProductApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchListProductSuccess(data));
        } else {
            yield put(fetchListProductFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchListProductFailed(error));
    }
}
// Info
function* actionFetchInfoProduct(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchInfoProductApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchInfoProductSuccess(data));
        } else {
            yield put(fetchInfoProductFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchInfoProductFailed(error));
    }
}
// Delete
function* actionFetchDeleteProduct(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchDeleteProductApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchDeleteProductSuccess(data));
        } else {
            yield put(fetchDeleteProductFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchDeleteProductFailed(error));
    }
}

export function* watchProduct() {
    yield takeLatest(fetchCreateProduct.type, actionFetchCreateProduct);
    yield takeLatest(fetchListProduct.type, actionFetchListProduct);
    yield takeLatest(fetchInfoProduct.type, actionFetchInfoProduct);
    yield takeLatest(fetchDeleteProduct.type, actionFetchDeleteProduct);
    yield takeLatest(fetchUpdateProduct.type, actionFetchUpdateProduct);
}
