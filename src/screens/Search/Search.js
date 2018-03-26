import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import{
StyleSheet,
Text,
View,
StatusBar ,
TouchableOpacity,
ScrollView,
BackHandler,
Image,
TextInput } from 'react-native';


export default class Search extends Component{
  constructor(props){
    super(props);
    console.log(this.props.navigation);
  }

  render(){
    return(
      <Container>
        <Image source={require('src/assets/images/background.png')} style={style.image}/>

        <Header
          style={{
            backgroundColor: 'transparent',
            elevation: 0
          }}>
        </Header>
        <Content>
          <View style={{
            alignSelf: 'center',
            backgroundColor: '#dbdbdb',
            width: '80%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
          }}>
            <Icon name="search" size={20} color="#999999" style={{ paddingRight:10}} />
            <TextInput
              editable = {true}
              maxLength = {150}
              underlineColorAndroid = {'transparent'}
              placeholder = {"Busqueda"}
              style={{
                width: 150,
                borderBottomWidth: 0,
              }}
            />
          </View>
          <View style={{
            alignSelf: 'center',
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
          }}>
            <View style={{
              width: 60,
              height: 60,
              marginTop: 10,
              margin: 5,
              borderRadius: 50,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/restaurants.png")} />
            </View>
            <View style={{
              width: 60,
              height: 60,
              marginTop: 10,
              margin: 5,
              borderRadius: 50,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/food.png")} />
            </View>
            <View style={{
              width: 60,
              height: 60,
              marginTop: 10,
              margin: 5,
              borderRadius: 50,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/location.png")} />
            </View>
            <View style={{
              width: 60,
              height: 60,
              marginTop: 10,
              margin: 5,
              borderRadius: 50,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/world.png")} />
            </View>
          </View>
          <View style={{
            alignSelf: 'center',
            width: '90%',

            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
          }}>
            <View style={{
              width:  150,
              height: 150,
              marginTop: 10,
              margin: 10,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/restaurants.png")} />
            </View>
            <View style={{
              width: 150,
              height: 150,
              marginTop: 10,
              margin: 10,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/food.png")} />
            </View>
            <View style={{
              width: 150,
              height: 150,
              marginTop: 10,
              margin: 10,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/location.png")} />
            </View>
            <View style={{
              width: 150,
              height: 150,
              marginTop: 10,
              margin: 10,
              backgroundColor: '#dbdbdb',
              justifyContent: 'center',
               alignItems:'center'
            }}>
            <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/world.png")} />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const style = StyleSheet.create({
  image:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
});
