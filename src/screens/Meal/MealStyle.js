import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';


export default StyleSheet.create({
  background:{    
    display: 'flex',
    flex:1,    
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center' 
  },  
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',    
  },
  meal:{
    paddingTop:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',        
    alignSelf: 'center'
  },
  image:{
    width: 250,
    height: 250,
    resizeMode:'contain'    
  },
  input: {
    fontSize: 14, 
    fontFamily: 'Lato-Light', 
    color: 'white', 
    width: 30, 
    marginLeft: 180, 
    alignSelf: 'center', 
    textAlign: 'center', 
    marginBottom: 10
  },
  button: {        
    width: 25,
    height: 25,    
    marginLeft: 5,    
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor:'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center'

  },  
  text: {  
    fontSize: 20,  
    color:'#ffffff',
    textAlign:'center',
    fontFamily: FONT_NORMAL, 
    alignSelf: 'center'
  },       
  confirm: {
    width:300,
    backgroundColor:COLOR_PRIMARY,           
    paddingVertical: 13,
    marginTop: 8,    
    borderRadius:20, 
  }
})
