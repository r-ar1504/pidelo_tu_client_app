import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, FONT_NORMAL } from 'src/assets/GlobalStyleSheet';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({ 
  container : {
    position:'absolute',
    height: height,
    width: width,
    backgroundColor:'#455a64',
    alignItems:'center',
    justifyContent :'center',
  },  
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },  
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },   
  inputBox: {
    width:300,
    paddingHorizontal:13,
    marginVertical: 8,        
  },
  input: {
    width:300,
    paddingHorizontal:13,
    marginVertical: 8,        
    color:'white'
  },
  button: {
    width:300,
    backgroundColor:'#00000000',
    paddingVertical: 13,
    marginTop: 25,
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {    
    color:'#ffffff',
    textAlign:'center',
    fontFamily: 'Lato-Regular'
  },
   fb: {
    backgroundColor:COLOR_SECONDARY,
    borderBottomLeftRadius:25,
    borderTopLeftRadius:25,
    color:'#ffffff',
    padding:10,
    width:150,
    textAlign:'center',
    borderWidth:1,
    borderColor:'white',
    fontFamily: FONT_NORMAL,
    fontSize: 20,
    alignSelf:'center'    
  },
  movil: {
    backgroundColor:COLOR_PRIMARY,
    borderBottomRightRadius:25,
    borderTopRightRadius:25,
    color:'#ffffff',
    padding:10,
    width:150,
    textAlign:'center',
    borderWidth:1,
    borderColor:'white',
    fontFamily: FONT_NORMAL,
    fontSize: 20,
    alignSelf:'center'    
  },
  signupTextCont : {
    paddingVertical:16,
    marginTop:70,
    flexDirection:'row',
  },
  signupButton: {
    color:'#ffffff',      
    fontFamily: 'Lato-Regular'  
  },
  forgotpassButton: {
    color:'#ffffff',        
    fontFamily: 'Lato-Regular'
  }, 
  image:{
    flex:1,
    resizeMode:'cover',
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },  
});