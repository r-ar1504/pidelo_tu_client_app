import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RestaurantStyle';
import Swiper from 'react-native-swiper';
import{ Text, View, TouchableWithoutFeedback, BackHandler, Image, ActivityIndicator, Modal } from 'react-native';


export default class Search extends Component{
  constructor(props){
    super(props);  

    this.state = { items: [], loading: true }
    
    this.getMeals().then((response) => {
      this.setState({items: response}); 
      this.setState({loading: false})     
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

  openMeal(meal){    
    this.props.navigation.navigate('MealSelected', { meal: meal });
  }

  renderMeals(){    
    return this.state.items.map((item, i) => {      
      return (
      <View key={item.id}>
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'} key={this.state.items.length}> 
            {item.meals.map((item,i) => {
              return (
            <View style={styles.slide} key={item.id}>          
              <View style={styles.mealCont}>
                <TouchableWithoutFeedback onPress={this.openMeal.bind(this,item)}>
                  <Image source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+item.image}} style={styles.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>{item.description}</Text><Text style={styles.price}>${item.price}</Text>
                </View>              
              </View>  
            </View>  
              )
            })}                                           
          </Swiper>        
      </View>
      )
    })        
  }

  getMeals(){
    return fetch('http://pidelotu.azurewebsites.net/getMeals')
        .then((response) => {                      
        return response.json();
      }); 
  }  
  
  render(){  
    if(this.state.loading) {
        return(  
          <Modal animationType="slide" transparent={true} visible={this.state.loading}>
            <View style={styles.body}>            
              <ActivityIndicator size={50} color="#11c0f6"/>
            </View>
          </Modal>            
        )
      }   
    return(
      <Container>
        <Image source={{uri:'http://pidelotu.azurewebsites.net/images/restaurants/categories/res-24-cat-5.jpeg'}} style={styles.image}/>
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
          <Text style={styles.restaurantTitle}>P & G</Text>
          <Image source={{uri:'http://pidelotu.azurewebsites.net/images/logos/e5a8ab717c327e2fcd1d78471aae3da0.png'}} style={{width:50, height:50, margin: 10}}/>
        </View>
        {this.renderMeals()}
        {/*       
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
          </Swiper>*/}
        </Content>
      </Container>
    );
  }
}
