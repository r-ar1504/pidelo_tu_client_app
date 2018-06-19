import React from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { Picker, Icon, Container, Content, Header, Left, Body, Right, Item, ListItem, List, Thumbnail, Input} from 'native-base';
import Swiper from 'react-native-swiper';
import ValidationComponent from 'react-native-form-validator';
import styles from './CartShopStyle';
import firebase from 'react-native-firebase';
import openpay from 'react-native-openpay';
import moment from 'moment';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Mapa from '../../components/Maps/Maps';

export default class CartShop extends ValidationComponent {
    static navigationOptions ={
        headerTransparent: true
    }
    constructor(props) {
      super(props);

      this.state = { payments:[], carShop:[], total:0, currentCard: '',allowLocation:false, onchange: false, loading:true, number: '', month : '', year: '', cv: '', cp: '', secure: true, eyeIcon: 'eye' }       
    }

    async componentDidMount() {   
      openpay.setup('mf4nsxsfmoaic0jt53jk', 'pk_f7d9db95d7134915a994750e274760d9');             
      this.getData().then(async (response) => {        
        let cart = []
        let value = await AsyncStorage.getItem('cart')
        
        if (value != null && value.length == 0) { cart = JSON.parse(value) } else { await AsyncStorage.setItem('cart', JSON.stringify(response.carshop), () => { cart = response.carshop }); }
        
        if (response.payments.length > 0) {
          this.setState({payments: response.payments, currentCard: response.payments[response.payments.length - 1].card_number.toString().substring(12,16)});                    
        }

        this.setState({carShop: cart, loading:false, total: response.subtotal });
    
      }).catch((error) => { this.setState({loading:false}); Alert.alert("Pídelo Tú", error.message); this.props.navigation.goBack(); });
	  }
		
		showCV(){
			if (this.state.secure){
				this.setState({ secure: false, eyeIcon: 'eye-off' });
			}
			else {
				this.setState({ secure: true, eyeIcon: 'eye' })
			}
		}
	
		month(){
			const items = []    
				for (let i = 1; i <= 12; i++) {
					if (items.length < 9) {
						items.push( 
							<Picker.Item label={"0"+i} value={i} key={i} />
						);
					}
					else {
						items.push( 
							<Picker.Item label={""+i} value={i} key={i} />
						);
					}        
				} 
				return items;  
		}
	
		years(){
			const years = []
			const currentYear = new Date();
			years.push(
					<Picker.Item label={""+moment(currentYear).year()} value={moment(currentYear).year()} key={0} />
				);
			for (let i = 1; i <= 10; i++) {
				years.push(
					<Picker.Item label={""+moment(currentYear).add(i,'year').year()} value={moment(currentYear).add(i,'year').year()} key={i} />
				);
			}    
			return years;
		}   

    async getData() {
      let url = 'http://pidelotu.azurewebsites.net/cart/'+firebase.auth().currentUser.uid;
      return await fetch(url)
          .then(res => res.json())
          .then(json => {
            return json;
          }).catch(error => {
            throw new Error(error);
          });      
    }

    async deleteItem(item,index) {      
      let { carShop, total } = this.state; 
      let array = carShop;       
      array.splice(index,1);   
      await AsyncStorage.removeItem('cart')              
      await AsyncStorage.setItem('cart', JSON.stringify(array))
      this.setState({carShop: array, total: total - item.total}); 
      /*this.delete(item.id).then((res) => {
              
      }).catch((error) => {
        Alert.alert("Pídelo Tú",error.messages);
      });*/
    }
    

