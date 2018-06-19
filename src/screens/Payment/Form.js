import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Content, Item, Label, Input, Icon, Footer, Picker } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import moment from 'moment';

import styles from './PaymentStyle'; 


export default class Form extends ValidationComponent {

  constructor(props){
    super(props)       
    this.state = { number: '', month : '', year: '', cv: '', cp: '', secure: true, eyeIcon: 'eye' }
  }

  confirm(number,month,year,cv,cp) {
    this.validate({
      number: { required: true, numbers: true },   
      month: { required: true },   
      year: { required: true },
      cv: { required: true, numbers: true },
      cp: { required: true, numbers: true }
    });

    if(this.isFormValid()){
      this.props.confirm(number);
    }
    else {
      Alert.alert("Pídelo Tú","Pequeño detalle, dejaste un campo vacío");
    }  
  }

  showCV(){
    if (this.state.secure){
      this.setState({ secure: false });
      this.setState({ eyeIcon: 'eye-off' });
    }
    else {
      this.setState({ secure: true });
      this.setState({ eyeIcon: 'eye' })
    }
  }

  month(){
    const items = []    
      for (let i = 1; i <= 12; i++) {
        if (items.length < 9) {
          items.push( 
            <Picker.Item label={"0"+i} value={i} key={i} />
          );
        }
        else {
          items.push( 
            <Picker.Item label={""+i} value={i} key={i} />
          );
        }        
      } 
      return items;  
  }

  years(){
    const years = []
    const currentYear = new Date();
    years.push(
        <Picker.Item label={""+moment(currentYear).year()} value={moment(currentYear).year()} key={0} />
      );
    for (let i = 1; i <= 10; i++) {
      years.push(
        <Picker.Item label={""+moment(currentYear).add(i,'year').year()} value={moment(currentYear).add(i,'year').year()} key={i} />
      );
    }    
    return years;
  }
  

	render(){
    const { number, month, year, cv, cp } = this.state;    

		return(                       
		    <View style={styles.container}>
          <Text style={styles.MainText}>Forma de Pago</Text> 
          <View style={styles.inputContainer}>
            <Item floatingLabel style={styles.inputBox}>                            
              <Label style={{marginLeft: 15, marginBottom: 8, color: 'white', fontFamily: 'Lato-Light'}}>Número de tarjeta</Label>              
              <Input style={styles.input} ref={(number) => this.number = number} onChangeText={(number) => { this.setState({number})}} value={this.state.number.toString()} keyboardType="phone-pad" maxLength={16}/>              
              <Icon active name='card' style={{color:'white'}} />              
            </Item>                                                     
            {/*<FontAwesomeIcon size={20} name="cc-visa" color="#fff" style={{marginTop: 20}}/>*/}              
  		    </View>
          <View style={styles.dateContainer}>
            <FontAwesomeIcon size={20} name="calendar" color="#fff" style={{padding: 5}}/>
            <Text style={styles.text}>Fecha exp.</Text>
          </View>
          <View style={styles.selectContainer}>
            <View style={{borderWidth : 1, borderColor : "white", width: 150 }}>
            <Picker iosHeader="Select one" mode="dropdown" style = {{backgroundColor: 'transparent', color:'white'}} selectedValue={this.state.month} onValueChange={(month) => {this.setState({month})}}>
              <Picker.Item label="" value="" />
              {this.month()}
            </Picker>
            </View>
            <View style={{borderWidth : 1, borderColor : "white", width: 150, marginLeft: 6 }}>            
            <Picker iosHeader="Select one" mode="dropdown" style = {{backgroundColor: 'transparent', color:'white' }} selectedValue={this.state.year} onValueChange={(year) => {this.setState({year})}}>
              <Picker.Item label="" value="" />
              {this.years()}
            </Picker>
            </View>  
          </View>
          <View style={styles.inputContainer}>
            <Item style={styles.inputB}>                                          
              <Input style={styles.inputText} ref={(cv) => this.cv = cv} onChangeText={(cv)=> {this.setState({cv});}} secureTextEntry={this.state.secure} placeholder='CV' placeholderTextColor='white' maxLength={3}/>
              <Icon active name={this.state.eyeIcon} style={{color:'white'}} onPress={this.showCV.bind(this)} />              
            </Item>                                                     
            <Item style={styles.inputB}>                                          
              <Input style={styles.inputText} ref={(cp) => this.cp = cp} onChangeText={(cp)=> {this.setState({cp});}} placeholder='Código Postal' placeholderTextColor='white' keyboardType="phone-pad" maxLength={5}/>               
            </Item>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this,number,month,year,cv,cp)}>
           <Text style={styles.buttonText}>CONTINUAR</Text>
         </TouchableOpacity> 
      </View>     
		)
	}
}

