import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
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
			<View style={styles.container}>
        <Image source={require('src/assets/images/background.png')} style={styles.image}/>        						
				<Form/>
         <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText} onPress={this.accept}>CONTINUAR</Text>
         </TouchableOpacity>            
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
  image:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    alignItems:'center',
    justifyContent :'center',    
    width:300,
    backgroundColor:'#00ffff',           
    paddingVertical: 13,
    marginTop: 20,    
    borderRadius:20,       
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },  
});
