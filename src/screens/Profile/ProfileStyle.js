import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';


export default StyleSheet.create({
  image:{
    display: 'flex',
    flex:1,    
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignSelf: 'center'
  },  
  header: {
    flexDirection: 'row',    
  },
  body: {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  avatar_section:{    
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 20,
    width: '80%',
    alignSelf: 'center'
  },
  profile:{
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff'
  },
  logo: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'center',
  },
  profile_data:{
    alignSelf: 'center',
    flexDirection: 'column',    
  },
  profile_element:{    
    alignSelf: 'flex-start',
    width: 280
  },
  profile_input:{
    flexDirection: 'row',
    width: 280
  }
})