    async delete(id) {      
      return await fetch('http://pidelotu.azurewebsites.net/cart/'+id+'/'+firebase.auth().currentUser.uid, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }       
      }).then(response => response.json())
        .then(json => {
          return json;
      }).catch(error => {
        throw new Error(error.messages);
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
          throw new Error(error.messages);
        });
    }

    generateToken(){
      return openpay.createCardToken({
        holder_name: 'John Doe',
        card_number: '4111111111111111',
        expiration_month: '02',
        expiration_year: '20',
        cvv2: '110'
      })
      .then(token => { return token });
    }


    renderCreditCards(){
      let { payments }  = this.state;
        return payments.map((item,i) => {
            return (
                <ListItem key={item.id} onPress={()=>{this.setState({onchange:false, currentCard:item.card_number.toString().substring(12,16)})}}>                    
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
                    <Text style={styles.text}>{item.description}</Text>
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
                            <Image source={require('../../assets/images/Visa_Logo.png')} style={{width: 35, height: 20, resizeMode:'contain', marginRight:10}}/><Text style={[styles.text]}>●●●{currentCard}</Text>
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
                        <View style={{borderWidth : 1, borderColor : "white", width: 100, height: 50 }}>
            								<Picker mode="dropdown" style={{backgroundColor:'transparent', color:'white', }} itemStyle={{ alignItems: 'center' }} textStyle={{color:'#5cb85c'}} selectedValue={this.state.month} onValueChange={(month) => {this.setState({month})}}>              								
              									{this.month()}
            									</Picker>
            							</View>           											
            							<View style={{borderWidth : 1, borderColor : "white", width: 100, marginLeft: 6, height: 50 }}>            
            								<Picker mode="dropdown" style={{backgroundColor:'transparent', color: 'white'}} itemStyle={{ alignItems: 'center' }} textStyle={{color:'#5cb85c'}}  selectedValue={this.state.year} onValueChange={(year) => {this.setState({year})}}>              								
              									{this.years()}
            								</Picker>
            							</View>                      
													<Item style={{width:100,marginLeft:6}}>                                          
              							<Input style={{color:'white', fontFamily: 'Lato-Light'}} ref={(cv) => this.cv = cv} onChangeText={(cv)=> {this.setState({cv});}} secureTextEntry={this.state.secure} placeholder='CV' placeholderTextColor='white' maxLength={3}/>
              							<Icon active name={this.state.eyeIcon} style={{color:'white'}} onPress={this.showCV.bind(this)} />              
            							</Item>                                                                                                                                     
                      </View>
                      <View style={{flexDirection: 'column', alignItems:'center', marginTop:30}}>
                        <TouchableOpacity style={styles.confirm} onPress={() => {this.setState({allowLocation:true})}}><Text style={styles.text}>ORDENAR</Text></TouchableOpacity>    
                      </View>
                    </View>
        )
      }
      else {
        return (
          <View style={{flexDirection: 'column', alignItems:'center', marginTop:30}}>
            <TouchableOpacity style={styles.confirm} onPress={() => {this.props.navigation.navigate('Payment')}}><Text style={styles.text}>AGREGAR FORMA DE PAGO</Text></TouchableOpacity>    
          </View>
        )
      }
    }

    accept(region) {
      this.validate({ csv: { required: true } });
      if (!this.isFormValid()){
        Alert.alert("Pídelo Tú","Ops, tienes campos vacíos");
      }
      else {
        this.generateToken().then((token) => {
          this.store(region,token).then(async (response) => {
            Alert.alert("Pídelo Tú",JSON.stringify(response))
            await AsyncStorage.removeItem('cart')
          }).catch((error) => {
            Alert.alert("Pídelo Tú",error.messages);
          })
        }).catch((error) => {
          Alert.alert("Pídelo Tú",error.messages);
        })
        
      }
    }
				
    render(){
    const { onchange, loading, total, carShop, allowLocation } = this.state;  
        if (loading) {
          return <LoadingScreen/>
        }
        if(allowLocation) {
          return <Mapa confirm={this.accept.bind(this)} goBack={() => {this.setState({allowLocation: false})}}/>                      
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
                  <View style={{flexDirection:'column', flex:1, alignItems:'center', justifyContent:'center'}}>
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
                    <View style={{width: "100%", backgroundColor: '#11c0f6', marginTop: 10}}>                        
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
                    </View>
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