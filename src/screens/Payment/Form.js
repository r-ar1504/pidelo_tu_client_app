import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Select, Option} from "react-native-chooser";


export default class Form extends Component {

  constructor(props){
    super(props)    
    this.state = {month : " ", year: " "}
  }

  month(value, label) {
    this.setState({month : value});
    
  }

  year(value, label) {
    this.setState({year : value});
  }

	render(){
		return(                       
		    <View style={styles.container}>
          <Text style={styles.MainText}>Forma de Pago</Text> 
          <View style={styles.inputContainer}>
            <FontAwesomeIcon size={20} name="credit-card" color="#fff" style={{padding: 5}}/>
            <Hoshi
				      style={styles.inputBox}
            	label={'Numero de tarjeta'}            	
				      labelStyle={{ color: 'white' }}
              borderColor={'#00caff'}                            
          	/>
            <FontAwesomeIcon size={20} name="cc-visa" color="#fff" style={{}}/>                              
  		    </View>
          <View style={styles.dateContainer}>
            <FontAwesomeIcon size={20} name="calendar" color="#fff" style={{padding: 5}}/>
            <Text style={styles.text}>Fecha exp.</Text>
          </View>
          <View style={styles.selectContainer}>
            <Select
              onSelect = {this.month.bind(this)}
              defaultText  = {this.state.month}
              style = {{borderWidth : 1, borderColor : "white", width: 150}}
              textStyle = {{color:'white'}}
              indicator={"down"}              
              indicatorColor={"white"}
            >
              <Option value = "01">01</Option>
              <Option value = "02">02</Option>
              <Option value = "03">03</Option>
              <Option value = "04">04</Option>
              <Option value = "05">05</Option>
              <Option value = "06">06</Option>
              <Option value = "07">07</Option>
              <Option value = "08">08</Option>
              <Option value = "09">09</Option>
            </Select>
            <Select
              onSelect = {this.year.bind(this)}
              defaultText  = {this.state.year}
              style = {{borderWidth : 1, borderColor : "white", width: 150, marginLeft:6}}
              textStyle = {{color:'white'}}
              indicator={"down"}              
              indicatorColor={"white"}
            >
              <Option value = "01">01</Option>
              <Option value = "02">02</Option>              
            </Select>
          </View>
          <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText} onPress={this.accept}>CONTINUAR</Text>
         </TouchableOpacity> 
      </View>     
		)
	}
}

const styles = StyleSheet.create({  
  container : {
    flex: 1,    
    alignItems:'flex-start',
    flexDirection:'column'
  },   
  inputBox: {
    width:300,    
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,  
  },  
  inputContainer: {    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',      
    marginTop:46 
  },
  dateContainer: {    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',  
    marginTop:26  
  },
  selectContainer: {    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',  
    marginTop:16  
  },
  contentContainer: {
    flexGrow: 1,
  },
  text: {        
    color:'white'
  },
  MainText: {    
    fontSize:20,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',
    marginTop:40,        
  }, 
  button: {
    alignItems:'center',
    justifyContent :'center',    
    width:300,
    backgroundColor:'#00caff',           
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
