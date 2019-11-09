import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

// TODO: use redux-thunk, instead of redux-saga
export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading(type));

        try {
            const response = call(request, action.payload);
            yield response;
            console.log(response);
            
            yield put({
                type: SUCCESS,
                payload: response.payload,
            });
            
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }

        yield put(finishLoading(type));
    }
}