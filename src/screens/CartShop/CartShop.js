import React from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, AsyncStorage, Dimensions } from 'react-native';
import { Picker, Icon, Container, Content, Header, Left, Body, Right, Item, ListItem, List, Thumbnail, Input} from 'native-base';
import Swiper from 'react-native-swiper';
import ValidationComponent from 'react-native-form-validator';
import styles from './CartShopStyle';
import firebase from 'react-native-firebase';
import stripe from 'tipsi-stripe'
import moment from 'moment';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Mapa from '../../components/Maps/Maps';
const { width, height } = Dimensions.get('window');
export default class CartShop extends ValidationComponent {
    static navigationOptions ={
        headerTransparent: true
    }
    constructor(props) {
      super(props);

      this.state = { payments:[], carShop:[], total:0, currentCard: '', allowLocation:false, onchange: false, loading:true, month : '', year: '', csv: '', secure: true, eyeIcon: 'eye' }       
    }

    async componentDidMount() {   
      stripe.setOptions({
        publishableKey: 'pk_live_DtoYFRLSDmR2cNKFZPdHEgPf',
        merchantId: 'MERCHANT_ID', // Optional
        androidPayMode: 'test', // Android only
      })
      
      this.getData().then(async (response) => {  
        let cart = response.carshop;
        let subtotal = 0.0;                               
        /*let value = await AsyncStorage.getItem('cart')              
        if (value) {
          cart = JSON.parse(value)           
        }
        else { 
          await AsyncStorage.setItem('cart', JSON.stringify(response.carshop)); 
          cart = await AsyncStorage.getItem('cart')                 
        }*/
        
        if (response.payments.length > 0) {
          this.setState({payments: response.payments, currentCard: response.payments[response.payments.length - 1].card_number.toString()});                            
        }     
        cart.map((item) => {
          subtotal = subtotal + parseFloat(item.total);
        });
        
        this.setState({carShop: cart, loading:false, total: subtotal });
      
      }).catch((error) => { this.setState({loading:false}); Alert.alert("PídeloTú", error.message); this.props.navigation.goBack(); });
	  }
		
		showCV(){
			if (this.state.secure)
				this.setState({ secure: false, eyeIcon: 'eye-off' });			
			else 
				this.setState({ secure: true, eyeIcon: 'eye' })			
		}
	
		month(){
			const items = []    
				for (let i = 1; i <= 12; i++) {
					if (items.length < 9) {
						items.push( 
							<Picker.Item label={"0"+i} value={"0"+i} key={i} />
						);
					}
					else {
						items.push( 
							<Picker.Item label={i.toString()} value={i} key={i} />
						);
					}        
				} 
				return items;  
		}
	
		years(){
			const years = []
			const currentYear = new Date();
			years.push(
					<Picker.Item label={moment(currentYear).year().toString()} value={moment(currentYear).year()} key={0} />
				);
			for (let i = 1; i <= 10; i++) {
				years.push(
					<Picker.Item label={moment(currentYear).add(i,'year').year().toString()} value={moment(currentYear).add(i,'year').year()} key={i} />
				);
			}    
			return years;
		}   

    async getData() {
      let url = 'http://pidelotu.azurewebsites.net/cart/'+firebase.auth().currentUser.uid;
      return await fetch(url)
      .then(res => {  return res.json() })
      .catch(error => {
        throw new Error(error.message);
      });      
    }

    async deleteItem(item,index) { 
      this.setState({loading:true});    
      let { carShop, total } = this.state; 
      let array = carShop;             
      //await AsyncStorage.removeItem('cart')              
      //await AsyncStorage.setItem('cart', JSON.stringify(array))      
      this.delete(item.id,firebase.auth().currentUser.uid).then(async (res) => {
        if (res.message == 'Success') {
          let subtotal = total - item.total
          array.splice(index,1);   
          if (array.length == 0) {
            await AsyncStorage.removeItem('restaurant')
          }
          this.setState({carShop: array, total: subtotal, loading:false}) 
        }                
      }).catch((error) => {
        Alert.alert("PídeloTú",error.message);
        this.setState({loading:false}) 
      });
    }
    

