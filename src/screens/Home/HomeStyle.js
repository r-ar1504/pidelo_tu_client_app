import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';

const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
  	flex:1,
  	flexDirection: 'column',
  	justifyContent: 'space-between',
  	alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftHead:{
    paddingLeft: 20
  },
  rightHead:{
    paddingRight: 20
  },
  promo: {
    alignSelf: 'center', 
    width: width*.90,  
    height: 180 , 
    marginTop: 10, 
    resizeMode: 'stretch',
  }
});
