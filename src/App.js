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
import Register from './screens/Register/Register';
import AllowLocation from './screens/Register/AllowLocation';
import VerificationCode from './screens/Register/VerificationCode';
import Signup from './screens/Signup/Signup';
import SideMenu from './components/SideMenu/SideMenu'
import Maps from './components/Maps';
import Discounts from './screens/Discounts/Discounts';

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
<<<<<<< HEAD
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
  },
  Discounts: {
    screen: Discounts,
  }
},{
  initialRouteName: 'Discounts',
  // contentComponent: SideMenu,
  drawerWidth: 250
});
=======
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
>>>>>>> 0c49d72f81a64d562a65549b8e0ff6e3f4b0e23e
