import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { Alert, Text, View, Image, BackHandler, AsyncStorage, TextInput, TouchableOpacity, YellowBox, ActivityIndicator, ImageBackground, Modal, Dimensions} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button, Item } from 'native-base';
import Swiper from 'react-native-swiper';
import styles from './CartShopStyle';

export default class CartShop extends React.Component {
    static navigationOptions ={
        headerTransparent: true
    }
    constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;
        const meal = params ? params.meal : null;
    }

    render(){
        return(
	        <Container>
                <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}>
                <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Restaurant'); }}>
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
                    <View style={{flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%', marginTop: 10}}>
                        <Left style={{padding:10}}>
                            <Text style={styles.text}>1</Text>
                        </Left>
                        <Body style={{padding:10}}>
                            <Text style={styles.text}>Pizza de Jamón</Text>
                        </Body>
                        <Right style={{padding:10}}>
                            <Text style={styles.text}>$120.00</Text>
                        </Right>
                    </View>
                    <View style={{flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%'}}>
                        <Left style={{padding:10}}>
                            <Text style={[styles.text]}>Subtotal</Text>
                            <Text style={[styles.text]}>Costo de Envío</Text>
                        </Left>                        
                        <Body style={{padding:10}}>
                            <Text style={styles.text}></Text>
                        </Body>
                        <Right style={{padding:10}}>
                            <Text style={[styles.text]}>$120.00</Text>
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
                            <Text style={[styles.text, {fontWeight:'bold'}]}>$145.00</Text>                            
                        </Right>
                    </View>
                    <View style={{flexDirection:'row', borderBottomColor:'white', borderTopColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', borderWidth:0.8, width:'100%'}}>
                        <Left style={{padding:10, flexDirection:'row'}}>
                            <Image source={require('../../assets/images/Visa_Logo.png')} style={{width: 35, height: 20, resizeMode:'contain', marginRight:10}}/><Text style={[styles.text]}>●●●3489</Text>
                        </Left> 
                        <Body style={{padding:10}}>
                            <Text style={styles.text}></Text>
                        </Body>                       
                        <Right style={{padding:10}}>
                            <Text style={[styles.text]}>Cambiar</Text>                            
                        </Right>
                    </View>
                    <View style={{flexDirection: 'column', alignItems:'center', marginTop:80}}>
                        <TouchableOpacity style={styles.confirm} onPress={()=>this.setState({allowLocation: true})}><Text style={styles.text}>ORDENAR</Text></TouchableOpacity>    
                    </View>
                </Content>
                </ImageBackground>
			</Container>
    );
    }
}