    async delete(id,firebaseId) {      
      return await fetch('http://pidelotu.azurewebsites.net/cart/delete/'+id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': firebaseId,
        }       
      }).then(response => response.json())
        .then(json => {
          return json;
      }).catch(error => {
        throw new Error(error.message);
      })
    }

    async store(region,token) {
      let { carShop } = this.state; 
      return await fetch('http://pidelotu.azurewebsites.net/order', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartShop:carShop,
          user_id:firebase.auth().currentUser.uid,  
          latitude:region.latitude,
          longitude:region.longitude,
          token:token        
        })
      }).then(response => response.json())
        .then(json => {
          return json;
        }).catch(error => {
          throw new Error(error.message);
        });
    }

    async generateToken(){
      let { currentCard, month, year, csv } = this.state
      let y = year.toString().substring(2,4);
      let params = {
        number: currentCard,
        expMonth: parseInt(month),
        expYear: parseInt(year),
        cvc: csv,
        currency: 'usd',
      }
      return await stripe.createTokenWithCard(params) 
    }

    accept() {      
      this.validate({ csv: { required: true, numbers: true }, month: { required: true }, year: { required: true } });
      if (!this.isFormValid()){
        Alert.alert("PídeloTú","Ops, tienes campos vacíos");
      }
      else {
        this.setState({loading:true})
        this.generateToken().then((token) => {
          this.setState({allowLocation:true, token: token.tokenId, loading:false})          
        }).catch((error) => {
          this.setState({loading:false})
          Alert.alert("PídeloTú",error.message);
        })
        //this.setState({allowLocation:true})        
      }
    }

    confirm(region){      
      let { token } = this.state;
      this.setState({loading:true})
      this.store(region,token).then(async (response) => {
        //await AsyncStorage.removeItem('cart')
        //await AsyncStorage.removeItem('restaurant')
        Alert.alert("PídeloTú",response.message,[{ text: 'OK', onPress: () => {this.setState({loading:false}); this.props.navigation.navigate('Home',{user: firebase.auth().currentUser})} }],{cancelable: false});            
      }).catch((error) => {
        Alert.alert("PídeloTú",error.message);
      })
    }


    renderCreditCards(){
      let { payments }  = this.state;
        return payments.map((item,i) => {
            return (
                <ListItem key={item.id} onPress={()=>{this.setState({onchange:false, currentCard:item.card_number.toString()})}}>                    
									<Thumbnail square style={{width: 50, height: 35, resizeMode:'contain', marginRight:10}} source={require('../../assets/images/Visa_Logo.png')} />
                  <Body>										
                    <Text style={{fontSize:18}}>●●●●{item.card_number.toString().substring(12,16)}</Text>                    
                  </Body>
                </ListItem>
            )
        })
    }

    renderCarShop() {
      let { carShop } = this.state;
        return carShop.map((item,i) => {           
          return (
                <View key={item.id} style={{flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%'}}>
                  <Left style={{padding: 5}}>
                    <Text style={styles.text}>{item.quantity}</Text>
                  </Left>
                  <Body style={{padding: 5}}>
                    <Text style={styles.text}>{item.name}</Text>
                  </Body>
                  <Right style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'center', padding: 5}}>
                    <Text style={styles.text}>${item.total}</Text>
                    <TouchableWithoutFeedback onPress={this.deleteItem.bind(this,item,i)}> 
                      <Icon active name={'close'} style={{color:'white', marginLeft:10}}></Icon>
                    </TouchableWithoutFeedback>
                  </Right>
                </View>                    
          )                    
        })
    }
    
    renderPayment(){
      const { currentCard, payments } = this.state;
      if (payments.length) {
        return (
                <View>
                      <View style={{flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%'}}>
                        <Left style={{padding:10, flexDirection:'row'}}>
                            <Image source={require('../../assets/images/Visa_Logo.png')} style={{width: 35, height: 20, resizeMode:'contain', marginRight:10}}/><Text style={[styles.text]}>●●●{currentCard.substring(12,16)}</Text>
                        </Left> 
                        <Body style={{padding:10}}>
                            <Text style={styles.text}></Text>
                        </Body>                       
                        <Right style={{padding:10}}>                            
                            <TouchableWithoutFeedback onPress={() => {this.setState({onchange:true})}}>
                                <Text style={[styles.text]}>Cambiar</Text>     
                            </TouchableWithoutFeedback>                                                                                                                                      
                        </Right>
                      </View>
										  <View style={{padding: 10,flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%', justifyContent:'center', alignItems:'center'}}>                        												
                        <FontAwesomeIcon size={20} name="calendar" color="#fff" style={{padding: 5}}/>
                        <Text style={[styles.text,{marginRight:6}]}>Fecha exp.</Text>
                          <View style={{borderWidth : 1, borderColor : "white", width: width * .10, height: 50 }}>
            							  <Picker mode="dropdown" style={{backgroundColor:'transparent', color:'white', }} itemStyle={{ alignItems: 'center' }} textStyle={{color:'#5cb85c'}} selectedValue={this.state.month} onValueChange={(month) => {this.setState({month:month})}}>              								
                              <Picker.Item label={""} value={""} />
              								{this.month()}
            							  </Picker>
            							</View>           											
            							<View style={{borderWidth : 1, borderColor : "white", width: width * .15, marginLeft: 6, height: 50 }}>            
            								<Picker mode="dropdown" style={{backgroundColor:'transparent', color: 'white'}} itemStyle={{ alignItems: 'center' }} textStyle={{color:'#5cb85c'}}  selectedValue={this.state.year} onValueChange={(year) => {this.setState({year:year})}}>              								
                              <Picker.Item label={""} value={""} />
                                {this.years()}
            								</Picker>
            							</View>                      
													<Item style={{width:100,marginLeft:6}}>                                          
              							<Input style={{color:'white', fontFamily: 'Lato-Light'}} ref={(csv) => this.csv = csv} onChangeText={(csv)=> {this.setState({csv:csv});}} secureTextEntry={this.state.secure} placeholder='CSV' placeholderTextColor='white' maxLength={3}/>
              							<Icon active name={this.state.eyeIcon} style={{color:'white'}} onPress={this.showCV.bind(this)} />              
            							</Item>                                                                                                                                     
                      </View>
                      <View style={{flexDirection: 'column', alignItems:'center', marginTop:30}}>
                        <TouchableOpacity style={styles.confirm} onPress={this.accept.bind(this)}><Text style={styles.text}>ORDENAR</Text></TouchableOpacity>    
                      </View>
                    </View>
        )
      }
      else {
        return (
          <View style={{flexDirection: 'column', alignItems:'center', marginTop:30}}>
            <TouchableOpacity style={styles.confirm} onPress={() => {this.props.navigation.navigate('Payment', { screen: 'CartShop' })}}><Text style={styles.text}>AGREGAR FORMA DE PAGO</Text></TouchableOpacity>    
          </View>
        )
      }
    }
				
    render(){
    const { onchange, loading, total, carShop, allowLocation } = this.state;  
        if (loading) {
          return <LoadingScreen/>
        }
        if(allowLocation) {
          return <Mapa confirm={this.confirm.bind(this)} goBack={() => {this.setState({allowLocation: false})}}/>                      
        } 
        if (!carShop.length){
          return (
            <Container>
              <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}>
                <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                            <Icon name="arrow-back" style={{color:'white', fontSize: 25}} />
                        </TouchableOpacity>
                    </Left>
                    <Body>

                    </Body>
                    <Right>
                        
                    </Right>
                </Header>
               
                <Content>      
                  <View style={{flexDirection:'column', flex:1, alignItems:'center', justifyContent:'center',alignSelf:'center'}}>
                    <Text style={styles.Title}>NO HAY ELEMENTOS EN TU CARRITO</Text>
                  </View>
                </Content>
              </ImageBackground>
            </Container>
          )
        }  
        if (onchange) {
            return (
              <Container>
				        <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}/>
                <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
                    <Left>
                      <TouchableOpacity onPress={() => { this.setState({onchange:false}) }}>
                        <Icon name="arrow-back" style={{color:'white', fontSize: 25}} />
                      </TouchableOpacity>
                    </Left>
                    <Body>

                    </Body>
                    <Right>
											
                    </Right>
                </Header>
                <Content>
                  <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ width: 170, height: 200, backgroundColor:'#d3d3d3',borderRadius:25, }}>
                        <List>
                          {this.renderCreditCards()}
                        </List>
                    </View>
                  </View> 
                </Content>             
              </Container>
            )
					}				

        return(
	        <Container>
            <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}>
                <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                            <Icon name="arrow-back" style={{color:'white', fontSize: 25}} />
                        </TouchableOpacity>
                    </Left>
                    <Body>

                    </Body>
                    <Right>
                        
                    </Right>
                </Header>

                <View style={styles.meal} >
                    <Text style={styles.Title}>TU CARRITO DE COMPRAS</Text>
                </View>

                <Content>                    
                    {/*<View style={{width: "100%", backgroundColor: '#11c0f6', marginTop: 10}}>                        
                        <Swiper style={styles.wrapper} height={150} activeDotColor={'#fff'}>                         
                            <View style={styles.slide}>                                    
                                <Left style={{flexDirection: 'column', flex:1, padding:10}}>
                                    <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>Las personas que pidieron este artículo también pidieron</Text>
                                    <Text style={{marginLeft: 20, fontFamily: 'Lato-Bold', color:'#fff',marginTop:5}}>Pizza Napolitana</Text>
                                    <Text style={{marginLeft: 20, fontFamily: 'Lato-Light', color:'#fff'}}>Especialidad de la casa</Text>
                                    <Text style={styles.price}>MXN 99.00</Text>                                            
                                </Left>
                                <Body style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                    <Image source={{uri:'http://pidelotu.azurewebsites.net/images/meals/8ffff459f9fefecbd8f9398c54d342b8.png'}} style={styles.mealImg}/>                            
                                </Body>  
                                <Right style={{flex:1}}>

                                </Right>                                    
                            </View>                                                                                             
                        </Swiper>                          
        </View>*/}
                    { this.renderCarShop() }
                    <View style={{flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%'}}>
                        <Left style={{padding:10}}>
                            <Text style={[styles.text]}>Subtotal</Text>
                            <Text style={[styles.text]}>Costo de Envío</Text>
                        </Left>                        
                        <Body style={{padding:10}}>
                            <Text style={styles.text}></Text>
                        </Body>
                        <Right style={{padding:10}}>
                            <Text style={[styles.text]}>${total}</Text>
                            <Text style={[styles.text]}>$25.00</Text>
                        </Right>
                    </View>
                    <View style={{flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%'}}>
                        <Left style={{padding:10}}>
                            <Text style={[styles.text, {fontWeight:'bold'}]}>Total</Text>
                        </Left> 
                        <Body style={{padding:10}}>
                            <Text style={styles.text}></Text>
                        </Body>                       
                        <Right style={{padding:10}}>
                            <Text style={[styles.text, {fontWeight:'bold'}]}>${total + 25}</Text>                            
                        </Right>
                    </View>
                    { this.renderPayment() }                                        
                </Content>
            </ImageBackground>
			    </Container>
    );
    }
}