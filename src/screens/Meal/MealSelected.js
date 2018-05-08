import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {  Text, View, Image, BackHandler, AsyncStorage, TextInput, TouchableOpacity, YellowBox} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import style from './MealStyle';

export default class Profile extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);

    this.state = { number: 1 }    

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);                              
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }  

  onBackButtonPressAndroid = () => {
    this.props.navigation.navigate('Restaurant');
  }

  IncrementItem = () => {    
    this.setState({ number: this.state.number + 1 });
  }
  DecreaseItem = () => {  
    if (this.state.number > 0) {
      this.setState({ number: this.state.number - 1 });
    }
  }

  render(){ 
    const { params } = this.props.navigation.state;
    const meal = params ? params.user : null; 

    return(
			<Container>        
        <Image source={require('src/assets/images/background.png')} style={style.background}/>
        <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
          <Left>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>                            
              <Icon name="arrow-back" style={{color:'white', fontSize: 25}} />
            </TouchableOpacity>
          </Left>
          <Body>
            
          </Body>
          <Right>
            <Icon active name='time' style={{color:'white', fontSize: 15}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>00:20:56</Text>           
          </Right>                       
        </Header> 

        <View style={style.meal} >
          <Image source={require('src/assets/images/meal-selected.png')} style={style.image}/>          
        </View>

        <Content padder>
          <View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#11c0f6'}}>Pizza Grande de Jamón</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Light', color:'#fff', flex:1, flexWrap: 'wrap'}}>Pizza Grande de Jamón de Pierna y queso a elegir</Text>              
              <Text style={{marginLeft: 180, fontFamily: 'Lato-Bold', color:'#fff', flex: 1}}>$97</Text>              
            </View>                    
          </View>
          <View style={{width: "100%", backgroundColor: '#11c0f6', marginTop: 10}}>
            <View style={{flexDirection: 'row', paddingLeft: 10, alignItems:'flex-start'}}>              
              <Text style={{color:'#ffffff', textAlign:'center', fontFamily: 'Lato-Light', alignSelf: 'center'}}>Cantidad</Text>   
              <TextInput style={style.input} placeholderTextColor="#fff" underlineColorAndroid="#fff" keyboardType='numeric' value={this.state.number.toString()} editable={false} ></TextInput>           
              <TouchableOpacity style={style.button} onPress={this.IncrementItem}><Text style={style.text}>+</Text></TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={this.DecreaseItem}><Text style={style.text}>-</Text></TouchableOpacity>        
            </View>
          </View>
          <View style={{flexDirection: 'column', alignItems:'center', marginTop:80}}>
            <TouchableOpacity style={style.confirm}><Text style={style.text}>ORDENAR</Text></TouchableOpacity>    
          </View>
        </Content>
			</Container>
    );
  }

}
