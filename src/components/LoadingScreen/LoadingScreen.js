import React, { Component } from 'react';
import { View, BackHandler, ActivityIndicator, ImageBackground, } from 'react-native';
import styles from './LoadingScreenStyle';
import { COLOR_PRIMARY } from "../../assets/GlobalStyleSheet";
import { Spinner } from 'native-base';
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
          {/* <Spinner size="large" color={COLOR_PRIMARY} style={styles.logo}/>				           */}
          <ActivityIndicator size={50} color={COLOR_PRIMARY} style={styles.logo}/>
          {/* <ImageBackground source={require('src/assets/images/bg.png')} style={styles.body}>
            
          </ImageBackground>                  	 */}
				</View>
			)
		}
}