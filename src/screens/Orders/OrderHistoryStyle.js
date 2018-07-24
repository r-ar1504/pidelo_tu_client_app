import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
  image:{    
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',   
  },  
   body: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent:'center',
    alignItems: 'center',
  },  
  container : {    
    flex: 1,
    alignItems:'center',
    justifyContent :'flex-start',
    flexDirection:'column',
    backgroundColor: '#3f51b5',
    paddingTop: 10
  },
  food:{
    alignItems:'center', 
    justifyContent:'center',       
    alignSelf: 'center',                
    width: width * .90,
    height: 100,
  },
  foodCont: {
    width:width * .90, 
    height:100, 
    backgroundColor:'rgba(0,0,0,.6)', 
    alignItems:'center', 
    justifyContent:'center', 
  },
  textPromo: {
    fontFamily: FONT_NORMAL,            
    fontSize:40,
    fontWeight:'400',
    textAlign:'center',    
    color:'#fff',       
  },
  description: {
    fontFamily: FONT_NORMAL,
    fontSize:18,
    textAlign:'center',    
    color:'#fff',        
  },
  deliveryDetails: {
    width: width * .90,
    height: 100,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#dbdbdb',      
    alignSelf: 'center',    
  },
  check: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'center',
    height: 20,
    width: 20
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#11c0f6',
    backgroundColor: 'rgba(17,191,245,.9)', 
    alignItems:'center',
    justifyContent:'center'   
  },
  button: {
    backgroundColor:COLOR_PRIMARY,                   
    marginLeft: 30,    
  },
  buttonText: {    
    color:'#ffffff',
    textAlign:'center',
    fontFamily: FONT_NORMAL    
  },
  deliveryProgress: {
    width: width * .90,
    height: 150,       
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',      
    alignSelf: 'center',    
  },
})
