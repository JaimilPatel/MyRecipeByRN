import {SignInComponent} from './components/SignInComponent';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SplashComponent } from './components/SplashComponent';
import { RecipeFeedComponent } from './components/RecipeFeedComponent';
import { AddNewRecipeComponent } from './components/AddNewRecipeComponent';
import { ProfileComponent } from './components/ProfileComponent';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { RecipeDetailsComponent } from './components/RecipeDetailsComponent';

 const internalNavigator = createStackNavigator({
   RecipeDetail : {screen : RecipeDetailsComponent}
 },{
  initialRouteName : 'RecipeDetail',
  headerMode: 'none',
  mode : 'card',
  navigationOptions: {
      headerVisible: false,
  }
})

 const homeNavigator = createMaterialBottomTabNavigator({
  
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
  },
},{
  barStyle: {backgroundColor:'#DC7633'},
  initialRouteName : 'RecipeFeed',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})
const authNavigator  = createSwitchNavigator({
  Splash: {screen: SplashComponent},
  SignIn: {screen: SignInComponent},
  transfer  : homeNavigator
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
 })

const rootNavigator = createStackNavigator({
  auth : authNavigator,
  home : homeNavigator , 
  internal : internalNavigator
},{
  initialRouteName : 'auth',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})


const App = createAppContainer(rootNavigator);
export default App;
