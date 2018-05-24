/*import React, { Component } from 'react';
import{
StyleSheet,
Text,
View,
StatusBar ,
TouchableOpacity,
ScrollView,
BackHandler,
Image,
Dimensions } from 'react-native';

export default class FoodFeed extends Component{
	render(){
		return(
				<View style={styles.feed_container}>
					<View style={styles.food_banner}>
						<Image source={require('src/assets/images/fresas.jpeg')} style={styles.big_food}/>
					</View>
					<View style={styles.food_mini}>
						<Image source={require('src/assets/images/salad-plate.jpeg')} style={styles.food_img1}/>
						<Image source={require('src/assets/images/food2.jpeg')} style={styles.food_img2}/>
					</View>
				</View>
		);
	}
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	feed_container:{
		marginTop:15,
		width: width*.90,
		height: 400,
		alignSelf: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap'
	},
	food_banner:{
		height: 400,
		width: '50%',
	},
	big_food:{
		width: (width*.90) / 2,
		resizeMode: 'stretch',
		height: 400,
		paddingBottom: 10
	},
	food_mini:{
		flexDirection: 'column',
		height: 400,
		width: (width*.90) / 2,
		paddingLeft: 10,
		paddingBottom: 10
	},
	food_img1:{
		width: '100%',
		resizeMode: 'stretch',
		height: 95,
		marginBottom: 5
	},
	food_img2: {
		width: '100%',
		resizeMode: 'stretch',
		height: 295,
		marginTop: 5
	}

});
*/
import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left} from 'native-base';
import{ StyleSheet, Text, View, StatusBar , TouchableOpacity, TouchableWithoutFeedback, ScrollView, BackHandler, Image, YellowBox , Dimensions} from 'react-native';

export default class FoodFeed extends Component{
  constructor(props){
    super(props);
    this.state = {
      restaurant_data: JSON.parse(this.props.restaurant)
    }//state    
  }//Constructor.

  componentWillMount(){
      this.setState({
        restaurantBanner: 'http://pidelotu.azurewebsites.net/images/restaurants/banners/' + this.state.restaurant_data.banner
      });
  }

  openDisc(){
  	this.props.openDisc();
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
            <TouchableOpacity onPress={this.openMeal.bind(this)}>
            	<Image source={require('src/assets/images/salad-plate.jpeg')} style={styles.food_img1}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openMeal.bind(this)}>
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
		height: 400,
		alignSelf: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',    	
	},
	food_banner:{
		height: 400,
		width: '50%',
	},
	big_food:{
		width: (width*.90) / 2,
		resizeMode: 'stretch',
  		height: 400,
		paddingBottom: 10
	},
	food_mini:{
		flexDirection: 'column',
  		height: 400,
		width: (width*.90) / 2,
		paddingLeft: 10,
		paddingBottom: 10
	},
	food_img1:{
		width: '100%',
		resizeMode: 'stretch',
		height: 95,
		marginBottom: 5
	},
	food_img2: {
		width: '100%',
		resizeMode: 'stretch',
		height: 295,
		marginTop: 5
	},	
	promo: {
    	alignSelf: 'center', 
    	width: width*.90,  
    	height: 180 , 
    	marginTop: 10, 
    	resizeMode: 'stretch',
  },
});