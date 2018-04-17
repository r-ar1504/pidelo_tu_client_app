import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, View, Image, YellowBox, ActivityIndicator, Alert } from 'react-native';
import firebase from 'react-native-firebase';

export default class Splash extends Component<{}> {
  static navigationOptions = {
    headerStyle:{
      display: 'none'
    }
  }

  constructor(props){
    super(props);

    this. state = { authSubscription: null, user: null }

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
     'Warning: Failed prop type'
    ]);
  }

  componentDidMount(){
    setTimeout(()=>{
      this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
        if (user) {       
          this.props.navigation.navigate('Home');
        }
        else {
          this.props.navigation.navigate('Login');
        }
      });
    },3000);
  }
  componentWillUnmount() {
    this.authSubscription();
  }

	render(){    
		return(
			<View style={styles.container} >
          <Image source={require('src/assets/images/bg.png')} style={styles.image} />
				  {/*<Image style={styles.logo} source={require('src/assets/images/icon.gif')} style={{width: 75, height: 75}}/>*/}
          <ActivityIndicator size={50} color="white" />
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
    resizeMode:'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'center',
  },
});
