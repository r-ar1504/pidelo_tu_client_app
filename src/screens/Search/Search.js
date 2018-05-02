import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left, Radio } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import{ StyleSheet, Text, View, Image, TextInput, BackHandler } from 'react-native';
import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import Swiper from 'react-native-swiper';

import style from './SearchStyles';

const datacarousel = [
  {
      "id": 339964,
      "title": "Valerian and the City of a Thousand Planets",
      "imagePath": "https://image.tmdb.org/t/p/w780/o6OhxtsgMurL4h68Uqei0aSPMNr.jpg",
  },
  {
      "id": 315635,
      "title": "Spider-Man: Homecoming",
      "subtitle": "Peter Parker is back home!",
      "imagePath": "https://image.tmdb.org/t/p/w780/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg",
  },
  {
      "id": 339403,
      "title": "Baby Driver",
      "subtitle": "More than just a trend",
      "imagePath": "https://image.tmdb.org/t/p/w780/xWPXlLKSLGUNYzPqxDyhfij7bBi.jpg",
  },
];

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
        <Image source={require('src/assets/images/background.png')} style={style.image}/>
        <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0}}>
          <View style={style.searchCont}>
            <Icon name="search" size={20} color="#999999" style={{ paddingLeft:10, paddingRight: 10}} />
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
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/restaurants.png")} />
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/food.png")} />                
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/location.png")} />                
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/world.png")} />
              </View>
            </View>
            <View style={style.slide}>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/world.png")} />
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/location.png")} />                
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/food.png")} />                
              </View>
              <View style={style.grid}>
                <Image  style={{resizeMode:'cover', width: 40, height:40}} source={require("src/assets/images/restaurants.png")} />
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

