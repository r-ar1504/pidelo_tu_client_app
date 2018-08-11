import React, { Component } from 'react';
import { Container, Content, Tabs, Tab } from 'native-base';
import { BackHandler, Alert, NetInfo, RefreshControl } from 'react-native';
import styles from './OrderHistoryStyle';
import OrderHistory from './OrderHistory';
import OrderComming from './OrderComming';
import firebase from 'react-native-firebase';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import MealSelected from "../Meal/MealSelected";
import moment from "moment";
import { URL } from "../../config/env";
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../assets/GlobalStyleSheet';

export default class Orders extends Component {
  constructor(props){
    super(props);

    this.state = {
      historyOrders: [],
      nextOrders: [],  
      loading: true,
      showMeal: false,
      meal: {},
      restaurant: 0,
      user:firebase.auth().currentUser  
    } 

    this.openMeal = this.openMeal.bind(this);        
  }
  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);  
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
    this.getData()     
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        Alert.alert("PídeloTú","Necesitas una conexión a internet para ver tus pedidos", [
          {text: 'Regresar', onPress: () => {this.props.navigation.goBack()}}, 
          {text: 'OK', onPress: () => console.log('OK')}                   
        ],
        {cancelable: false});
      }
      else {
        this.getData()
      }
    });
  };

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  getData(){
    this.getOrders().catch((error) => { Alert.alert("Error",error.message) });
  }

  async getOrders(){ 
    const { user } = this.state;
     return await fetch(`${URL}/orders/${user.uid}`)
        .then((response) => {
          return response.json();
        }).then(response => {
          const historyOrders = [];
          const nextOrders = [];     
          for (let i = response.length - 1; i >= 0; i--) {
            if(response[i].status == 4) {
              historyOrders.push(response[i]);
            }
            else {
              nextOrders.push(response[i]);
            }
          }
          this.setState({historyOrders: historyOrders, nextOrders: nextOrders, loading: false});
        }).catch((error) => {
          throw new Error(error.message)        
        });     
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
        Alert.alert("PídeloTú","El restaurante está cerrado, abre a las " + before.format('hh:mm a'));      
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

  render() {  
    const { loading, restaurant, meal, showMeal } = this.state;      
    if (showMeal) {
      return <MealSelected restaurant={restaurant} meal={JSON.stringify(meal)} dismissMeal={this.dismissMeal.bind(this)} cart={this.cart.bind(this)}/>
    }  
    return (
      <Container style={styles.container}>
        {/*<Image source={require('src/assets/images/background.png')} style={styles.image}/>*/}
        <Content refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.getData.bind(this)}
              colors={[COLOR_PRIMARY,COLOR_SECONDARY]}
            />
          }>                                              
          <Tabs tabBarUnderlineStyle={{opacity: 0}} locked={true}>
          {
            this.props.navigation.getParam('screen') == 'NextOrders' ? 
            <Tab heading="Próximos" tabStyle={{backgroundColor:'transparent', borderWidth:1,  borderColor: '#dbdbdb', padding: 10 }} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1,  borderColor: '#dbdbdb'}}>
              <OrderComming orders={this.state.nextOrders} navigation={this.props.navigation}/>
            </Tab>          :

            <Tab heading="Pedidos Anteriores" tabStyle={{backgroundColor:'transparent', borderWidth:1, borderColor: '#dbdbdb', padding: 10}} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1, borderColor: '#dbdbdb'}}>
              <OrderHistory orders={this.state.historyOrders} openMeal={this.openMeal} />
            </Tab>
          }                        
          </Tabs>       
        </Content>  
      </Container>
    );
  }
}