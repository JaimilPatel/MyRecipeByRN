import React, { Component } from 'react';
import {SignInComponent} from './components/SignInComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SplashComponent } from './components/SplashComponent';
import { HomeComponent } from './components/HomeComponent';

const RootStack = createStackNavigator(
  {
    Splash: HomeComponent,
    SignIn: SignInComponent,
   
  },
  {
    initialRouteName: 'Splash',
  }
  
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
