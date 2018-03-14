import { Navigation } from 'react-native-navigation';

/* Screen imports */
import Login  from './Login/Login';
import Splash from './Splash/Splash';
import Signup from './Signup/Signup';
import Register from './Register/Register';
import Modal from '../components/Modal';
import VerificationCode from './Register/VerificationCode';
import RegisterForm from './Register/Form';


/* Screen register */
export function registerScreens()
{
  Navigation.registerComponent('signup.Signup', () => Signup);
  Navigation.registerComponent('login.Login', () => Login);
  Navigation.registerComponent('splash.Splash', () => Splash);
  Navigation.registerComponent('register.Register', () => Register);
  Navigation.registerComponent('register.modal', () => Modal);
  Navigation.registerComponent('register.verification', () => VerificationCode);
  Navigation.registerComponent('register.form', () => RegisterForm);  
}
