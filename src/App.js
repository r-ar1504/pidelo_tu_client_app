import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens/index';


registerScreens();

/*
* Asigns a screen registered on ./screens/index
* and initialices the app.
*/
Navigation.startSingleScreenApp({
  screen: {
    screen: 'login.Login',
    navigatorStyle: {
    	navBarHidden: true
    }    
  },   
});
