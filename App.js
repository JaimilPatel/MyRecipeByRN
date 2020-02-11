import {SignInComponent} from './components/SignInComponent';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SplashComponent } from './components/SplashComponent';
import { AddNewRecipeComponent } from './components/AddNewRecipeComponent';
import { ProfileComponent } from './components/ProfileComponent';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { RecipeDetailsComponent } from './components/RecipeDetailsComponent';
import { Provider } from 'react-redux';
import store from './store/store';
import RecipeFeedComponent from './components/RecipeFeedComponent';

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
  home : homeNavigator , 
},{
  initialRouteName : 'home',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

const AppContainer = createAppContainer(rootNavigator);

export default function App(){
  return <Provider store = {store}>
    <AppContainer/>
  </Provider>
}

