import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';


export default StyleSheet.create({
  image:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  avatar_section:{
    paddingTop:100,
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
  profile_data:{
    paddingTop: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  profile_element:{
    paddingTop: 10,
    alignSelf: 'flex-start'
  },
  profile_input:{
    flexDirection: 'row',

  }
})
