import ActionTypes, {
  USERLOGINDATA,
  USERLOGOUT,
  USERLOGINTOKEN,
  CURRENTLOGINUSERINFO,
  SIGNUP_USER,
  VERIFY_POPUP,
} from '../../constants';
import store from '../../index';

function dispatch(action) {
  store.dispatch(action);
}
export function loginCurrentUser(payload, role) {
  return {
    type: ActionTypes.LOGIN_USER.REQUEST,
    payload,
    role,
  };
}
export function loginUser(payload) {
  console.log("🚀 ~ file: index.js:22 ~ loginUser ~ payload:", payload)
  return {
    type: USERLOGINDATA,
    payload,
  };
}
export function saveTokenForLoginUser(payload) {
  return {
    type: USERLOGINTOKEN,
    payload,
  };
}
export function toggleVerificationPopUp(payload) {
  return {
    type: VERIFY_POPUP,
    payload,
  };
}
export function signUpUser(payload, verified, currentfocus) {
  return {
    type: ActionTypes.SIGNUP_USER.REQUEST,
    payload,
    verified,
    currentfocus,
  };
}
export function resendOTP(payload) {
  return {
    type: ActionTypes.RESEND_OTP.REQUEST,
    payload,
  };
}
export function otpVerify(payload, verified) {
  return {
    type: ActionTypes.VERIFY_OTP.REQUEST,
    payload,
    verified,
  };
}
export function saveUserForLoginUser(payload) {
  return {
    type: CURRENTLOGINUSERINFO,
    payload,
  };
}

export function socialSignin(payload, verified) {
  return {
    type: ActionTypes.SOCIAL_SIGNUP_USER.REQUEST,
    payload,
    verified,
  };
}
export function completeProfile(payload) {
  return {
    type: ActionTypes.COMPLETE_PROFILE.REQUEST,
    payload,
  };
}
export function updateProfile(payload) {
  return {
    type: ActionTypes.UPDATE_PROFILE.REQUEST,
    payload,
  };
}
export function addUser(payload) {
  return {
    type: ActionTypes.ADD_USER.REQUEST,
    payload,
  };
}
export function getAlUser(responseCallback) {
  return {
    type: ActionTypes.GET_USER.REQUEST,
    responseCallback,
  };
}
export function logoutUser() {
  return {
    type: USERLOGOUT,
  };
}
export function logoutUserWithDispatch() {
  dispatch({type: USERLOGOUT});
}

export function logoutCurrentUser() {
  return {
    type: ActionTypes.USER_LOGOUT.REQUEST,
  };
}

export function changePassword(payload) {
  return {
    type: ActionTypes.CHANGE_PASSWORD.REQUEST,
    payload,
  };
}

export function deleteUser(params) {
  console.log('partrarararararaaa', params)
  return {
    type: ActionTypes.DELETE_USER.REQUEST,
    params,
  };
}
export function deleteAccount(params) {
  console.log('partrarararararaaa', params)
  return {
    type: ActionTypes.DELECT_ACCOUNT.REQUEST,
    params,
  };
}
export function saveScoket(socket) {
  dispatch({type: 'SAVE_SOCKET', payload: socket});
}