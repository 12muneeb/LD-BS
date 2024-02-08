import {
  CURRENTUSERPROFILE,
  ISUSERLOGIN,
  CURRENTLOGINUSERINFO,
  USERLOGINDATA,
  USERLOGINTOKEN,
  USERLOGOUT,
  VERIFY_POPUP
} from '../../constants';

const INITIAL_STATE = {
  isUserLogin: false,
  user: null,
  userToken: null,
  currentUserProfile: {},
  verificationPopUp:false,
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENTUSERPROFILE:
      return {
        ...states,
        currentUserProfile: action.payload,
      };
    case ISUSERLOGIN:
      return {
        ...states,
        isUserLogin: action.payload,
      };
    case CURRENTLOGINUSERINFO:
      return {
        ...states,
        user: action.payload,
      };
    case USERLOGINDATA:
      return {
        ...states,
        user: action.payload,
        isUserLogin: true,
      };
    case USERLOGINTOKEN:
      return {
        ...states,
        userToken: action.payload,
      };
      case VERIFY_POPUP:
        return {
          ...states,
          verificationPopUp: action.payload,
        };
    case USERLOGOUT:
      return {
        ...states,
        user: null,
        userToken: null,
        isUserLogin: false,
        currentUserProfile: {},
      };
    default:
      return states;
  }
};
