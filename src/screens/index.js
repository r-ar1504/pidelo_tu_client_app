import { Navigation } from 'react-native-navigation';

/* Screen imports */
import Login  from './Login/Login';
import Splash from './Splash/Splash';
import Signup from './Signup/Signup';
import Register from './Register/Register';
import Modal from '../components/Modal';
//import Maps from '../components/Maps';
import VerificationCode from './Register/VerificationCode';
import RegisterForm from './Register/Form';
import AllowLocation from './Register/AllowLocation';
import Home from './Home/Home'

/*Navigation Components*/
	
	/*Navigation Bars*/
	import HomeBar from '../components/NavBar/HomeBar'

	/*Side Bars*/
  import SideMenu from '../components/SideMenu/SideMenu';


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
  Navigation.registerComponent('register.location', () => AllowLocation); 
  Navigation.registerComponent('home.Home', () => Home);  
  Navigation.registerComponent('nav.HomeBar', () => HomeBar);
  Navigation.registerComponent('nav.SideMenu', () => SideMenu);  
}
