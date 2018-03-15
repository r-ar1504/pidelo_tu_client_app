import React, { Component } from 'react';
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
import SideMenu from '../../components/SideMenu/SideMenu';


export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: true
    }
  }

  render(){
    return(

        <ScrollView>
          <View style={style.container}>

            <View style={style.food_feed}>
              <FoodFeed />
            </View>
            <View style={style.food_feed}>
              <FoodFeed />
            </View>
            <View style={style.food_feed}>
              <FoodFeed />
            </View>
            
          </View>
        </ScrollView>


    );
  }
}
