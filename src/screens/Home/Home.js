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
    
    this.searchScreen = this.searchScreen.bind(this);

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
     'Warning: TouchableWithoutFeedback does not work well with Text children'
    ]);
  }
     
  openDrawer(user){      
    this.props.navigation.navigate('DrawerOpen', { user: user });
  }

  openRestaurant(){
    this.props.navigation.navigate('Restaurant');
  }

  searchScreen(){
    this.props.navigation.navigate('Search');
  }

  render(){
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    return(
        <Container>
          <Header style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', width: '100%'}}>
            <Left style={{ flex: 1 }} >
              <TouchableWithoutFeedback onPress={this.openDrawer.bind(this,user)}>
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

            <TouchableWithoutFeedback onPress={this.openRestaurant.bind(this)}>
            <Image source={require('src/assets/images/offer.jpg')} style={{ alignSelf: 'center', width: '90%',  height: 180 , marginTop: 10, resizeMode: 'stretch',}}/>
            </TouchableWithoutFeedback>
          </Content>
        </Container>
    );
  }
}
