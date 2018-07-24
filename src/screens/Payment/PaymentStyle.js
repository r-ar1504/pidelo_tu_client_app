import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL } from 'src/assets/GlobalStyleSheet';

export default styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems:'center',
    justifyContent :'flex-start',
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
    width:150,          
  }, 
  inputText: {
    width:150,       
    color:'white',
    fontFamily: FONT_NORMAL
  }, 
  inputContainer: {    
    flexDirection: 'row',      
    marginTop:46 
  },
  dateContainer: {    
    flexDirection: 'row', 
    justifyContent:'center',
    alignItems:'flex-start',         
    marginTop:46  
  },
  selectContainer: {    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',  
    marginTop:16  
  },
  contentContainer: {
    flexGrow: 1,
  },
  text: {        
    color:'white',
    marginTop: 6,
    fontFamily: FONT_NORMAL,
    marginLeft: 6
  },
  MainText: {    
    fontSize:20,    
    color:'#ffffff',
    textAlign:'center',
    marginTop:40, 
    alignSelf:'center',
    fontFamily: FONT_NORMAL       
  }, 
  button: {
    alignItems:'center',
    justifyContent :'center',    
    width:300,
    backgroundColor:'#00caff',           
    paddingVertical: 13,
    marginTop: 20,    
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
    bottom:0
  }
});