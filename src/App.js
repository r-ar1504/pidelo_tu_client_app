import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Profile from './screens/Profile/Profile';
import Splash from './screens/Splash/Splash';
import Login from './screens/Login/Login';
import Restaurant from './screens/Restaurant/Restaurant';
import Search from './screens/Search/Search';
import Home from './screens/Home/Home';
import Payment from './screens/Payment/Payment';
import Discounts from './screens/Discounts/Discounts';
import Register from './screens/Register/Register';
import AllowLocation from './screens/Register/AllowLocation';
import VerificationCode from './screens/Register/VerificationCode';
import Signup from './screens/Signup/Signup';
import SideMenu from './components/SideMenu/SideMenu'
import Maps from './components/Maps';


const HomeDrawer = DrawerNavigator({
  Home:{
    screen: Home,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false,
    })
  },
  Search:{
    screen: Search,
   },
  Profile:{
    screen: Profile,
  },
  Payment:{
    screen: Payment
  },
  Discounts:{
    screen: Discounts
  },
  Maps:{
   screen: Maps,
  },
  Restaurant:{
    screen: Restaurant
  },
},{
    contentComponent: SideMenu
  }
);

export default StackNavigator({
  HomeDrawer:{
    screen: HomeDrawer,
    navigationOptions: () => ({
      header: null,
    })
  },
  Login: {
   screen: Login
 },
 Splash:{
     screen: Splash,
  },
  Register:{
    screen: Register
  },
  AllowLocation:{
    screen: AllowLocation
  },
  VerificationCode:{
    screen: VerificationCode
  },
  Signup:{
    screen: Signup
  }
},
  {
  initialRouteName: 'Splash'
  }
);
