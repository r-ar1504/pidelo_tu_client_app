import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text, Tabs, Tab } from 'native-base';
import { View, BackHandler, Image, ImageBackground } from 'react-native';
import styles from './OrderHistoryStyle';
import OrderHistory from './OrderHistory';
import OrderComming from './OrderComming'

export default class Orders extends Component {
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
  render() {
    return (
      <Container style={styles.container}>
        {/*<Image source={require('src/assets/images/background.png')} style={styles.image}/>*/}
        <Content padder>                                              
          <Tabs tabBarUnderlineStyle={{opacity: 0}}>
            <Tab heading="Pedidos Anteriores" tabStyle={{backgroundColor:'transparent', borderWidth:1, borderBottomLeftRadius:15, borderTopLeftRadius:15, borderColor: '#dbdbdb'}} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1, borderBottomLeftRadius:15, borderTopLeftRadius:15,  borderColor: '#dbdbdb'}}>
              <OrderHistory />
            </Tab>
            <Tab heading="Próximos" tabStyle={{backgroundColor:'transparent', borderWidth:1, borderBottomRightRadius:15, borderTopRightRadius:15,  borderColor: '#dbdbdb'}} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1, borderBottomRightRadius:15, borderTopRightRadius:15,  borderColor: '#dbdbdb'}}>
              <OrderComming />
            </Tab>          
          </Tabs>       
        </Content>  
      </Container>
    );
  }
}