import React from 'react';
import { Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Item, Label, Input, Icon, Container } from 'native-base';
import { FONT_NORMAL } from 'src/assets/GlobalStyleSheet';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import styles from './PaymentStyle'; 


export default class Form extends ValidationComponent {

  constructor(props){
    super(props)       
    this.state = { number: '', month : '', year: '', cv: '', secure: true, eyeIcon: 'eye' }
  }

  confirm(number,month,year,cv) {
    this.validate({
      number: { required: true, numbers: true },   
      month: { required: true },   
      year: { required: true },
      cv: { required: true, numbers: true },      
    });

    if(this.isFormValid()){
      this.props.confirm(number,month,year,cv);
    }
    else {
      Alert.alert("PídeloTú","Pequeño detalle, dejaste un campo vacío");
    }  
  }

  showCV(){
    if (this.state.secure){
      this.setState({ secure: false , eyeIcon: 'eye-off' });
    }
    else {
      this.setState({ secure: true , eyeIcon: 'eye' })
    }
  }
   

	render(){
    const { number, month, year, cv, cp } = this.state;    
		return(                       
		  <Container>
        <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}>                   
          <View style={styles.inputContainer}>
            <Item floatingLabel style={styles.inputBox}>                            
              <Label style={{ marginBottom: 8, color:'white', fontFamily: FONT_NORMAL, fontSize: 16, marginLeft: 15 }}>Número de tarjeta</Label>              
              <Input style={styles.input} ref={(number) => this.number = number} onChangeText={(number) => { this.setState({number})}} value={this.state.number.toString()} keyboardType="phone-pad" maxLength={16}/>              
              <Icon active name='card' style={styles.icon} />              
            </Item>                                                                             
  		    </View>
          <View style={styles.dateContainer}>
            <FontAwesomeIcon size={20} name="calendar" color="#fff"/>
            <Text style={styles.text}>Fecha vencimiento</Text>
          </View>
          <View style={styles.selectContainer}>
            <View style={{width: 150 }}>
              <Item regular>
                <Input style={styles.text} placeholder='Mes' placeholderTextColor='white' ref={(month) => this.month = month} onChangeText={(month) => { this.setState({month})}} value={this.state.month.toString()} keyboardType="phone-pad" maxLength={2}/>              
              </Item>            
            </View>
            <View style={{width: 150, marginLeft: 6 }}>
              <Item regular>            
                <Input style={styles.text} placeholder='Año' placeholderTextColor='white' ref={(year) => this.year = year} onChangeText={(year) => { this.setState({year})}} value={this.state.year.toString()} keyboardType="phone-pad" maxLength={2}/>              
              </Item>            
            </View>  
          </View>
          <View style={styles.inputContainer}>
            <Item style={styles.inputB}>                                          
              <Input style={styles.inputText} ref={(cv) => this.cv = cv} onChangeText={(cv)=> {this.setState({cv});}} placeholder='CV' placeholderTextColor='white' keyboardType="phone-pad" maxLength={3}/>
              {/* <Icon active name={this.state.eyeIcon} style={styles.icon} onPress={this.showCV.bind(this)} />               */}
            </Item>                                                     
            {/* <Item style={styles.inputB}>                                          
              <Input style={styles.inputText} ref={(cp) => this.cp = cp} onChangeText={(cp)=> {this.setState({cp});}} placeholder='Código Postal' placeholderTextColor='white' keyboardType="phone-pad" maxLength={5}/>               
            </Item> */}
          </View>
          
          <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this,number,month,year,cv,cp)}>
           <Text style={styles.buttonText}>CONTINUAR</Text>
          </TouchableOpacity> 
        </ImageBackground>
      </Container>     
		)
	}
}

