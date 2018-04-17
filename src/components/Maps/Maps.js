import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, YellowBox, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MapStyles';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class DefaultMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated'
    ]);   
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,            
          },          
        });
        this.getAddress(position.coords.latitude,position.coords.longitude)
            .then(response => this.setState({title: response}));           
      },
    (error) => alert(error.message),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );    
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

  confirm(screen) {
    if (screen == 'AllowLocation') {
      this.props.navigation.navigate('Payment');
    }
    else {
      this.props.navigation.navigate('Home');
    }
  }

  onMapPress(e){    
    this.setState({ 
      region: { 
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,        
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
            <Icon name="search" size={20} color="#999999" style={{ paddingLeft:10}} />
            <TextInput editable = {false} underlineColorAndroid = {'transparent'} placeholder={this.state.title} style={{ width: 300, borderBottomWidth: 0}}/>
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

