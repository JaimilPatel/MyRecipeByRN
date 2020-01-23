import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableHighlight, Alert, Image, ScrollView } from 'react-native';

const w = Dimensions.get('window');

const styles = StyleSheet.create({

  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonContainer: {
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  scrollContainer: {
    backgroundColor: '#FDF2E9',
  },
  imageContainer:{
    borderRadius: 50,
    width : 350,
    height : 300,
    marginTop : 50  
  }
})


export class SignInComponent extends Component{

    constructor() {
        super()
        this.state = { email: '', password: '' }
      }
    
      onSignIn(email, password) {
        fetch('http://35.160.197.175:3006/api/v1/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'email': email,
              'password': password
            })
          }).then((response) => {
            if (response.status == 200) {
              Alert.alert("Login Success", "Successfully LoggedIn")
              return response.json()
            } else {
              Alert.alert("Login Failure", "Failure")
            }
          }).then((responseJson) => {
            console.log(responseJson)
          }).catch((error) => {
            console.log(error)
          });
      }
    
      render() {
        return (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
              <Image
                source={{ uri: `https://www.cookwithmanali.com/wp-content/uploads/2014/11/Hakka-Noodles-1-500x375.jpg` }}
                style={styles.imageContainer}
                resizeMode="cover"
              />
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({ email })} />
              </View>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  value={this.state.password} onChangeText={(password) => this.setState({ password })} />
              </View>
              <TouchableHighlight style={[styles.loginButtonContainer, styles.loginButton]} onPress={() => this.onSignIn(this.state.email, this.state.password)}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        )
      }
}