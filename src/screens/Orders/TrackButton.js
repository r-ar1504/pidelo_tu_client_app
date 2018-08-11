import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground, Alert } from 'react-native';
import styles from './OrderHistoryStyle'


export default class TrackButton extends Component {  
    constructor(props){
        super(props);

        this.getCoords = this.getCoords.bind(this);
    }

    getCoords(){
        let ids = this.props.rest_id;
        this.props.openMap(ids);
    }

    render(){
        return(
        <View style={{flex:2}}>
            <Button rounded small style={styles.button}  rest_id={this.props.rest_id} onPress={this.getCoords}><Text style={styles.buttonText}>Rastrear pedido</Text></Button>    
        </View>
        )
    }
}