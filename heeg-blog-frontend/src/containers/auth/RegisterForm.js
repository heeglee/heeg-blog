import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(changeField({
            form: 'register',
            key: name,
            value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;

        if ([username, password, passwordConfirm].includes('')) {
            setError('Please fill every blanks.');
            return;
        }

        if (password !== passwordConfirm) {
            setError('Please check your password.');
            changeField({ form: 'register', key: 'password', value: '' });
            changeField({ form: 'register', key: 'passwordConfirm', value: '' });
            return;
        }

        dispatch(register({ username, password }));
    };

    // initialize when rendered first
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // register success/failure
    useEffect(() => {
        if (authError) {
            if (authError.response.status === 409) {
                setError('Username already exists.');
                return;
            }
            setError('Failed to register.');
            return;
        }
        if (auth) {
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // check user object
    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [history, user]);
    
    return (
        <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
    );
};

export default withRouter(RegisterForm);