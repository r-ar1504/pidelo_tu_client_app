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
import RegisterForm from './screens/Register/Form';
import VerificationCode from './screens/Register/VerificationCode';
import SideMenu from './components/SideMenu/SideMenu';
import Maps from './components/Maps/Maps';
import Modal from './components/Modal';
import Orders from './screens/Orders/Orders';
import MealSelected from './screens/Meal/MealSelected';
import ActiveOrder from './screens/ActiveOrder/ActiveOrder';
import CartShop from './screens/CartShop/CartShop';

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
  ActiveOrder:{
    screen: ActiveOrder
  }, 
  Orders: {
    screen: Orders
  },
  MealSelected: {
    screen: MealSelected
  },
  CartShop: {
    screen: CartShop
  },
},{
    contentComponent: SideMenu,
    drawerBackgroundColor: 'rgba(0, 0, 0, 0)'
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
  VerificationCode:{
    screen: VerificationCode
  },  
  Modal: {
    screen: Modal
  },
  RegisterForm: {
    screen: RegisterForm
  },
},
  {
  initialRouteName: 'Splash'
  }
);
