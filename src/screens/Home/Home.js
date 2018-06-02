import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left} from 'native-base';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView, BackHandler, Image, YellowBox, AsyncStorage, ActivityIndicator } from 'react-native';
import style from './HomeStyle';
import FoodFeed from './FoodFeed';
import SearchButton from './SearchButton';
import LeftTittleNav from './LeftTittleNav';
import RightTittleNav from './RightTittleNav';
import SideMenu from '../../components/SideMenu/SideMenu';
import RestaurantContainer from '../../components/RestaurantContainer';
import Profile from '../Profile/Profile';
import OneSignal from 'react-native-onesignal';
import { SlidingPane, SlidingPaneWrapper } from 'react-native-sliding-panes';




export default class Home extends Component{
  static navigationOptions = {
    gesturesEnabled: false,
    headerStyle:{
      display: 'none'
    }
  }
  constructor(props){
    super(props);      
    
    this.searchScreen = this.searchScreen.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.renderRestaurants = this.renderRestaurants.bind(this);
    this.openRestaurant = this.openRestaurant.bind(this); 

    this.state = {
      restaurants: null, loading: true
    }    

     YellowBox.ignoreWarnings([
     'Warning: TouchableWithoutFeedback does not work well with Text children',
     'Warning: Cant call setState (or forceUpdate) on an unmounted component'
    ]);   
  }  

  componentWillMount(){
    OneSignal.sendTags({delivery_code: 'U10', user_type: 'client'});//Register tags for specific user. 
    this.getRestaurants();     
  }

  openDrawer(user){
    this.props.navigation.navigate('DrawerOpen', { user: user });
  }

  openRestaurant(rest_data){
    this.props.navigation.navigate('Restaurant', {restaurant_data: rest_data});
  }

  openDisc(){
    this.props.navigation.navigate('Discounts');
  }

  searchScreen(){
    this.props.navigation.navigate('Search');
  }

  getRestaurants(){
    fetch('http://pidelotu.azurewebsites.net/get_restaurants')
    .then( (response) => response.json() )
    .then( (response) =>{
        let resp = response;
        this.setState({
          restaurants: resp.restaurants
        });
        this.setState({loading: false});
    });
  }

  renderRestaurants(){
    if(this.state.restaurants != null) {
      return(
        this.state.restaurants.map((restaurant, i) =>{
          return(            
            <View key={restaurant.id}>
              <FoodFeed restaurant={JSON.stringify(restaurant)} openRest={this.openRestaurant}/>
              <TouchableWithoutFeedback onPress={this.openDisc.bind(this)}>         
                <Image source={require('src/assets/images/promo.jpg')} style={style.promo}/>             
              </TouchableWithoutFeedback>
            </View>
          )
        })
      )
    }    
  }

  render(){
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    if (this.state.loading){
      return (
        <View style={styles.body} >
          <Image source={require('src/assets/images/bg.png')} style={styles.image} />
				  <Image style={styles.logo} source={require('src/assets/images/ic.png')} style={{width: 105, height: 105}}/>          
  		  </View>	
      )
    }
    return(
        <Container>
          <Header style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', width: '100%'}}>
            <Left style={{ flex: 1 }} >
              <TouchableWithoutFeedback onPress={this.openDrawer.bind(this,user)}>
                <Image source={require('src/assets/images/menu.png')} style={{width: 30,  height: 30 }}  />
              </TouchableWithoutFeedback>
            </Left>
            <TouchableWithoutFeedback onPress={this.searchScreen}>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
              <SearchButton />
            </Body>
            </TouchableWithoutFeedback>
            <Right style={{ flex: 1 }}>
              <RightTittleNav />
            </Right>
          </Header>
          <Content>
            {this.renderRestaurants()}            
          </Content>
        </Container>
    );
  }
}
