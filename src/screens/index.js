import { Navigation } from 'react-native-navigation';

/* Screen imports */
import  Login  from './Login/Login';
import Splash from './Splash/Splash';
import Signup from './Signup/Signup';


/* Screen register */
export function registerScreens()
{
  Navigation.registerComponent('signup.Signup', () => Signup);
  Navigation.registerComponent('login.Login', () => Login);
  Navigation.registerComponent('splash.Splash', () => Splash);
}
