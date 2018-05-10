import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, YellowBox, TextInput, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MapStyles';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    const address = params ? params.address : null;

    this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        address: address               
      };    

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated'
    ]);   
  }

  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);     
    if (this.state.address != null) {
      this.getLongLat(this.state.address)
        .then(response => {          
          this.setState({
            region: {
              latitude: response.geometry.location.lat,
              longitude: response.geometry.location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,            
            },
            title: response.formatted_address,          
          });
        });
      }
    else {          
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,            
            },          
          });
          this.getAddress(position.coords.latitude,position.coords.longitude)
              .then(response => this.setState({title: response}));           
        },
      (error) => {    
        alert(error.message);
        this.props.navigation.navigate('AllowLocation');
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });    
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };
  

  getAddress(lat,long){
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyCYIhiPOMgLbwZrN9vT8ChwNtPKqKkOrs0')
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          throw new Error(`Geocode error: ${json.status}`);
        }
        return json.results[0].formatted_address;
      }); 
  }

  getLongLat(address){
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCYIhiPOMgLbwZrN9vT8ChwNtPKqKkOrs0')
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          throw new Error(`Geocode error: ${json.status}`);
        }
        return json.results[0];
      }); 
  }

  confirm(screen) {    
    this.props.navigation.navigate('Home');  
  }

  openAllowLocation(){
    this.props.navigation.navigate('AllowLocation');
  }

  onMapPress(e){    
    this.setState({ 
      region: { 
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,        
      }, 
      title: null     
    });
    this.getAddress(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
        .then(response => this.setState({title: response}));           
  }

  render() {
    const { params } = this.props.navigation.state;
    const screen = params ? params.screen : null;
    return (
      <View style={styles.container}>        
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}                    
          region={ this.state.region }          
          zoomEnabled = {false} 
          onPress={(e) => this.onMapPress(e)}                     
        >      
        <MapView.Marker
          draggable                        
          coordinate={this.state.region}                      
          onDragEnd={(e) => this.onMapPress(e)}
          description={this.state.title}
        />          
        </MapView>
        <View style={styles.input}>
            <Icon name="search" size={20} color="#999999" style={{ paddingLeft:10}} onPress={this.openAllowLocation.bind(this)} />
            <TextInput editable = {false} underlineColorAndroid = {'transparent'} placeholder={this.state.title} style={{ width: 300, borderBottomWidth: 0}} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.confirm.bind(this, screen)} style={styles.bubble}>
            <Text style={{color: 'white'}}>Confirmar ubicación</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

