import React, { Component } from 'react';
import { Container, Header, Content, Icon } from 'native-base';
import { Text, View, Image, TextInput, BackHandler, TouchableWithoutFeedback, ImageBackground, Alert } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Swiper from 'react-native-swiper';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

import style from './SearchStyles';

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
      items:[]             
    }  
    
    this.search = this.search.bind(this);
    this.openMeal = this.openMeal.bind(this);
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

  openMeal(meal, restaurant, logo, name){        
    this.props.navigation.navigate('MealSelected', { meal: meal, restaurant_id: restaurant, logo: logo, name: name});
  }

  renderItems(){   
    const {items, selectedItem } = this.state; 
   
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
                    <TouchableWithoutFeedback onPress={() => {this.openMeal(item,item.restaurant_id,item.logo,item.restaurant)}}>
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
                    <TouchableWithoutFeedback onPress={() => {this.openRest(item,item.restaurant_id)}}>
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

  async search(){ 
    this.setState({isFilter:true});  
    let url = 'http://pidelotu.azurewebsites.net/getMealsBy/' + this.state.selectedItem + '/' + this.state.text;    
      return await fetch(url)
            .then(response => {                                  
              return response.json();              
            }).catch(error => {              
              throw new Error(error.messages);
            });                
  }

  render(){ 
    const { items, isFilter, backgroundColorRestaurant, backgroundColorMeal, editable, text, backgroundColorNear, backgroundColorFood } = this.state;
    if (isFilter){
      return <LoadingScreen/>
    }   
    return(
      <Container>
        <ImageBackground source={require('src/assets/images/background.png')} style={style.image}/>
        <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0}}>
          <View style={style.searchCont}>
            <FontIcon name="search" size={20} color="#999999" style={{ paddingLeft:40, paddingRight: 10}} />
            <TextInput editable={editable} maxLength={150} underlineColorAndroid={'transparent'} placeholder={"Busqueda"} value={text} onChangeText={(text) => {this.setState({text})}} style={style.searchInput} onSubmitEditing={() => {this.search().then((response) => {this.setState({items:response, isFilter:false}); }).catch((error) => { Alert.alert("Pídelo Tú",error.messages) })}}/>
          </View>
        </Header>        
        <Content padder style={{flex: 1}}>
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
          <Swiper style={style.wrapper} height={390} activeDotColor={'#11c0f6'} key={items.length}>
            {this.renderItems()}     
          </Swiper>          
        </Content>
      </Container>
    );
  }
}

