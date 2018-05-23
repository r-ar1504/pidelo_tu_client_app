import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';


export default StyleSheet.create({
  image:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    width: '100%',
    height: 140,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
  },
  restaurantTitleCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 15,
    height:90
  },
  body: {    
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',      
  },
  restaurantTitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 40,    
    fontWeight: 'bold',
    marginRight: 10
  },
  titleCont:{
    marginTop: 20,
    width: '85%',
    alignSelf: 'center',
    margin: 5
  },
  titleText:{
    color: '#000',
    fontSize: 20,   
    fontFamily: 'Lato-Light'
  },
  wrapper: {        
    
  },
  slide: {
    flex: 1,    
    width: '100%',
    flexDirection: 'row',              
    justifyContent: 'center',
    alignItems: 'flex-start',  
  },
  mealCont:{
    borderWidth:1,
    borderColor:'grey',                
    height: 150,
    width:150,
    margin:10,
    justifyContent:'flex-start',
    alignItems:'center',
    padding:5
  },
  mealImg:{
    width:100, 
    height:100, 
    resizeMode: 'contain'
  },
  infoCont:{
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  description:{
    fontFamily: FONT_NORMAL,
    fontSize:14,
    color:'#000', 
    textAlign:'center',
    flex: 1, 
    flexWrap: 'wrap'      
  },
  price: {
    fontFamily: FONT_NORMAL,
    fontSize: 16,
    textAlign:'center',
    color:'#000',      
  }
});
