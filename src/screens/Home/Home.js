import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Left, Footer, Icon } from 'native-base';
import { View, TouchableWithoutFeedback, Image, YellowBox, Alert, BackHandler, Dimensions, TouchableOpacity, PermissionsAndroid, RefreshControl } from 'react-native';
import style from './HomeStyle';
import FoodFeed from './FoodFeed';
import SearchButton from './SearchButton';
import RightTittleNav from './RightTittleNav';
import OneSignal from 'react-native-onesignal';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import FooterTabs from "./FooterTabs";
import { SlidingPane, SlidingPaneWrapper } from 'react-native-sliding-panes';
import { URL } from "../../config/env";
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../assets/GlobalStyleSheet';

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
      restaurants: [], loading: true
    }    

     YellowBox.ignoreWarnings([
     'Warning: TouchableWithoutFeedback does not work well with Text children',
     "Warning: Can't call setState (or forceUpdate) on an unmounted component"
    ]);   
  } 
    
  componentWillMount(){
    OneSignal.sendTags({delivery_code: 'U10', user_type: 'client'});//Register tags for specific user.  
    this.getData()       
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

    if (!granted) {
      await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    }     
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  getData(){
    this.setState({loading: true});
    this.getRestaurants()
    .then((response) => {
      let resp = response;
        this.setState({ restaurants: resp.restaurants, loading: false});
    }).catch((error) => { 
      Alert.alert("PídeloTú", error.message); this.setState({loading: false});
    }); 
  }


  onBackButtonPressAndroid = () => {
    return true;
  };

  openDrawer(user){
    this.props.navigation.navigate('DrawerOpen', { user: user });
  }

  openRestaurant(rest_data){
    this.props.navigation.navigate('Restaurant', { restaurant_data: rest_data });
  }
  
  searchScreen(){
    this.props.navigation.navigate('Search');
  }

  openCart(){
    this.props.navigation.navigate('CartShop')
  }

  openOrders(nextOrders,historyOrders){    
    this.props.navigation.navigate('Orders', { screen :'NextOrders' })
  }

  async getRestaurants(){
    return await fetch(`${URL}/get_restaurants`)
    .then( (response) =>  { return response.json() })
    .catch(error => {
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
    return(
        <Container>
          <Header style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', width: '100%'}}>
            <TouchableWithoutFeedback onPress={this.openDrawer.bind(this,user)}>                
              <Left style={{ flex: 1 }} >              
                <Icon active name='menu' style={{ color:'#999999', fontSize: 35  }} />
              </Left>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.searchScreen}>
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                <SearchButton />
              </Body>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openCart.bind(this)}>
              <Right style={{ flex: 1 }}>
                <RightTittleNav />
              </Right>
            </TouchableWithoutFeedback>
          </Header>
          <Content refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.getData.bind(this)}
              colors={[COLOR_PRIMARY,COLOR_SECONDARY]}
            />
          }>
            { this.renderRestaurants()}            
          </Content>
          <Footer>
            <FooterTabs openOrders={this.openOrders.bind(this)} user={user} restaurants={restaurants ? restaurants.length : 0}/>
          </Footer>
        </Container>
    );
  }
}
