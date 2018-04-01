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
    marginTop:86,
    fontSize:25,
    marginBottom:16,
    textAlign:'center'
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },     
  inputBox: {
    width:300,
    paddingHorizontal:13,
    marginVertical: 10,        
  },
   button: {
    width:300,
    backgroundColor:COLOR_PRIMARY,           
    paddingVertical: 13,
    marginTop: 8,    
    borderRadius:20,              
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',    
  },
  signupTextCont : {    
    alignItems:'center',
    justifyContent :'center',
    paddingVertical:10,    
  },
  signupButton: {
    color:COLOR_PRIMARY,
    fontSize:16,
    fontWeight:'500',  
    fontFamily:FONT_NORMAL  
  },  
});