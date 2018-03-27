import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
ScrollView,
BackHandler,
Image
} from 'react-native';

import Form from './Form';


 export default class Payment extends Component {

  constructor(props){
    super(props);

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

   render() {
    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
<<<<<<< HEAD
      <View style={styles.container}>
        <Image source={require('src/assets/images/background.png')} style={styles.image}/>                    
        <Form/>                    
      </View>
=======
			<View style={styles.container}>
        <Image source={require('src/assets/images/background.png')} style={styles.image}/>
				<Form/>
			</View>
>>>>>>> 0c49d72f81a64d562a65549b8e0ff6e3f4b0e23e
      </ScrollView>
    )
  }
 }

 const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  contentContainer: {
    flexGrow: 1,
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
