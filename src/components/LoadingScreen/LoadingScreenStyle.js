import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL } from 'src/assets/GlobalStyleSheet';

export default styles = StyleSheet.create({
  container : {
    ...StyleSheet.absoluteFillObject
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',    
  },
  logo: {
    width:105,
    height:105
  }
});