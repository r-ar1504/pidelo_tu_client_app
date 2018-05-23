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

const dat = new Date().toISOString().slice(0, 19).replace('T', ' ');

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
      user: "Rodolfo Ríos",
      meal_id: meal.id,
      category_id: meal.category_id,
<<<<<<< HEAD
      price: 125,
      coords: {},
      loading: false,
      total: meal.price,
      preparation_time: meal.preparation_time,
      image: meal.image,
      name: meal.name,
      description: meal.description,
      date: dat
    }

    alert(this.state.date)

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
=======
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
>>>>>>> cc443d9e0ab08bb583b8e79c6d36e8e0923bfb33
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

<<<<<<< HEAD
    this.setState({user: firebase.auth().currentUser});

     navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });

        },
      (error) => {
        alert(error.message);
      },
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
=======
    this.setState({ user: firebase.auth().currentUser });                               
>>>>>>> cc443d9e0ab08bb583b8e79c6d36e8e0923bfb33
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

<<<<<<< HEAD
  accept(meal){
    alert(meal)
    this.setState({loading: true});
    this.sendData(meal).then((response) => {
      this.setState({loading: false});
    })
  }


  sendData(){
    return fetch('http://pidelotu.azurewebsites.net/order', {
=======
  accept(region){            
    this.sendData(region).then((response) => {                  
      Alert.alert("Pídelo Tú","Tú pedido se a procesado con éxito, espera a que el restaurante tome tu orden" + moment().format());       
      this.props.navigation.navigate('Home', { user: this.state.user});
    });                 
  }

  
  sendData(region){    
    return fetch('http://10.33.216.46:8000/order', {
>>>>>>> cc443d9e0ab08bb583b8e79c6d36e8e0923bfb33
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        created_at: moment(),
        restaurant_id:this.state.restaurant,
        meal_id:this.state.meal_id,
        meal_category_id:this.state.category_id,
        user_id:this.state.user.uid,
        total:this.state.total,
<<<<<<< HEAD
        latitude:this.state.coords.latitude,
        longitude:this.state.coords.longitude,
        date: this.state.date
=======
        latitude:region.latitude,
        longitude:region.longitude
>>>>>>> cc443d9e0ab08bb583b8e79c6d36e8e0923bfb33
      })
    }).then(response => response.json())
      .then(json => {
        return json;
    }).catch((error) => {

      alert(JSON.stringify(error))
      return error;
    });
  }

  render(){
    const { params } = this.props.navigation.state;
<<<<<<< HEAD
    const meal = params ? params.meal : null;


    if(this.state.loading) {
        return(
          <View style={style.body}>
            <ActivityIndicator size={50} color="#11c0f6"/>
          </View>
        )
      }
=======
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
            <Mapa confirm={this.accept.bind(this)}/>
          </Modal> 
        )
      }    
>>>>>>> cc443d9e0ab08bb583b8e79c6d36e8e0923bfb33

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
<<<<<<< HEAD
            <TouchableOpacity style={style.confirm} onPress={this.accept.bind(this)}><Text style={style.text}>ORDENAR</Text></TouchableOpacity>
=======
            <TouchableOpacity style={style.confirm} onPress={()=>this.setState({allowLocation: true})}><Text style={style.text}>ORDENAR</Text></TouchableOpacity>    
>>>>>>> cc443d9e0ab08bb583b8e79c6d36e8e0923bfb33
          </View>
        </Content>
			</Container>
    );
  }

}
