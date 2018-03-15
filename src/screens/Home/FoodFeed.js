import React, { Component } from 'react';
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
				<Image source={require('src/assets/images/food1.png')} style={styles.food_img}/>
				<Image source={require('src/assets/images/food2.png')} style={styles.food_img}/>
				<Image source={require('src/assets/images/food3.png')} style={styles.food_img}/>
				<Image source={require('src/assets/images/food4.png')} style={styles.food_img}/>
			</View>
		);
	}
}

const half_screen = Dimensions.get('window').width*.40;


const styles = StyleSheet.create({
	feed_container:{
		margin: 20,
		flexDirection: 'row',
		justifyContent: 'center', 
		flexWrap: 'wrap',
	},
	food_img:{
		width: half_screen,
		height: 150,
		resizeMode: 'contain',
		padding: 1

	}
});