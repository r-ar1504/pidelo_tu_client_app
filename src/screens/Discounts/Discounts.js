import React from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left, Card, CardItem, Separator, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, BackHandler, Image, ImageBackground } from 'react-native';
import styles from './DiscountsStyle';

export default class Discounts extends React.Component {

	constructor(props){
		super(props);
	}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);  
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

	render(){
		return (
		<Container>
          <Image source={require('src/assets/images/bg.png')} style={styles.header}/>
          <Header style={{ backgroundColor:'transparent', elevation: 0, flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'flex-start', height: 50 }}>
            <Left style={{flex: 1}}>
              <Icon name="arrow-left" size={20} color="#fff" onPress={()=>{this.props.navigation.goBack()}} />
            </Left>
            <Body style={{flex: 1}}>

            </Body>
            <Right style={{ flex: 1}}>          
                <Icon name="ticket" size={20} color="#fff" />              
            </Right>
          </Header>          
          <Content>
            <View style={{                
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginRight: 15,
                height:90
            }}>
            <Text style={{
              color: '#fff',
              opacity: 0.8,
              fontSize: 40,              
              fontWeight: 'bold',
              marginRight: 10
            }}>CUPONES & {"\n"} PROMOCIONES</Text>          
            </View>
          	<Card>
          		<Separator style={{backgroundColor:'#fff'}}>

          		</Separator>
            	<CardItem>                
            		<Body>
            			<ImageBackground source={require('src/assets/images/salad.jpeg')} style={styles.food}>
                    <View style={styles.foodCont}>
                      <Text style={styles.textPromo}>2 x 1 </Text><Text style={styles.description}>en todas las ensaladas</Text>                      
                      <Text style={{color: '#fff', marginTop:95, marginRight: 15}}>Ensaladas</Text>
                    </View>                    
                  </ImageBackground>                              			                                    
            		</Body>
            	</CardItem>
            	<Separator style={{backgroundColor:'#fff'}}>

          		</Separator>
            	<CardItem>                
            		<Body>                  
            			<ImageBackground source={require('src/assets/images/chicken.jpeg')} style={styles.food}>
                    <View style={styles.foodCont}>
                      <Text style={styles.textPromo}>20 % </Text><Text style={styles.description}>en la compra de la segunda orden</Text>
                      <Text style={{color: '#fff', marginTop:95, marginRight: 15}}>Alitas</Text>
                    </View>                    
                  </ImageBackground>            			                  
            		</Body>
            	</CardItem>
            	<Separator style={{backgroundColor:'#fff'}}>

          		</Separator>
            	<CardItem>                
            		<Body>                  
            			<ImageBackground source={require('src/assets/images/food2.jpg')} style={styles.food}>
                    <View style={styles.foodCont}>
            			     <Text style={styles.textPromo}>3 </Text><Text style={styles.description}>ingredientes extras gratis en la compra de pizza grande</Text>
                       <Text style={{color: '#fff', marginTop:95, marginRight: 15}}>Pizza</Text>
                    </View>
                  </ImageBackground>                  
            		</Body>                
            	</CardItem>
          	</Card>
          </Content>
        </Container>

		)
	}
}
