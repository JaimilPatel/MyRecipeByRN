import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,Dimensions, Button, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';


const w = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  container: {
    flex: 1,
  },
  button: {
    height : 30,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
})

export default class MyRecipeRn extends Component {

  
  constructor() {
    super()
    this.state = { email: '', password: '' }
  }

  onSignIn(email,password) {
    fetch('http://35.160.197.175:3006/api/v1/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'password':password
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
      <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${w.width * 2}&buster=${Math.random()}` }}
          style={{ width: w.width, height: w.width }}
          resizeMode="cover"
        />
        <TextInput placeholder="Enter Email Id" style={styles.input} value={this.state.email} onChangeText={(email) => this.setState({ email })}></TextInput>
        <TextInput placeholder="Enter Password" style={styles.input} value={this.state.password} onChangeText={(password) => this.setState({ password })}></TextInput>
        <View>
          <TouchableOpacity onPress={()=>{this.onSignIn(this.state.email,this.state.password)}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    )
  }
}