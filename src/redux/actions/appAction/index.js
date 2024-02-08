import messaging from '@react-native-firebase/messaging';
import store from '../../index';
import ActionTypes from '../../constants';
function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  return {
    type: 'LOADER_START',
  };
}
export function loaderStartWithDispatch() {
  dispatch({type: 'LOADER_START'});
}
export function loaderStopWithDispatch() {
  dispatch({type: 'LOADER_STOP'});
}
export function loaderStop() {
  return {
    type: 'LOADER_STOP',
  };
}
export function saveCurrentUserLocation(location) {
  return {
    type: 'SAVE_CURRENT_USER_LOCATION',
    payload: location,
  };
}
export const getDeviceToken = async () => {
  try {
    // await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    if (token) return token;
    else return '';
  } catch (error) {
    console.log(error);
  }
};

export function rewardList(params, responseCallback) {
  return {
    type: ActionTypes.REWARDS.REQUEST,
    params,
    responseCallback,
  };
}
export function createChallenge(params, responseCallback) {
  return {
    type: ActionTypes.CREATE_CHALLENGE.REQUEST,
    params,
    responseCallback,
  };
}
export function getChallengesList(params, responseCallback) {
  return {
    type: ActionTypes.GET_LIST_CHALLENGES.REQUEST,
    params,
    responseCallback,
  };
}
export function deleteChallenge(params, responseCallback) {
  return {
    type: ActionTypes.DELETE_CHALLENGE.REQUEST,
    params,
    responseCallback,
  };
}
export function updateChallenge(params, responseCallback) {
  return {
    type: ActionTypes.UPDATE_CHALLENGE.REQUEST,
    params,
    responseCallback,
  };
}
export function getNearByBusiness(params, responseCallback) {
  return {
    type: ActionTypes.NEAR_BY_BUSINESS.REQUEST,
    params,
    responseCallback,
  };
}
export function exitChallenge(params, responseCallback) {
  return {
    type: ActionTypes.EXIT_CHALLENGE.REQUEST,
    params,
    responseCallback,
  };
}
export function getBusinessDashboardStats(params, responseCallback) {
  return {
    type: ActionTypes.BUSINESS_DASHBOARD_STATS.REQUEST,
    params,
    responseCallback,
  };
}
export function getBusinessDashboardStatsDetails(params, responseCallback) {
  return {
    type: ActionTypes.BUSINESS_DASHBOARD_STATS_DETAILS.REQUEST,
    params,
    responseCallback,
  };
}
export function getMyChallenges(params, responseCallback) {
  return {
    type: ActionTypes.MY_CHALLENGES.REQUEST,
    params,
    responseCallback,
  };
}
export function getChallengesListDetails(params, responseCallback) {
  return {
    type: ActionTypes.GET_LIST_CHALLENGES_DETAILS.REQUEST,
    params,
    responseCallback,
  };
}
export function postFeedBack(params, responseCallback) {
  return {
    type: ActionTypes.POST_FEEDBACK.REQUEST,
    params,
    responseCallback,
  };
}
export function getContent(params, responseCallback) {
  return {
    type: ActionTypes.GET_CONTENT.REQUEST,
    params,
    responseCallback,
  };
}
export function createDiscussionGroup(params, responseCallback) {
  return {
    type: ActionTypes.CREATE_DISCUSSION_BOARD.REQUEST,
    params,
    responseCallback,
  };
}
export function getDiscussionsGroup(params, responseCallback) {
  return {
    type: ActionTypes.GET_DISCUSSION_GROUP.REQUEST,
    params,
    responseCallback,
  };
}
export function getDiscussionsGroupById(params, responseCallback) {
  return {
    type: ActionTypes.GET_DISCUSSION_GROUP_BY_ID.REQUEST,
    params,
    responseCallback,
  };
}
export function updateDiscussionGroup(params, responseCallback) {
  return {
    type: ActionTypes.UPDATE_DISCUSSION_GROUP.REQUEST,
    params,
    responseCallback,
  };
}
export function removeParticipantsFromBoard(params, responseCallback) {
  return {
    type: ActionTypes.REMOVE_PARTICIPANT_FROM_BOARD.REQUEST,
    params,
    responseCallback,
  };
}
export function deleteDiscussionBoard(params, responseCallback) {
  return {
    type: ActionTypes.DELETE_DISCUSSION_BOARD.REQUEST,
    params,
    responseCallback,
  };
}
