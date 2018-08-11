import React from 'react';
import { View, Dimensions, Alert, Image } from 'react-native';
import { customStyle } from '../../assets/LocationNightSection';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MapStyles';
import FullMaps from './FullMaps';
import { API_KEY } from '../../config/env';
let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.00322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      region: this.props.region,       
      address: null,      
      mapStyle: customStyle,      
      fullMap:false            
    };        
  }
  
  componenDidMount(){
    Alert.alert(JSON.stringify(this.props.region))
  }   

  async getAddress(lat,long){
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
    LATITUDE_DELTA = region.latitudeDelta;
    LONGITUDE_DELTA = region.longitudeDelta;
    this.props.confirm(region,title)
  }

  render() {  
    const { region } = this.state;      
    return (
      <View style={styles.container}>                                
        <MapView provider={PROVIDER_GOOGLE} customMapStyle={null} style={{width:width, height: height / 3}} region={ region } onRegionChangeComplete={r => this.onRegionChange(r)} onPress={e => this.props.full()}>          
        </MapView>                                                  
        <Image source={require('src/assets/images/ic.png')} resizeMode="center" style={{width: 32, height: 32, position: 'absolute', justifyContent:'center', alignSelf:'center', alignItems:'center'}}/>                                              
      </View>
    );
  }
}
