import React, { Component } from 'react';
import { BackHandler, Alert, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { Container, Header, Left, Body, Right, Icon, List, Tabs, Tab, TabHeading, View, Content } from "native-base";
import firebase from "react-native-firebase";
import styles from './PaymentStyle';
import Form from './Form';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { URL } from "../../config/env";
import { COLOR_PRIMARY, COLOR_SECONDARY, FONT_NORMAL } from "../../assets/GlobalStyleSheet";
import CardList from '../../components/CardList/CardList';
export default class Payment extends Component {

  constructor(props){
    super(props);

    this.state = { user:firebase.auth().currentUser, cards: [], loading: true }       
  }

  componentWillMount(){
    this.refreshData()
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate(params.screen);
  };  

  refreshData(){
    this.get().then(response => {      
      this.setState({ cards:response.cards, loading: false })
    }).catch(error => {
      this.setState({ loading: false })
      Alert.alert("Error",error.message)
    })
  }

  confirm(card,month,year,cv) {
    const { params } = this.props.navigation.state;
    this.setState({loading:true});
    this.store(card,month,year,cv).then(response => {
      if (response.message === 'success') {
        this.setState({loading:false});
        Alert.alert("PídeloTú","Tu forma de pago se guardó correctamente")
        this.props.navigation.navigate(params.screen);
      }  
    }).catch((error) => { 
      Alert.alert("PídeloTú", error.message); 
      this.setState({loading:false}); 
    });
  }

  async get(){
    let { user } = this.state;
    return await fetch(`${URL}/payment/${user.uid}`)
    .then(response => {
      return response.json()
    })
    .catch(error => {
      throw new Error(error.message)
    })
  }

  async store(card,month,year,cv) {    
    return await fetch(`${URL}/payment`, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({        
        user_id:this.state.user.uid,
        card_number:card,  
        expMonth:month,
        expYear:year,
        cvc:cv      
      })
    })
    .then(response => { return response.json() })
    .catch(error => {      
      throw new Error(error.message);
    })
  }

  async remove(card){    
    return await fetch(`${URL}/card/delete/${card}`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.state.user.uid,
      }
    }).then(response => {
      return response.json()
    }).catch(error => {
      throw new Error(error.message)
    })
  }

  removeCard(item,index){
    this.setState({loading:true});    
      let { cards } = this.state; 
      let array = cards;                
      this.remove(item).then(async (res) => {
        if (res.message == 'Success') {          
          array.splice(index,1);             
          this.setState({cards:array, loading:false}) 
        }                
      }).catch((error) => {
        Alert.alert("Error",error.message);
        this.setState({loading:false}) 
      });
  }

  changeCard(){
    return ;
  }

  render() { 
    const { params } = this.props.navigation.state;
    const { loading, cards } = this.state;        
		return(      
      <Container style={{backgroundColor: COLOR_SECONDARY}} refreshControl={
        <RefreshControl
           refreshing={loading}
           onRefresh={this.refreshData.bind(this)}
           colors={[COLOR_PRIMARY,COLOR_SECONDARY]}
         />
       }>        
        <Header hasTabs style={{backgroundColor:'transparent'}}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate(params.screen) }}>
            <Left style={{flex: 1, alignItems:'center', justifyContent:'center'}}>              
              <Icon name="arrow-back" style={{color:'white', fontSize: 35, alignSelf:'center', }} />                                
            </Left>
          </TouchableOpacity>
          <Body style={{flex: 1, alignItems:'center', alignSelf:'center'}}>   
            <Text style={styles.MainText}>Formas de Pago</Text>           
          </Body>
          <Right style={{flex: 1}}>
                          
          </Right>
        </Header>
        <Tabs>
          <Tab heading={ <TabHeading style={{ backgroundColor: COLOR_SECONDARY}}><Icon name="card" /><Text style={{color:'white', fontSize: 18, fontFamily: FONT_NORMAL, marginLeft: 6}}>Tarjetas</Text></TabHeading>}>
            <Content refreshControl={
             <RefreshControl
                refreshing={loading}
                onRefresh={this.refreshData.bind(this)}
                colors={[COLOR_PRIMARY,COLOR_SECONDARY]}
              />
            }>
              <List>
                { <CardList cards={cards} removeCard={this.removeCard.bind(this)} changeCard={this.changeCard.bind(this)}/> }
              </List>
            </Content>
          </Tab>            
          <Tab heading={ <TabHeading style={{ backgroundColor: COLOR_SECONDARY}}><Icon name="add" /><Text style={{color:'white', fontSize: 18, fontFamily: FONT_NORMAL, marginLeft: 6}}>Agregar Tarjeta</Text></TabHeading>}>
            { loading ? <LoadingScreen/> : <Form confirm={this.confirm.bind(this)}/>}
          </Tab>
        </Tabs>                  
      </Container>			     
		)
	}
 }
