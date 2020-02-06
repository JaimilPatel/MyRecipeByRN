import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, FlatList, Dimensions, RefreshControl, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'

const styles = StyleSheet.create({

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
  }
})
export class ProfileComponent extends Component {

  static navigationOptions = {
    headerShown: false,
    title: '',
    tabBarIcon: ({ focused , tintColor }) => {
      if (focused) {
          return  <Image
          source={require('../images/user.png')}
          style={{ width: 26, height: 26, tintColor: tintColor, marginBottom: 10 }}
        />
      } else {
        return  <Image
        source={require('../images/user.png')}
        style={{ width: 26, height: 26, tintColor: 'white' ,marginBottom: 10 }}
      />
      }
  }
  }

  constructor() {
    super()
    this.state = {
      dataFavouriteFeedSource: [],
      getFirstName : '',
      getLastName : ''
    }
  }
  componentDidMount() {
    this.getFavouriteRecipeList()
  }

  getFavouriteRecipeList() {
    const data = this.props.navigation.getParam('data', '');
    fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'
        },
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {
      const {firstName} = responseJson[0]
      const {lastName} = responseJson[0]
      this.setState({
        dataFavouriteFeedSource: responseJson,
        getFirstName : firstName,
        getLastName : lastName
      });
      
    }).catch((error) => {
      console.log(error)
    });
  }
  render() {
    return (
      <SafeAreaView style= {{backgroundColor : '#F9DAC6'}}>
        <ScrollView>
          <View>
            <View style={styles.centerContainer}>
              <Image
                source={require('../images/profile.jpeg')}
                style={styles.imageProfileContainer}
                resizeMode="cover"
              />
            </View>
            <View style={{height: 50, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.titleTextColor, { marginTop: 5 }]}>{this.state.getFirstName+' '+this.state.getLastName}</Text>
            </View>
              <View style={{ flexDirection: 'row', marginStart: 10 }}>
                <Image
                  style={{ width: 30, height: 30, marginStart: 10}}
                  source={require('../images/cooking.png')}
                />
                <Text style={[styles.titleTextColor, { marginTop: 5 }]}>Easy Recipes For Beginners</Text>
              </View>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
              }
              horizontal={true}
              data={this.state.dataFavouriteFeedSource}
              renderItem={({ item }) => {
                if (item.complexity == 'Easy') {
                  return <View style={styles.horizontalImageViewContainer}>
                    <View style={{ height: 190, backgroundColor: 'white', margin: 10, borderRadius: 10, borderColor: 'silver', borderWidth: 1, }}>
                      <TouchableWithoutFeedback onPress={() => this.onRecipeClick(item)} style={{ height: 150 }}>
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
                  style={{ width: 30, height: 30, marginStart: 10}}
                  source={require('../images/cooking.png')}
                />
                <Text style={[styles.titleTextColor, { marginTop: 5 }]}>Medium Recipes For Learners</Text>
              </View>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
              }
              horizontal={true}
              data={this.state.dataFavouriteFeedSource}
              renderItem={({ item }) => {
                if (item.complexity == 'Medium') {
                  return <View style={styles.horizontalImageViewContainer}>
                    <View style={{ height: 190, backgroundColor: 'white', margin: 10, borderRadius: 10, borderColor: 'silver', borderWidth: 1, }}>
                      <TouchableWithoutFeedback onPress={() => this.onRecipeClick(item)} style={{ height: 150 }}>
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
                  style={{ width: 30, height: 30, marginStart: 10}}
                  source={require('../images/cooking.png')}
                />
                <Text style={[styles.titleTextColor, { marginTop: 5 }]}>Complex Recipes For Experts</Text>
              </View>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
              }
              horizontal={true}
              data={this.state.dataFavouriteFeedSource}
              renderItem={({ item }) => {
                if (item.complexity == 'Complex') {
                  return <View style={styles.horizontalImageViewContainer}>
                    <View style={{ height: 190, backgroundColor: 'white', margin: 10, borderRadius: 10, borderColor: 'silver', borderWidth: 1, }}>
                      <TouchableWithoutFeedback onPress={() => this.onRecipeClick(item)} style={{ height: 150 }}>
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