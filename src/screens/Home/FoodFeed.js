import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left} from 'native-base';
import{ StyleSheet, Text, View, StatusBar , TouchableOpacity, TouchableWithoutFeedback, ScrollView, BackHandler, Image, YellowBox , Dimensions} from 'react-native';

export default class FoodFeed extends Component{
  constructor(props){
    super(props);
    this.state = {
			restaurant_data: JSON.parse(this.props.restaurant),
    }//state    
  }//Constructor.

  componentWillMount(){
      this.setState({
				restaurantBanner: 'http://pidelotu.azurewebsites.net/images/restaurants/banners/' + this.state.restaurant_data.banner,
				meal1: 'http://pidelotu.azurewebsites.net/images/meals/' + this.state.restaurant_data.meals[0],
				meal2: 'http://pidelotu.azurewebsites.net/images/meals/' + this.state.restaurant_data.meals[1],
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
						<TouchableOpacity onPress={this.openMeal.bind(this)}>
            	<Image source={{uri: this.state.restaurantBanner}} style={styles.big_food}/>
						</TouchableOpacity>
          </View>
          <View style={styles.food_mini}>            
            <Image source={{uri:this.state.meal1}} style={styles.food_img1}/>
            
            <Image source={{uri:this.state.meal2}} style={styles.food_img2}/>            
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
		height: height*.60,
		alignSelf: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',    	
	},
	food_banner:{
		height: height*.60,
		width: '50%',
	},
	big_food:{
		width: (width*.90) / 2,
		resizeMode: 'stretch',
  		height: height*.60,
		paddingBottom: 10
	},
	food_mini:{
		flexDirection: 'column',
  	height: height*.70,
		width: (width*.90) / 2,
		paddingLeft: 10,
		paddingBottom: 10
	},
	food_img1:{
		width: '100%',
		resizeMode: 'stretch',
		height: height*.25,
		marginBottom: height*.0125
	},
	food_img2: {
		width: '100%',
		resizeMode: 'stretch',
		height: height*.325,
		marginTop: height*.0125
	},	
});