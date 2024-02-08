import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BottomTabs} from '../tabs/BottomTabs';
import DrawerComp from '../../components/Drawer';
import DrawerCompRight from '../../components/DrawerRight';

import GroupChat from '../../screens/Main/GroupChat/GroupChat';
import {UseSelector, useDispatch, useSelector} from 'react-redux';
import {drawerPosition} from '../../redux/actions/appAction';
import GroupCall from '../../screens/Main/GroupCall';
const Drawer = createDrawerNavigator();

const UserAppStack = () => {
  const drawerPositions = useSelector(
    state => state?.appReducer?.drawerPosition,
  );
  console.log(
    '🚀 ~ file: appDrawer.js:12 ~ UserAppStack ~ drawerPositions:',
    drawerPositions,
  );
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerPosition: drawerPositions,
        drawerStyle: {
          width: drawerPositions ? '92%' : '80%',
          backgroundColor: 'transparent',
        },
      }}
      drawerContent={props =>
        drawerPositions === 'right' ? (
          <DrawerCompRight {...props} />
        ) : (
          <DrawerComp {...props} />
        )
      }
      initialRouteName={'Home'}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="GroupCall"
        component={GroupCall}
      />
    </Drawer.Navigator>
  );
};

export default UserAppStack;
