import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image, ScrollView , SafeAreaView, FlatList} from 'react-native';
import {
  OutlinedTextField,
} from 'react-native-material-textfield'
import {  RaisedTextButton } from 'react-native-material-buttons';
import AsyncStorage from '@react-native-community/async-storage';
	
const styles = StyleSheet.create({

  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loginButtonContainer: {
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#2464E5",
    color: '#000000'
  },
  loginText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 300,
    height: 50,
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
    backgroundColor: '#F2EFEC',
  },
  imageContainer: {
    borderRadius: 400,
    width: 250,
    height: 250,
    marginTop: 20
  },
  normalText: {
    textAlign: "center",
    color: 'black',
    marginTop: 10,
    fontSize: 15
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10
  },
  childTitleText: {
    textAlign: 'center',
    fontSize: 15,
  },
  outLinedTextField: {
    paddingHorizontal: 50,
    marginTop : 10
  },
  centerContainer : {
alignItems : "center"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

export class SignInComponent extends Component {

  fieldRef = React.createRef();

  constructor() {
    super()
    this.state = { email: 'jm1@example.com', password: 'jay@123' }
  }
  
  onSignIn(email, password) {
    if (email == '' || password == '') {
      if (email == '' && password == '') {
        alert("Please Enter Your Details")
        
      } else if (email == '') {
        alert("Please Enter Your Email")
      } else if (password == '') {
        alert("Please Enter Your Password")
      }
    } else {
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
            
            return response.json()
          } else {
            Alert.alert("Login Failure", "Failure")
          }
        }).then((responseJson) => {
          
          const {token} = responseJson
          
          alert(token)
          console.log(token)
          // storeData = async () => {
          //   try {
          //     await AsyncStorage.setItem('storeToken', token)
          //   } catch (e) {
          //   }
          // }
          return responseJson
        }).catch((error) => {
          console.log(error)
        });
    }
  }
  

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style= {styles.centerContainer}>
          <Image
            source={{ uri: `https://www.cookwithmanali.com/wp-content/uploads/2014/11/Hakka-Noodles-1-500x375.jpg` }}
            style={styles.imageContainer}
            resizeMode="cover"
          />
          </View>
          <Text style={styles.titleText}>LOG IN</Text>
          <Text style={styles.childTitleText}>Good to see you again</Text>
          <View style={styles.outLinedTextField}>
          <OutlinedTextField
            label='Your Email'
            keyboardType='email-address'
            ref={this.fieldRef}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />
        </View>
        <View style={styles.outLinedTextField}>
          <OutlinedTextField
            label='Password'
            secureTextEntry={true}
            ref={this.fieldRef}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
          <View style= {styles.centerContainer}>
          <RaisedTextButton title='LOG IN' textColor  = 'white' style={[styles.loginButtonContainer, styles.loginButton]} onPress={() => this.onSignIn(this.state.email, this.state.password)}/>
          <Text style={styles.normalText}>Forgot Your Password</Text>
          </View>
        </View>
        
        
      </ScrollView>
    )
  }
}