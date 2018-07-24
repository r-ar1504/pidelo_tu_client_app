import React, { Component } from 'react';
import { Body, Left, Thumbnail, Card, CardItem, Button, Text, Icon} from 'native-base';
import{ Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
const { width } = Dimensions.get('window')
import moment from "moment";
export default class FoodFeed extends Component{
  constructor(props){
    super(props);
    this.state = {
			restaurant_data: JSON.parse(this.props.restaurant),
			info: '',
			not_working: false
    }//state    
	}//Constructor.  
	
	componentDidMount(){    
    let { restaurant_data } = this.state;    
    let now = moment(moment(),'hh:mm a');
    let before = moment(restaurant_data.open_time,'hh:mm a');
    let after = moment(restaurant_data.close_time,'hh:mm a');
    if(!restaurant_data.not_working) {
      if (now.isBetween(before,after)) 
        this.setState({info:'Abierto'});      
      else 
        this.setState({info:'Cerrado, abre a las '+ before.format('hh:mm a'), not_working:true});      
    }
    else 
      this.setState({info:'El restaurante no está recibiendo pedidos en este momento.', not_working:true})    
  }

  openRestaurant(restaurant){
    this.props.openRest(restaurant)
  }

  render(){
		const { restaurant_data, info } = this.state
      return(
        	<Card key={restaurant_data.id} style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http://pidelotu.azurewebsites.net/images/logos/'+restaurant_data.logo}} />
                <Body>
                  <Text style={{fontSize:30, fontFamily:'Lato-Light', letterSpacing: 10}}>{restaurant_data.name}</Text>                  
                  <Text style={{fontFamily: 'Lato-Light'}} note>{info}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <TouchableWithoutFeedback onPress={this.openRestaurant.bind(this,restaurant_data)}>
                <Body>
                  <Image resizeMode="contain" source={{uri: 'http://pidelotu.azurewebsites.net/images/restaurants/banners/'+restaurant_data.banner}} style={{height: 200, width: width * .90, flex: 1}}/>
                  {/*<Text style={{fontSize: 16, fontFamily: 'Lato-Light'}}>
                    {restaurant_data.details} - {restaurant_data.address}
                  </Text>*/}
                </Body>
              </TouchableWithoutFeedback>
            </CardItem>
            <CardItem>
              {/*<Left>
                <Button transparent textStyle={{color: '#87838B'}} onPress={this.openRestaurant.bind(this,restaurant_data)}>
                  <Icon name="restaurant" style={{color: '#11c0f6' }}/>
                  <Text style={{color: '#11c0f6', fontFamily:' Lato-Light' }}>Ver Más</Text>
                </Button>
              </Left>*/}
            </CardItem>
          </Card>       
      )
  }//Render.
}