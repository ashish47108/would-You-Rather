import { showLoading, hideLoading } from 'react-redux-loading';
import {getUser} from '../utils/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin(user){
    return {
        type: LOGIN_SUCCESS,
        authenticated: true,
        loggedInUser: user
    }
}

export function receiveLogout(){
    return {
        type: LOGOUT_SUCCESS,
        authenticated: null,
        loggedInUser: null
    }
}


export function handleLogin(id){
    return (dispatch) => {
        dispatch(showLoading());
        getUser(id).then((user)=>{
            dispatch(receiveLogin(user));
            dispatch(hideLoading());
        });
    };
}

export function handleLogout(id){
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(receiveLogout());
        dispatch(hideLoading());
    }
}