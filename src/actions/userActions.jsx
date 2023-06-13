import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from '../constants/userConstants';

const address = 'https://localhost:8080/api';

const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data, status } = await axios.post(`${address}/users/login`, {
      email,
      password,
    });

    if (status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT,
  });
};

const signupUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });

    const { status } = await axios.post(`${address}/users`, {
      email,
      password,
      name,
    });

    if (status === 201) {
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { loginUser, logoutUser, signupUser };
