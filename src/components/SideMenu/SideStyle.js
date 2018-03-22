import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';

const side_width = Dimensions.get('window').width*.60;
const screen_height = Dimensions.get('window').height;
export default StyleSheet.create({
  sidebar_container: {
    backgroundColor: COLOR_PRIMARY,
    zIndex: 999,
    position: 'relative',
    width:  side_width,
    height: screen_height,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRightColor: '#00caff',
    borderRightWidth: 1,
  },
  sidebar_section_arrow:{
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
    sidebar_section:{
  },
  side_profile:{
  	height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  sidebar_header:{
  	flex:1,
  },
  sidebar_links:{
    width: 150,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  sidebar_link:{
    
  }

});
