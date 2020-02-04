import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image, ScrollView , SafeAreaView, FlatList ,TouchableOpacity, ImageBackground} from 'react-native';
import {
  OutlinedTextField,
} from 'react-native-material-textfield'
import AsyncStorage from '@react-native-community/async-storage'
	
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
    marginTop: 10,
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
  touchableButton : {
    alignItems: 'center',
    backgroundColor: 'black',
    width : 310,
    justifyContent : "center",
    borderRadius: 10,
    height: 45,
    marginTop : 10,
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
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    marginTop : 20,
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
  
  static navigationOptions = {
    headerShown: false
  };
  fieldRef = React.createRef();

  constructor() {
    super()
    this.state = { email: 'jm1@example.com', password: 'jay@123', authToken : null }
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
          this.setState({
            authToken : token
          });
          this.storeData(responseJson)
          this.props.navigation.navigate('transfer', {
            data: this.state.authToken
          });
         return responseJson
        }).catch((error) => {
          console.log(error)
        });
    }

  }

  storeData = async (responseJSON) => {
    const {token} = responseJSON
    console.log('called store data ' + token);
    try {
        console.log('called try block ' + token);

        await AsyncStorage.setItem('authTokenStore', token)
    } catch (e) {
        console.log('called catch block----e --------' + e);
    }
}

  

  render() {
    return (
      
         <ImageBackground source={{
           uri : 'https://lh5.googleusercontent.com/proxy/g87eEEzrDk1VMpfqhRMNmRD5KrLfuLQwEFwOFJp6zmLxBRiy2MuVHGuOl9ZyUuYOPFj09Ik8swH6g7-EXeplGlWnzKQTJzOGWKxXyJ13vCz7N6dxAqc0A0Wcmo2w0munsDGgpl0dfv-RbHnjfY0qMERQ2g'
         }}style={{ width: '100%',
         height: '100%',
         flex: 1 , }} resizeMode="cover">
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style= {styles.centerContainer}>
          <Image
            source={{ uri: `https://image.freepik.com/free-vector/cooking-with-love-hand-written-lettering-quote_116399-128.jpg` }}
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
          {/* <RaisedTextButton title='LOG IN' textColor  = 'white' style={[styles.loginButtonContainer, styles.loginButton]} onPress={() => this.onSignIn(this.state.email, this.state.password)}/> */}
          <TouchableOpacity style = {styles.touchableButton}onPress={() => this.onSignIn(this.state.email, this.state.password)}>
      <Text style = {{color : 'white'}}>LOG IN</Text>
    </TouchableOpacity>
          {/* <Text style={styles.normalText}>Forgot Your Password</Text> */}
          </View>
        </View>
        </ScrollView>
        </ImageBackground>
      
    )
    
  }
}