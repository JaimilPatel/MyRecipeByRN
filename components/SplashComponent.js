import React, { Component } from 'react';
import { ImageBackground, View, Button } from 'react-native'
export class SplashComponent extends Component {

    componentDidMount() {
        setTimeout(() => {
           this.load();
              }, 4000);
        }
    
       load = () => {
            this.props.navigation.push("SignIn");
        };
    render() {
        return (
                <ImageBackground source={require('../images/back.png')} style={{ width: '100%', height: '100%' }}></ImageBackground>
        )
    }
}
export default SplashComponent;