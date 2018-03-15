import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';


export default StyleSheet.create({
  home_bar: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center', 
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#9C9A9A'
  },
  search_food: {
    height: 40,
    borderStyle: 'solid', 
    borderColor: '#C6C6C6',
    borderWidth: 1,
    borderRadius: 25,
    overflow: 'hidden',
    margin: 5
  },
  notification_image: {
    width: 30,
    height: 30,
    paddingRight: 20
  },
  empty:{
    width: 60
  }

});
