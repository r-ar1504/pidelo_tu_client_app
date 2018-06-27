import React, { Component } from 'react';
import { View, BackHandler, ActivityIndicator, ImageBackground, } from 'react-native';
import styles from './LoadingScreenStyle';

export default class LoadingScreen extends Component {
    constructor(props){
      super(props);
    }

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);       
    }
    
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }
    
    onBackButtonPressAndroid = () => {
      return true;
		};  
		
		render(){
			return (
				<View style={styles.container}>					
          <ImageBackground source={require('src/assets/images/bg.png')} style={styles.body}>
            <ActivityIndicator size={50} color="#fff" animating={true} style={styles.logo}/>
          </ImageBackground>                  	
				</View>
			)
		}
}