import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';
const { width, height } = Dimensions.get('window'); 
export default StyleSheet.create({
  container: {        
    position:'absolute',
    height: height,
    width: width,    
    flexDirection: 'column',    
  },
  map: {    
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: COLOR_PRIMARY,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  bt: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {    
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 480,    
    backgroundColor: 'transparent',
  },
  in: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 15
  },
});