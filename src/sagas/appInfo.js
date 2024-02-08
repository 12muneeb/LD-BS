import {take, put, call, fork} from 'redux-saga/effects';
import ActionTypes from '../redux/constants';
import {loginUser, toggleVerificationPopUp} from '../redux/actions/authAction';
import {loaderStart, loaderStop} from '../redux/actions/appAction';
import API_URL, {
  callRequest,
  CREATE_CHALLENGE,
  REWARDS,
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
  CREATE_DISCUSSION_BOARD,
  GET_DISCUSSION_GROUP,
  GET_DISCUSSION_GROUP_BY_ID,
  UPDATE_DISCUSSION_GROUP,
  REMOVE_PARTICIPANT_FROM_BOARD,
  DELETE_DISCUSSION_BOARD
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import NavService from '../helpers/NavService';
import Util from '../utils/Utils';

function* getRewardList() {
  while (true) {
    const {params, responseCallback} = yield take(ActionTypes.REWARDS.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        REWARDS,
        null,
        '',
        params,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofgetRewardList', response);
        if (responseCallback) {
          if (response?.data.length > 0) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetpostlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* createChallenge() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.CREATE_CHALLENGE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CREATE_CHALLENGE,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofcreatepost', response);
        if (responseCallback) {
          responseCallback(true);
        }
        Util.DialogAlert(response.message, 'success');
      } else {
        console.log('errrorr-logged-createpost');
      }
    } catch (error) {
      console.log('errorofcreatepost', error);
      Util.DialogAlert(error?.message);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* updateChallenge() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.UPDATE_CHALLENGE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_CHALLENGE,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofupdateChallenge', response);
        if (responseCallback) {
          responseCallback(true);
        }
        Util.DialogAlert(response.message, 'success');
      } else {
        console.log('errrorr-logged-createpost');
      }
    } catch (error) {
      console.log('errorofupdatechallenge', error);
      Util.DialogAlert(error?.message);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getChallengesList() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_LIST_CHALLENGES.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_LIST_CHALLENGES,
        null,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofgetChallengesListNOw', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetChallengesList', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getChallengesListDetails() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_LIST_CHALLENGES_DETAILS.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_LIST_CHALLENGES_DETAILS,
        null,
        '',
        params,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofgetChallengesListNOw', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetChallengesList', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getNearByBusiness() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.NEAR_BY_BUSINESS.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        NEAR_BY_BUSINESS,
        null,
        '',
        '',
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofgetNEAR_BY_BUSINESS', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetNEAR_BY_BUSINESS', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* deleteChallenge() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.DELETE_CHALLENGE.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_CHALLENGE,
        null,
        '',
        params?.challenge_id,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofdeleteChallenge', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofdeleteChallenge', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* exitChallenge() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.EXIT_CHALLENGE.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        EXIT_CHALLENGE,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofEXIT_CHALLENGE', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofEXIT_CHALLENGE', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getBusinessDashboardStats() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.BUSINESS_DASHBOARD_STATS.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        BUSINESS_DASHBOARD_STATS,
        null,
        '',
        '',
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofgetBusinessStats', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetBusinessStats', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getBusinessDashboardStatsDetails() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.BUSINESS_DASHBOARD_STATS_DETAILS.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        BUSINESS_DASHBOARD_STATS_DETAILS,
        null,
        '',
        '',
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofgetBusinessStatsDetails', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetBusinessStatsDetails', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getMyChallenges() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.MY_CHALLENGES.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        MY_CHALLENGES,
        null,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofgetMY_CHALLENGES', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofMY_CHALLENGES', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* postFeedBack() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.POST_FEEDBACK.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        POST_FEEDBACK,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofPOST_FEEDBACK', response);
        if (responseCallback) {
          responseCallback(true);
        }
        Util.DialogAlert(response.message, 'success');
      } else {
        console.log('errrorr-logged-POST_FEEDBACK');
      }
    } catch (error) {
      console.log('errorofPOST_FEEDBACK', error);
      Util.DialogAlert(error?.message);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getContent() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_CONTENT.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_CONTENT,
        null,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofGET_CONTENT', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofGET_CONTENT', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* createDiscussionGroup() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.CREATE_DISCUSSION_BOARD.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CREATE_DISCUSSION_BOARD,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofCreateDiscussionGroup', response);
        if (responseCallback) {
          responseCallback(true);
        }
        Util.DialogAlert(response.message, 'success');
      } else {
        console.log('errrorr-logged-createpost');
      }
    } catch (error) {
      console.log('errorofDiscussiongroup', error);
      Util.DialogAlert(error?.message);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getDiscussionsGroup() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_DISCUSSION_GROUP.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_DISCUSSION_GROUP,
        null,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofGET_DISCUSSION_GROUP', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofGET_DISCUSSION_GROUP', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getDiscussionsGroupById() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_DISCUSSION_GROUP_BY_ID.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_DISCUSSION_GROUP_BY_ID,
        null,
        '',
        params,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofGET_DISCUSSION_GROUP_BY_ID', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetGET_DISCUSSION_GROUP_BY_ID', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* updateDiscussionGroup() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.UPDATE_DISCUSSION_GROUP.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_DISCUSSION_GROUP,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofUPDATE_DISCUSSION_GROUP', response);
        if (responseCallback) {
          responseCallback(true);
        }
        Util.DialogAlert(response.message, 'success');
      } else {
        console.log('errrorr-logged-createpost');
      }
    } catch (error) {
      console.log('errorofUPDATE_DISCUSSION_GROUP', error);
      Util.DialogAlert(error?.message);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* removeParticipantsFromBoard() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.REMOVE_PARTICIPANT_FROM_BOARD.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        REMOVE_PARTICIPANT_FROM_BOARD,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofREMOVE_PARTICIPANT_FROM_BOARD', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofREMOVE_PARTICIPANT_FROM_BOARD', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* deleteDiscussionBoard() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.DELETE_DISCUSSION_BOARD.REQUEST,
    );
    console.log('parraaamns', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_DISCUSSION_BOARD,
        null,
        '',
        params,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofDELETE_DISCUSSION_BOARD', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofDELETE_DISCUSSION_BOARD', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
export default function* root() {
  yield fork(getRewardList);
  yield fork(createChallenge);
  yield fork(getChallengesList);
  yield fork(updateChallenge);
  yield fork(deleteChallenge);
  yield fork(getNearByBusiness);
  yield fork(exitChallenge);
  yield fork(getBusinessDashboardStats);
  yield fork(getBusinessDashboardStatsDetails);
  yield fork(getMyChallenges);
  yield fork(getChallengesListDetails);
  yield fork(postFeedBack);
  yield fork(getContent);
  yield fork(createDiscussionGroup);
  yield fork(getDiscussionsGroup);
  yield fork(getDiscussionsGroupById);
  yield fork(updateDiscussionGroup);
  yield fork(removeParticipantsFromBoard);
  yield fork(deleteDiscussionBoard);
}
