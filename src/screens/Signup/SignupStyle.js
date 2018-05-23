import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_FOURTH, FONT_NORMAL } from 'src/assets/GlobalStyleSheet';

export default StyleSheet.create({ 
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',          
  },
  signupText: {        
    marginTop:16,
    fontSize:25,
    marginBottom:16,
    textAlign:'center',
    fontFamily: FONT_NORMAL
  },
  body: {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
  },     
  inputBox: {
    width:300,
    paddingHorizontal:13,
    marginVertical: 5,        
  },
   button: {
    width:300,
    backgroundColor:COLOR_PRIMARY,           
    paddingVertical: 13,
    marginTop: 8,    
    borderRadius:20,              
  },
  buttonText: {    
    color:'#ffffff',
    textAlign:'center',
    fontFamily: FONT_NORMAL    
  },
  signupTextCont : {    
    alignItems:'center',
    justifyContent :'center',
    paddingVertical:10,    
  },
  signupButton: {
    color:COLOR_PRIMARY,
    fontSize:16,
    fontFamily:FONT_NORMAL  
  },
  image:{
    display: 'flex',
    flex:1,    
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center' 
  }, 
});