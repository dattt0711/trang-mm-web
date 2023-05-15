
import {
    fetchCreateCommentApi,
    fetchListCommentsApi
} from '../api/commentsAPI';
import {
    fetchListComments, fetchListCommentsSuccess, fetchListCommentsFailed,
    fetchCreateComment, fetchCreateCommentSuccess, fetchCreateCommentFailed,
} from '../reducers/comments';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';



// create
function* actionFetchCreateComment(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchCreateCommentApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchCreateCommentSuccess(data));
        } else {
            yield put(fetchCreateCommentFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchCreateCommentFailed(error));
    }
}
// List
function* actionFetchListComments(action) {
    try {
        // yield put(showLoading());
        yield delay(500);
        const { params } = action.payload;
        const response = yield call(fetchListCommentsApi, params);
        const { data } = response;
        if (data.success === true) {
            yield put(fetchListCommentsSuccess(data));
        } else {
            yield put(fetchListCommentsFailed(data));
        }
        // yield put(hideLoading());
    } catch (error) {
        // yield put(hideLoading());
        yield put(fetchListCommentsFailed(error));
    }
}


export function* watchComment() {
    yield takeLatest(fetchCreateComment.type, actionFetchCreateComment);
    yield takeLatest(fetchListComments.type, actionFetchListComments);
}
