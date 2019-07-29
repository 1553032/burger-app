import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresDate');
    localStorage.removeItem('localId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7PTSyDPDPGnkCZHCdJgF83xf6qYOzLTk';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7PTSyDPDPGnkCZHCdJgF83xf6qYOzLTk';
        }

        axios.post(url, authData)
            .then(res => {
                const expiresDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('idToken', res.data.idToken);
                localStorage.setItem('expiresDate', expiresDate);
                localStorage.setItem('localId', res.data.localId);
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeOut(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message));
            })
    }
}

export const setPathRedirect = (path) => {
    return {
        type: actionTypes.SET_PATH_REDIRECT,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expiresDate = new Date(localStorage.getItem('expiresDate'));
            if (expiresDate < new Date()) {
                dispatch(authLogout());
            } else {
                const expiresDate = new Date(localStorage.getItem('expiresDate'));
                const authData = {
                    idToken: localStorage.getItem('idToken'),
                    localId: localStorage.getItem('localId')
                }
                dispatch(authSuccess(authData));
                dispatch(checkAuthTimeOut((expiresDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}