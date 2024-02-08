import {take, put, call, fork} from 'redux-saga/effects';
import ActionTypes from '../redux/constants';
import {
  loginUser,
  saveTokenForLoginUser,
  logoutUser,
} from '../redux/actions/authAction';
import {loaderStart, loaderStop} from '../redux/actions/appAction';
import API_URL, {
  LOGIN,
  SOCIAL_SIGN_IN,
  callRequest,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  ADD_USER,
  DELETE_USER,
  SIGNUP,
  VERIFY_OTP,
  RESEND_OTP,
  GET_USER,
  DELECT_ACCOUNT,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../utils/Utils';
import NavService from '../helpers/NavService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function* login() {
  console.log('jsnkdsfkl');

  while (true) {
    const {payload, role} = yield take(ActionTypes.LOGIN_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGIN,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.navigate('Otp', {
          user_id: response?.data?.id,
          screenName: 'signup',
          role: role,
        });
        Util.DialogAlert(
          'OTP verification code has been sent to your email address',
          'success',
        );
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* signUp() {
  while (true) {
    const {payload, verified, role} = yield take(
      ActionTypes.SIGNUP_USER.REQUEST,
    );

    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SIGNUP,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('----respoddnse---', response);
        Util.DialogAlert(
          'OTP verification code has been sent to your email address',
          'success',
        );
        NavService.navigate('Otp', {
          verified: verified?.verified,
          user_id: response.data?.user_id,
        });
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error=======errror', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* oTPVerify() {
  while (true) {
    const {payload, verified} = yield take(ActionTypes.VERIFY_OTP.REQUEST);
    console.log('screen', verified);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        VERIFY_OTP,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response?.data?.is_profile_complete', response);
        if (response?.data?.is_profile_complete == 0) {
          NavService.navigate('CompleteProfile', {
            verified: verified,
          });
          yield put(saveTokenForLoginUser(response?.bearer_token));
          Util.DialogAlert(response.message, 'success');
        } else {
          yield put(saveTokenForLoginUser(response?.bearer_token));
          yield put(loginUser(response?.data));
          Util.DialogAlert(response.message, 'success');
        }
        // NavService.navigate('CompleteProfile')
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error=======', error);
      yield put(loaderStop());
      Util.DialogAlert(
        'Invalid OTP',
        // error.message
      );
    }
  }
}

function* resendOTP() {
  while (true) {
    const {payload} = yield take(ActionTypes.RESEND_OTP.REQUEST);
    console.log('payload', payload);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        // yield put(loginUser(response.data));
        Util.DialogAlert(
          'We have resent OTP verification code to your email address',
          'success',
        );
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* socialSignin() {
  while (true) {
    const {payload, verified} = yield take(
      ActionTypes.SOCIAL_SIGNUP_USER.REQUEST,
    );
    console.log('verifiedverified', verified);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SOCIAL_SIGN_IN,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log(
          'response.data',
          response?.data?.user_type,
          'response.data',
        );
        if (response?.data?.is_profile_complete == 0) {
          yield put(saveTokenForLoginUser(response?.bearer_token));
          NavService.navigate('CompleteProfile', {
            verified: verified,
          });
        } else {
          yield put(loginUser(response.data));
          yield put(saveTokenForLoginUser(response?.bearer_token));
        }

        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error=======', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* completeProfile() {
  while (true) {
    const {payload} = yield take(ActionTypes.COMPLETE_PROFILE.REQUEST);
    console.log(
      '🚀 ~ file: user.js:258 ~ function*completeProfile ~ payload:',
      payload,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        COMPLETE_PROFILE,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.navigate('Description');
        yield put(loginUser(response?.data));
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorcomplete', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* addUser() {
  while (true) {
    const {payload} = yield take(ActionTypes.ADD_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        ADD_USER,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorcomplete', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* updateProfile() {
  while (true) {
    const {payload} = yield take(ActionTypes.UPDATE_PROFILE.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_PROFILE,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response.dataresponse.data', response.data);
        yield put(loginUser(response.data));
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error--------dataresponse', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* userLogout() {
  while (true) {
    const {payload} = yield take(ActionTypes.USER_LOGOUT.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGOUT,
        null,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response==', response);
        if (
          // payload?.social_device_token !== null &&
          payload?.socialType == 'google'
        ) {
          GoogleSignin?.signOut();
        }
        yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* getAlUser() {
  while (true) {
    const {responseCallback} = yield take(ActionTypes.GET_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_USER,
        null,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        console.log('responseresponse===response', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      // console.log('====error====error', error);
      yield put(loaderStop());
      // Util.DialogAlert(error.message);
    }
  }
}
function* deleteUser() {
  while (true) {
    const {params} = yield take(ActionTypes.DELETE_USER.REQUEST);
    console.log('paramsindeleteuser', params);

    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_USER,
        null,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('payloadofdletete', response);
        // GoogleSignin.signOut();
        // yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorofdeleteprofile', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* deleteAccount() {
  while (true) {
    const {params} = yield take(ActionTypes.DELECT_ACCOUNT.REQUEST);
    console.log('paramsindeleteuser', params);

    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELECT_ACCOUNT,
        null,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('payloadofdletete', response);
        // GoogleSignin.signOut();
        // yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorofdeleteprofile', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

export default function* root() {
  yield fork(login);
  yield fork(socialSignin);
  yield fork(completeProfile);
  yield fork(updateProfile);
  yield fork(userLogout);
  yield fork(deleteUser);
  yield fork(signUp);
  yield fork(oTPVerify);
  yield fork(resendOTP);
  yield fork(addUser);
  yield fork(getAlUser);
  yield fork(deleteAccount);
}
