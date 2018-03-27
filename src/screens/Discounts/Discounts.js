import React from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {Container, Header, Content, Body, Right, Left, Card, CardItem, Separator, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import{
StyleSheet,
View,
StatusBar ,
TouchableOpacity,
ScrollView,
BackHandler,
Image } from 'react-native';
import styles from './DiscountsStyle';

export default class Discounts extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
		<Container>
          <Header style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: 150}} backgroundColor="#0f44cd">
            <Left style={{ flex: 1 }}>
              <Icon size={20} name="arrow-left" color="#fff" onPress={()=>{
              this.props.navigation.navigate('Home')}} />
            </Left>
            <Right style={{ flex: 1 }}>
              <Text style={styles.MainText}>CUPONES & {"\n"} PROMOCIONES</Text>
            </Right>

          </Header>
          <Content>
          	<Card>
          		<Separator style={{backgroundColor:'#fff'}}>

          		</Separator>
            	<CardItem>
                <Left>
                  <Text style={styles.textPromo}>2 x 1 </Text>
                </Left>
            		<Body>
            			<Image source={require('src/assets/images/salad.jpeg')} style={styles.food}/>
            			<Text style={styles.description}>en todas las ensaladas</Text>
            		</Body>
                <Right>
                  <Text>Ensaladas</Text>
                </Right>
            	</CardItem>
            	<Separator style={{backgroundColor:'#fff'}}>

          		</Separator>
            	<CardItem>
                <Left>
                  <Text style={styles.textPromo}>20 % </Text>
                </Left>
            		<Body>
            			<Image source={require('src/assets/images/chicken.jpeg')} style={styles.food}/>
            			<Text style={styles.description}>en la compra de la segunda orden</Text>
            		</Body>
                <Right>
                  <Text>Alitas</Text>
                </Right>
            	</CardItem>
            	<Separator style={{backgroundColor:'#fff'}}>

          		</Separator>
            	<CardItem>
                <Left>
                  <Text style={styles.textPromo}>3 </Text>
                </Left>
            		<Body>
            			<Image source={require('src/assets/images/food2.jpg')} style={styles.food}/>
            			<Text style={styles.description}>ingredientes extras gratis en la compra de pizza grande</Text>
            		</Body>
                <Right>
                  <Text>Pizza</Text>
                </Right>
            	</CardItem>
          	</Card>
          </Content>
        </Container>

		)
	}
}
