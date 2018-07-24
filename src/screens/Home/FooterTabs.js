import React, { Component } from 'react';
import { FooterTab, Button, Badge, Icon, Text } from 'native-base';
import { StyleSheet } from "react-native";
export default class FooterTabs extends Component{
  constructor(props){
    super(props);     
  }//Constructor.
  
  render(){
      return(
        <FooterTab style={{backgroundColor:'#11c0f6'}}>
            <Button badge vertical>
              <Badge><Text>{this.props.restaurants}</Text></Badge>
              <Icon name="apps" style={{color: '#fff'}}/>
              {/*<Text style={styles.text}>Todos</Text>*/}
            </Button>
            <Button vertical>
              <Icon name="star" style={{color: '#fff'}}/>
              {/*<Text style={styles.text}>Populares</Text>*/}
            </Button>
            <Button vertical>              
              <Icon name="flag" style={{color: '#fff'}} />
              {/*<Text style={styles.text}>Recomendado</Text>*/}
            </Button>
            <Button vertical>
              <Icon name="time" style={{color: '#fff'}}/>
              {/*<Text style={styles.text}>Entrega</Text>*/}
            </Button>
          </FooterTab>   
      )
  }//Render.
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',        
  }
})
