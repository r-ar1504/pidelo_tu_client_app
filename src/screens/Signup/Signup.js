import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from 'react-native';

import Logo from '../../components/Logo';
import Form from './Form';

export default class Signup extends Component<{}> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {        
        Navigation.startSingleScreenApp({
        screen: {
          screen: 'login.Login',
          navigatorStyle: {
          navBarHidden: true
          }    
        }
      });   
    });
  }

  goBack() {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'login.Login',
          navigatorStyle: {
          navBarHidden: true
          }    
        }
      });
  }

	render() {
		return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
			<View style={styles.container}>				
				<Form/>				
			</View>	
      </ScrollView>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'flex-start',
    flexDirection: 'column'
  },  
  contentContainer: {
    flexGrow: 1,        
  }  
});
