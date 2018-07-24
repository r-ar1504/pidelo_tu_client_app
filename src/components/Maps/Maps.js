import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, TextInput, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
        marker: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        address: null,
        title: '',
        description: '',
        mapStyle: customStyle,
        disabled:true            
      };        
  }

  componentDidMount() {          
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            marker: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          });
          this.getAddress(position.coords.latitude,position.coords.longitude)
              .then(response => { 
                let address = response.split(','); 
                this.setState({title: address[0] + ' ' + address[1], disabled: false})
              });           
        },
      (error) => {    
        Alert.alert("PídeloTú",error.message);  
        //When request address failed, get the last address storaged or a default location      
      });    
  }  

  async getAddress(lat,long){
    return await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyCYIhiPOMgLbwZrN9vT8ChwNtPKqKkOrs0')
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          throw new Error(`Geocode error: ${json.status}`);
        }
        return json.results[0].formatted_address;
      });
  }

  async getLongLat(address){
    return await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCYIhiPOMgLbwZrN9vT8ChwNtPKqKkOrs0')
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          throw new Error(`Geocode error: ${json.status}`);
        }
        return json.results[0];
      }); 
  }  

  onMapPress(e){   
    this.getAddress(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
        .then(response => {
          let address = response.split(','); 
          this.setState({title: address[0] + ' ' + address[1]})
        });           
    this.setState({ 
      region: { 
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude, 
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,             
      },
      marker: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude, 
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,  
      },            
    });           
  }

  onRegionChange(region) {
    this.setState({ region });
    LATITUDE_DELTA = region.latitudeDelta;
    LONGITUDE_DELTA = region.longitudeDelta;
  }

  render() {  
    const { title, marker, mapStyle, description, region } = this.state;  
    return (
      <View style={styles.container}>        
        <MapView provider={PROVIDER_GOOGLE} customMapStyle={mapStyle} style={styles.map} region={ region } onRegionChangeComplete={this.onRegionChange.bind(this)} onPress={(e) => this.onMapPress(e)}>      
          <MapView.Marker draggable coordinate={marker} onDragEnd={(e) => this.onMapPress(e)} title={title} description={description}/>          
        </MapView>
        <View style={styles.in}>
          <Icon name="search" size={20} color="#999999" style={{ paddingLeft:10}}/>
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
          <TouchableOpacity onPress={() => {this.props.goBack()}} style={styles.bubble}>
            <Text style={{color: 'white', textAlign:'center'}}>REGRESAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.confirm(this.state.region)}} style={styles.bubble} disabled={this.state.disabled} >
            <Text style={{color: 'white', textAlign:'center'}}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
