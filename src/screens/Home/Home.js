import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Left, Footer, Icon } from 'native-base';
import { View, TouchableWithoutFeedback, YellowBox, Alert, BackHandler, PermissionsAndroid, RefreshControl, AsyncStorage } from 'react-native';
import style from './HomeStyle';
import FoodFeed from './FoodFeed';
import SearchButton from './SearchButton';
import RightTittleNav from './RightTittleNav';
import OneSignal from 'react-native-onesignal';
import FooterTabs from "./FooterTabs";
import { SlidingPane, SlidingPaneWrapper } from 'react-native-sliding-panes';
import { URL } from "../../config/env";
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../assets/GlobalStyleSheet';
import getCoordinates from "../../components/Maps/getCurrentPosition";

export default class Home extends Component {
  static navigationOptions = {
    gesturesEnabled: false,
    headerStyle: {
      display: 'none'
    }
  }
  constructor(props) {
    super(props);

    this.searchScreen = this.searchScreen.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.renderRestaurants = this.renderRestaurants.bind(this);
    this.openRestaurant = this.openRestaurant.bind(this);

    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;

    this.state = {
      restaurants: [], loading: true, coords: { latitude: 0, longitude: 0 }, user: user, scrollY: this.props.navigation.getParam("scrollY") ? this.props.navigation.getParam("scrollY") : null,
    }

    YellowBox.ignoreWarnings([
      'Warning: TouchableWithoutFeedback does not work well with Text children',
      "Warning: Can't call setState (or forceUpdate) on an unmounted component"
    ]);
  }

  componentWillMount() {
    OneSignal.sendTags({ delivery_code: 'U10', user_type: 'client' });//Register tags for specific user.  
    getCoordinates().then(async position => {
      this.setState({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      });
      const restaurants = await AsyncStorage.getItem('restaurants_data')
      if (!restaurants) {
        // console.warn("Request")
        this.getData()
      }
      else {
        // console.warn("AsyncStorage")
        this.setState({ restaurants: JSON.parse(restaurants), loading: false });
      }
    })
    
  }

  shouldComponentUpdate(){
    return true
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (!granted) {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }  
    
    setTimeout(() => { this._content._root.scrollToPosition(0,this.state.scrollY, true) }, 1500)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  async getData() {
    this.setState({ loading: true });
    await AsyncStorage.removeItem('restaurants_data')
    this.getRestaurants()
      .then(async (response) => {
        let resp = response;
        this.setState({ restaurants: resp.restaurants, loading: false });
        await AsyncStorage.setItem("restaurants_data", JSON.stringify(resp.restaurants))        
      }).catch((error) => {
        Alert.alert("Error", error.message); this.setState({ loading: false });
      });
    // this._content._root.scrollToEnd()
  }


  onBackButtonPressAndroid = () => {
    return true;
  };

  openDrawer(user) {
    this.props.navigation.navigate('DrawerOpen', { user: user });
  }

  openRestaurant(rest_data) {
    this.props.navigation.navigate('Restaurant', { restaurant_data: rest_data, scrollY: this.state.scrollY });
  }

  searchScreen() {
    this.props.navigation.navigate('Search');
  }

  openCart() {
    this.props.navigation.navigate('CartShop')
  }

  openOrders(nextOrders, historyOrders) {
    this.props.navigation.navigate('Orders', { screen: 'NextOrders' })
  }

  async getRestaurants() {
    const { coords, user } = this.state
    return await fetch(`${URL}/get_restaurants/${coords.latitude}/${coords.longitude}/${user.uid}`)
      .then((response) => { return response.json() })
      .catch(error => {
        throw new Error(error.message);
      });
  }

  renderRestaurants() {
    const { restaurants } = this.state;
    if (restaurants != null) {
      return restaurants.map((restaurant, i) => {
        return <FoodFeed key={restaurant.id} restaurant={JSON.stringify(restaurant)} openRest={this.openRestaurant} />
      })
    }
  }

  handleScroll(event) {
    this.setState({ scrollY: event.nativeEvent.contentOffset.y });
    // console.warn("Scroll",event.nativeEvent.contentOffset)
   
    // this._content._root.scrollToPosition(0,this.state.scrollY, true)
  }

  render() {
    const { loading, restaurants, user } = this.state        
    return (
      <Container>
        <Header style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', width: '100%' }}>
          <TouchableWithoutFeedback onPress={this.openDrawer.bind(this, user)}>
            <Left style={{ flex: 1 }} >
              <Icon active name='menu' style={{ color: '#999999', fontSize: 35 }} />
            </Left>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.searchScreen}>
            <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <SearchButton />
            </Body>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.openCart.bind(this)}>
            <Right style={{ flex: 1 }}>
              <RightTittleNav />
            </Right>
          </TouchableWithoutFeedback>
        </Header>
        <Content ref={(c) => { this._content = c } }  enableResetScrollToCoords={true} onScroll={event => this.handleScroll(event)} refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={this.getData.bind(this)}
            colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
          />
        }>
          {!loading ? this.renderRestaurants() : <View/> }
        </Content>
        <Footer>
          <FooterTabs openOrders={this.openOrders.bind(this)} user={user} restaurants={restaurants ? restaurants.length : 0} />
        </Footer>
      </Container>
    );
  }
}
