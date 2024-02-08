import _ from 'lodash';
import ApiSauce from '../services/ApiSauce';
import store from '../redux';

// export const BASE_URL = 'https://server.appsstaging.com:3017/api/v1/';
export const BASE_URL =
  'https://server1.appsstaging.com/3230/leaders-dash/public/api/';
export const ASSETS_URL =
  'https://server1.appsstaging.com/3230/leaders-dash/public/';
export const WEB_SOCKET_URL = 'https://server1.appsstaging.com:3006/';
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=';
// export const BASE_URL = "http://10.0.4.71:3018/api/v1/"; //local
// export const ASSETS_URL = "http://10.0.4.71:3018/"; //local
export const API_TIMEOUT = 20000;
export const NEW_API_KEY = '1d399038bef14b0497d028fc27999696';
export const GEOCODE_API_KEY = 'AIzaSyBmaS0B0qwokES4a_CiFNVkVJGkimXkNsk';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};
export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};
export const ERROR_CANCEL_ERROR = {
  message: 'Upload cancelled',
  error: 'Upload cancelled',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const SIGNUP = {
  route: 'auth/login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const VERIFY_OTP = {
  route: 'auth/verification',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const RESEND_OTP = {
  route: 'auth/re-send-code',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const SOCIAL_SIGN_IN = {
  route: 'auth/social-login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const LOGOUT = {
  route: 'auth/logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const COMPLETE_PROFILE = {
  route: 'auth/complete-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ADD_USER = {
  route: 'user/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_USER = {
  route: 'user/list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_PROFILE = {
  route: 'auth/complete-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_USER = {
  route: 'user/delete',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const REWARDS = {
  route: 'rewards',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CREATE_CHALLENGE = {
  route: 'create-challenge',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_LIST_CHALLENGES = {
  route: 'challenges',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_LIST_CHALLENGES_DETAILS = {
  route: 'challenges',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_CHALLENGE = {
  route: 'update-challenge',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_CHALLENGE = {
  route: 'delete-challenge',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const NEAR_BY_BUSINESS = {
  route: 'nearby-bussiness',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const EXIT_CHALLENGE = {
  route: 'remove-participant-from-ohallenge',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const BUSINESS_DASHBOARD_STATS = {
  route: 'bussiness-dashboard-stats',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const BUSINESS_DASHBOARD_STATS_DETAILS = {
  route: 'bussiness-user-stat-detail',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const MY_CHALLENGES = {
  route: 'my-challenges',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const POST_FEEDBACK = {
  route: 'feedback',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_CONTENT = {
  route: 'content',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELECT_ACCOUNT = {
  route: 'auth/delete-account',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const CREATE_DISCUSSION_BOARD = {
  route: 'create-discussion-group',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_DISCUSSION_GROUP = {
  route: 'discussion-boards',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_DISCUSSION_GROUP_BY_ID = {
  route: 'discussion-board',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_DISCUSSION_GROUP = {
  route: 'update-discussion-group',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const REMOVE_PARTICIPANT_FROM_BOARD = {
  route: 'remove-participant-from-discussion-group',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_DISCUSSION_BOARD = {
  route: 'discussion-board',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};


// export const callRequest = function (
//   url,
//   data,
//   parameter,
//   urlParameter,
//   header = {},
//   // ApiSauce,
//   baseUrl = BASE_URL,
// ) {
//   // note, import of "ApiSause" has some errors, thats why I am passing it through parameters
//   let _header = header;
//   if (url.access_token_required) {
//     const _access_token =
//       store?.getState()?.authReducer?.userToken !== null
//         ? store?.getState()?.authReducer?.userToken
//         : '';
//     console.log('_access_token', _access_token);
//     // const _access_token = '';
//     if (_access_token) {
//       _header = {
//         ..._header,
//         ...{
//           Authorization: _access_token.includes('Bearer ')
//             ? _access_token
//             : 'Bearer ' + _access_token,
//         },
//       };
//     }
//   }

//   const _url =
//     parameter &&
//     !_.isEmpty(parameter) &&
//     urlParameter &&
//     !_.isEmpty(urlParameter)
//       ? `${url.route}/${urlParameter}?${parameter?.key}=${parameter?.value}`
//       : parameter && !_.isEmpty(parameter)
//       ? `${url.route}?${parameter?.firstKey}=${parameter?.firstValue}&${parameter?.secondKey}=${parameter?.secondValue}`
//       : urlParameter && !_.isEmpty(urlParameter)
//       ? `${url.route}/${urlParameter}`
//       : url.route;
//   console.log('_url', _url);
//   if (url.type === REQUEST_TYPE.POST) {
//     return ApiSauce.post(_url, data, _header, baseUrl);
//   } else if (url.type === REQUEST_TYPE.GET) {
//     return ApiSauce.get(_url, data, _header, baseUrl);
//   } else if (url.type === REQUEST_TYPE.PUT) {
//     return ApiSauce.put(_url, data, _header, baseUrl);
//   } else if (url.type === REQUEST_TYPE.DELETE) {
//     return ApiSauce.delete(_url, data, _header, baseUrl);
//   }
//   // return ApiSauce.post(url.route, data, _header);
// };
export const callRequest = function (
  url,
  data,
  parameter,
  urlParameter,
  header = {},
  // ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some errors, thats why I am passing it through parameters
  let _header = header;
  if (url.access_token_required) {
    const _access_token =
      store?.getState()?.authReducer?.userToken !== null
        ? store?.getState()?.authReducer?.userToken
        : '';
    console.log('_access_token', _access_token);
    // const _access_token = '';
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: _access_token.includes('Bearer ')
            ? _access_token
            : 'Bearer ' + _access_token,
        },
      };
    }
  }
  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}?${parameter?.key}=${parameter?.value}`
      : urlParameter
      ? `${url.route}/${urlParameter}`
      : parameter &&
        !_.isEmpty(parameter) &&
        urlParameter &&
        !_.isEmpty(urlParameter)
      ? `${url.route}/${urlParameter}?${parameter?.key}=${parameter?.value}`
      : url.route;
  console.log('_url', url);
  console.log('_url', _url);
  console.log('_urlParmerter', parameter);
  console.log('urlParameterurlParameter', urlParameter);
  console.log('datadata', data);
  console.log('headerheader', header);
  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
export default {
  SOCIAL_SIGN_IN,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  SIGNUP,
  RESEND_OTP,
  VERIFY_OTP,
};
