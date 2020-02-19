import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, FlatList, Dimensions, RefreshControl, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import DataLoadingComponent from './DataLoadingComponent'
import { connect } from 'react-redux';
import * as AppConstant from '../constants/AppConstants'
import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({

  touchableButton: {
    alignItems: 'center',
    backgroundColor: '#DC7633',
    width: 310,
    justifyContent: "center",
    borderRadius: 10,
    height: 45,
    marginTop: 10,
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: "center",
    width: 381,
    height: 50,
    flexDirection: 'row',
  },
  combineRowContainer: {
    flexDirection: 'row'
  },
  topTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: 'white',
    alignItems: "center",
    width: 378,
    height: 50,
    padding: 5,
  },
  imageViewController: {
    alignItems: "center",
    height: 238,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  titleTextColor: {
    color: 'black',
    marginStart: 10,
    fontSize: 18,

  },
  textColor: {
    color: 'white'
  },
  shadowController: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 10,
    elevation: 8,

  },
  imageContainer: {
    justifyContent: 'flex-end',
    width: 380,
    height: 150,
    marginTop: 25,
  },

  horizontalImageContainer: {
    margin: 7

  },

  transparentContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',

  },
  horizontalImageViewContainer: {
    width: ((Dimensions.get('window').width - 60) / 2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  textStyle: {
    color: 'white',
    marginStart: 5,
    marginTop: 3
  },
  lastViewContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 381.5,
    height: 5,
    padding: 5,
    borderColor: 'silver', borderWidth: 1, borderTopWidth: 0, borderBottomStartRadius: 10, borderBottomEndRadius: 10
  },
  imageProfileContainer: {
    borderRadius: 400,
    width: 200,
    height: 200,
    marginTop: 20
  },
  centerContainer: {
    alignItems: "center"
  },

  images: {
    width: 150,
    height: 150,
    marginHorizontal: 3,
    marginTop: 10,
    marginStart: 50
  },
})
class ProfileComponent extends Component {

  static navigationOptions = {
    headerShown: false,
    title: '',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Image
          source={require('../images/user.png')}
          style={{ width: 26, height: 26, tintColor: tintColor, marginBottom: 10 }}
        />
      } else {
        return <Image
          source={require('../images/user.png')}
          style={{ width: 26, height: 26, tintColor: 'white', marginBottom: 10 }}
        />
      }
    }
  }

  constructor() {
    super()
    this.state = {
      dataFavouriteFeedSource: [],
      getFirstName: '',
      getLastName: '',
      getAuthorizedToken: '',
      isRefreshing: true,
      uploadImage: undefined,
      uploadImageUri: '',
    }
  }

  //To get Token from AsyncStorage
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(AppConstant.AUTHTOKEN);
      if (value !== null) {
        this.setState({ getAuthorizedToken: value })
      }
    } catch (error) {
    }
  };

  //To open ImagePicker
  showImagePicker = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
      } else if (res.error) {
      } else {
        this.setState({
          uploadImage: { uri: res.uri },
          uploadImageUri: res.uri
        });

      }
    });
  }

