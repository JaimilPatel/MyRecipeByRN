import React, { Component } from 'react';
import { ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

class SplashComponent extends Component {
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
    }, 4000);
  }
  load = () => {
    // if (this.state.getAuthToken == '') {
      this.props.navigation.navigate("SignIn");
    // }
    // else {
    //   this.props.navigation.navigate("transfer", { data: this.state.getAuthToken })
    // }
  };
  render() {
    return (
      <ImageBackground source={{ uri: 'https://format-com-cld-res.cloudinary.com/image/private/s--6VjZBQmK--/c_limit,g_center,h_65535,w_550/fl_keep_iptc.progressive,q_95/v1/d0362d29eaed2a00e2aace5edc65be9e/Pasta_with_Curry-3.jpg' }} style={{ width: '100%', height: '100%' }}>

      </ImageBackground>
    )
  }
}
export default SplashComponent;
