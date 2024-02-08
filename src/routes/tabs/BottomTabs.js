import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/TabbarComponent';
import {colors} from '../../utils';
import Home from '../../screens/Main/Home';
import NearbyBusiness from '../../screens/Main/NearbyBusiness';
import Employees from '../../screens/Main/Employees';
import MyProfile from '../../screens/Main/MyProfile';
import GroupCall from '../../screens/Main/GroupCall';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: colors.gray},
        animation: 'simple_push',
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={'Dashboard'}>
      <Tab.Screen name="Dashboard" component={Home} />
      <Tab.Screen name="NearbyBusiness" component={NearbyBusiness} />
      <Tab.Screen name="Employees" component={Employees} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
      {/* <Tab.Screen name="GroupCall" component={GroupCall} /> */}
    </Tab.Navigator>
  );
};
