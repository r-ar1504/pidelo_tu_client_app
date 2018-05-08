import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';
let { width, height } = Dimensions.get('window');

export default StyleSheet.create({
image:{
    display: 'flex',
    flex:1,    
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
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',            
    justifyContent: 'center',
    alignItems: 'center',            
  },
  grid: {
    width:  width / 2.5,
    height: 150,    
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center'
  },
  mealImg:{
    width:100, 
    height:100, 
    resizeMode: 'contain'
  },
  infoCont:{
    flexDirection:'row',    
  },
  description:{
    fontFamily: FONT_NORMAL,
    fontSize:14,
    color:'#000', 
    textAlign:'center',
    flex: 1, 
    flexWrap: 'wrap'      
  },
})