import React, { Component } from 'react';
import { YellowBox } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';

import {
StyleSheet,
Text,
View,
StatusBar ,
TouchableOpacity,
ScrollView,
BackHandler,
Image
} from 'react-native';

import Logo from '../../components/Logo';
import Form from './Form';
import Video from 'react-native-video';
import { Container, Header, Content, Item, Label, Input, Icon, Left, Right } from 'native-base';

 export default class Login extends Component {
   static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
   /*
   * Contructor , if a function other than render needs to use props it needs to be binded here.
   * example: this.signup = this.signup.bind(this); now signup can use props.navigator.
   */
  constructor(props){
    super(props);
    this.signup = this.signup.bind(this);
    this.register = this.register.bind(this);
    this.signIn = this.signIn.bind(this);

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
    ]);
  }
  /*
  * SignIn Function.
  * If user is valid, then initialize Home Screen.
  */
  signIn(){
      this.props.navigation.navigate('Home');
  }

  signup(){

  }

  register(){

  }

   render() {
		return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
			<View style={styles.container}>
        <Image source={require('src/assets/images/background.png')} style={styles.image}/>
				<Video
					source={require('src/video/video.mp4')}
          			rate={1.0}
          			volume={1.0}
          			muted={true}
          			resizeMode={"cover"}
					     repeat
          			style={styles.video}
        		/>
          <Logo/>                               		        
        <Container>          
          <Form/>       
        </Container>                      		         
			</View>
      </ScrollView>
		)
	}
 }

 const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:'#455a64',
    alignItems:'center',
    justifyContent :'center'
  },  
  contentContainer: {
    flexGrow: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }, 
  image:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },    
});
