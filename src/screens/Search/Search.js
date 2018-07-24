import React, { Component } from 'react';
import { Container, Header, Content, Left, Body, Item } from 'native-base';
import { Text, View, Image, TextInput, BackHandler, TouchableWithoutFeedback, ImageBackground, Alert, Dimensions } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import MealSelected from "../Meal/MealSelected";
import moment from "moment";
import style from './SearchStyles';
const { width } = Dimensions.get('window')
export default class Search extends Component{
  constructor(props){
    super(props); 

    this.state = {   
      backgroundColorRestaurant: '#dbdbdb',
      backgroundColorMeal: '#dbdbdb',
      backgroundColorNear: '#dbdbdb',
      backgroundColorFood: '#dbdbdb', 
      selectedItem:'' ,
      text:'',
      isFilter:false,
      editable:false,
      showMeal: false,
      not_working:false,
      restaurant: 0,
      meal:{},
      items:[]             
    }  
    
    this.search = this.search.bind(this);    
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);     
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  onSelect(index, selectedItem){
    switch (index) {
      case 0: {
        this.setState({backgroundColorRestaurant: '#11c0f6',backgroundColorMeal: '#dbdbdb',backgroundColorNear: '#dbdbdb',backgroundColorFood: '#dbdbdb'});           
      } break;
      case 1: {
        this.setState({backgroundColorMeal: '#11c0f6',backgroundColorRestaurant: '#dbdbdb',backgroundColorNear: '#dbdbdb',backgroundColorFood: '#dbdbdb'});      
      } break;
      case 2: {
        this.setState({backgroundColorNear: '#11c0f6',backgroundColorRestaurant: '#dbdbdb',backgroundColorMeal: '#dbdbdb',backgroundColorFood: '#dbdbdb'});      
      } break;
      case 3: {
        this.setState({backgroundColorFood: '#11c0f6',backgroundColorRestaurant: '#dbdbdb',backgroundColorMeal: '#dbdbdb',backgroundColorNear: '#dbdbdb'});      
      } break;    
    }    
    this.setState({selectedItem:selectedItem,isFilter:false,items:[],editable:true,text:''});
  }

  openRest(rest_data){
    this.props.navigation.navigate('Restaurant', {restaurant_data: rest_data});
  }  

