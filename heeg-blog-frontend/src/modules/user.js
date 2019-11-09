import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
// import createRequestSaga from '../lib/createRequestSaga';
import createRequestThunk from '../lib/createRequestThunk';

const TEMP_SET_USER = 'user/TEMP_SET_USER';

const CHECK = 'auth/CHECK';
const CHECK_SUCCESS = 'auth/CHECK_SUCCESS';
const CHECK_FAILURE = 'auth/CHECK_FAILURE';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
// export const check = createAction(CHECK);

export const check = createRequestThunk(CHECK, authAPI.check);

// const checkSaga = createRequestSaga(CHECK, authAPI.check);
// export function* userSaga() {
//     yield takeLatest(CHECK, checkSaga);
// }

const initialState = {
    loading: {
        CHECK: false,
    },
    user: null,
    checkError: null,
};

export default handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK]: state => ({
            ...state,
            loading: {
                ...state.loading,
                CHECK: true,
            }
        }),
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            loading: {
                ...state.loading,
                CHECK: false,
            },
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            loading: {
                ...state.loading,
                CHECK: false,
            },
            user: null,
            checkError: error,
        }),
    },
    initialState,
);