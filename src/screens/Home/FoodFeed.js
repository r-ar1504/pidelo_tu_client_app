import React, { Component } from 'react';
import { Body, Left, Thumbnail, Card, CardItem, Button, Text, Icon, Right} from 'native-base';
import{ Image, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import { Rating } from 'react-native-elements';
import moment from "moment";
import { URL} from "../../config/env";
import { FONT_NORMAL } from "../../assets/GlobalStyleSheet";
const { width } = Dimensions.get('window')
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

  ratingCompleted(rating) {
    Alert.alert("Rating","Rating is: " + rating)
  }

  render(){
		const { restaurant_data, info } = this.state
      return(
        	<Card key={restaurant_data.id} style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: URL+'/images/logos/'+restaurant_data.logo}} />
                <Body>
                  <Text style={{fontSize:30, fontFamily:FONT_NORMAL, letterSpacing: 6}}>{restaurant_data.name}</Text>                  
                  <Text style={{fontFamily: FONT_NORMAL}} note>{info}</Text>
                </Body>
              </Left>
            </CardItem>
            <TouchableWithoutFeedback onPress={this.openRestaurant.bind(this,restaurant_data)}>
              <CardItem>              
                <Body>
                  <Image resizeMode="contain" source={{uri: URL+'/images/restaurants/banners/'+restaurant_data.banner}} style={{height: 200, width: width * .90, flex: 1}}/>
                  {/*<Text style={{fontSize: 16, fontFamily: FONT_NORMAL}}>
                    {restaurant_data.details} - {restaurant_data.address}
                  </Text>*/}
                </Body>              
              </CardItem>
            </TouchableWithoutFeedback>
            <CardItem>              
              <Left>
                <Rating                  
                  type="star"
                  readonly
                  showReadOnlyText={false}
                  fractions={1}
                  startingValue={3.6}                
                  imageSize={20}
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingVertical: 10 }}
                />
                {/*<Button transparent textStyle={{color: '#87838B'}} onPress={this.openRestaurant.bind(this,restaurant_data)}>
                  <Icon name="restaurant" style={{color: '#11c0f6' }}/>
                  <Text style={{color: '#11c0f6', fontFamily:FONT_NORMAL }}>Ver Más</Text>
                </Button>*/}
              </Left>
              <Right>
                <Body style={{flexDirection:'row'}}>
                  <Icon active name='time' style={{color: '#11c0f6',fontSize: 25, alignSelf:'center'}} />                              
                  <Text style={{fontFamily:FONT_NORMAL, marginLeft: 6, fontSize:16}} note>35 - 40 min</Text>    
                </Body>            
              </Right>
            </CardItem>
          </Card>       
      )
  }//Render.
}