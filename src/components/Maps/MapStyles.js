import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,    
    flexDirection: 'column',    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  button: {
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
  input: {
    alignSelf: 'center',
    backgroundColor: '#dbdbdb',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 15
  },
});