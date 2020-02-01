import {SignInComponent} from './components/SignInComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SplashComponent } from './components/SplashComponent';
import { HomeComponent } from './components/HomeComponent';


const MainNavigator = createStackNavigator({
  Splash: {screen: SplashComponent},
  SignIn: {screen: SignInComponent},
  CookingList: {screen: HomeComponent},
});

const App = createAppContainer(MainNavigator);
export default App;



