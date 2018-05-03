import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';

export default StyleSheet.create({
image:{
    flexGrow:1,
    resizeMode:'cover',
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center'
  },  
  searchCont: {
    alignSelf: 'center',
    backgroundColor: '#dbdbdb',
    width: '90%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  searchInput: {
    width: 300,
    borderBottomWidth: 0,
    fontFamily: FONT_NORMAL
  },
  radioGroup: {
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 50,
    marginBottom: 1
  },
  radioCont: {
    width: 70,
    height: 70,
    marginTop: 10,              
    borderRadius: 50,              
    margin: 5,
  },
  radioButton:{
    width: 60,
    height: 60,
    marginTop: 10,
    margin: 5,              
    borderRadius: 50,              
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',
  },
  wrapper: {        
    
  },
  slide: {
    flex: 1,
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',            
    justifyContent: 'center',
    alignItems: 'center',            
  },
  grid: {
    width:  150,
    height: 150,    
    margin: 10,
    backgroundColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems:'center'
  }
})