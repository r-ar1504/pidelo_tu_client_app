import React from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, AsyncStorage, Dimensions, RefreshControl } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, List } from 'native-base';
import { COLOR_SECONDARY, COLOR_PRIMARY } from '../../assets/GlobalStyleSheet';
import { URL, API_KEY } from "../../config/env";
import ValidationComponent from 'react-native-form-validator';
import styles from './CartShopStyle';
import firebase from 'react-native-firebase';
import stripe from 'tipsi-stripe'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Mapa from '../../components/Maps/Maps';
import CardList from '../../components/CardList/CardList';
import getCoordinates from "../../components/Maps/getCurrentPosition";
import Maps from '../../components/Maps/FullMaps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.00322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class CartShop extends ValidationComponent {
  static navigationOptions = {
    headerTransparent: true
  }
  constructor(props) {
    super(props);
    this.state = { payments: [], carShop: [], restaurantCoords: {}, total: 0, envio: 25.0, currentCard: '', fullMap: false, onchange: false, loading: true, loadingData: true, expMonth: '', expYear: '', csv: '', region: { latitude: LATITUDE, longitude: LONGITUDE, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }, title: '' }
  }

  componentDidMount() {
    stripe.setOptions({
      publishableKey: 'pk_test_ysldBcxPOteZsxPbQot6dMwT',
      merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test', // Android only
    })

    this.getData()
  }

  componentWillUnmount() {
    this.onRegionChange = null;
  }

  getData() {
    this.getItems().then(async (response) => {
      const cart = response.carshop;
      if (!cart) {
        this.setState({ loadingData: false }); Alert.alert("PídeloTú", "No hay elementos en tu carrito"); this.props.navigation.goBack();
      }
      else {
        let subtotal = 0.0;
        if (response.payments.length > 0) {
          let last = response.payments[response.payments.length - 1];
          this.setState({ payments: response.payments, currentCard: last.card_number.toString(), expMonth: last.expMonth, expYear: last.expYear, csv: last.cvc });
        }
        cart.map((item) => {
          subtotal = subtotal + parseFloat(item.total);
        });
        this.setState({ carShop: cart, total: subtotal, restaurantCoords: response.coords, loadingData: false });
        getCoordinates().then(position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          });
          this.getAddress(position.coords.latitude, position.coords.longitude).then(response => {
            let address = response.split(',');
            this.setState({ title: address[0] + ' ' + address[1], loading: false })
          }).catch(error => {
            this.setState({ loading: false });
            Alert.alert("Error", error.message)
          });
        }).catch(error => {
          this.setState({ loading: false });
          Alert.alert("Error", error.message)
        })
      }
    })
      .catch((error) => {
        this.setState({ loadingData: false }); Alert.alert("PídeloTú", error.message); this.props.navigation.goBack();
      });
  }

  async getAddress(lat, long) {
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          throw new Error(`Geocode error: ${json.status}`);
        }
        return json.results[0].formatted_address;
      });
  }


  async getItems() {
    let uid = firebase.auth().currentUser.uid;
    return await fetch(`${URL}/cart/${uid}`)
      .then(res => { return res.json() })
      .catch(error => {
        throw new Error(error.message);
      });
  }

  latFrom = (restaurantCoords) => {
    return restaurantCoords.latitude * (Math.PI / 180)
  }
  lonFrom = (restaurantCoords) => {
    return restaurantCoords.longitude * (Math.PI / 180)
  }
  latTo = (region) => {
    return region.latitude * (Math.PI / 180)
  }
  lonTo = (region) => {
    return region.longitude * (Math.PI / 180)
  }

  getServiceDistance = () => {
    // convert from degrees to radians
    const { restaurantCoords, region } = this.state
    const earthRadius = 6371000

    let latDelta = this.latTo(region) - this.latFrom(restaurantCoords);
    let lonDelta = this.lonTo(region) - this.lonFrom(restaurantCoords);

    let angle = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(latDelta / 2), 2) +
      Math.cos(this.latFrom(restaurantCoords)) * Math.cos(this.latTo(region)) * Math.pow(Math.sin(lonDelta / 2), 2)));

    return angle * earthRadius;
  }

  deleteItem(item, index) {
    this.setState({ loading: true });
    let { carShop, total } = this.state;
    let array = carShop;
    this.delete(item.id, firebase.auth().currentUser.uid).then(async (res) => {
      if (res.message == 'Success') {
        let subtotal = total - item.total
        array.splice(index, 1);
        if (array.length == 0) {
          await AsyncStorage.removeItem('restaurant')
        }
        this.setState({ carShop: array, total: subtotal, loading: false })
      }
    }).catch((error) => {
      Alert.alert("Error", error.message);
      this.setState({ loading: false })
    });
  }

  removeCard(item, index) {
    this.setState({ loading: true });
    let { payments } = this.state;
    let array = payments;
    this.remove(item).then(async (res) => {
      if (res.message == 'Success') {
        array.splice(index, 1);
        this.setState({ payments: array, loading: false })
      }
    }).catch((error) => {
      Alert.alert("Error", error.message);
      this.setState({ loading: false })
    });
  }


  async delete(id, firebaseId) {
    return await fetch(`${URL}/cart/delete/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': firebaseId
      }
    })
      .then(response => { return response.json() })
      .catch(error => {
        throw new Error(error.message);
      })
  }

  async store(region, token) {
    const { carShop, envio } = this.state;
    return await fetch(`${URL}/order`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartShop: carShop,
        user_id: firebase.auth().currentUser.uid,
        latitude: region.latitude,
        longitude: region.longitude,
        token: token,
        envio: envio
      })
    })
      .then(response => { return response.json() })
      .catch(error => {
        throw new Error(error.message);
      });
  }

  async remove(card) {
    return await fetch(`${URL}/card/delete/${card}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': firebase.auth().currentUser.uid,
      }
    }).then(response => {
      return response.json()
    }).catch(error => {
      throw new Error(error.message)
    })
  }

  async generateToken() {
    let { currentCard, expMonth, expYear, csv } = this.state
    let params = {
      number: currentCard,
      expMonth: parseInt(expMonth),
      expYear: parseInt(expYear),
      cvc: csv.toString(),
      currency: 'usd',
    }
    return await stripe.createTokenWithCard(params)
  }

  onRegionChange(region, title) {
    this.setState({ region: region });
    const response = this.getServiceDistance()    
    let km = response / 1000
    if (parseInt(km) > 0) {
      let extra = km - 5
      let totalkm = extra * 3
      this.setState({envio:25.0 + totalkm})
      // Alert.alert("Response", response.toString() + "KM: " + km)
    }
    else { 
      this.setState({envio: 25.0})
    }
    // Alert.alert("Response", response.toString() + "KM: " + km)
  }

  onRegionChangeComplete(region, title) {
    this.setState({
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    })
    this.setState({ fullMap: false })    
  }

  openMap() {
    this.setState({ fullMap: true })
    LATITUDE_DELTA = this.state.region.latitudeDelta;
    LONGITUDE_DELTA = this.state.region.longitudeDelta;
  }

  changeCard(card) {
    this.setState({ onchange: false, currentCard: card.card_number.toString(), expMonth: card.expMonth, expYear: card.expYear, csv: card.cvc })
  }

  accept() {
    this.setState({ loading: true })
    this.generateToken().then((token) => {
      const { region } = this.state;
      this.store(region, token.tokenId).then(async (response) => {
        await AsyncStorage.removeItem('restaurant')
        Alert.alert("PídeloTú", response.message, [{ text: 'OK', onPress: () => { this.setState({ loading: false }); this.props.navigation.navigate('Home', { user: firebase.auth().currentUser }) } }], { cancelable: false });
      }).catch((error) => {
        this.setState({ loading: false })
        Alert.alert("Error", error.message);
      })
    }).catch((error) => {
      this.setState({ loading: false })
      Alert.alert("Error", error.message);
    })
  }

  renderCarShop() {
    let { carShop, total } = this.state;
    return carShop.map((item, i) => {
      return (
        <View key={item.id} style={{ flexDirection: 'row', borderBottomColor: 'white', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderWidth: 0.8, width: '100%' }}>
          <Left style={{ padding: 5 }}>
            <Text style={styles.text}>{item.quantity}</Text>
          </Left>
          <Body style={{ padding: 5 }}>
            <Text style={styles.text}>{item.name}</Text>
          </Body>
          <Right style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', padding: 5 }}>
            <Text style={styles.text}>${item.total}</Text>
            <TouchableWithoutFeedback onPress={this.deleteItem.bind(this, item, i)}>
              <Icon active name={'close'} style={{ color: 'white', marginLeft: 10 }}></Icon>
            </TouchableWithoutFeedback>
          </Right>
        </View>
      )
    })
  }

  renderPayment() {
    const { currentCard, payments } = this.state;
    if (payments.length) {
      return (
        <View>
          <View style={{ flexDirection: 'row', borderBottomColor: 'white', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderWidth: 0.8, width: '100%' }}>
            <Left style={{ padding: 10, flexDirection: 'row' }}>
              <Image source={require('../../assets/images/Visa_Logo.png')} style={{ width: 35, height: 20, resizeMode: 'contain', marginRight: 10 }} /><Text style={[styles.text]}>●●●{currentCard.substring(12, 16)}</Text>
            </Left>
            <Body style={{ padding: 10 }}>
              <Text style={styles.text}></Text>
            </Body>
            <Right style={{ padding: 10 }}>
              <TouchableWithoutFeedback onPress={() => { this.setState({ onchange: true }) }}>
                <Text style={[styles.text]}>Cambiar</Text>
              </TouchableWithoutFeedback>
            </Right>
          </View>
        </View>
      )
    }
  }

  render() {
    const { onchange, loading, total, carShop, payments, fullMap, region, loadingData, envio } = this.state;
    if (onchange) {
      return (
        <Container style={{ backgroundColor: COLOR_SECONDARY }}>
          <Header hasTabs style={{ backgroundColor: 'transparent' }}>
            <TouchableOpacity onPress={() => { this.setState({ onchange: false }) }}>
              <Left style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="arrow-back" style={{ color: 'white', fontSize: 35, alignSelf: 'center', }} />
              </Left>
            </TouchableOpacity>
            <Body style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
              <Text style={styles.text}>Formas de Pago</Text>
            </Body>
            <Right style={{ flex: 1 }}>

            </Right>
          </Header>
          <Content style={{ backgroundColor: 'white' }}>
            <List>
              {loading ? <LoadingScreen /> : <CardList cards={payments} removeCard={this.removeCard.bind(this)} changeCard={this.changeCard.bind(this)} />}
            </List>
          </Content>
        </Container>
      )
    }
    return (
      <Container>
        {fullMap ? <Maps title={this.state.title} region={this.state.region} confirm={this.onRegionChangeComplete.bind(this)} /> : <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}>
          <Header style={{ backgroundColor: 'transparent', elevation: 0 }}>
            <Left style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                <Icon name="arrow-back" style={{ color: 'white', fontSize: 35 }} />
              </TouchableOpacity>
            </Left>
            <Body style={{ flex: 3 }}>
              <View style={styles.meal} >
                <Text style={styles.Title}>TU CARRITO DE COMPRAS</Text>
              </View>
            </Body>
            <Right style={{ flex: 1 }}>
            </Right>
          </Header>
          {loading ? <LoadingScreen /> : <Content refreshControl={
            <RefreshControl
              refreshing={loadingData}
              onRefresh={this.getData.bind(this)}
              colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
            />
          }>
            {this.renderCarShop()}
            <View style={{ flexDirection: 'row', borderBottomColor: 'white', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderWidth: 0.8, width: '100%' }}>
              <Left style={{ padding: 10, flex: 1 }}>
                <Text style={[styles.text]}>Subtotal</Text>
                <Text style={[styles.text]}>Costo de Envío</Text>
              </Left>
              <Body style={{ padding: 10 }}>
                <Text style={styles.text}></Text>
              </Body>
              <Right style={{ padding: 10 }}>
                <Text style={[styles.text]}>${total.toFixed(2)}</Text>
                <Text style={[styles.text]}>${envio.toFixed()}</Text>
              </Right>
            </View>
            <View style={{ flexDirection: 'row', borderBottomColor: 'white', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderWidth: 0.8, width: '100%' }}>
              <Left style={{ padding: 10 }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Total</Text>
              </Left>
              <Body style={{ padding: 10 }}>
                <Text style={styles.text}></Text>
              </Body>
              <Right style={{ padding: 10 }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>${(total + envio).toFixed(2)}</Text>
              </Right>
            </View>
            {this.renderPayment()}
            <Mapa full={this.openMap.bind(this)} region={this.state.region} confirm={this.onRegionChange.bind(this)} />
            {payments.length ?
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity style={styles.confirm} onPress={this.accept.bind(this)}><Text style={styles.text}>ORDENAR</Text></TouchableOpacity>
              </View> :
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity style={styles.confirm} onPress={() => { this.props.navigation.navigate('Payment', { screen: 'CartShop' }) }}><Text style={styles.text}>AGREGAR FORMA DE PAGO</Text></TouchableOpacity>
              </View>}
          </Content>}
        </ImageBackground>}
      </Container>
    );
  }
}