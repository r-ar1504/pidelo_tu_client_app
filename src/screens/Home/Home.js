import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left} from 'native-base';
import{
StyleSheet,
Text,
View,
StatusBar ,
TouchableOpacity,
ScrollView,
BackHandler,
Image } from 'react-native';
import style from './HomeStyle';
import FoodFeed from './FoodFeed';
import SearchButton from './SearchButton';
import LeftTittleNav from './LeftTittleNav';
import RightTittleNav from './RightTittleNav';
import SideMenu from '../../components/SideMenu/SideMenu';
import Profile from '../Profile/Profile';

export default class Home extends Component{
  constructor(props){
    super(props);
    console.log(this.props.navigation);
  }

  render(){
    return(
        <Container>
          <Header style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', width: '100%'}}>
            <Left style={{ flex: 1 }}>
              <Image source={require('src/assets/images/menu.png')} style={{width: 30,  height: 30 }} onPress={()=>{
              this.props.navigation.navigate('DrawerToggle')}} />
            </Left>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
              <SearchButton />
            </Body>
            <Right style={{ flex: 1 }}>
              <RightTittleNav />
            </Right>

          </Header>
          <Content>
            <FoodFeed />

            <Image source={require('src/assets/images/offer.jpg')} style={{ alignSelf: 'center', width: '90%',  height: 200 , paddingTop: 10}}/>
          </Content>
        </Container>
    );
  }
}