  renderItems(){   
    const {items, selectedItem, not_working } = this.state; 
   
    if (!items.length) {
      return <View style={style.body}> 
              <Text style={[style.description,{color:'white'}]}>No hay elementos relacionados con tú búsqueda</Text>           
            </View>
    }    
    switch (selectedItem) {
        case 'restaurants':
        return items.map((item,i) => {        
          return (
              <View style={style.slide} key={item.id}>
                <View style={style.grid}>
                  <TouchableWithoutFeedback onPress={this.openRest.bind(this,item)}>
                    <Image source={{uri:'http://pidelotu.azurewebsites.net/images/logos/'+item.logo}} style={style.mealImg}/>
                  </TouchableWithoutFeedback>
                  <View style={style.infoCont}>
                    <Text style={style.description}>{item.name}</Text>
                  </View>
                </View>
              </View>
            )
                          
        })        
        case 'food':
        return items.map((item,i)=> {          
          return (
                <View style={style.slide} key={item.id}>                                          
                  <View style={style.grid}>                  
                    <TouchableWithoutFeedback onPress={this.openMeal.bind(this,item,item.restaurant_id,item.open_time,item.close_time,item.not_working)}>
                      <Image source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+item.image}} style={style.mealImg}/>
                    </TouchableWithoutFeedback>
                    <View style={style.infoCont}>
                      <Image  style={style.logo} source={{uri:'http://pidelotu.azurewebsites.net/images/logos/'+item.logo}} /><Text style={style.description}>{item.description}</Text>
                      <View style={{flexDirection:'row', alignItems:'flex-end', alignSelf: 'flex-end'}}>
                        <Icon active name='time' style={{color:'black', fontSize: 15}} /><Text style={{fontFamily: 'Lato-Light', color:'#000'}}>{item.preparation_time}MIN</Text>
                      </View>
                    </View>                  
                  </View>
                </View>
            )         
        })       
        case 'world': 
        return items.map((item,i)=> {         
          return (
                <View style={style.slide} key={item.id}>                                          
                  <View style={style.grid}>
                    <TouchableWithoutFeedback onPress={this.openRest.bind(this,item)}>
                      <Image source={{uri:'http://pidelotu.azurewebsites.net/images/restaurants/categories/'+item.dashboard_banner}} style={style.mealImg}/>
                    </TouchableWithoutFeedback>
                    <View style={style.infoCont}>
                      <Image  style={{resizeMode:'center', width: 35, height:35, marginLeft: 10}} source={{uri:'http://pidelotu.azurewebsites.net/images/logos/'+item.logo}} /><Text style={style.description}>{item.details}</Text>
                    </View>                  
                  </View>
                </View>
            )                    
        })                            
      }                     
  }

  openMeal(meal,restaurant,open_time,close_time,not_working){
    let now = moment(moment(),'hh:mm a');
    let before = moment(open_time,'hh:mm a');
    let after = moment(close_time,'hh:mm a');
    if(!not_working) {
      if (now.isBetween(before,after)) 
        this.setState({meal, showMeal: true, restaurant});      
      else { 
        this.setState({not_working:true});      
        Alert.alert("PídeloTú","El restaurante está cerrado ahora, abre a las " + before.format('hh:mm a'));      
      }
    }
    else { 
      this.setState({not_working:true});
      Alert.alert("PídeloTú","El restaurante no está recibiendo pedidos en este momento, por favor intente más tarde");      
    }
  }

  dismissMeal(){
    this.setState({showMeal:false});
  }

  cart(){
    this.setState({showMeal:false});
    this.props.navigation.navigate('CartShop');
  }

  async search(){ 
    this.setState({isFilter:true});  
    let url = 'http://pidelotu.azurewebsites.net/getMealsBy/' + this.state.selectedItem + '/' + this.state.text;    
      return await fetch(url)
            .then(response => {                                  
              return response.json();              
            }).catch(error => {              
              throw new Error(error.message);
            });                
  }

  render(){ 
    const { items,restaurant, meal, showMeal, isFilter, backgroundColorRestaurant, backgroundColorMeal, editable, text, backgroundColorNear, backgroundColorFood } = this.state;
    if (isFilter){
      return <LoadingScreen/>
    }
    if (showMeal) {
      return <MealSelected restaurant={restaurant} meal={JSON.stringify(meal)} dismissMeal={this.dismissMeal.bind(this)} cart={this.cart.bind(this)}/>
    }   
    return(
      <Container>
        <ImageBackground source={require('src/assets/images/background.png')} style={style.image}/>
        <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0, justifyContent: 'space-around', width: width, flexDirection: 'column'}}>
          <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback onPress={ () => {this.props.navigation.navigate('Home')}}>                         
              <View style={{marginLeft:10, paddingTop: 30}}>
                <Icon name="arrow-left" size={20} color="#fff"/>                               
              </View>                                    
          </TouchableWithoutFeedback>
          <Body style={{ flex: 1, marginLeft:10, paddingTop: 20 }}>
            <Item style={style.searchCont}>
              <Icon name="search" size={20} color="#999999" style={{marginLeft:80}}/>
              <TextInput editable={editable} maxLength={150} underlineColorAndroid={'transparent'} placeholder={"Busqueda"} value={text} onChangeText={(text) => {this.setState({text})}} style={style.searchInput} onSubmitEditing={() => {this.search().then((response) => {this.setState({items:response, isFilter:false}); }).catch((error) => { Alert.alert("PídeloTú",error.message) })}}/>
            </Item>
          </Body>
          </View>
          <View style={{flexDirection: 'row', width: width}}>
            <RadioGroup onSelect = {(index, value) => this.onSelect(index, value)} selectedIndex={0} size={15} style = {style.radioGroup}>
              <RadioButton value={'restaurants'} style={style.radioCont}>
                <View style={[style.radioButton, {backgroundColor: backgroundColorRestaurant}]}>
                  <Image  style={{resizeMode:'center', width: 40, height:40}} source={require("src/assets/images/restaurants.png")} />                
                </View>              
              </RadioButton>

              <RadioButton value={'food'} style={style.radioCont}>
                <View style={[style.radioButton, {backgroundColor: backgroundColorMeal}]}>
                  <Image  style={{resizeMode:'center', width: 40, height:40}} source={require("src/assets/images/food.png")} />
                </View>
              </RadioButton>

              <RadioButton value={'location'} style={style.radioCont}>
                <View style={[style.radioButton, {backgroundColor: backgroundColorNear}]}>
                  <Image  style={{resizeMode:'center', width: 40, height:40, position: 'absolute'}} source={require("src/assets/images/location.png")} />
                </View>
              </RadioButton>

              <RadioButton value={'world'} style={style.radioCont}>
                <View style={[style.radioButton, {backgroundColor: backgroundColorFood}]}>
                  <Image  style={{resizeMode:'center', width: 40, height:40, position: 'absolute'}} source={require("src/assets/images/world.png")} />
                </View>
              </RadioButton>
            </RadioGroup>
          </View>
        </Header>        
        <Content style={{flex: 1}}>          
          <Swiper style={style.wrapper} height={390} activeDotColor={'#11c0f6'} key={items.length}>
            {this.renderItems()}     
          </Swiper>          
        </Content>
      </Container>
    );
  }
}

