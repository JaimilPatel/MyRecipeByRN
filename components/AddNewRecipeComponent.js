import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image, ScrollView, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Button } from 'react-native';
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
    backgroundColor:'#DC7633',
    width: 310,
    justifyContent: "center",
    borderRadius: 10,
    height: 45,
    marginTop: 10,
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
    backgroundColor: 'white',
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
    paddingHorizontal: 20,
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
    height: 40,
    paddingBottom: 30
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
    marginTop: 20,
    marginHorizontal: 20
  },
  titleTextColor: {
    color: 'black',
    marginStart: 10,
    fontSize: 18,

  },
  topTitleContainer: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: '#FAE5D3',
    alignItems: "stretch",
    width: Dimensions.get('window').width,
    height: 50,
    padding: 5,
    marginHorizontal : 20
},
circle: {
  width: 30,
  height: 30,
  borderRadius: 100 / 2,
  backgroundColor: '#DC7633',
  justifyContent: 'center',
  alignItems: "center"
},
images: {
  width: 150,
  height: 150,
  marginHorizontal: 3,
  marginTop : 10,
  marginStart : 50
},
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

  static navigationOptions = {
    headerShown: false,
    title: '',
    // tabBarIcon: ({ tintColor }) => (
    //   <Image
    //     source={require('../images/plus.png')}
    //     style={{ width: 26, height: 26, tintColor: tintColor, marginBottom: 10 }}
    //   />
    // )
      tabBarIcon: ({ focused , tintColor }) => {
        if (focused) {
            return  <Image
            source={require('../images/plus.png')}
            style={{ width: 26, height: 26, tintColor: tintColor, marginBottom: 10 }}
          />
        } else {
          return  <Image
          source={require('../images/plus.png')}
          style={{ width: 26, height: 26, tintColor: 'white', marginBottom: 10 }}
        />
        }
    }
  }

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
      getFileName: null,
      oneIngredient: '',
      ingredientsArray: [],
      oneInstruction: '',
      instructionsArray: [],
    }
  }

  showImagePicker() {
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
          getFileName: response.path
        });
      }
    });
  }

  addToIngredients = () => {
    var newIngredient = this.state.oneIngredient
    var arr = this.state.ingredientsArray
    arr.push(newIngredient)
    this.setState({ ingredientsArray: arr })
  }

  addToInstructions = () => {
    var newInstruction = this.state.oneInstruction
    var arr = this.state.instructionsArray
    arr.push(newInstruction)
    this.setState({ instructionsArray: arr })
    //alert(this.state.instructionsArray)
  }

  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };

  updateIngredientState = (state) => {
    this.setState({
      ingredients: state
    })
  }

  updateInstructionState = (state) => {
    this.setState({
      instructions: state
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
      //alert(id)
      this.addIngredientsAndInstruction(id)
      this.onUpdateRecipePhoto(id)
    }).catch((error) => {
      console.log(error)
    });
  }

  addIngredientsAndInstruction(id) {
    const data = this.props.navigation.getParam('data', '');

    for (var ingre in this.state.ingredientsArray) {
      fetch('http://35.160.197.175:3006/api/v1/recipe/add-ingredient',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'ingredient': this.state.ingredientsArray[ingre].toString(),
            'recipeId': id,
          })
        }
      ).then((response) => {
        if (response.status == 200) {
          return response.json()
        } else {
        }
      }).then((responseJson) => {
        console.log("All ingredients Added")
      }).catch((error) => {
        console.log(error)
      });
    }
    for (var inst in this.state.instructionsArray) {
      fetch('http://35.160.197.175:3006/api/v1/recipe/add-instruction',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'instruction': this.state.instructionsArray[inst].toString(),
            'recipeId': id,
          })
        }
      ).then((response) => {
        if (response.status == 200) {
          return response.json()
        } else {
        }
      }).then((responseJson) => {
        console.log("All instruction Added")
      }).catch((error) => {
        console.log(error)
      });
    }

  }

 

  onUpdateRecipePhoto(id) {
    const createFormData = (photo, body) => {
      const data = new FormData();
      var photo = {
          uri: this.state.fileUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
      };
      data.append("photo", photo);
    
      data.append("recipeId",570)
      console.log("RecipeData "+data);
      
      return data;
    };
    fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
       body :  createFormData(this.state.filePath, { recipeId: 570} )
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {

    }).catch((error) => {
      console.log('RRRRRRR'+error)
    });
    console.log('Api calling is done')
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('../images/recipe.png')}
        style={styles.images}
      />
    }
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
          <View style={{ backgroundColor:'#DC7633', height: 50, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', }}>
              <Image
                style={{ width: 30, height: 30, }}
                source={require('../images/cooking.png')}
              />
              <Text style={[styles.titleTextColor, { marginTop: 5 }]}>Add New Recipe</Text>
            </View>
          </View>
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
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.outLinedTextField, { marginTop: 20, flex: 0.9 }]}>
              <OutlinedTextField
                label='Click Below to Add One Ingredient'
                keyboardType='default'
                ref={this.fieldRef}
                value={this.state.oneIngredient}
                onChangeText={(oneIngredient) => this.setState({ oneIngredient })}
              />
            </View>
            <TouchableOpacity style={[styles.touchableButton, {
              width: 50, height: 50, marginTop: 20,
            }]} onPress={() => this.addToIngredients()}>
              <Text style={{ color: 'black', fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          </View>

          <FlatList
          style = {{marginTop : 5}}
          data={this.state.ingredientsArray}
          renderItem={({ item , index }) => {
            return  <View key={index}>
                        <View style={styles.topTitleContainer}>
                            <View style={{ flexDirection: 'row', marginStart: 10, width: Dimensions.get('window').width - 50 }}>
                                <View style={styles.circle}>
                                    <Text>{index}</Text>
                                </View>
                                <Text style={[styles.titleTextColor, {marginTop : 1}]}>{this.state.ingredientsArray[index].toString()}</Text>
                            </View>
                        </View>
                    </View>
          }}
          extraData={this.state}  // This is the Key you need to privde extra data parmater
        />
          <View style={{ flexDirection: 'row' }}>
          <View style={[styles.outLinedTextField, { marginTop: 20 , flex : 0.9 }]}>
            <OutlinedTextField
              label='Click Below to Add One Instruction'
              keyboardType='default'
              ref={this.fieldRef}
              value={this.state.oneInstruction}
              onChangeText={(oneInstruction) => this.setState({ oneInstruction })}
            />
          </View>
            <TouchableOpacity style={[styles.touchableButton, { width: 50, height: 50 ,marginTop: 20,}]} onPress={() => this.addToInstructions()}>
              <Text style={{ color: 'black', fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
          style = {{marginTop : 5}}
          data={this.state.instructionsArray}
          renderItem={({ item , index }) => {
            return  <View key={index}>
                        <View style={styles.topTitleContainer}>
                            <View style={{ flexDirection: 'row', marginStart: 10, width: Dimensions.get('window').width - 50 }}>
                                <View style={styles.circle}>
                                    <Text>{index}</Text>
                                </View>
                                <Text style={[styles.titleTextColor, {marginTop : 1}]}>{this.state.instructionsArray[index].toString()}</Text>
                            </View>
                        </View>
                    </View>
          }}
          extraData={this.state}
        />
          <View style={[styles.outLinedTextField, { marginTop: 10 }]}>
            <OutlinedTextField
              label='Youtube URL'
              keyboardType='default'
              ref={this.fieldRef}
              value={this.state.youTubeURL}
              onChangeText={(youTubeURL) => this.setState({ youTubeURL })}
            />
          </View>
          <View style={styles.centerContainer}>
          <View style={{ flexDirection: 'row', alignItems : "center" }}>
            <TouchableOpacity style={[styles.touchableButton, {height : 50, width : 150}]} onPress={() => this.showImagePicker()}>
              <Text style={[styles.titleTextColor,{ color: 'black', fontSize : 15 }]}>Upload Image</Text>
            </TouchableOpacity>
            <View>
                {this.renderFileUri()}
              </View>
              </View>
            <TouchableOpacity style={[styles.touchableButton, {marginBottom : 10}]} onPress={() => this.onAddRecipe(this.state.recipeName, this.state.preprationTime, this.state.noOfServes, this.state.complexity, this.state.youTubeURL, this.state.tags)}>
              <Text style={[styles.titleTextColor,{ color: 'black' , fontSize : 15}]}>Add Recipe</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }
}