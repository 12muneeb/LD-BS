export const USERLOGINTOKEN = 'USERLOGINTOKEN';
export const USERLOGINDATA = 'USERLOGINDATA';
export const USERLOGOUT = 'USERLOGOUT';
export const CURRENTLOGINUSERINFO = 'CURRENTLOGINUSERINFO';
export const ISUSERLOGIN = 'ISUSERLOGIN';
export const LOADER = 'LOADER';
export const CURRENTUSERPROFILE = 'CURRENTUSERPROFILE';
export const ERRMSG = 'ERRMSG';
export const SEARCHEDREST = 'SEARCHEDREST';
export const VERIFY_POPUP = 'VERIFY_POPUP';
export const TOGGLEAPPTHEME = 'TOGGLE_APP_THEME';
export const DRAWERPOSITION = 'DRAWERPOSITION';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {
    REQUEST: undefined,
    SUCCESS: undefined,
    CANCEL: undefined,
    FAILURE: undefined,
  };
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  console.log('---res', res);
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const SHOW_LOADING = 'SHOW_LOADING';
export const LOADING_STATE = 'APP_INFO_SHOW_LOADING';
export const PRIVACY_POLICY = 'PRIVACY_POLICY';
export const CLEAR_USER_TEMP_DATA = 'CLEAR_USER_TEMP_DATA';
export const APP_USAGE_POLICIES = createRequestTypes('APP_USAGE_POLICIES');
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
// USER ACTIONS
export const SOCIAL_SIGNUP_USER = createRequestTypes('SOCIAL_SIGNUP_USER');
export const LOGIN_USER = createRequestTypes('LOGIN_USER');
export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
export const COMPLETE_PROFILE = createRequestTypes('COMPLETE_PROFILE');
export const USER_LOGOUT = createRequestTypes('USER_LOGOUT');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const SIGNUP_USER = createRequestTypes('SIGNUP_USER');
export const DELETE_USER = createRequestTypes('DELETE_USER');
export const VERIFY_OTP = createRequestTypes('VERIFY_OTP');
export const RESEND_OTP = createRequestTypes('RESEND_OTP');
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const RESEND_PASSWORD = createRequestTypes('RESEND_PASSWORD');
export const ADD_USER = createRequestTypes('ADD_USER');
export const GET_USER = createRequestTypes('GET_USER');
export const REWARDS = createRequestTypes('REWARDS');
export const CREATE_CHALLENGE = createRequestTypes('CREATE_CHALLENGE');
export const GET_LIST_CHALLENGES = createRequestTypes('GET_LIST_CHALLENGES');
export const UPDATE_CHALLENGE = createRequestTypes('UPDATE_CHALLENGE');
export const DELETE_CHALLENGE = createRequestTypes('DELETE_CHALLENGE');
export const NEAR_BY_BUSINESS = createRequestTypes('NEAR_BY_BUSINESS');
export const EXIT_CHALLENGE = createRequestTypes('EXIT_CHALLENGE');
export const BUSINESS_DASHBOARD_STATS = createRequestTypes('BUSINESS_DASHBOARD_STATS');
export const BUSINESS_DASHBOARD_STATS_DETAILS = createRequestTypes('BUSINESS_DASHBOARD_STATS_DETAILS');
export const MY_CHALLENGES = createRequestTypes('MY_CHALLENGES');
export const GET_LIST_CHALLENGES_DETAILS = createRequestTypes('GET_LIST_CHALLENGES_DETAILS');
export const POST_FEEDBACK = createRequestTypes('POST_FEEDBACK');
export const GET_CONTENT = createRequestTypes('GET_CONTENT');
export const DELECT_ACCOUNT = createRequestTypes('DELECT_ACCOUNT');
export const CREATE_DISCUSSION_BOARD = createRequestTypes('CREATE_DISCUSSION_BOARD');
export const GET_DISCUSSION_GROUP = createRequestTypes('GET_DISCUSSION_GROUP');
export const GET_DISCUSSION_GROUP_BY_ID = createRequestTypes('GET_DISCUSSION_GROUP_BY_ID');
export const UPDATE_DISCUSSION_GROUP = createRequestTypes('UPDATE_DISCUSSION_GROUP');
export const REMOVE_PARTICIPANT_FROM_BOARD = createRequestTypes('REMOVE_PARTICIPANT_FROM_BOARD');
export const DELETE_DISCUSSION_BOARD = createRequestTypes('DELETE_DISCUSSION_BOARD');
// App Action

export default {
  LOADING_STATE,
  SOCIAL_SIGNUP_USER,
  LOGIN_USER,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  USER_LOGOUT,
  CHANGE_PASSWORD,
  DELETE_USER,
  SIGNUP_USER,
  VERIFY_OTP,
  RESEND_OTP,
  FORGOT_PASSWORD,
  RESEND_PASSWORD,
  ADD_USER,
  GET_USER,
  REWARDS,
  CREATE_CHALLENGE,
  GET_LIST_CHALLENGES,
  UPDATE_CHALLENGE,
  DELETE_CHALLENGE,
  NEAR_BY_BUSINESS,
  EXIT_CHALLENGE,
  BUSINESS_DASHBOARD_STATS,
  BUSINESS_DASHBOARD_STATS_DETAILS,
  MY_CHALLENGES,
  GET_LIST_CHALLENGES_DETAILS,
  POST_FEEDBACK,
  GET_CONTENT,
  DELECT_ACCOUNT,
  CREATE_DISCUSSION_BOARD,
  GET_DISCUSSION_GROUP,
  GET_DISCUSSION_GROUP_BY_ID,
  UPDATE_DISCUSSION_GROUP,
  REMOVE_PARTICIPANT_FROM_BOARD,
  DELETE_DISCUSSION_BOARD
};
