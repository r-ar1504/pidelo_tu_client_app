import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RestaurantStyle';
import Swiper from 'react-native-swiper';
import{ Text, View, TouchableWithoutFeedback, BackHandler, Image } from 'react-native';


export default class Search extends Component{
  constructor(props){
    super(props);  

    this.openDiscounts = this.openDiscounts.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);     
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };  

  openDiscounts(){
    this.props.navigation.navigate('Discounts')
  }  
  
  render(){
    return(
      <Container>
        <Image source={require('src/assets/images/pizzaBack.jpg')} style={styles.image}/>

        <Header
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            height: 50,
        }}>
          <Left style={{flex: 1}}>
            <Icon name="arrow-left" size={20} color="#fff" onPress={ () => {this.props.navigation.goBack()}} />
          </Left>
          <Body style={{flex: 1}}>

          </Body>
          <Right style={{ flex: 1}}>
          <TouchableWithoutFeedback onPress={this.openDiscounts}>
            <Icon name="ticket" size={20} color="#fff" />
          </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginRight: 15,
          height:90
        }}>
          <Text style={{
            color: '#fff',
            opacity: 0.8,
            fontSize: 40,
            letterSpacing: 20,
            fontWeight: 'bold',
            marginRight: 10
          }}>PIZZA HUT</Text>
          <Image source={require('src/assets/images/pizzah.png')} style={{width:50, height:50, margin: 10}}/>
        </View>
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>Pizzas</Text>
        </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'} autoplay>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/pizza.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Pizza Grande con Jamón</Text><Text style={styles.price}>$120</Text>
                </View>              
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/pizza2.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Pizza Grande con Queso</Text><Text style={styles.price}>$95</Text>
                </View>
              </View>
            </View>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/pizza.png')} style={styles.mealImg}/> 
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Pizza Grande con Jamón</Text><Text style={styles.price}>$120</Text>
                </View>             
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/pizza2.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Pizza Grande con Queso</Text><Text style={styles.price}>$95</Text>
                </View>
              </View>
            </View>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/pizza.png')} style={styles.mealImg}/>              
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Pizza Grande con Jamón</Text><Text style={styles.price}>$120</Text>
                </View>
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/pizza2.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Pizza Grande con Queso</Text><Text style={styles.price}>$95</Text>
                </View>
              </View>
            </View>
          </Swiper>
                
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>Appetizers</Text>
        </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'} autoplay>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/hotwings.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Hot Wings 5 Pieces</Text><Text style={styles.price}>$69</Text>
                </View>              
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/breadsticks.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>BreadSticks 12 Pieces</Text><Text style={styles.price}>$40</Text>
                </View>   
              </View>
            </View>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/hotwings.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Hot Wings 5 Pieces</Text><Text style={styles.price}>$69</Text>
                </View>               
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/breadsticks.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>BreadSticks 12 Pieces</Text><Text style={styles.price}>$40</Text>
                </View>   
              </View>
            </View>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/hotwings.png')} style={styles.mealImg}/>              
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Hot Wings 5 Pieces</Text><Text style={styles.price}>$69</Text>
                </View> 
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/breadsticks.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>BreadSticks 12 Pieces</Text><Text style={styles.price}>$40</Text>
                </View>   
              </View>
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}
