import React, { Component } from 'react';
import { Container, Content, Tabs, Tab } from 'native-base';
import { BackHandler, Alert, NetInfo } from 'react-native';
import styles from './OrderHistoryStyle';
import OrderHistory from './OrderHistory';
import OrderComming from './OrderComming';
import firebase from 'react-native-firebase';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import MealSelected from "../Meal/MealSelected";
import moment from "moment";

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
     this.getOrders().then(()=> {}).catch((error) => {Alert.alert("Pídelo Tú",error.message); this.setState({loading:false})});     
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        Alert.alert("Pídelo Tú","Necesitas una conexión a internet para ver tus pedidos", [
          {text: 'Regresar', onPress: () => {this.props.navigation.goBack()}}, 
          {text: 'OK', onPress: () => console.log('OK')}                   
        ],
        {cancelable: false});
      }
      else {
        this.getOrders().then(()=> {}).catch((error) => {Alert.alert("Pídelo Tú",error.message)});  ;
      }
    });
  };

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  async getOrders(){ 
    const url = 'http://pidelotu.azurewebsites.net/orders/' + this.state.user.uid;
     return await fetch(url)
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
    if(loading) {
      return <LoadingScreen/>
    } 
    if (showMeal) {
      return <MealSelected restaurant={restaurant} meal={JSON.stringify(meal)} dismissMeal={this.dismissMeal.bind(this)} cart={this.cart.bind(this)}/>
    }  
    return (
      <Container style={styles.container}>
        {/*<Image source={require('src/assets/images/background.png')} style={styles.image}/>*/}
        <Content padder>                                              
          <Tabs tabBarUnderlineStyle={{opacity: 0}} locked={true}>
            <Tab heading="Pedidos Anteriores" tabStyle={{backgroundColor:'transparent', borderWidth:1, borderBottomLeftRadius:15, borderTopLeftRadius:15, borderColor: '#dbdbdb'}} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1, borderBottomLeftRadius:15, borderTopLeftRadius:15,  borderColor: '#dbdbdb'}}>
              <OrderHistory orders={this.state.historyOrders} openMeal={this.openMeal} />
            </Tab>
            <Tab heading="Próximos" tabStyle={{backgroundColor:'transparent', borderWidth:1, borderBottomRightRadius:15, borderTopRightRadius:15,  borderColor: '#dbdbdb'}} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1, borderBottomRightRadius:15, borderTopRightRadius:15,  borderColor: '#dbdbdb'}}>
              <OrderComming orders={this.state.nextOrders} navigation={this.props.navigation}/>
            </Tab>          
          </Tabs>       
        </Content>  
      </Container>
    );
  }
}