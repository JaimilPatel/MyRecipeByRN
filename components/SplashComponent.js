import React, { Component } from 'react';
import { ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export class SplashComponent extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor() {
    super()
    this.state = { getAuthToken: '' }
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('authTokenStore');
      if (value !== null) {
        this.setState({ getAuthToken: value })
      }
    } catch (error) {
      alert(error)
    }
  };

  componentDidMount() {
    this.retrieveData()
    setTimeout(() => {
      this.load();
    }, 3000);
  }
  load = () => {
    if (this.state.getAuthToken == '') {
      this.props.navigation.navigate("SignIn");
    }
    else {
      this.props.navigation.navigate("transfer", { data: this.state.getAuthToken })
    }
  };
  render() {
    return (
      <ImageBackground source={{ uri: 'https://www.gojekclone.com/images/food-app/user-app/splash-screen.jpg' }} style={{ width: '100%', height: '100%' }}>

      </ImageBackground>
    )
  }
}
export default SplashComponent;
