import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.confirm = this.confirm.bind(this);
    this.state = {
      cca2: 'MX',
    };
  }

  onPressFlag() {
    //this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  confirm(){
    this.props.navigator.push({
        screen: 'register.modal',
        passProps:{
          text: 'Se ha enviado un código de verificación vía SMS a tu móvil',
          button:'Continuar',
          action: 'Verification'
        },
        navigatorStyle: {
          navBarHidden: true,
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.signupText}>REGISTRATE</Text>
        <View style={styles.inputBox}>
          <PhoneInput
          ref={(ref) => {
            this.phone = ref;
          }}
          //onPressFlag={this.onPressFlag}
          initialCountry='mx'
          pickerItemStyle={{fontSize:18, height:30}}
          textProps={{placeholder:'Numero', borderWidth:0.7, borderColor:'black', editable:false}}
          textStyle={{fontSize:18, height:30, textAlign:'center'}}
          style={{padding:20,marginTop:16,marginBottom:16, width:125}}
          diabled={true}
        />
        <TextInput
              style={{flex:1, borderColor: 'black', borderWidth: 0.7, width:100, height:30, fontSize:10 }}
              keyboardType="phone-pad"
            />
        </View>
        <Text style={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ex arcu, et scelerisque felis faucibus at. Aenean sit amet viverra mauris. Phasellus quis metus ac lectus ultrices lacinia sed ut tortor. Donec non dignissim metus, ac ornare augue. Aenean euismod velit nisl. Donec ullamcorper sagittis condimentum. Nullam pharetra lorem iaculis pharetra gravida. Nulla non pharetra ante. Aenean et libero dui. Nulla lacinia vestibulum ex sit amet elementum.</Text>
        <TouchableOpacity style={styles.button} onPress={this.confirm}>
            <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 60,
  },
  contentContainer: {
    flexGrow: 1,
  },
  signupText: {
    alignItems:'flex-start',
    justifyContent :'center',
    marginTop:16,
    fontSize:20,
    marginBottom:16
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
  },
  info: {
    flexGrow:1,
    fontSize:8,
    color:'gray',
    textAlign:'center'
  },
  inputBox: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent :'center',
    padding:20
  },
});
