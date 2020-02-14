import React, { Component } from 'react';
import { ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as Constant from '../constants/AppConstants'
import * as ImageConstant from '../constants/ImageUriConstants'

class SplashComponent extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor() {
    super()
    this.state = { getAuthToken: '' }
  }

  //To get Token From AsyncStorage
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(Constant.AUTHTOKEN);
      if (value !== null) {
        this.setState({ getAuthToken: value })
      }
    } catch (error) {
    }
  };

  componentDidMount() {
    this.retrieveData()
    setTimeout(() => {
      this.load();
    }, 4000);
  }

  //To navigate based on Authentication Token has any value or null value
  load = () => {
    if (this.state.getAuthToken == '') {
      this.props.navigation.navigate(Constant.SIGNINROUTE);
    }
    else {
      this.props.navigation.navigate(Constant.TRANSFERROUTE, { data: this.state.getAuthToken })
    }
  };
  render() {
    return (
      <ImageBackground source={{ uri: ImageConstant.SPLASH_IMAGEURI }} style={{ width: '100%', height: '100%' }}>

      </ImageBackground>
    )
  }
}
export default SplashComponent;
