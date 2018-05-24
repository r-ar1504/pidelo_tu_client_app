import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { Alert, Text, View, Image, BackHandler, AsyncStorage, TextInput, TouchableOpacity, YellowBox, ActivityIndicator, ImageBackground, Modal, Dimensions} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import style from './MealStyle';
import firebase from 'react-native-firebase';
import moment from 'moment';

import Mapa from '../../components/Maps/Maps';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MealSelected extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);

    const { params } = this.props.navigation.state;
    const meal = params ? params.meal : null;
    const restaurant = params ? params.restaurant_id : null;

    this.state = { 
      number: 1, 
      user: null, 
      meal_id: meal.id,
      category_id: meal.category_id,
      price: meal.price,       
      loading: false, 
      allowLocation: false,
      total: meal.price, 
      preparation_time: meal.preparation_time, 
      image: meal.image, 
      name: meal.name, 
      description: meal.description,
      restaurant: restaurant,     
    }        
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid); 

    this.setState({ user: firebase.auth().currentUser });                               
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }  

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  }

  IncrementItem = () => { 
    const price = this.state.price * (this.state.number + 1); 
    this.setState({ number: this.state.number + 1 });
    this.setState({ total: price});
  }
  DecreaseItem = () => {  
    if (this.state.number > 1) {      
      const price = this.state.price * (this.state.number - 1);
      this.setState({ number: this.state.number - 1 });
      this.setState({ total: price});
    }
  }

  async accept(region){
    this.setState({loading: true});            
    await this.sendData(region).then((response) => {                  
      Alert.alert("Pídelo Tú","Tú pedido se a procesado con éxito, espera a que el restaurante tome tu orden");       
      this.setState({loading: false});
      this.props.navigation.navigate('Home', { user: this.state.user});      
    }).catch(error => {
      this.setState({loading: false});
      Alert.alert("Pídelo Tú",error.message);
    });                 
  }

  
  sendData(region){    
    return fetch('http://pidelotu.azurewebsites.net/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({        
        restaurant_id:this.state.restaurant,
        meal_id:this.state.meal_id,
        meal_category_id:this.state.category_id,
        user_id:this.state.user.uid,
        total:this.state.total,
        latitude:region.latitude,
        longitude:region.longitude,
        created_at:moment().format("YYYY-MM-DD H:mm:ss")
      })
    }).then(response => response.json())
      .then(json => {
        return json;    
    }).catch((error) => {
      return error;
    });
  }

  render(){ 
    const { params } = this.props.navigation.state;
    const meal = params ? params.meal : null;         
    if(this.state.loading) {
      return(
        <Modal animationType="slide" transparent={true} visible={this.state.loading} onRequestClose={() => {console.log('close modal')}}>          
          <ImageBackground source={require('src/assets/images/bg.png')} style={style.body}>
            <Image source={require('src/assets/images/ic.png')} style={{width: 105, height: 105}}/>          
          </ImageBackground>          
        </Modal>
      )
    }  

    if(this.state.allowLocation) {
        return(    
          <Modal animationType="slide" transparent={true} visible={this.state.allowLocation} onRequestClose={() => {console.log('close modal')}}>
            <Mapa confirm={this.accept.bind(this)} goBack={() => {this.setState({allowLocation: false})}}/>
          </Modal> 
        )
      }    

    return(
			<Container>        
        <ImageBackground source={require('src/assets/images/background.png')} style={style.background}/>
        <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
          <Left>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Restaurant'); }}>                            
              <Icon name="arrow-back" style={{color:'white', fontSize: 25}} />
            </TouchableOpacity>
          </Left>
          <Body>
            
          </Body>
          <Right>
            <Icon active name='time' style={{color:'white', fontSize: 15}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>00:{this.state.preparation_time}:00</Text>           
          </Right>                       
        </Header> 

        <View style={style.meal} >
          <Image source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+this.state.image}} style={style.image}/>          
        </View>

        <Content padder>
          <View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#11c0f6'}}>{this.state.name}</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Light', color:'#fff', flex:1, flexWrap: 'wrap'}}>{this.state.description}</Text>              
              <Text style={{marginLeft: 180, fontFamily: 'Lato-Bold', color:'#fff', flex: 1}}>${this.state.total}</Text>              
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
            <TouchableOpacity style={style.confirm} onPress={()=>this.setState({allowLocation: true})}><Text style={style.text}>ORDENAR</Text></TouchableOpacity>    
          </View>
        </Content>
			</Container>
    );
  }

}
