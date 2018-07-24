import React, { Component } from 'react';
import { Alert, Text, View, Image, BackHandler, TextInput, TouchableOpacity, ImageBackground, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right } from 'native-base';
import style from './MealStyle';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import CheckBox from 'react-native-checkbox-heaven'

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const tempArray = [];
const Ctotal = 0;
export default class MealSelected extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);   

    this.state = {
      number: 1,
      user:firebase.auth().currentUser,
      meal:JSON.parse(this.props.meal),                  
      loading: false,       
      total: 0,  
      price: 0,
      subtype: 0,
      ingredients: []                
    }
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);      
    
    let { meal } = this.state
    if (!meal.price) {
      Ctotal = meal.sub_type[0].price;
      this.setState({total: Ctotal, price: Ctotal, subtype: meal.sub_type[0].id })      
    }
    else {
      Ctotal = meal.price;
      this.setState({total: Ctotal, price: Ctotal});      
    }         
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {        
    return true;
  }

  IncrementItem = () => {
    let { price, number, } = this.state;
    const total = price * (number + 1);
    this.setState({ number: number + 1, total: total });
    tempArray = [];
    Ctotal = total;
  }
  DecreaseItem = () => {
    let { price, number } = this.state;
    if (number > 1) {
      const total = price * (number - 1);
      this.setState({ number: number - 1, total: total});
      Ctotal = total;
    }
    tempArray = [];    
  }

  onSelect(index, selectedItem){    
    Ctotal = (selectedItem.price * this.state.number);
    this.setState({total:Ctotal, price: selectedItem.price, subtype: selectedItem.id});
    tempArray = [];    
  }

  onClick = (item) => {   
    if (!tempArray.includes(item.name)) {
      tempArray.push(item.name);
      Ctotal = Ctotal + item.price;
    }
    else {
      let index = tempArray.indexOf(item.name);
      tempArray.splice(index,1);   
      Ctotal = Ctotal - item.price;    
    }    
  }  

  async accept(){      
    this.setState({loading: true});
    this.store().then(async (response) => { 
      this.setState({loading:false});  
      await AsyncStorage.setItem('restaurant',this.props.restaurant.toString());          
      Alert.alert("Pídelo Tú","Se a agregado tu pedido al carrito, ¿Deseas seguir comprando?",[
        {text: 'Sí', onPress: () => {this.props.dismissMeal()}},
        {text: 'Finalizar compra', onPress: () => {this.props.cart()}}
      ],{cancelable: false});                       
    }).catch(error => {
      this.setState({loading: false});
      Alert.alert("Pídelo Tú",error.message);
    });  
    /*
    let restaurant = await AsyncStorage.getItem('restaurant')
    let array = JSON.parse(await AsyncStorage.getItem('cart'))
    let { meal, user, number, subtype }  = this.state;
    if (restaurant == null) {
      this.store().then(async (response) => { 
        this.setState({loading:false});  
        await AsyncStorage.setItem('restaurant',this.props.restaurant.toString());          
        Alert.alert("Pídelo Tú","Se a agregado tu pedido al carrito, ¿Deseas seguir comprando?",[
          {text: 'Sí', onPress: () => {this.props.dismissMeal()}},
          {text: 'Finalizar compra', onPress: () => {this.props.cart()}}
        ],{cancelable: false});                       
      }).catch(error => {
        this.setState({loading: false});
        Alert.alert("Pídelo Tú",error.message);
      });  
    }
    else {
      if (restaurant == this.props.restaurant.toString()) {
        this.store().then(async (response) => {  
          this.setState({loading:false}); 
          let i = array.id  
          let data = { id:i+1,meal_id:meal.id,user_id:user.uid,total:Ctotal,quantity:number,description:meal.description,sub_type_id:subtype,ingredients:JSON.stringify(tempArray)}
          array.push(data)
          await AsyncStorage.removeItem('cart')
          await AsyncStorage.setItem('cart',JSON.stringify(array))
          Alert.alert("Pídelo Tú","Se a agregado tu pedido al carrito, ¿Deseas seguir comprando?",[
            {text: 'Sí', onPress: () => {this.props.dismissMeal()}},
            {text: 'Finalizar compra', onPress: () => {this.props.cart()}}
          ],{cancelable: false});                       
        }).catch(error => {
          this.setState({loading: false});
          Alert.alert("Pídelo Tú",error.message);
        }); 
      }
      else {
        Alert.alert("Pídelo Tú","Tienes elementos en tu carrito sin procesar debes finalizar la compra para poder agregar este elemento.",[
          {text: 'OK', onPress: () => {this.props.dismissMeal()}},
          {text: 'Ir al carrito', onPress: () => {this.props.cart()}}
        ],{cancelable: false});                       
      }
    }*/
                 
  }

  
  async store(){  
    let { meal, user, number, subtype }  = this.state;    
    return await fetch('http://pidelotu.azurewebsites.net/cart', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({                
        meal_id:meal.id,        
        user_id:user.uid,
        total:Ctotal,
        quantity:number,
        sub_type_id:subtype,
        ingredients:JSON.stringify(tempArray)                         
      })
    }).then(response => { return response.json()})
      .catch(error => {
        throw new Error(error.messages);
    });
  }

  renderImage(){
    let { meal } = this.state;
    if(meal.image){
      return <ImageBackground resizeMode="cover" source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+meal.image}} style={{ width: "100%", height: 120 }}>
              <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0, height: 120,flexDirection: 'row'}}>    
                <TouchableWithoutFeedback onPress={ () => {this.props.dismissMeal()}}>             
                  <Left style={{marginLeft:10, paddingTop: 10, alignItems:'flex-start'}}>                    
                    <FontIcon name="arrow-left" size={20} color="#fff"/>                                   
                  </Left>          
                </TouchableWithoutFeedback>
                <Right style={{paddingTop: 10, alignItems:'center'}}>                  
                  <Icon active name='time' style={{color:'white', fontSize: 25, alignSelf:'center'}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff', fontSize: 16, textAlign: 'center'}}>00:{meal.preparation_time}:00</Text>                  
                </Right>                  
              </Header> 
            </ImageBackground>    
    }
    else {
      return <ImageBackground resizeMode="cover" source={require('src/assets/images/ic.png')} style={{ width: "100%", height: 120 }}>
              <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0, height: 120}}>    
                <TouchableWithoutFeedback onPress={ () => {this.props.navigation.navigate('Home')}}>             
                  <Left style={{justifyContent:'center', alignItems:'flex-start'}}>
                    <View style={{marginLeft:10, flex: 1, paddingTop: 20, flexDirection:'row' }}>
                      <Icon name="arrow-back" style={{color:'white', fontSize: 25, alignSelf:'center'}} />                                  
                    </View>                        
                  </Left>          
                </TouchableWithoutFeedback>
                <Right style={{justifyContent:'center', alignItems:'flex-start'}}>
                  <View style={{marginLeft:10, flex: 1, paddingTop: 20, flexDirection:'row' }}>
                    <Icon active name='time' style={{color:'white', fontSize: 25, alignSelf:'center'}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff', fontSize: 16}}>00:{meal.preparation_time}:00</Text>
                  </View>                        
                </Right>                  
              </Header> 
            </ImageBackground>
    }
  }

  renderSubtypes() {
    let { meal } = this.state;
    if (meal.has_subtype != 0){
      return meal.sub_type.map((item,i) => {
        return (
          <RadioButton value={item} style={style.radioCont} key={item.id}>              
            <Text style={{color:'#fff', fontFamily: 'Lato-Light', textAlign:'center', fontSize: 16}}>{item.name}</Text>                           
          </RadioButton>
        )
      })
    }
  }

  renderIngredients() {
    let { meal,ingredients } = this.state;
    if (meal.has_ingredients != 0){
      return meal.ingredients.map((item,i) => {
        return (
        <View key={item.id} style={style.radioCont}>
         <CheckBox
          label={item.name}
          style={{padding:10, marginLeft:4}}
          labelStyle={{color:'#fff', fontFamily: 'Lato-Light', textAlign:'center', fontSize: 16, marginLeft: 4}}
          iconSize={20}
          iconName='matMix'          
          checkedColor='#11c0f6'
          uncheckedColor='white'
          onChange={this.onClick.bind(this,item)}
        />          
        </View>
        )
      })
    }
  }

  render(){
    
    const { meal, loading, number } = this.state;      
    if(loading) {
      return <LoadingScreen/>
    }  
       
    return(
		<Container>
        {this.renderImage()} 
                

        {/*<View style={style.meal} >
          {this.renderImage()}
    </View>*/}
      <ImageBackground source={require('src/assets/images/background.png')} resizeMode={'cover'} style={style.background}>
        <Content padder>
          <View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Bold', color:'#11c0f6', fontSize: 16}}>{meal.name}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Light', color:'#fff', flex:1, flexWrap: 'wrap', fontSize: 16}}>{meal.description}</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Bold', color:'#fff', fontSize: 16}}>${Ctotal}</Text>
            </View>
          </View>
          <View style={{width: "100%", backgroundColor: '#11c0f6', marginTop: 10}}>
            <View style={{flexDirection: 'row', paddingLeft: 10, alignItems:'flex-start'}}>
              <Text style={{color:'#ffffff', textAlign:'center', fontFamily: 'Lato-Light', alignSelf: 'center', fontSize: 16}}>Cantidad</Text>
              <TextInput style={style.input} placeholderTextColor="#fff" underlineColorAndroid="#fff" keyboardType='numeric' value={number.toString()} editable={false} ></TextInput>
              <TouchableOpacity style={style.button} onPress={this.IncrementItem}><Text style={style.text}>+</Text></TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={this.DecreaseItem}><Text style={style.text}>-</Text></TouchableOpacity>
            </View>
          </View>        
          {(meal.has_subtype == 1) ? <Text style={{color:'#fff', fontFamily: 'Lato-Light', marginTop:10, fontSize: 16}}>Elige la presentacion</Text> : <View/> }
          
          <RadioGroup onSelect = {(index, value) => this.onSelect(index, value)} selectedIndex={0} size={24} color={"white"} activeColor={"#11c0f6"}  style = {style.radioGroup}>
            {this.renderSubtypes()}                      
          </RadioGroup>

          {(meal.has_ingredients == 1) ? <Text style={{color:'#fff', fontFamily: 'Lato-Light', marginTop:10, fontSize: 16}}>Elige los ingredientes</Text> : <View/> }

          <View style={style.radioGroup}>
            {this.renderIngredients()}
          </View>
          <View style={{flexDirection: 'column', alignItems:'center', marginTop:50}}>
            <TouchableOpacity style={style.confirm} onPress={this.accept.bind(this)}><Text style={style.text}>ORDENAR</Text></TouchableOpacity>    
          </View>
        </Content> 
      </ImageBackground>       
		</Container>
    );
  }

}
