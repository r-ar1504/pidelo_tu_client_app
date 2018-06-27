import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  image:{
    flex:1,    
    position: 'absolute',
    width: '100%',
    height: 100,
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
    height: 180,
    width:290,
    margin:10,
    justifyContent:'flex-start',
    alignItems:'center',
    padding:10,
    marginBottom:  10
  },
  mealImg:{              
    width: 120,
    height: 120,
    resizeMode:'contain'
  },
  foodCont:{
    width:120, 
    height:120, 
    backgroundColor:'rgba(0,0,0,.6)', 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row' 
  },
  Textdescription: {
    fontFamily: FONT_NORMAL,
    fontSize:20,
    textAlign:'center',    
    color:'#000',  
    flex:1,
    flexWrap:'wrap'  
  },
  infoCont:{
    flexDirection:'row',
    flex:1,
    flexWrap: 'nowrap'
  },
  description:{
    fontFamily: 'Lato-Regular',
    fontSize:20,
    color:'#000',
    textAlign:'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    textAlign:'center',
    color:'#000',
  }
});
