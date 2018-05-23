import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left} from 'native-base';
import{ StyleSheet, Text, View, StatusBar , TouchableOpacity, TouchableWithoutFeedback, ScrollView, BackHandler, Image, YellowBox , Dimensions} from 'react-native';

export default class RestaurantContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      restaurant_data: JSON.parse(this.props.restaurant)
    }//state

    this.openMeal = this.openMeal.bind(this);
  }//Constructor.

  componentWillMount(){

      this.setState({
        restaurantBanner: 'http://pidelotu.azurewebsites.net/images/restaurants/banners/' + this.state.restaurant_data.banner
      });
  }

  openRestaurant(){

  }

  openMeal(){
    this.props.openRest(this.state.restaurant_data)
  }

  render(){
      return(
        <View style={styles.feed_container}>
          <View style={styles.food_banner}>
            <Image source={{uri: this.state.restaurantBanner}} style={styles.big_food}/>
          </View>
          <View style={styles.food_mini}>
            <TouchableOpacity onPress={this.openMeal}>
            <Image source={require('src/assets/images/salad-plate.jpeg')} style={styles.food_img1}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openMeal}>
            <Image source={require('src/assets/images/food2.jpeg')} style={styles.food_img2}/>
            </TouchableOpacity>
          </View>
        </View>
      )
  }//Render.

}


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	feed_container:{
		marginTop:15,
		width: width*.90,
		height: 600,
		alignSelf: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',
    marginBottom: 25
	},
	food_banner:{
		height: 600,
		width: '50%',
	},
	big_food:{
		width: (width*.90) / 2,
		resizeMode: 'stretch',
  	height: 600,
		paddingBottom: 10
	},
	food_mini:{
		flexDirection: 'column',
  	height: 600,
		width: (width*.90) / 2,
		paddingLeft: 10,
		paddingBottom: 10
	},
	food_img1:{
		width: '100%',
		resizeMode: 'stretch',
		height: 195,
		marginBottom: 5
	},
	food_img2: {
		width: '100%',
		resizeMode: 'stretch',
		height: 395,
		marginTop: 5
	}

});
