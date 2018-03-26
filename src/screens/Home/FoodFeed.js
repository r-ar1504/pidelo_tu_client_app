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
					<View style={styles.food_banner}>
						<Image source={require('src/assets/images/food1.jpeg')} style={styles.big_food}/>
					</View>
					<View style={styles.food_mini}>
					<Image source={require('src/assets/images/food2.png')} style={styles.food_img}/>
					<Image source={require('src/assets/images/food3.png')} style={styles.food_img}/>
					</View>
				</View>
		);
	}
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
	feed_container:{
		marginTop:15,
		width: window.width*.90,
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
		resizeMode: 'stretch',
		height: 400
	},
	food_mini:{
		flexDirection: 'column',
		height: 400,
		width: '50%',
	},
	food_img:{
		width: '100%',
		resizeMode: 'cover',
		height: 200,
		marginTop: 5,
		marginBottom: 5

	}

});
