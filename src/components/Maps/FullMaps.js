import React from 'react';
import { Text, Dimensions, Alert, Image, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button, Footer, Content, Header, Container } from "native-base";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { customStyle } from '../../assets/LocationNightSection';
import { API_KEY, GOOGLE_PLACES_API } from '../../config/env';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getCoordinates from "./getCurrentPosition";
import styles from './MapStyles';
const { width, height } = Dimensions.get('window')
export default class FullMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: this.props.region,
      restaurant: this.props.restaurant,
      title: '',
      description: '',
      mapStyle: customStyle,
    };
  }

  componentWillMount() {
    const { latitude, longitude } = this.state.region
    this.getAddress(latitude, longitude).then(response => {
      let address = response.split(',');
      // console.warn("Address",response)
      this.setState({ title: `${address[0]} ${address[1]}` })
    }).catch(error => {
      this.setState({ loading: false });
      Alert.alert("Error", error.message)
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

  async getLongLat(address) {
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          throw new Error(`Geocode error: ${json.status}`);
        }
        return json.results[0];
      });
  }

  getCurrentPosition() {
    getCoordinates().then(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.props.region.latitudeDelta,
          longitudeDelta: this.props.region.longitudeDelta,
        }
      });
      this.setState({ loading: false });
    }).catch(error => {
      this.setState({ loading: false });
      Alert.alert("Error", error.message)
    })
  }

  onRegionChange(region) {
    this.setState({ region });
    this.getAddress(region.latitude, region.longitude).then(response => {
      let address = response.split(',');
      this.setState({ title: `${address[0]} ${address[1]}` })
      // console.warn("Address",address)
      this.locationRef.setAddressText(address[0])
    }).catch(error => {
      this.setState({ loading: false });
      Alert.alert("Error", error.message)
    });
  }  

  render() {
    const { title, mapStyle, description, region, restaurant } = this.state;
    return (
      <Container style={styles.fullContainer}>
        <Image source={require('src/assets/images/location-ic.png')} style={styles.marker} />
        <MapView provider={PROVIDER_GOOGLE} customMapStyle={null} style={styles.map} region={region} onRegionChangeComplete={r => this.onRegionChange(r)}>
        <MapView.Marker coordinate={restaurant}></MapView.Marker>
          <MapViewDirections
          apikey={GOOGLE_PLACES_API}          
          origin={restaurant}
          destination={region}
          strokeWidth={4}
          strokeColor={'blue'}
          />
        </MapView>
        <GooglePlacesAutocomplete
          placeholder={"Ingresa tú ubicación"}
          minLength={2}
          autoFocus={false}
          listViewDisplayed='false'
          returnKeyType={'search'}
          fetchDetails={false}
          nearbyPlacesAPI='GoogleReverseGeocoding'
          ref={(instance) => { this.locationRef = instance }}
          styles={{
            listView: {
              zIndex: 6,
              width: width * .90,
              backgroundColor: 'white'
            },
            textInputContainer: {
              alignSelf: 'center',
              width: width * .90,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderTopColor: 'white',
              borderBottomColor: 'white',
              marginTop: 15,
              zIndex: 6
            },
            textInput: {
              width: 300,
              color: 'grey',
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              backgroundColor: 'white'
            },
            description: {
              fontWeight: 'bold',
              fontFamily: 'Lato-Regular'
            },
          }}
          enablePoweredByContainer={false}
          textInputProps={{ underlineColorAndroid: 'rgba(0,0,0,0)' }}
          currentLocation={false}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_PLACES_API,
            language: 'es', // language of the results
            types: 'address' // default: 'geocode'
          }}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            this.getLongLat(data.description).then((response) => {
              let address = response.formatted_address.split(',');
              // console.warn("Data", data)
              // console.warn("Description", details)
              this.setState({
                region: {
                  latitude: response.geometry.location.lat,
                  longitude: response.geometry.location.lng,
                  latitudeDelta: this.props.region.latitudeDelta,
                  longitudeDelta: this.props.region.longitudeDelta,
                },
                title: `${address[0]} ${address[1]}`,
              });
            }).catch(err => { Alert.alert("Error", err.message) })
          }}
          renderLeftButton={() => <TouchableWithoutFeedback onPress={this.getCurrentPosition.bind(this)} >
          <Icon name="locate" style={[styles.icon, { paddingLeft: 10 }]} />
        </TouchableWithoutFeedback> }
          renderRightButton={() => <TouchableWithoutFeedback onPress={() => { this.locationRef.setAddressText("") }} >
          <Icon active name="close" style={[styles.icon, { paddingRight: 10 }]} />
        </TouchableWithoutFeedback>}
        />
        <Header noShadow style={{ backgroundColor: 'transparent', zIndex: 6 }}>
          {/* <View style={styles.in}>
            <Icon active name="search" style={styles.icon} />
            <TextInput ref={(ref) => this.input = ref} onSubmitEditing={(event) => {
              this.getLongLat(event.nativeEvent.text).then((response) => {
                let address = response.formatted_address.split(',');
                this.setState({
                  region: {
                    latitude: response.geometry.location.lat,
                    longitude: response.geometry.location.lng,
                    latitudeDelta: this.props.region.latitudeDelta,
                    longitudeDelta: this.props.region.longitudeDelta,
                  },
                  title: address[0] + ' ' + address[1],
                });
                this.input.clear();
              }).catch(err => { Alert.alert("Error", err.message) })
            }} underlineColorAndroid={'transparent'} placeholder={this.state.title} style={{  }} />
          </View> */}
        </Header>
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }} style={{ zIndex: 30 }}>

          {/*<Image source={require('src/assets/images/ic.png')} resizeMode="center" style={{width: 32, height: 32}}/>*/}
        </Content>
        <Footer style={{ height: 120, backgroundColor: 'transparent', zIndex: 30, flexDirection: 'row' }} noShadow>
          <Button block info onPress={() => { this.props.confirm(this.state.region, title) }} style={styles.bubble}>
            <Text style={{ color: 'white', textAlign: 'center' }}>CONFIRMAR</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}