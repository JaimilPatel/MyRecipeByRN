import {SignInComponent} from './components/SignInComponent';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SplashComponent } from './components/SplashComponent';
import { RecipeFeedComponent } from './components/RecipeFeedComponent';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { AddNewRecipeComponent } from './components/AddNewRecipeComponent';
import { ProfileComponent } from './components/ProfileComponent';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


const mainNavigator = createMaterialBottomTabNavigator({
  
  RecipeFeed : {
    screen : RecipeFeedComponent,
    navigationOptions:{
      tabBarLabel : 'Feed'
    }
  },
  AddRecipe : {
    screen : AddNewRecipeComponent,
    navigationOptions : {
      tabBarLabel : 'Add Recipe'
    }
  },
  Profile : {
    screen : ProfileComponent,
    navigationOptions : {
      tabBarLabel : 'Profile'
    }
  }
},{
  initialRouteName : 'RecipeFeed'
})

const RootStackAuth = createStackNavigator({
  Splash: {screen: SplashComponent},
  SignIn: {screen: SignInComponent},
  transfer : mainNavigator
});



 const RootStack = createStackNavigator({
     auth  : RootStackAuth
 })

const App = createAppContainer(RootStack);
export default App;
