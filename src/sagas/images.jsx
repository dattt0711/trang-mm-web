import {
    fetchCreateImageApi,
} from '../api/imagesAPI';

import {
    fetchCreateImage, fetchCreateImageSuccess, fetchCreateImageFailed,
} from '../reducers/images';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';



// Create
function* actionFetchCreateImage(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchCreateImageApi, params);
        const { data } = response;
        if ( data.success === true) {
            yield put(fetchCreateImageSuccess(data));
        } else {
            yield put(fetchCreateImageFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchCreateImageFailed(error));
    }
}


export function* watchImage() {
    yield takeLatest(fetchCreateImage.type, actionFetchCreateImage);

}
