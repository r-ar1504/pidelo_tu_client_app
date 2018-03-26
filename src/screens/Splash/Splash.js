import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';



export default class Splash extends Component<{}> {
  static navigationOptions = {
    headerStyle:{
      display: 'none'
    }
  }
  constructor(props){
    super(props);
  }
  componentDidMount(){

    setTimeout(()=>{
      this.props.navigation.navigate('Login');
    },3000);

  }

	render(){
		return(
			<View style={styles.container} >
          <Image source={require('src/assets/images/bg.png')} style={styles.image} />
				  <Image style={styles.logo} source={require('src/assets/images/icon.gif')} style={{width: 50, height: 50}}/>
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
    resizeMode:'stretch',
  },
});
