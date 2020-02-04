import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image, ScrollView, SafeAreaView, FlatList, TouchableOpacity,ImageBackground, Button } from 'react-native';
import {
  OutlinedTextField,
} from 'react-native-material-textfield';
import { DropDown, Dropdown } from 'react-native-material-dropdown'
import TagInput from 'react-native-tags-input';
import ImagePicker from 'react-native-image-picker';

const mainColor = '#3ca897';

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
  touchableButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    width: 310,
    justifyContent: "center",
    borderRadius: 10,
    height: 45,
    marginTop: 10,
    marginBottom: 20
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
    marginTop: 20,
  },
  centerContainer: {
    alignItems: "center"
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
  textInput: {
    height: 20,
    paddingBottom: 40
  },
  tag: {
    backgroundColor: '#fff'
  },
  tagText: {
    color: mainColor
  },
  tagContainer: {
    borderWidth: 1,
    borderColor: 'silver',
    margin: 50
  }
})

let options = {
  title: 'Select Image',
  customButtons: [
    { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class AddNewRecipeComponent extends Component {
  constructor() {
    super()
    this.state = {
      recipeName: '',
      preprationTime: '',
      noOfServes: null,
      complexity: '',
      tags: {
        tag: '',
        tagsArray: []
      },
      tagsColor: mainColor,
      tagsText: '#fff',
      youTubeURL: '',
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      getFileName : null,
    }
  }

  showImagePicker(){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        const sourcesecond = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source)
        console.log(sourcesecond)
        this.setState({
         filePath: response,
         fileData: response.data,
         fileUri: response.uri,
         getFileName : response.path
        });
      }
    });
  }

  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };

  onAddRecipe(recipeName, preprationTime, noOfServes, complexity, youTubeURL, tags) {
    // alert("Data : " + recipeName + "" + preprationTime + "" + noOfServes + "" + complexity + "" + youTubeURL + "" + tags.tagsArray)
    fetch('http://35.160.197.175:3006/api/v1/recipe/add',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': recipeName,
          'preparationTime': preprationTime,
          'serves': noOfServes,
          'complexity': complexity,
          'metaTags': tags.tagsArray,
          'ytUrl': youTubeURL
        })
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {
      const { id } = responseJson
      alert(id)
      this.onUpdateRecipePhoto(id)
    }).catch((error) => {
      console.log(error)
    });
  }

  onUpdateRecipePhoto(id) {
    alert ("File Data "+this.state.fileData)
    fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          'recipeId': id,
          'photo':
          [ 
            { name: 'file', filename: this.state.filepath.fileName, type: this.state.filePath.type, data: this.state.fileData }
          ]
        })
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {
      alert("Photo Added of "+id)
    }).catch((error) => {
      console.log(error)
    });
  }



  render() {
    let data = [{
      value: 'Easy',
    }, {
      value: 'Medium',
    }, {
      value: 'Complex',
    }];
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.outLinedTextField}>
            <OutlinedTextField
              label='Recipe Name'
              keyboardType='default'
              ref={this.fieldRef}
              value={this.state.recipeName}
              onChangeText={(recipeName) => this.setState({ recipeName })}
            />
          </View>
          <View style={[styles.outLinedTextField, { marginTop: 5 }]}>
            <OutlinedTextField
              label='Prepration Time'
              keyboardType='default'
              ref={this.fieldRef}
              value={this.state.preprationTime}
              onChangeText={(preprationTime) => this.setState({ preprationTime })}
            />
          </View>
          <View style={[styles.outLinedTextField, { marginTop: 5 }]}>
            <OutlinedTextField
              label='Serves'
              keyboardType='numeric'
              ref={this.fieldRef}
              value={this.state.noOfServes}
              onChangeText={(noOfServes) => this.setState({ noOfServes })}
            />
          </View>
          <View style={[styles.outLinedTextField, { marginTop: 5 }]}>
            <Dropdown
              label='Complexity'
              data={data}
              value={this.state.complexity}
              ref={this.fieldRef}
              onChangeText={(complexity) => this.setState({ complexity })}
            />
          </View>
          <View style={styles.tagContainer}>
            <TagInput
              updateState={this.updateTagState}
              tags={this.state.tags}
              placeholder="Tags"
              label='Tags'
              labelStyle={{ color: '#fff' }}
              // leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
              inputContainerStyle={[styles.textInput,]}
              inputStyle={{ color: this.state.tagsText }}
              onFocus={() => this.setState({ tagsColor: '#fff', tagsText: mainColor })}
              onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#fff' })}
              autoCorrect={false}
              tagStyle={styles.tag}
              tagTextStyle={styles.tagText}
              keysForTag={', '} />
          </View>
          <View style={[styles.outLinedTextField, { marginTop: 5 }]}>
            <OutlinedTextField
              label='Youtube URL'
              keyboardType='default'
              ref={this.fieldRef}
              value={this.state.youTubeURL}
              onChangeText={(youTubeURL) => this.setState({ youTubeURL })}
            />
          </View>
          <View style={styles.centerContainer}>
            <TouchableOpacity style={styles.touchableButton} onPress={() => this.onAddRecipe(this.state.recipeName, this.state.preprationTime, this.state.noOfServes, this.state.complexity, this.state.youTubeURL, this.state.tags)}>
              <Text style={{ color: 'white' }}>Add Recipe</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.touchableButton} onPress={() => this.showImagePicker()}>
          <Text style={{ color: 'white' }}>Image Picker</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}