import { Navigation } from 'react-native-navigation';

/* Screen imports */
import  Login  from './Login/Login';


/* Screen register */
export function registerScreens()
{
  Navigation.registerComponent('login.Login', () => Login);
}
