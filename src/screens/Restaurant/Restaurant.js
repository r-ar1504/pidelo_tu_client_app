import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import style from './RestaurantStyle';
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
TextInput } from 'react-native';


export default class Search extends Component{
  constructor(props){
    super(props);
    console.log(this.props.navigation);

    this.openDiscounts = this.openDiscounts.bind(this);
  }

openDiscounts(){
  this.props.navigation.navigate('Discounts')
}
  render(){
    return(
      <Container>
        <Image source={require('src/assets/images/pizzaBack.jpg')} style={style.image}/>

        <Header
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            height: 50,
        }}>
          <Left style={{flex: 1}}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </Left>
          <Body style={{flex: 1}}>

          </Body>
          <Right style={{ flex: 1}}>
          <TouchableWithoutFeedback onPress={this.openDiscounts}>
            <Icon name="ticket" size={20} color="#fff" />
          </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginRight: 15,
          height:90
        }}>
          <Text style={{
            color: '#fff',
            opacity: 0.8,
            fontSize: 40,
            letterSpacing: 20,
            fontWeight: 'bold',
            marginRight: 10
          }}>PIZZA HUT</Text>
          <Image source={require('src/assets/images/pizzah.png')} style={{width:50, height:50, margin: 10}}/>
        </View>

        <View style={{
          marginTop: 20,
          width: '85%',
          alignSelf: 'center',
          margin: 5
        }}>
          <Text style={{
            color: '#000',
            fontSize: 20,
            letterSpacing: 20
          }}>Pizzas</Text>
        </View>
        <View style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Image source={require('src/assets/images/food2.jpg')} style={{width:150, height:150, margin: 10}}/>
          <Image source={require('src/assets/images/food2.jpg')} style={{width:150, height:150, margin: 10}}/>
        </View>


        <View style={{
          marginTop: 30,
          width: '85%',
          alignSelf: 'center',
          margin: 5
        }}>
          <Text style={{
            color: '#000',
            fontSize: 20,
            letterSpacing: 20
          }}>Appetizers</Text>
        </View>
        <View style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Image source={require('src/assets/images/boneless.jpg')} style={{width:150, height:150, margin: 10}}/>
          <Image source={require('src/assets/images/boneless.jpg')} style={{width:150, height:150, margin: 10}}/>
        </View>
        </Content>
      </Container>
    );
  }
}
