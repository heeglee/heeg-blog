import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

// TODO: use redux-thunk, instead of redux-saga
export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        const start = put(startLoading(type));
        yield start;

        try {
            const response = call(request, action.payload);
            yield response;
            
            const payload = response.payload;
            console.log(payload);

            yield put({
                type: SUCCESS,
                payload
            });
            
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }

        const end = put(finishLoading(type));
        yield end;
    }
}