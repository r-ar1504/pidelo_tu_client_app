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
    width: 150,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  }, 
  buttonContainer: {   
    flexDirection:'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 480,    
    padding:15,
    backgroundColor: 'transparent',
  },
  in: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width*.90,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 15
  },
});