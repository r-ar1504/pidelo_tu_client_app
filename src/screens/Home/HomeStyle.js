import { StyleSheet, Dimensions } from 'react-native';

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
    flex:1,
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
    height: height*.23 , 
    marginTop: 10, 
    marginBottom:10,
    resizeMode: 'stretch',
  },
  body: {
    flexGrow: 1,    
    justifyContent:'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'center',
  },
  image:{
    flex:1,
    resizeMode:'cover',
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});
