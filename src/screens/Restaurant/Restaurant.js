import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RestaurantStyle';
import Swiper from 'react-native-swiper';
import{ Text, View, TouchableWithoutFeedback, BackHandler, Image, ActivityIndicator, Modal, ImageBackground } from 'react-native';


export default class Search extends Component{
  constructor(props){
    super(props);  

    this.state = { items: [], loading: true, restaurant_data:this.props.navigation.getParam("restaurant_data") }
    
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

  openMeal(meal, restaurant){        
    this.props.navigation.navigate('MealSelected', { meal: meal, restaurant_id: restaurant});
  }

  renderMeals(){    
    return this.state.items.map((categories, index) => {      
      return (
        <View key={categories.id}>
          <View style={styles.titleCont}>
            <Text style={styles.titleText}>{categories.name}</Text>
          </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'} key={this.state.items.length}> 
            {categories.meals.map((item,i) => {
              return (
            <View style={styles.slide} key={item.id}>          
              <View style={styles.mealCont}>
                <TouchableWithoutFeedback onPress={this.openMeal.bind(this,item,categories.restaurant_id)}>
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
    return fetch('http://pidelotu.azurewebsites.net/restaurant_meals/' + this.state.restaurant_data.id)
        .then((response) => {                      
        return response.json();
      }); 
  }  
  
  render(){  
    if(this.state.loading) {
        return(  
          <Modal animationType="slide" transparent={true} visible={this.state.loading} onRequestClose={() => {console.log('close modal')}}>
            <ImageBackground source={require('src/assets/images/bg.png')} style={styles.body}>
              <ActivityIndicator size={50} color="#11c0f6" animating={true}/>
            </ImageBackground>
          </Modal>            
        )
      }   
    return(
      <Container>
        <Image source={{uri:'https://comojuega.files.wordpress.com/2013/11/hd-desktop-wallpaper-hd-dark-black-wallpapers-dark-black-wallpaper-dark-background-dark-wallpaper-23-1-1600x1000.jpg'}} style={styles.image}/>
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
          <Text style={styles.restaurantTitle}>{this.state.restaurant_data.name}</Text>
          <Image source={{uri:'http://pidelotu.azurewebsites.net/images/logos/'+ this.state.restaurant_data.logo}} style={{width:50, height:50, margin: 10}}/>
        </View>
        {this.renderMeals()}        
        </Content>
      </Container>
    );
  }
}
