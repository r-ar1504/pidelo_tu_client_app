import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Left} from 'native-base';
import { View, TouchableWithoutFeedback, Image, YellowBox, Alert, BackHandler } from 'react-native';
import style from './HomeStyle';
import FoodFeed from './FoodFeed';
import SearchButton from './SearchButton';
import RightTittleNav from './RightTittleNav';
import OneSignal from 'react-native-onesignal';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
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
    this.getRestaurants().then((response) => {
      let resp = response;
        this.setState({
          restaurants: resp.restaurants
        });
        this.setState({loading: false});
    }).catch((error) => { Alert.alert("Pídelo Tú", error.messages); this.setState({loading: false});});     
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

  async getRestaurants(){
    return await fetch('http://pidelotu.azurewebsites.net/get_restaurants')
    .then( (response) => response.json() )
    .then( (json) =>{
      return json; 
    }).catch(error => {
      throw new Error(error.messages);
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
      return <LoadingScreen/>
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
