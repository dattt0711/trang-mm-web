import {
    fetchLoginApi,
} from '../api/loginAPI';

import {
    fetchLogin, fetchLoginSuccess, fetchLoginFailed,
} from '../reducers/login';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';


// Login
function* actionFetchLogin(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params, navigate } = action.payload;
        const response = yield call(fetchLoginApi, params);
        const { data } = response;
        if (data.success === true) {
            yield localStorage.setItem('TOKEN', data.accessToken);
            yield localStorage.setItem('USER_INFO', JSON.stringify(data.data));
            yield put(fetchLoginSuccess(data));
            navigate('/home')
        } else {
            yield put(fetchLoginFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        // yield put(fetchLoginFailed(error));
    }
}


export function* watchLogin() {
    yield takeLatest(fetchLogin.type, actionFetchLogin);

}
