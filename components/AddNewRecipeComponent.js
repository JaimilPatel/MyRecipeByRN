import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView,FlatList, TouchableOpacity} from 'react-native';
import {
  OutlinedTextField,
} from 'react-native-material-textfield';
import {Dropdown } from 'react-native-material-dropdown'
import TagInput from 'react-native-tags-input';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage'
import { storeIngredient } from '../actions/ingredientAction';
import { connect } from 'react-redux';

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
    color: '#DC7633'
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
class AddNewRecipeComponent extends Component {

  static navigationOptions = {
    headerShown: false,
    title: '',
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
      tagsColor: '#DC7633',
      tagsText: '#DC7633',
      youTubeURL: '',
      oneIngredient: '',
      ingredientsArray: [],
      oneInstruction: '',
      instructionsArray: [],
      uploadImage : undefined,
      uploadImageUri : '',
      getToken : ''
    }
  }

  componentDidMount() {
    this.retrieveData()
  }

  showImagePicker = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
        if (res.didCancel) {
        } else if (res.error) {
            console.log("Error", res.error);
        } else {
            this.setState({
                uploadImage: { uri: res.uri },
                uploadImageUri : res.uri
            });

        }
    });
}
  addToIngredients = () => {
    var newIngredient = this.state.oneIngredient
    var arr = this.state.ingredientsArray
    arr.push(newIngredient)
    this.setState({ ingredientsArray: arr })
    this.textIngredient.clear()
    this.props.storeIngredient(arr)
  }

  addToInstructions = () => {
    var newInstruction = this.state.oneInstruction
    var arr = this.state.instructionsArray
    arr.push(newInstruction)
    this.setState({ instructionsArray: arr })
    this.textInstruction.clear()
  }

  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('authTokenStore');
      if (value !== null) {
        this.setState({ getToken: value })
      }
    } catch (error) {
      alert(error)
    }
  };

  onAddRecipe(recipeName, preprationTime, noOfServes, complexity, youTubeURL, tags) {
    const data = this.props.navigation.getParam('data', '');
    fetch('http://35.160.197.175:3006/api/v1/recipe/add',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + data,
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
      this.addIngredientsAndInstruction(id)      
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
            'Authorization': 'Bearer ' + data,
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
        this.onUpdateRecipePhoto(id)
      }).catch((error) => {
        console.log(error)
      });
    }
    for (var inst in this.state.instructionsArray) {
      fetch('http://35.160.197.175:3006/api/v1/recipe/add-instruction',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + data,
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
      }).catch((error) => {
        console.log(error)
      });
    }

  }

 createFormData = (id) => {
    const data = new FormData();
    var photo = {
        uri: this.state.uploadImage.uri,
        type: 'image/png',
        name: 'photo.png',
    };
    data.append("photo", photo);
    data.append("recipeId",id)
    return data;
  };

  onUpdateRecipePhoto(id) {
    const data = this.props.navigation.getParam('data', '');
    fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + data,
        },
       body :  this.createFormData(id)
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {
      this.props.navigation.navigate('RecipeFeed')
    }).catch((error) => {
      console.log(error)
    });
  }

  renderFileUri() {
    if (this.state.uploadImageUri) {
      return <Image
        source={{ uri: this.state.uploadImage.uri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('../images/noimage.jpg')}
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
              tintColor = '#DC7633'
              onChangeText={(recipeName) => this.setState({ recipeName })}
            />
          </View>
          <View style={[styles.outLinedTextField, { marginTop: 5 }]}>
            <OutlinedTextField
            selectionColor = 'black'
              label='Prepration Time'
              keyboardType='default'
              ref={this.fieldRef}
              tintColor = '#DC7633'
              value={this.state.preprationTime}
              onChangeText={(preprationTime) => this.setState({ preprationTime })}
            />
          </View>
          <View style={[styles.outLinedTextField, { marginTop: 5 }]}>
            <OutlinedTextField
              label='Serves'
              keyboardType='numeric'
              ref={this.fieldRef}
              tintColor = '#DC7633'
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
                ref={input => { this.textIngredient = input }}
                tintColor = '#DC7633'
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
          extraData={this.state} 
        />
          <View style={{ flexDirection: 'row' }}>
          <View style={[styles.outLinedTextField, { marginTop: 20 , flex : 0.9 }]}>
            <OutlinedTextField
              label='Click Below to Add One Instruction'
              keyboardType='default'
              ref={input => { this.textInstruction = input }}
              tintColor = '#DC7633'
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
              tintColor = '#DC7633'
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

const mapStateToProps = (state) => {
  return { ingredients: state.ingredientReducer.ingredients}
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeIngredient: (ingredients) => {
      dispatch(storeIngredient(ingredients))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewRecipeComponent)