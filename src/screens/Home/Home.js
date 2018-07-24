import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Left, Footer } from 'native-base';
import { View, TouchableWithoutFeedback, Image, YellowBox, Alert, BackHandler, Dimensions, TouchableOpacity } from 'react-native';
import style from './HomeStyle';
import FoodFeed from './FoodFeed';
import SearchButton from './SearchButton';
import RightTittleNav from './RightTittleNav';
import OneSignal from 'react-native-onesignal';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import FooterTabs from "./FooterTabs";
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
    this.notifications = this.notifications.bind(this);

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
    this.getRestaurants().then((response) => {
      let resp = response;
        this.setState({
          restaurants: resp.restaurants
        });
        this.setState({loading: false});
    }).catch((error) => { Alert.alert("PídeloTú", error.message); this.setState({loading: false});});     
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

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

  notifications(){
    Alert.alert("PídeloTú","No hay notificaciones")
  }

  async getRestaurants(){
    return await fetch('http://pidelotu.azurewebsites.net/get_restaurants')
    .then( (response) => response.json() )
    .then( (json) =>{
      return json; 
    }).catch(error => {
      throw new Error(error.message);
    });
  }

  renderRestaurants(){
    const { restaurants } = this.state;
    if(restaurants != null) {
      return restaurants.map((restaurant, i) =>{
        return <FoodFeed key={restaurant.id} restaurant={JSON.stringify(restaurant)} openRest={this.openRestaurant}/>
      })      
    }    
  }

  render(){
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    const { loading, restaurants } = this.state
    if (loading){
      return <LoadingScreen/>
    }
    return(
        <Container>
          <Header style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', width: '100%'}}>
            <TouchableWithoutFeedback onPress={this.openDrawer.bind(this,user)}>                
              <Left style={{ flex: 1 }} >              
                <Image source={require('src/assets/images/menu.png')} style={{width: 30,  height: 30 }}  />                              
              </Left>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.searchScreen}>
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                <SearchButton />
              </Body>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.notifications}>
              <Right style={{ flex: 1 }}>
                <RightTittleNav />
              </Right>
            </TouchableWithoutFeedback>
          </Header>
          <Content>
            {this.renderRestaurants()}            
          </Content>
          <Footer>
            <FooterTabs restaurants={restaurants.length}/>
          </Footer>
        </Container>
    );
  }
}
