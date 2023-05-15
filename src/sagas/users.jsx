import {
    fetchUpdateUserApi,
    fetchInfoProductApi,
} from '../api/usersAPI';

import {
    fetchInfoUser, fetchInfoUserSuccess, fetchInfoUserFailed,
    fetchUpdateUser, fetchUpdateUserSuccess, fetchUpdateUserFailed,
} from '../reducers/users';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';



// Create
function* actionFetchUpdateUser(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchUpdateUserApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchUpdateUserSuccess(data));
        } else {
            yield put(fetchUpdateUserFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchUpdateUserFailed(error));
    }
}

// Info
function* actionFetchInfoUser(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchInfoProductApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchInfoUserSuccess(data));
        } else {
            yield put(fetchInfoUserFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchInfoUserFailed(error));
    }
}


export function* watchUser() {
    yield takeLatest(fetchUpdateUser.type, actionFetchUpdateUser);
    yield takeLatest(fetchInfoUser.type, actionFetchInfoUser);
}
