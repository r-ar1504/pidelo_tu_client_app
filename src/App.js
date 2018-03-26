import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Profile from './screens/Profile/Profile';

import Splash from './screens/Splash/Splash';
import Login from './screens/Login/Login';
import Search from './screens/Search/Search';
import Home,{HomeDrawer} from './screens/Home/Home';
// import Payment from './screens/Payment/Payment';
// import Register from './screens/Register/Register';
// import AllowLocation from './screens/Profile/AllowLocation';
// import VerificationCode from './screens/Register/VerificationCode';
// import Signup from './screens/Signup/Signup';
import SideMenu from './components/SideMenu/SideMenu'
import Maps from './components/Maps';


export default DrawerNavigator({
  Login: {
   screen: Login
 },
 Home:{
   screen: Home
 },
 Splash:{
     screen: Splash,
  },
  Search:{
      screen: Search,
   },
Profile:{
    screen: Profile,
 },
 Maps:{
     screen: Maps,
  }
},{
  initialRouteName: 'Splash',
  // contentComponent: SideMenu,
  drawerWidth: 250
});
