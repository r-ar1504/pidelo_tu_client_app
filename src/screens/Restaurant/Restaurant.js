import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Left, Tabs, Tab, List, ListItem, Thumbnail, Button, Card, CardItem, Icon, ScrollableTab } from 'native-base';
// import { Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import styles from './RestaurantStyle';
import{ Alert, YellowBox, Text, View, TouchableWithoutFeedback, BackHandler, Image, ImageBackground, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import MealSelected from "../Meal/MealSelected";
import moment from "moment";
import firebase from "react-native-firebase";
import { URL } from "../../config/env";
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../assets/GlobalStyleSheet';
const { width } = Dimensions.get('window')
export default class Search extends Component{
  constructor(props){
    super(props);

    this.state = { items: [], meal:{}, loading: true, showMeal: false, scrollY:this.props.navigation.getParam("scrollY"), restaurant_data:this.props.navigation.getParam("restaurant_data"), restaurant: 0, info: '', not_working:false, starCount: 0 }
            
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
                  logo:`${URL}/images/logos/${restaurant_data.logo}`, starCount: restaurant_data.ranking })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.navigate('Home', { scrollY: this.state.scrollY})
  };
  
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

  ratingCompleted(rating) {
    const { restaurant_data } = this.state
    this.rateRestaurant(restaurant_data, rating).then(ok => {
      this.setState({ starCount: rating });
      Alert.alert("PídeloTú",ok.message)
      // console.warn(ok)
    }).catch(error => {
      Alert.alert("Error",error.message)
    })
  }
  
  async rateRestaurant(restaurant_data, rating){    
    return await fetch(`${URL}/rate_restaurant`,{
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        'restaurant_id':restaurant_data.id,
        'firebase_id':firebase.auth().currentUser.uid,
        'rate':rating
      })
    }).then(response => {
      return response.json()
    }).catch(err => {
      throw new Error(err.message)
    })
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
                    <Text>${(item.is_combo) ? item.price : (!item.price && item.has_subtype) ? item.sub_type[0].price : item.price }</Text>                
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

  renderImage(image){
    if(image != 'null')      
      return <Thumbnail square source={{uri:URL+'/images/meals/'+image}}/>  
    else 
      return <Thumbnail square source={require('../../assets/images/ic.png')}/>    
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
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home', { scrollY: this.state.scrollY}) }}>
              <Left style={{flex: 1, alignItems:'flex-start', justifyContent:'flex-start', paddingTop:20, marginLeft:10}}>              
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
              <Body>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.ratingCompleted(rating)}
                  starSize={20}
                  fullStarColor={'yellow'}
                />
                {/* <Rating                  
                    type="star"                  
                    startingValue={restaurant_data.ranking}                
                    imageSize={20}
                    onFinishRating={}                  
                  /> */}
              </Body>
              <Right>

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
