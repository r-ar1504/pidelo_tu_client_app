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

import Logo from 'src/components/Logo';
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
        },
      });
    });
  }

	render() {
		return(
      <ScrollView contentContainerStyle={styles.contentContainer}>			
				<Form/>			
      </ScrollView>
			)
	}
}

const styles = StyleSheet.create({ 
  contentContainer: {
    flexGrow: 1,
  }
});
