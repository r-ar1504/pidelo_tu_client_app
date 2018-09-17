import React, { Component } from 'react';
import { FooterTab, Button, Badge, Icon, Text } from 'native-base';
import { StyleSheet, Alert } from "react-native";
import { URL } from "../../config/env";
export default class FooterTabs extends Component{
  constructor(props){
    super(props); 
    this.state = {      
      nextOrders:[],
      id:this.props.user.uid
    }    
  }//Constructor.
  componentWillMount(){
    this.getOrders().then( response => {
      const nextOrders = [];     
        for (let i = response.length - 1; i >= 0; i--) {
          if(response[i].status != 4) {            
            nextOrders.push(response[i]);
          }
        }
        this.setState({nextOrders: nextOrders});
    }).catch(error => {
      Alert.alert("Error",error.message)
    })
  }
  async getOrders(){    
    let { id } = this.state 
    return await fetch(`${URL}/orders/${id}`)
      .then((response) => {
        return response.json();
      }).catch((error) => {
        throw new Error(error.message)        
      });     
  }
  render(){
    const { nextOrders, historyOrders } = this.state
      return(
        <FooterTab style={{backgroundColor:'#4267B2'}}>
            <Button badge vertical style={{justifyContent:'center', alignItems:'center'}}>
              <Badge><Text style={{textAlign:'center'}}>{this.props.restaurants}</Text></Badge>
              <Icon name="apps" style={styles.icon}/>
              {/*<Text style={styles.text}>Todos</Text>*/}
            </Button>
            <Button vertical style={{justifyContent:'center', alignItems:'center'}}>
              <Icon name="star" style={styles.icon}/>
              {/*<Text style={styles.text}>Populares</Text>*/}
            </Button>
            <Button vertical style={{justifyContent:'center', alignItems:'center'}}>              
              <Icon name="flag" style={styles.icon} />
              {/*<Text style={styles.text}>Recomendado</Text>*/}
            </Button>
            <Button onPress={this.props.openOrders} badge vertical style={{justifyContent:'center', alignItems:'center'}}>
              <Badge><Text style={{textAlign:'center'}}>{nextOrders.length}</Text></Badge>
              <Icon name="time" style={styles.icon}/>
              {/*<Text style={styles.text}>Entrega</Text>*/}
            </Button>
          </FooterTab>   
      )
  }//Render.
}

const styles = StyleSheet.create({
  icon: {
    color: '#fff',  
    fontSize: 35      
  }
})
