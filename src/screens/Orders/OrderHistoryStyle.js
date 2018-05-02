import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';

export default StyleSheet.create({
  image:{    
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',   
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
    resizeMode:'cover',    
    width: 380,
    height: 200,
  },
  foodCont: {
    width:380, 
    height:200, 
    backgroundColor:'rgba(0,0,0,.6)', 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row' 
  },
  textPromo: {
    fontFamily: FONT_NORMAL,            
    fontSize:60,
    fontWeight:'400',
    textAlign:'center',    
    color:'#fff',
    marginLeft: 15    
  },
  description: {
    fontFamily: FONT_NORMAL,
    fontSize:18,
    textAlign:'center',    
    color:'#fff',
    flex: 1, 
    flexWrap: 'wrap'    
  },
})
