import React, { Component } from 'react';
import { Alert, View, Image, BackHandler, TextInput, TouchableOpacity, ImageBackground, AsyncStorage, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Footer, Button, H3, List, ListItem, Text } from 'native-base';
import style from './MealStyle';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import CheckBox from 'react-native-checkbox-heaven'
import { URL } from "../../config/env";

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
const { width } = Dimensions.get('window')
const ingredients = [];
const extras = [];
const Ctotal = 0;
export default class MealSelected extends Component {
  static navigationOptions = {
    headerTransparent: true
  }
  constructor(props) {
    super(props);

    this.state = {
      number: 1,
      user: firebase.auth().currentUser,
      meal: JSON.parse(this.props.meal),
      loading: false,
      total: 0.0,
      price: 0.0,
      subtype: 0,      
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    let { meal } = this.state
    if (!meal.price) {
      Ctotal = meal.sub_type[0].price;
      this.setState({ total: Ctotal, price: Ctotal, subtype: meal.sub_type[0].id })
    }
    else {
      Ctotal = meal.price;
      this.setState({ total: Ctotal, price: Ctotal });
    }              
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    return true
  }

  IncrementItem = () => {
    const { price, number, meal } = this.state;
    const total = price * (number + 1);
    this.setState({ number: number + 1, total: total });    
    Ctotal = total;
    if (meal.has_ingredients) {
      meal.ingredients.map(ingredient => {
        ingredient.checked = false
      })
      ingredients = [];
      extras = [];
    }    
  }
  DecreaseItem = () => {
    const { price, number, meal } = this.state;
    if (number > 1) {
      const total = price * (number - 1);
      this.setState({ number: number - 1, total: total });
      Ctotal = total;
      if (meal.has_ingredients) {
        meal.ingredients.map(ingredient => {
          ingredient.checked = false
        })
        ingredients = [];
        extras = [];
      }    
    }    
  }

  onSelect(index, selectedItem) {
    const { meal, number } = this.state;
    Ctotal = (selectedItem.price * number);
    this.setState({ total: Ctotal, price: selectedItem.price, subtype: selectedItem.id });
    if (meal.has_ingredients) {
     meal.ingredients.map(ingredient => {
        ingredient.checked = false
      })
      ingredients = [];
      extras = [];
    }        
  }

  onClick(extra){
    if (!extras.includes(extra.name)) {
      extras.push(extra.name);
      Ctotal = Ctotal + extra.price;                  
    }
    else {
      let index = extras.indexOf(extra.name);
      extras.splice(index, 1);
      Ctotal = Ctotal - extra.price;      
    }        
    extra.checked = !extra.checked
    this.setState({ total: Ctotal })    
  }

  addIngredient(ingredient){
    if (!ingredients.includes(ingredient.name)) {
      ingredients.push(ingredient.name);    
      if (ingredients.length > this.state.meal.limit_ingredients){        
        Ctotal = Ctotal + this.state.meal.extra_cost;
        this.setState({ total: Ctotal })
      }  
    }
    else {
      let index = ingredients.indexOf(ingredient.name);
      ingredients.splice(index, 1);     
      if (ingredients.length == this.state.meal.limit_ingredients){        
        Ctotal = Ctotal - this.state.meal.extra_cost;
        this.setState({ total: Ctotal })
      }        
    }        
    ingredient.checked = !ingredient.checked    
  }

  check(){
    if (this.state.meal.is_combo == 1){
      if(ingredients.length == 0){
        Alert.alert("PídeloTú",`Selecciona al menos un ingrediente`)
      }
      // else if (ingredients.length > this.state.meal.limit_ingredients) {
      //   Alert.alert("PídeloTú",`Sólo puedes seleccionar ${this.state.meal.limit_ingredients} ingredientes`)
      // }
      else {
        // console.warn("Is Combo",this.state.meal.is_combo)
        // console.warn("Ingredients",ingredients)
        this.accept()
      }
    }
    else {
      this.accept()
    }    
  }

  async accept() {    
    this.setState({ loading: true });
    let restaurant = await AsyncStorage.getItem('restaurant')    
    if (!restaurant) {
      this.store(this.props.restaurant.toString()).then(async (response) => {
        this.setState({ loading: false });
        await AsyncStorage.setItem('restaurant', this.props.restaurant.toString());
        if (response.message == 'success') {
          Alert.alert("PídeloTú", "Se a agregado tu pedido al carrito, ¿Deseas seguir comprando?", [
            { text: 'Sí', onPress: () => { this.props.dismissMeal() } },
            { text: 'Finalizar compra', onPress: () => { this.props.cart() } }
          ], { cancelable: false });
        }
      }).catch(error => {
        this.setState({ loading: false });
        Alert.alert("Error", error.message);
      });      
    }
    else {
      if (parseInt(restaurant) == this.props.restaurant) {
        this.store(this.props.restaurant.toString()).then(async (response) => {
          this.setState({ loading: false });
          if (response.message == 'success') {
            Alert.alert("PídeloTú", "Se a agregado tu pedido al carrito, ¿Deseas seguir comprando?", [
              { text: 'Sí', onPress: () => { this.props.dismissMeal() } },
              { text: 'Finalizar compra', onPress: () => { this.props.cart() } }
            ], { cancelable: false });
          }
        }).catch(error => {
          this.setState({ loading: false });
          Alert.alert("Error", error.message);
        });
        // Alert.alert("PídeloTú", "Puedes agregar más elementos al carrito")
      }
      else {
        Alert.alert("Pídelo Tú", "Tienes elementos en tu carrito sin procesar debes finalizar la compra para poder agregar este elemento.", [
          { text: 'OK', onPress: () => { this.props.dismissMeal() } },
          { text: 'Ir al carrito', onPress: () => { this.props.cart() } }
        ], { cancelable: false });
      }
    }
  }


  async store(restaurant) {
    let { meal, user, number, subtype } = this.state;
    return await fetch(`${URL}/cart`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meal_id: meal.id,
        user_id: user.uid,
        total: Ctotal,
        quantity: number,
        sub_type_id: subtype,
        ingredients: JSON.stringify(ingredients),
        restaurant_id: restaurant,
      })
    }).then(response => {
      return response.json()
    }).catch(error => {
      throw new Error(error.message);
    });
  }

  renderSubtypes() {
    let { meal } = this.state;
    if (meal.has_subtype != 0) {
      return meal.sub_type.map((item, i) => {
        return (          
            <RadioButton value={item} key={item.id}>              
              <Text style={{ color: '#fff', fontFamily: 'Lato-Regular', textAlign: 'center', fontSize: 16 }}>{item.name}</Text>              
            </RadioButton>          
        )
      })
    }
  }

  renderIngredients() {
    let { meal } = this.state;
    if (meal.has_ingredients) {
      let ingredients = meal.ingredients
      return ingredients.map((ingredient, i) => {
        return (
          <ListItem key={ingredient.id} style={{borderBottomColor:'transparent'}}>
            <Left>
              <CheckBox
                label={ingredient.name}                
                labelStyle={{ color: '#fff', fontFamily: 'Lato-Regular', textAlign: 'center', fontSize: 16, marginLeft: 4 }}
                iconSize={20}
                iconName='matMix'
                checked={ingredient.checked == 1 ? true : false}     
                checkedColor='#11c0f6'
                uncheckedColor='white'
                onChange={(index,value) => this.addIngredient(ingredient)}
              />
            </Left>            
          </ListItem>
        )
      })
    }
  }
  renderExtra() {
    let { meal, ingredients } = this.state;        
    if (meal.has_ingredients) {
      let extra = meal.ingredients
      return extra.map((extra, i) => {
        return (
          <ListItem key={extra.id} style={{borderBottomColor:'transparent'}}>
            <Left>
              <CheckBox
                label={extra.name}                
                labelStyle={{ color: '#fff', fontFamily: 'Lato-Regular', textAlign: 'center', fontSize: 16, marginLeft: 4 }}
                iconSize={20}
                iconName='matMix'
                checked={extra.checked == 1 ? true : false}     
                checkedColor='#11c0f6'
                uncheckedColor='white'
                onChange={(index,value) => this.onClick(extra)}
              />
            </Left>
            <Right>
              <Text note style={{color:'#fff'}}>${extra.price}</Text>
            </Right>
          </ListItem>
        )
      })
    }
  }
  render() {
    const { meal, loading, number, total } = this.state;
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <ImageBackground resizeMode="cover" source={{ uri: meal.image != 'null' ? `${URL}/images/meals/${meal.image}` : this.props.banner }} style={{ width: "100%", height: 120, flexDirection: 'row' }}>
          <Header span={true} style={{ backgroundColor: 'transparent', elevation: 0, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { this.props.dismissMeal() }}>
              <Left style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 10, paddingTop: 20 }}>
                <Icon name="arrow-back" style={{ color: 'white', fontSize: 35, alignSelf: 'center', }} />
              </Left>
            </TouchableOpacity>
            <Right style={{ paddingTop: 10, alignItems: 'center' }}>
              {/*<Icon active name='time' style={{color:'white', fontSize: 25, alignSelf:'center'}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Regular', color:'#fff', fontSize: 16, textAlign: 'center'}}>00:{meal.preparation_time}:00</Text>*/}
            </Right>
          </Header>
        </ImageBackground>
        <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={style.background}>
        {loading ? <LoadingScreen /> : <Content padder>
          <View>
            <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
              <Text style={{ fontFamily: 'Lato-Bold', color: '#11c0f6', fontSize: 16 }}>{meal.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
              <Text style={{ fontFamily: 'Lato-Regular', color: '#fff', flex: 1, flexWrap: 'wrap', fontSize: 16 }}>{meal.description}</Text>
              <Text style={{ marginLeft: 10, fontFamily: 'Lato-Bold', color: '#fff', fontSize: 16 }}>${total.toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#11c0f6', marginTop: 10, flexDirection: 'row' }}>
            <Left style={{ flex: 1 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'Lato-Regular', fontSize: 16, paddingLeft: 10 }}>Cantidad</Text>
            </Left>
            <Right style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10 }}>
              <TextInput style={style.input} placeholderTextColor="#fff" underlineColorAndroid="#fff" keyboardType='numeric' value={number.toString()} editable={false} ></TextInput>
              <TouchableOpacity style={style.button} onPress={this.IncrementItem}><Text style={[style.text, { fontSize: 30 }]}>+</Text></TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={this.DecreaseItem}><Text style={[style.text, { fontSize: 35 }]}>-</Text></TouchableOpacity>
            </Right>
          </View>
          { (meal.has_subtype) ? 
            <List>
              <ListItem itemDivider style={{backgroundColor:'transparent'}}>
                { meal.is_combo ? <H3 style={style.text}>Elige tu base</H3> : <H3 style={style.text}>Elige tu presentación </H3> }  
              </ListItem>              
              <RadioGroup onSelect={(index, value) => this.onSelect(index, value)} selectedIndex={0} size={20} color={"white"} activeColor={"#11c0f6"} style={style.radioGroup}>
                {this.renderSubtypes()}
              </RadioGroup> 
            </List> : <View/>
          }

          {(meal.has_ingredients) ?
            <List>
              <ListItem itemDivider style={{backgroundColor:'transparent'}}>
                <View style={{flexDirection:'column'}}>
                  <H3 style={style.text}>Selecciona hasta {meal.limit_ingredients} ingredientes</H3>  
                  <Text note style={{color:'#fff'}}>Cada ingrediente extra tiene un costo de ${meal.extra_cost}</Text>              
                </View>
              </ListItem>
              {this.renderIngredients()}
            </List> : <View />
          }
          {/* {(meal.has_ingredients && meal.allow_extra) ?
            <List>
              <ListItem itemDivider style={{backgroundColor:'transparent'}}>
                <H3 style={style.text}>Agrega hasta {meal.limit_extra} ingredientes extra</H3>                
              </ListItem>
              {this.renderExtra()}
            </List> : <View />
          } */}
        </Content>
        }
        {!loading ? <Footer style={style.footer} noShadow>
          <Button rounded block style={style.confirm} onPress={this.check.bind(this)}>
            <H3 style={style.text}>Añadir al carrito ${total.toFixed(2)}</H3>
          </Button>
        </Footer> : <View />}
        </ImageBackground>
      </Container>
    );
  }

}
