import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY } from 'src/assets/GlobalStyleSheet';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    height: height / 3,
    width: width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5
  },
  bubble: {
    backgroundColor: COLOR_PRIMARY,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    padding: 15
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInputContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * .90,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 15
  },
  textInput: {
    width: 300,
    color: 'grey',
    fontFamily: 'Lato-Light'
  },
  icon: {
    color: COLOR_PRIMARY,
    fontSize: 35
  },
  marker: {
    zIndex: 6,
    position: 'absolute',
    marginTop: -45,
    marginLeft: -25,
    left: '50%',
    top: '50%',
    width:50,
  height:50  }
});