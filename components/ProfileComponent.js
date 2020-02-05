import React , {Component} from 'react'
import { View, Image } from 'react-native'

export class ProfileComponent extends Component{
    static navigationOptions = {
        headerShown : false,
        title : '',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../images/user.png')}
            style={{width: 26, height: 26, tintColor: tintColor}}
          />
        )
    }
    render(){
        return (
            <View></View>
        )
    }
}