import React from 'react';
import { View, Dimensions, Alert, Image } from 'react-native';
import { customStyle } from '../../assets/LocationNightSection';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './MapStyles';
import { API_KEY, GOOGLE_PLACES_API } from '../../config/env';
import { Container, Content } from 'native-base';
let { width, height } = Dimensions.get('window');

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: this.props.region,
      restaurant: this.props.restaurant,
      address: null,
      mapStyle: customStyle,
      fullMap: false
    };    
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

  onRegionChange(region) {
    const { title } = this.state
    this.setState({ region });
    this.props.confirm(region, title)
  }

  render() {
    const { region, restaurant } = this.state;
    return (
      <Container style={styles.container}>
        <Image source={require('src/assets/images/location-ic.png')} style={styles.marker} />
        <MapView provider={PROVIDER_GOOGLE} customMapStyle={null} style={[styles.map, { width: width, height: height / 3 }]} region={region} onRegionChangeComplete={r => this.onRegionChange(r)} onPress={e => this.props.full()}>
          <MapView.Marker coordinate={restaurant}></MapView.Marker>
          <MapViewDirections
          apikey={GOOGLE_PLACES_API}          
          origin={restaurant}
          destination={region}
          strokeWidth={4}
          strokeColor={'blue'}
          />
        </MapView>
        
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }} style={{ zIndex: 30 }}>
          {/*<Image source={require('src/assets/images/ic.png')} resizeMode="center" style={{width: 32, height: 32}}/>*/}
        </Content>
      </Container>
    );
  }
}
