import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_FOURTH, FONT_NORMAL, FONT_BOLD } from 'src/assets/GlobalStyleSheet';

export default StyleSheet.create({
  container: {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'flex-start',
    padding: 20,
    paddingTop: 60,
  },  
  signupText: {
    textAlign:'center',
    marginTop:16,
    fontSize:20,
    marginBottom:16,
    fontFamily: FONT_NORMAL
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  button: {    
    width:300,
    backgroundColor:COLOR_PRIMARY, 
    paddingVertical: 13,
    marginTop: 10,
    borderRadius:20,
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',  
    fontFamily: FONT_NORMAL
  },
  info: {
    flexGrow:1,
    fontSize:8,
    color:'gray',
    textAlign:'center',
    fontFamily: FONT_NORMAL
  },
  inputBox: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent :'center',
    padding:20
  },
  input: {          
    paddingHorizontal:13,        
    marginVertical: 10,  
    width:300 
  },
  movilTextCont : {        
    paddingVertical:10, 
    flexDirection: 'row'   
  },
  lada: {
    color:'#00ffff'
  },
  image:{
    flex:1,
    resizeMode:'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },     
});