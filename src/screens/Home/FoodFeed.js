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
