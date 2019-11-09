import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import createRequestThunk from '../lib/createRequestThunk';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
    form,   // register / login
    key,    // username / password / passwordConfirm
    value
}));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
// export const register = createAction(REGISTER, ({ username, password }) => ({
//     username, password
// }));
// export const login = createAction(LOGIN, ({ username, password }) => ({
//     username, password
// }));

export const register = createRequestThunk(REGISTER, authAPI.register);
export const login = createRequestThunk(LOGIN, authAPI.login);

// const registerSaga = createRequestSaga(REGISTER, authAPI.register);
// const loginSaga = createRequestSaga(LOGIN, authAPI.login);
// export function* authSaga() {
//     yield takeLatest(REGISTER, registerSaga);
//     yield takeLatest(LOGIN, loginSaga);
// }

const initialState = {
    loading: {
        REGISTER: false,
        LOGIN: false,
    },
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => produce(state, draft => {
            draft[form][key] = value;
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
            authError: null,
        }),
        [REGISTER]: state => ({
            ...state,
            loading: {
                ...state.loading,
                REGISTER: true,
            }
        }),
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            loading: {
                ...state.loading,
                REGISTER: false,
            },
            authError: null,
            auth,
        }),
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            loading: {
                ...state.loading,
                REGISTER: false,
            },
            authError: error,
        }),
        [LOGIN]: state => ({
            ...state,
            loading: {
                ...state.loading,
                LOGIN: true,
            }
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            loading: {
                ...state.loading,
                LOGIN: false,
            },
            authError: null,
            auth,
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            loading: {
                ...state.loading,
                LOGIN: false,
            },
            authError: error,
        }),
    },
    initialState,
);

export default auth;