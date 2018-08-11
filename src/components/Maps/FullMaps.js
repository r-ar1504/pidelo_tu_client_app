import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, TextInput, BackHandler, Image } from 'react-native';
import { Icon, Button, Footer, Content, Header, Container } from "native-base";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MapStyles';
import { customStyle } from '../../assets/LocationNightSection';
import { API_KEY } from '../../config/env';

let { width, height } = Dimensions.get('window');

export default class Maps extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
        region: this.props.region,        
        address: null,
        title: this.props.title,
        description: '',
        mapStyle: customStyle,                   
      };        
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

  async getLongLat(address){
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          throw new Error(`Geocode error: ${json.status}`);
        }
        return json.results[0];
      }); 
  }  

  onRegionChange(region) {    
    this.setState({ region });      
  }  

  render() {  
    const { title, mapStyle, description, region } = this.state;  
    return (
      <Container style={styles.fullContainer}>        
        <MapView provider={PROVIDER_GOOGLE} customMapStyle={null} style={styles.map} region={ this.state.region } onRegionChangeComplete={r => this.onRegionChange(r)}>      
          <MapView.Marker draggable coordinate={region} onDragEnd={(e) => this.onMapPress(e)} title={title} description={description}>
            <Image source={require('src/assets/images/ic.png')} resizeMode="center" style={{width: 32, height: 32}}/>                                                                  
          </MapView.Marker>
        </MapView>                  
        <Header noShadow style={{ backgroundColor: 'transparent', zIndex:6}}>
          <View style={styles.in}>
            <Icon name="search" size={20} color="#999999" style={{ paddingLeft:10}}/>
            <TextInput ref={(ref) => this.input = ref} onSubmitEditing={(event) => {this.getLongLat(event.nativeEvent.text).then((response) => {
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
              })}} underlineColorAndroid = {'transparent'} placeholder={this.state.title} style={{ width: 300, color:'grey', fontFamily: 'Lato-Light'}} />
          </View>    
        </Header>
        <Content style={{zIndex:30}}>             
            {/*<Image source={require('src/assets/images/ic.png')} resizeMode="center" style={{width: 32, height: 32}}/>*/}                                                                  
        </Content>
        <Footer style={{height: 120, backgroundColor: 'transparent', zIndex:30}} noShadow>          
          <View style={styles.buttonContainer}>          
            <Button block info onPress={() => {this.props.confirm(this.state.region,title)}} style={styles.bubble}>
              <Text style={{color: 'white', textAlign:'center'}}>CONFIRMAR</Text>
            </Button>
          </View>
        </Footer>
      </Container>
    );
  }
}