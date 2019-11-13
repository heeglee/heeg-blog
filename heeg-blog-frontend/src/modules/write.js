import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'write/INITIALIZE';      // initialize whole fields
const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key, value
}));

const initialState = {
    title: '',
    body: '',
    tags: '',
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,     // put initialState to set state as an initial form.
        [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
            ...state,
            [key]: value,
        })
    },
    initialState
);

export default write;