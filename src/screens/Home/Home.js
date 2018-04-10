import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left} from 'native-base';
import{
StyleSheet,
Text,
View,
StatusBar ,
TouchableOpacity,
TouchableWithoutFeedback,
ScrollView,
BackHandler,
Image,
YellowBox } from 'react-native';
import style from './HomeStyle';
import FoodFeed from './FoodFeed';
import SearchButton from './SearchButton';
import LeftTittleNav from './LeftTittleNav';
import RightTittleNav from './RightTittleNav';
import SideMenu from '../../components/SideMenu/SideMenu';
import Profile from '../Profile/Profile';

export default class Home extends Component{
  static navigationOptions = {
    gesturesEnabled: false,
    headerStyle:{
      display: 'none'
    }
  }
  constructor(props){
    super(props);
    console.log(this.props.navigation);

    this.openDrawer = this.openDrawer.bind(this);
    this.openRestaurant = this.openRestaurant.bind(this);
    this.searchScreen = this.searchScreen.bind(this);

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
     'Warning: TouchableWithoutFeedback does not work well with Text children'
    ]);
  }  

  openDrawer(){
    this.props.navigation.navigate('DrawerOpen');
  }

  openRestaurant(){
    this.props.navigation.navigate('Restaurant');
  }

  searchScreen(){
    this.props.navigation.navigate('Search');
  }

  render(){
    return(
        <Container>
          <Header style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', width: '100%'}}>
            <Left style={{ flex: 1 }} >
              <TouchableWithoutFeedback onPress={this.openDrawer}>
                <Image source={require('src/assets/images/menu.png')} style={{width: 30,  height: 30 }}  />
              </TouchableWithoutFeedback>
            </Left>
            <TouchableWithoutFeedback onPress={this.searchScreen}>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
              <SearchButton />
            </Body>
            </TouchableWithoutFeedback>
            <Right style={{ flex: 1 }}>
              <RightTittleNav />
            </Right>

          </Header>
          <Content>
            <FoodFeed />

            <TouchableWithoutFeedback onPress={this.openRestaurant}>
            <Image source={require('src/assets/images/offer.jpg')} style={{ alignSelf: 'center', width: '90%',  height: 200 , marginTop: 10}}/>
            </TouchableWithoutFeedback>
          </Content>
        </Container>
    );
  }
}
