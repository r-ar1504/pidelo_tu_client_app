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

    this.state = { items: [] }
    this.getMeals().then((response) => {
      this.setState({items: response});
    });

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

  openMeal(id){
    this.props.navigation.navigate('MealSelected');
  }

  renderMeals(){    
    return this.state.items.map((item, i) => {
      return (
        <View style={styles.slide} key={item.id_meal}> 
          <View style={styles.mealCont}>
                <TouchableWithoutFeedback onPress={this.openMeal.bind(this,item.id_meal)}>
                  <Image source={{uri:'http:192.168.0.26:8000/images/'+item.image}} style={styles.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>{item.description}</Text><Text style={styles.price}>{item.preparation_time}</Text>
                </View>              
          </View>  
        </View>
        )
    })
  }

  getMeals(){
    return fetch('http://192.168.0.26:8000/getMeals')
        .then((response) => {              
        return response.json();
      }); 
  }  
  
  render(){    
    return(
      <Container>
        <Image source={require('src/assets/images/pizzaBack.jpg')} style={styles.image}/>
        <Header style={styles.header}>
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
        <View style={styles.restaurantTitleCont}>
          <Text style={styles.restaurantTitle}>PIZZA HUT</Text>
          <Image source={require('src/assets/images/pizzah.png')} style={{width:50, height:50, margin: 10}}/>
        </View>
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>Pizzas</Text>
        </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'} key={this.state.items.length}>                        
            {this.renderMeals()}           
          </Swiper>
                
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>Appetizers</Text>
        </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'}>
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
