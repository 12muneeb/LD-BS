// @app
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// drawerComponentt
import UserAppStack from '../drawer/appDrawer';
// @stack screens
import Home from '../../screens/Main/Home';
import ChallengesandPromotion from '../../screens/Main/ChallengesandPromotion';
import Settings from '../../screens/Main/Settings/Settings';
import DiscussionBoard from '../../screens/Main/DiscussionBoard';
import ConferenceCall from '../../screens/Main/ConferenceCall';
import LiveStreaming from '../../screens/Main/LiveStreaming';
import Feedback from '../../screens/Main/Feedback';
import AboutApp from '../../screens/Main/AboutApp';
import Notifications from '../../screens/Main/Notifications';
import EditProfile from '../../screens/Main/EditProfile';
import EmployeeDetail from '../../screens/Main/EmployeeDetails/EmployeeDetail';
import Chat from '../../screens/Main/Chat';
import Information from '../../screens/Main/Information';
import Participants from '../../screens/Main/Participants';
import ChallengesPromotionDetails from '../../screens/Main/ChallengesPromotionDetails';
import ChallengesPromotionEdit from '../../screens/Main/ChallengesPromotionEdit';
import NearbyBusinessDetail from '../../screens/Main/NearbyBusinessDetail';
import ChallengesPromotionCreate from '../../screens/Main/ChallengesPromotionCreate';
import ChallengesPromotionCompleted from '../../screens/Main/CompletedChallengesPromotion/CompletedChallengesPromotion';
import CallParticipants from '../../screens/Main/ConferenceCallParticipants/CallParticipants';
import AddUser from '../../screens/Main/AddUser';
import TeamProgress from '../../screens/Main/TeamProgress';
import TermsAndConditions from '../../screens/Main/TermsAndConditions';
import PrivacyPolicy from '../../screens/Main/PrivacyPolicy';
import CreateDiscussionBoard from '../../screens/Main/CreateDiscussionBoard';
import DiscussionBoardDetail from '../../screens/Main/DiscussionBoardDetail';
import EditDiscussionBoard from '../../screens/Main/EditDiscussionBoard';
const Stack = createNativeStackNavigator();

const AppNavigation = ({initialRoute}) => {
  return (
    <Stack.Navigator
      initialRouteName="UserAppStack"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureDirection: 'horizontal',
        gestureEnabled: false,
        animation: 'slide_from_right',
        animationDuration: 8000,
      }}>
      <Stack.Screen name="UserAppStack" component={UserAppStack} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ChallengesandPromotion"
        component={ChallengesandPromotion}
      />
      <Stack.Screen name="DiscussionBoard" component={DiscussionBoard} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ConferenceCall" component={ConferenceCall} />
      <Stack.Screen
        name="LiveStreaming"
        component={LiveStreaming}
        options={{
          bottomTab: {
            tabBarVisible: false, // Hide the entire bottom navigation bar for this screen
          },
        }}
      />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="AboutApp" component={AboutApp} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EmployeeDetail" component={EmployeeDetail} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Information" component={Information} />
      <Stack.Screen name="Participants" component={Participants} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="TeamProgress" component={TeamProgress} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="CreateDiscussionBoard" component={CreateDiscussionBoard} />
      <Stack.Screen name="DiscussionBoardDetail" component={DiscussionBoardDetail} />
      <Stack.Screen name="EditDiscussionBoard" component={EditDiscussionBoard} />

      <Stack.Screen
        name="NearbyBusinessDetail"
        component={NearbyBusinessDetail}
      />
      <Stack.Screen
        name="ChallengesPromotionCreate"
        component={ChallengesPromotionCreate}
      />

      <Stack.Screen
        name="ChallengesPromotionDetails"
        component={ChallengesPromotionDetails}
      />
      <Stack.Screen
        name="ChallengesPromotionEdit"
        component={ChallengesPromotionEdit}
      />
      <Stack.Screen
        name="ChallengesPromotionCompleted"
        component={ChallengesPromotionCompleted}
      />
      <Stack.Screen name="CallParticipants" component={CallParticipants} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
