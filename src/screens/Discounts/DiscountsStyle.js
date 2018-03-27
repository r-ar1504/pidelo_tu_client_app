import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY } from 'src/assets/GlobalStyleSheet';


export default StyleSheet.create({  
  image:{    
    resizeMode:'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',    
  },
  food:{    
    alignSelf: 'center',        
    resizeMode:'cover',    
    marginRight:10,
    width: 380,
    height: 200,
  },    
  MainText: {             
    fontFamily: "Lato",
    fontSize:30,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'right',            
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
    fontFamily: "Lato",            
    fontSize:20,
    fontWeight:'500',
    color:'#000',    
  },
  description: {
    fontFamily: "Lato",
    fontSize:14,
    fontWeight:'200',
    color:'#000',    
  },  
});
