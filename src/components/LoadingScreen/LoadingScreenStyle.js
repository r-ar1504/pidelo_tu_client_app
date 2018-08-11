import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL } from 'src/assets/GlobalStyleSheet';

export default styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  body: {
    flex: 9,    
    alignItems:'center',
    justifyContent:'center',    
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  }
});