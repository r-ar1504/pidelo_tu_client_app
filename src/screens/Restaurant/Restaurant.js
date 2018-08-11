import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Left, Tabs, Tab, List, ListItem, Thumbnail, Button, Card, CardItem, Icon, ScrollableTab } from 'native-base';
import { Rating } from 'react-native-elements';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import styles from './RestaurantStyle';
import Swiper from 'react-native-swiper';
import{ Alert, YellowBox, Text, View, TouchableWithoutFeedback, BackHandler, Image, ImageBackground, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import MealSelected from "../Meal/MealSelected";
import moment from "moment";
import { URL } from "../../config/env";
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../assets/GlobalStyleSheet';
const { width } = Dimensions.get('window')
export default class Search extends Component{
  constructor(props){
    super(props);

    this.state = { items: [], meal:{}, loading: true, showMeal: false, restaurant_data:this.props.navigation.getParam("restaurant_data"), restaurant: 0, info: '', not_working:false }
        
    /*YellowBox.ignoreWarnings([
      "Warning: Can't call setState (or forceUpdate)"
    ])*/
        
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
        this.setState({info:'Abierto'});      
      else 
        this.setState({info:'Cerrado, abre a las '+ before.format('hh:mm a'), not_working:true});      
    }
    else 
      this.setState({info:'El restaurante no está recibiendo pedidos en este momento.', not_working:true})
    
    this.refreshData()
    this.setState({ banner:`${URL}/images/restaurants/banners/${restaurant_data.banner}`, 
                  logo:`${URL}/images/logos/${restaurant_data.logo}` })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack()
  };

  openDiscounts(){
    this.props.navigation.navigate('Discounts')
  }  

  dismissMeal(){
    this.setState({showMeal:false});
  }

  cart(){
    this.setState({showMeal:false});
    this.props.navigation.navigate('CartShop');
  }

  check(not_working,item,categories){
    if (not_working){
      Alert.alert("PídeloTú","El restaurante no está recibiendo pedidos en éste momento")
    }
    else {
      this.setState({meal:item, showMeal: true, restaurant:categories.restaurant_id});      
    }
  }

  refreshData(){
    this.getMeals().then((response) => {
      this.setState({items: response, loading: false});
    }).catch((error) => {
      this.setState({loading: false})
      Alert.alert("PídeloTú",error.message);
    });
  }

  renderMeals(){  
    let { items, not_working } = this.state;
    return items.map((categories, index) => { 
      if (categories.active != 0) {
        return (                
          <Tab heading={categories.name} key={categories.id} tabStyle={{backgroundColor:'white'}} activeTabStyle={{backgroundColor: '#11c0f6'}}>
            <List key={items.length}>
            {categories.meals.map((item,i) => {
              if (item.active != 0) {
                return (
                <ListItem key={item.id} thumbnail onPress={this.check.bind(this, not_working, item,categories)}>
                  <Left>
                    {this.renderImage(item.image,item.description)}                    
                  </Left>
                  <Body>
                    <Text style={[styles.description]} >{item.name}</Text>
                    <Text note numberOfLines={1} style={{fontFamily:'Lato-Regular'}}>{item.description}</Text>
                  </Body>
                  <Right>                    
                    <Text>${(item.price == null && item.has_subtype != 0) ? item.sub_type[0].price : item.price}</Text>                
                  </Right>                  
                </ListItem>     
                )
              }             
          })}             
          </List>            
        </Tab>                                                                                                                                                                      
        )
      }           
    })
  }//Render

  renderImage(image,description){
    if(image || image != 'null')      
      return <Thumbnail square source={{uri:URL+'/images/meals/'+image}}/>  
    else 
      return <Thumbnail square source={require('src/assets/images/ic.png')}/>    
  }

  async getMeals(){
    return await fetch(URL+'/restaurant_meals/' + this.state.restaurant_data.id)
      .then((response) => {                      
        return response.json();
      }).catch(error => {
        throw new Error(error.message)
      });
  }  

  render(){
    const { loading, showMeal, meal, restaurant, banner, logo, info, restaurant_data } = this.state;   
    if (showMeal) { 
      return <MealSelected banner={banner} restaurant={restaurant} meal={JSON.stringify(meal)} dismissMeal={this.dismissMeal.bind(this)} cart={this.cart.bind(this)}/> 
    }
    return(
      <Container style={{backgroundColor:'white'}}>       
        <ImageBackground resizeMode="cover" source={{uri:banner}}  style={{ width: "100%", height: 120, flexDirection:'row' }}>         
          <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0, height: 120}}>    
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
              <Left style={{flex: 1, alignItems:'flex-start', justifyContent:'flex-start'}}>              
                <Icon name="arrow-back" style={{color:'white', fontSize: 35, alignSelf:'center', }} />                                
              </Left>
            </TouchableOpacity>
            {/* <TouchableWithoutFeedback onPress={ () => {this.props.navigation.navigate('Home')}}>             
              <Left style={{flex: 1, justifyContent:'center', alignItems:'flex-start'}}>
                <View style={{marginLeft:10, flex: 1, paddingTop: 20, flexDirection:'row' }}>
                  <FontIcon name="arrow-left" size={20} color="#fff"/>                               
                </View>                        
              </Left>          
            </TouchableWithoutFeedback>                             */}
          </Header> 
        </ImageBackground>            
        <Content refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.refreshData.bind(this)}
              colors={[COLOR_PRIMARY,COLOR_SECONDARY]}
            />
          }>    
          <Card>
            <CardItem>
              <Left style={{flex:3, width:width}}>
                <Thumbnail source={{uri: logo}} />
                <Body>
                  <Text style={styles.restaurantTitle}>{restaurant_data.name}</Text>
                  <Text style={{fontFamily:'Lato-Regular',fontWeight:'bold', flex:3, flexWrap: 'wrap'}} note>{info}</Text>
                </Body>
              </Left>
              <Body/>
              <Right>
                <Rating                  
                  type="star"                  
                  startingValue={3.6}                
                  imageSize={20}
                  onFinishRating={this.ratingCompleted}                  
                />
              </Right>              
            </CardItem>
          </Card>           
          <Tabs renderTabBar={()=> <ScrollableTab />} tabBarUnderlineStyle={{opacity: 0}} locked={false} style={{backgroundColor:'white'}}>
            {
              this.renderMeals()
            }        
          </Tabs>
        </Content>
      </Container>
    );
  }
}
