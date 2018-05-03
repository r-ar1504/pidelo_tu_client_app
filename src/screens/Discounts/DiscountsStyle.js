import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL } from 'src/assets/GlobalStyleSheet';

export default StyleSheet.create({  
  image:{    
    resizeMode:'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',    
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
  contentContainer: {
    flexGrow: 1,
  },
  container : {
    flex: 1,
    flexDirection:'row',    
    alignItems:'center',
    justifyContent :'center'
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
  header:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    width: '100%',
    height: 140,
    justifyContent: 'center'
  }  
});
