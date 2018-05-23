import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, YellowBox, TextInput, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE, ProviderPropType } from 'react-native-maps';
import styles from './MapStyles';
import { customStyle } from '../../assets/LocationNightSection';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends React.Component {
  constructor(props) {
    super(props);    

    this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        address: null,
        mapStyle: customStyle              
      };        
  }

  componentDidMount() {     
     //could change for address location saved in local storage            
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
              .then(response => { 
                let address = response.split(','); 
                this.setState({title: address[0] + ' ' + address[1]})
              });           
        },
      (error) => {    
        alert(error.message);  
        //When request address failed, get the last address storaged      
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });    
  }  

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
        .then(response => {
          let address = response.split(','); 
          this.setState({title: address[0] + ' ' + address[1]})
        });           
  }

  render() {    
    return (
      <View style={styles.container}>        
        <MapView provider={this.props.provider} customMapStyle={this.state.mapStyle} style={styles.map} region={ this.state.region } zoomEnabled={true}  onPress={(e) => this.onMapPress(e)}>      
          <MapView.Marker draggable coordinate={this.state.region} onDragEnd={(e) => this.onMapPress(e)} title={this.state.title} description={this.state.title}/>          
        </MapView>
        <View style={styles.in}>
          <Icon name="search" size={20} color="#999999" style={{ paddingLeft:5, paddingRight:5}}/>
          <TextInput ref={(ref) => this.input = ref} onSubmitEditing={(event) => {this.getLongLat(event.nativeEvent.text).then((response) => {
            let address = response.formatted_address.split(',');
            this.setState({
              region: {
                latitude: response.geometry.location.lat,
                longitude: response.geometry.location.lng, 
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,                          
              },
              title: address[0] + ' ' + address[1],          
            });
            this.input.clear();
            })}} underlineColorAndroid = {'transparent'} placeholder={this.state.title} style={{ width: 300, color:'grey', fontFamily: 'Lato-Light'}} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {this.props.confirm(this.state.region)}} style={styles.bubble}>
            <Text style={{color: 'white'}}>CONFIRMAR UBICACIÓN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
Maps.propTypes = {
  provider: ProviderPropType,
};
