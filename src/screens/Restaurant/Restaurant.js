import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RestaurantStyle';
import Swiper from 'react-native-swiper';
import{ Alert, YellowBox, Text, View, TouchableWithoutFeedback, BackHandler, Image, ImageBackground } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import MealSelected from "../Meal/MealSelected";
import moment from "moment";
export default class Search extends Component{
  constructor(props){
    super(props);

    this.state = { items: [], meal:{}, loading: true, showMeal: false, restaurant_data:this.props.navigation.getParam("restaurant_data"), restaurant: 0, info: '', not_working:false }
        
    YellowBox.ignoreWarnings([
      "Warning: Can't call setState (or forceUpdate)"
    ])
    
    this.openDiscounts = this.openDiscounts.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    let { restaurant_data } = this.state;    
    let now = moment(moment(),'hh:mm a');
    let before = moment(restaurant_data.open_time,'hh:mm a');
    let after = moment(restaurant_data.close_time,'hh:mm a');
    if(!restaurant_data.not_working) {
      if (now.isBetween(before,after)) 
        this.setState({info:'Abierto ahora'});      
      else 
        this.setState({info:'Cerrado ahora, abre a las '+ before.format('hh:mm a'), not_working:true});      
    }
    else 
      this.setState({info:'El restaurante no está recibiendo pedidos en este momento.', not_working:true})

    this.getMeals().then((response) => {
      this.setState({items: response, loading: false});
    }).catch((error) => {
      this.setState({loading: false})
      Alert.alert("Pídelo Tú",error.messages);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  openDiscounts(){
    this.props.navigation.navigate('Discounts')
  }

  openMeal(meal,restaurant){        
    this.setState({meal, showMeal: true, restaurant});
  }

  dismissMeal(){
    this.setState({showMeal:false});
  }

  cart(){
    this.setState({showMeal:false});
    this.props.navigation.navigate('CartShop');
  }

  renderMeals(){  
    let { items, not_working } = this.state;
    return items.map((categories, index) => {      
      return (
        <View key={categories.id}>
          <View style={styles.titleCont}>
            <Text style={styles.titleText}>{categories.name}</Text>
          </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'} key={items.length}> 
            {categories.meals.map((item,i) => {
              return (
            <View style={styles.slide} key={item.id}>
              <View style={styles.mealCont}>
                {(not_working) ? <View>{this.renderImage(item.image,item.description)}</View> : <TouchableWithoutFeedback onPress={this.openMeal.bind(this,item,categories.restaurant_id)}>{this.renderImage(item.image,item.description)}</TouchableWithoutFeedback> }                
                <View style={styles.infoCont}>
                  <Text style={styles.description}>{item.name}</Text><Text style={styles.price}>${(!item.price) ? item.sub_type[0].price : item.price}</Text>
                </View>
              </View>
            </View>
              )
            })}                                           
          </Swiper>        
        </View>
      )
    })
  }//Render

  renderImage(image,description){
    if(image){
      return <Image source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+image}} style={styles.mealImg}/>
    }
    else {
      return <Text style={styles.Textdescription}>{description}</Text>
    }
  }

  async getMeals(){
    return await fetch('http://pidelotu.azurewebsites.net/restaurant_meals/' + this.state.restaurant_data.id)
        .then((response) => {                      
        return response.json();
      }).catch(error => {
        throw new Error(error.messages)
      });
  }

  

  render(){
    const { loading, showMeal, meal, restaurant } = this.state;
    if(loading) {
      return <LoadingScreen/>
    }
    if (showMeal) {
      return <MealSelected restaurant={restaurant} meal={JSON.stringify(meal)} dismissMeal={this.dismissMeal.bind(this)} cart={this.cart.bind(this)}/>
    }
    return(
      <Container>       
        <ImageBackground source={{uri:'https://comojuega.files.wordpress.com/2013/11/hd-desktop-wallpaper-hd-dark-black-wallpapers-dark-black-wallpaper-dark-background-dark-wallpaper-23-1-1600x1000.jpg'}}  style={{ width: "100%", height: 90 }}>         
        <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0}}>                  
          <Left style={{flex: 1, paddingTop: 10, justifyContent:'center', alignItems:'flex-start'}}>
          <View style={{marginLeft:10}}>
            <Icon name="arrow-left" size={20} color="#fff" onPress={ () => {this.props.navigation.navigate('Home')}} />            
          </View>
          </Left>          
          <Right style={{ flex: 1, flexDirection:'row'}}>          
            <Text style={styles.restaurantTitle}>{this.state.restaurant_data.name}</Text>
            <Image source={{uri:'http://pidelotu.azurewebsites.net/images/logos/'+ this.state.restaurant_data.logo}} style={{width:50, height:50, padding: 10}}/>
          </Right>                   
        </Header> 
        </ImageBackground>            
        <Content>       
        <Text style={[styles.Textdescription,{marginTop:10}]}>{this.state.info}</Text>          
        {this.renderMeals()}        
        </Content>
      </Container>
    );
  }
}
