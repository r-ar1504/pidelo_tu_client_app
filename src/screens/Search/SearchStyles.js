import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';
let { width, height } = Dimensions.get('window');

export default StyleSheet.create({
image:{
    display: 'flex',
    flex:1,    
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center'
  },  
  searchCont: {
    alignSelf: 'center',
    backgroundColor: '#dbdbdb',
    width: width * .80,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  body: {    
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  searchInput: {
    width: 300,
    borderBottomWidth: 0,
    fontFamily: FONT_NORMAL, 
  },
  radioGroup: {
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 50,
    marginBottom: 10
  },
  radioCont: {
    width: 70,
    height: 70,                  
    borderRadius: 50,              
    margin: 3,    
  },
  radioButton:{
    width: 60,
    height: 60,    
    margin: 3,              
    borderRadius: 50,              
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',    
  },
  wrapper: {        
    
  },
  slide: {
    flex: 1,
    alignSelf: 'center',
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',            
    justifyContent: 'center',
    alignItems: 'center',            
  },
  grid: {
    width:  width*.80,
    height: height *.30,    
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center'
  },
  mealImg:{
    width: width*.25, 
    height:height*.15, 
    resizeMode: 'contain'
  },
  logo: {
    resizeMode:'center', 
    width: width*.12, 
    height:height*.12, 
    marginLeft: 10
  },
  infoCont:{
    flexDirection:'row',
    padding:10    
  },
  description:{
    fontFamily: FONT_NORMAL,
    fontSize:24,
    color:'#000', 
    textAlign:'center',
    flex: 1, 
    flexWrap: 'wrap'      
  },
})