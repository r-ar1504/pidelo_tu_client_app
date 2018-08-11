import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Left, Body, Right, List, ListItem, Thumbnail, Text, SwipeRow, Button, Icon } from "native-base";
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import styles from "./CardListStyle";
export default class CardList extends Component {
  constructor(props){
    super(props);        
  }      
  render() {     
    if(this.props.cards.length){
      return this.props.cards.map((card,i) => {
        return(  
          <ListItem key={i} thumbnail onPress={() => this.props.changeCard(card)}>
            <Left>                    
              <Thumbnail square small source={require('../../assets/images/Visa_Logo.png')} resizeMode="center" />
            </Left>
            <Body>
              <Text>●●●●{card.card_number.toString().substring(12,16)}</Text>
              <Text note numberOfLines={1}>{card.expMonth}/{card.expYear}</Text>
            </Body>
            <Right>
              <Button danger onPress={() => this.props.removeCard(card.id,i)}>
                <Icon active name="trash" />
              </Button>
            </Right>
          </ListItem>                                           			     
        )
      })    		  
    }
    return <List/>
	}
 }
