import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';

export default StyleSheet.create({
  background:{           
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,    
  },  
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',    
  },
  meal:{
    marginTop:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',        
    alignSelf: 'center'
  }, 
  Title: {
    color: '#fff',    
    fontSize: 20,    
    fontFamily: FONT_NORMAL,
    flex: 1,
    flexWrap:'wrap',
    textAlign:'center'
  }, 
  wrapper: {

  },
  slide: {    
    flexDirection: 'row',    
  },
  mealCont:{    
    height: 150,
    width:250,    
  },
  mealImg:{
    width:100,
    height:100,
    resizeMode: 'contain'
  },
  input: {
    fontSize: 14, 
    fontFamily: FONT_NORMAL, 
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
    fontSize: 16,  
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
  },
  price: {
    marginLeft:20,
    marginTop:20,
    fontFamily: 'Lato-Regular',
    fontSize: 12,    
    color:'#fff',
  }
})
