import React, { Component } from 'react';
import { StyleSheet, Image, YellowBox, BackHandler, View, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window')

export default class Splash extends Component {
  static navigationOptions = {
    headerStyle:{
      display: 'none'
    }
  }

  constructor(props){
    super(props);

    this. state = { authSubscription: null }          

    YellowBox.ignoreWarnings([
     'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader',      
    ]);
  }  

  onBackButtonPressAndroid = () => {
    return true;
  };

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid); 
    firebase.auth().languageCode = 'es-419';   
      this.authSubscription = firebase.auth().onAuthStateChanged((user) => {        
        if (user) {             
            this.props.navigation.navigate('Home',{user:user});                                                                                                                  
        }
        else {          
          this.props.navigation.navigate('Login');
        }
      });    
  }  

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);    
  }

	render(){    
		return(
      <View style={styles.container} >
        <Image resizeMode="cover" source={require('src/assets/images/bg.png')} style={styles.image} />
				<Image style={styles.logo} source={require('src/assets/images/ic.png')} style={{width: 105, height: 105}}/>          
  		</View>	
		)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  image:{
    flex:1,    
    position: 'absolute',
    width:    width,
    height: height,
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'center',
  },
});
