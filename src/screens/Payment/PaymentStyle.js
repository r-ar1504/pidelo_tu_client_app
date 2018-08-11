import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL } from 'src/assets/GlobalStyleSheet';

export default styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    flexDirection:'column'
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',    
  },
  image:{
    display: 'flex',
    flex:1,    
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center' 
  },
  inputBox: {
    width:300,          
  }, 
  input: {
    width:300,       
    color:'white'
  },
  inputB: {
    width:300,          
  }, 
  inputText: {
    width:150,       
    color:'white',
    fontFamily: FONT_NORMAL
  }, 
  inputContainer: {    
    flexDirection: 'row',   
    marginTop: 30       
  },
  dateContainer: {    
    flexDirection: 'row',     
    alignItems:'flex-start',            
    justifyContent:'flex-start',
    marginTop:30,
    width:300  
  },
  selectContainer: {    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',  
    marginTop:30  
  },
  text: {        
    color:'white',    
    fontFamily: FONT_NORMAL,
    fontSize: 16,    
    marginLeft: 15
  },
  icon:{
    color:'white',
    fontSize:25
  },
  MainText: {    
    fontSize:20,    
    color:'#ffffff',
    textAlign:'center',    
    alignSelf:'center',
    fontFamily: FONT_NORMAL       
  }, 
  button: {
    alignItems:'center',
    justifyContent :'center',    
    width:300,
    backgroundColor:COLOR_PRIMARY,           
    paddingVertical: 13,
    marginTop: 30,    
    borderRadius:20,       
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },   
  background:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'column'
  }
});