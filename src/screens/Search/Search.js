import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left, Radio, Icon } from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import{ StyleSheet, Text, View, Image, TextInput, BackHandler, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import Swiper from 'react-native-swiper';

import style from './SearchStyles';

export default class Search extends Component{
  constructor(props){
    super(props); 

    this.state = {   
      backgroundColorRestaurant: '#dbdbdb',
      backgroundColorMeal: '#dbdbdb',
      backgroundColorNear: '#dbdbdb',
      backgroundColorFood: '#dbdbdb',           
    }   
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);     
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  onSelect(index, selectedItem){
  switch (index) {
    case 0: {
      this.setState({backgroundColorRestaurant: '#11c0f6'})
      this.setState({backgroundColorMeal: '#dbdbdb'});
      this.setState({backgroundColorNear: '#dbdbdb'})
      this.setState({backgroundColorFood: '#dbdbdb'});            
    } break;
    case 1: {
      this.setState({backgroundColorMeal: '#11c0f6'})
      this.setState({backgroundColorRestaurant: '#dbdbdb'});
      this.setState({backgroundColorNear: '#dbdbdb'})
      this.setState({backgroundColorFood: '#dbdbdb'});
    } break;
    case 2: {
      this.setState({backgroundColorNear: '#11c0f6'})
      this.setState({backgroundColorRestaurant: '#dbdbdb'});
      this.setState({backgroundColorMeal: '#dbdbdb'})
      this.setState({backgroundColorFood: '#dbdbdb'});
    } break;
    case 3: {
      this.setState({backgroundColorFood: '#11c0f6'})
      this.setState({backgroundColorRestaurant: '#dbdbdb'});
      this.setState({backgroundColorMeal: '#dbdbdb'})
      this.setState({backgroundColorNear: '#dbdbdb'});
    } break;
  }
  
  alert(selectedItem);
}

  render(){
    return(
      <Container>
        <ImageBackground source={require('src/assets/images/background.png')} style={style.image}/>
        <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0}}>
          <View style={style.searchCont}>
            <FontIcon name="search" size={20} color="#999999" style={{ paddingLeft:40, paddingRight: 10}} />
            <TextInput maxLength={150} underlineColorAndroid={'transparent'} placeholder={"Busqueda"} style={style.searchInput}/>
          </View>
        </Header>        
        <Content padder style={{flex: 1}}>
          <RadioGroup onSelect = {(index, value) => this.onSelect(index, value)} size={15} style = {style.radioGroup}>
            <RadioButton value={'restaurants'} style={style.radioCont}>
              <View style={[style.radioButton, {backgroundColor: this.state.backgroundColorRestaurant}]}>
                <Image  style={{resizeMode:'center', width: 40, height:40}} source={require("src/assets/images/restaurants.png")} />
              </View>
            </RadioButton>

            <RadioButton value={'food'} style={style.radioCont}>
              <View style={[style.radioButton, {backgroundColor: this.state.backgroundColorMeal}]}>
                <Image  style={{resizeMode:'center', width: 40, height:40}} source={require("src/assets/images/food.png")} />
              </View>
            </RadioButton>

            <RadioButton value={'location'} style={style.radioCont}>
              <View style={[style.radioButton, {backgroundColor: this.state.backgroundColorNear}]}>
                <Image  style={{resizeMode:'center', width: 40, height:40, position: 'absolute'}} source={require("src/assets/images/location.png")} />
              </View>
            </RadioButton>

            <RadioButton value={'world'} style={style.radioCont}>
              <View style={[style.radioButton, {backgroundColor: this.state.backgroundColorFood}]}>
                <Image  style={{resizeMode:'center', width: 40, height:40, position: 'absolute'}} source={require("src/assets/images/world.png")} />
              </View>
            </RadioButton>
          </RadioGroup>
            <Swiper style={style.wrapper} height={390}>
            <View style={style.slide}>
              <View style={style.grid}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>                
              </View>
              <View style={style.grid}>
                  <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>              
              </View>
              <View style={style.grid}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>
              </View>
              <View style={style.grid}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>
              </View>
            </View>
            <View style={style.slide}>
              <View style={style.grid}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>
              </View>
              <View style={style.grid}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>
              </View>
              <View style={style.grid}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>
              </View>
              <View style={style.grid}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Restaurant');}}>
                  <Image source={require('src/assets/images/pizza.png')} style={style.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={style.infoCont}>
                  <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={require("src/assets/images/download.png")} /><Text style={style.description}>Pizza Grande con Jamón</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                  <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>30MIN</Text>
                </View>
              </View>
            </View>
            <View style={style.slide}>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/location.png")} />
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/world.png")} />                
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/restaurants.png")} />                
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/food.png")} />
              </View>
            </View>
          </Swiper>
          {/*<SwipeableParallaxCarousel
            data={datacarousel}
            parallax={true}
            titleColor={'#fff'}
            height={350}
            navigation={true}
            navigationColor={'#11c0f6'}
            navigationType={'dots'}
            onPress={(id) => {alert(JSON.stringify(id))}}
          />*/}
        </Content>
      </Container>
    );
  }
}