//To render Picked Image
  renderFileUri() {
    if (this.state.uploadImageUri) {
      return <Image
        source={{ uri: this.state.uploadImage.uri }}
        style={styles.imageProfileContainer}
      />
    } else {
      return <Image
        source={require('../images/profile.jpeg')}
        style={styles.imageProfileContainer}
      />
    }
  }

  render() {
    if (this.props.favouriteFeed == null) {
      return (
        <View style={{ flex: 1, paddingTop: 20, justifyContent: "center" }}>
          <DataLoadingComponent isLoading={this.state.isLoading} style={{ flex: 1, paddingTop: 20, justifyContent: "center" }} />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ backgroundColor: '#F9DAC6' }}>
        <ScrollView>
          <View>
            <View style={styles.centerContainer}>
            {this.renderFileUri()}
            <TouchableOpacity style={[styles.touchableButton, { height: 50, width: 150 }]} onPress={() => this.showImagePicker()}>
                <Text style={[styles.titleTextColor, { color: 'black', fontSize: 15 }]}>Upload Image</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 50, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.titleTextColor, { marginTop: 5, fontWeight: "bold" }]}>Jay Mehta</Text>
            </View>
            <View style={{ flexDirection: 'row', marginStart: 10 }}>
              <Image
                style={{ width: 30, height: 30, marginStart: 10 }}
                source={require('../images/cooking.png')}
              />
              <Text style={[styles.titleTextColor, { marginTop: 5 }]}>Easy Recipes For Beginners</Text>
            </View>
            <FlatList
              horizontal={true}
              data={this.props.favouriteFeed}
              renderItem={({ item }) => {
                if (item.complexity == 'Easy') {
                  return <View style={styles.horizontalImageViewContainer}>
                    <View style={{ height: 190, backgroundColor: 'white', margin: 10, borderRadius: 10, borderColor: 'silver', borderWidth: 1, }}>
                      <TouchableWithoutFeedback style={{ height: 150 }}>
                        <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} style={[styles.horizontalImageContainer, { height: 200, flex: 0.95 }]} resizeMode="cover">

                        </ImageBackground>
                      </TouchableWithoutFeedback>
                      <View style={styles.transparentContainer}>
                        <View style={[styles.rowContainer, { height: 30 }]}>
                          <View style={styles.combineRowContainer}>
                            <Text style={[styles.textStyle, { fontSize: 12, marginTop: 0 }]}>{item.name.toUpperCase()}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                }
              }}
              keyExtractor={item => item.recipeId}
            />
            <View style={{ flexDirection: 'row', marginStart: 10 }}>
              <Image
                style={{ width: 30, height: 30, marginStart: 10 }}
                source={require('../images/cooking.png')}
              />
              <Text style={[styles.titleTextColor, { marginTop: 5 }]}>Medium Recipes For Learners</Text>
            </View>
            <FlatList
              horizontal={true}
              data={this.props.favouriteFeed}
              renderItem={({ item }) => {
                if (item.complexity == 'Medium') {
                  return <View style={styles.horizontalImageViewContainer}>
                    <View style={{ height: 190, backgroundColor: 'white', margin: 10, borderRadius: 10, borderColor: 'silver', borderWidth: 1, }}>
                      <TouchableWithoutFeedback style={{ height: 150 }}>
                        <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} style={[styles.horizontalImageContainer, { height: 200, flex: 0.95 }]} resizeMode="cover">

                        </ImageBackground>
                      </TouchableWithoutFeedback>
                      <View style={styles.transparentContainer}>
                        <View style={[styles.rowContainer, { height: 30 }]}>
                          <View style={styles.combineRowContainer}>
                            <Text style={[styles.textStyle, { fontSize: 12, marginTop: 0 }]}>{item.name.toUpperCase()}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                }
              }}
              keyExtractor={item => item.recipeId}
            />
            <View style={{ flexDirection: 'row', marginStart: 10 }}>
              <Image
                style={{ width: 30, height: 30, marginStart: 10 }}
                source={require('../images/cooking.png')}
              />
              <Text style={[styles.titleTextColor, { marginTop: 5 }]}>Complex Recipes For Experts</Text>
            </View>
            <FlatList

              horizontal={true}
              data={this.props.favouriteFeed}
              renderItem={({ item }) => {
                if (item.complexity == 'Complex') {
                  return <View style={styles.horizontalImageViewContainer}>
                    <View style={{ height: 190, backgroundColor: 'white', margin: 10, borderRadius: 10, borderColor: 'silver', borderWidth: 1, }}>
                      <TouchableWithoutFeedback style={{ height: 150 }}>
                        <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} style={[styles.horizontalImageContainer, { height: 200, flex: 0.95 }]} resizeMode="cover">
                        </ImageBackground>
                      </TouchableWithoutFeedback>
                      <View style={styles.transparentContainer}>
                        <View style={[styles.rowContainer, { height: 30 }]}>
                          <View style={styles.combineRowContainer}>
                            <Text style={[styles.textStyle, { fontSize: 12, marginTop: 0 }]}>{item.name.toUpperCase()}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                }
              }}
              keyExtractor={item => item.recipeId}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = (state) => {
  return { favouriteFeed: state.GetCombineFeed.favouriteFeed }
}
export default connect(mapStateToProps)(ProfileComponent)
