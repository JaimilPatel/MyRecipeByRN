import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl, ImageBackground, TouchableWithoutFeedback, Text, StyleSheet, Alert, Dimensions,Image } from 'react-native'
import DataLoadingComponent from './DataLoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';
const placeholder = require('../images/loaderfood.gif');

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
    backgroundColor: '#A0A5B0',
    alignItems: "center",
    width: 381,
    height: 50,
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  imageViewController: {
    alignItems: "center",
    height: 235,
    backgroundColor: '#A0A5B0',
    borderRadius: 10,
    margin: 15,
    padding: 15
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
    flexDirection: 'row'
  },
  horizontalImageViewContainer: {
    width: ((Dimensions.get('window').width - 60) / 2),
  },
  textStyle: {
    color: 'white',
    marginStart: 5,
    marginTop: 3
  }
})

export class HomeComponent extends Component {
  static navigationOptions = {
    headerShown: false
  };
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      dataFeedSource: [],
      dataFavouriteSource : [],
      isRefreshing: true,
      authToken: ''
    }
  }
  onPostClick = (item) => {
    Alert.alert(
      item.name,
      item.firstName + " " + item.lastName,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  refreshList() {
    this.setState({ isRefreshing: true, isLoading: true }, function () { this.getFeedList() , this.getFavouriteRecipeList() });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 1000);

  }

  onLikeClick(item) {
    console.log("RecipeId click " + item.recipeId)
  }

  onRecipeClick(item) {
    console.log(item)
  }

  getFavouriteRecipeList(){
    const data = this.props.navigation.getParam('data', '');
    fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + data
        },
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {
      this.setState({
        isLoading: false,
        dataFavouriteSource: responseJson,
        isRefreshing: false
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  getFeedList() {
    const data = this.props.navigation.getParam('data', '');
    fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + data
        },
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {
      this.setState({
        isLoading: false,
        dataFeedSource: responseJson,
        isRefreshing: false
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  componentDidMount() {

    this.setState({
      isLoading: true,
    });
    this.getFeedList()
    this.getFavouriteRecipeList()
  }

  render() {
    if (this.state.isRefreshing) {
      return (
        <View style={{ flex: 1, paddingTop: 20, justifyContent: "center" }}>
          <DataLoadingComponent isLoading={this.state.isLoading}></DataLoadingComponent>
        </View>
      );
    }
    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <ScrollView>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10, paddingBottom: 5 }}>Meals For One</Text>
            <Text style={{ marginStart: 10, fontSize: 18, padding: 10, paddingBottom: 5}}>See all</Text>
          </View>
          <Text style={{ marginStart: 10, fontSize: 15 }}>Everyday meals curated for you</Text>
          <FlatList
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
          }
            horizontal={true}
            data={this.state.dataFavouriteSource.slice(0,4)}
            renderItem={({ item }) => {
              return <View style={styles.horizontalImageViewContainer}>
                <View style={{ height: 200, backgroundColor: '#A0A5B0', margin: 10, borderRadius: 10 }}>
                  <TouchableWithoutFeedback onPress={() => this.onRecipeClick(item)} style={{ height: 50 }}>
                    <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} defaultSource={placeholder} style={[styles.horizontalImageContainer, { height: 200, flex: 0.95 }]} resizeMode="cover">

                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <View style={styles.transparentContainer}>
                      <View style={[styles.rowContainer , {height: 30}]}>
                        <View style={styles.combineRowContainer}>
                          <Image source={require('../images/fork.png')} style={{ width: 15, height: 15, tintColor: 'white' }}></Image>
                          <Text style={[styles.textStyle, {fontSize : 12 , marginTop : 0}]}>{item.serves}</Text>
                        </View>
                        <View style={styles.combineRowContainer}>
                          <Image source={require('../images/clock.png')} style={{ width: 15, height: 15, tintColor: 'white' }}></Image>
                          <Text style={[styles.textStyle, {fontSize : 12 ,  marginTop : 0}]}>{item.preparationTime}</Text>
                        </View>
                      </View>
                    </View>
                </View>
              </View>
            }}
            keyExtractor={item => item.recipeId}
          />
        </View>
        <View style = {{backgroundColor: 'white'}}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
          }
          data={this.state.dataFeedSource}
          renderItem={({ item }) => {
            return (
              <View style={styles.imageViewController}>
                <View style={styles.topTitleContainer}>
                  <View style={{flexDirection : 'row', marginStart : 10}}>
                  <Image
                    style={{ width: 30, height: 30, marginStart : 10, marginTop: 12 }}
                    source={require('../images/cooking.png')}
                  />
                  <Text style={[styles.titleTextColor, { marginTop: 14 }]}>{item.firstName}{" "}{item.lastName}</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => this.onLikeClick(item)}>
                    <Image
                      style={{ width: 25, height: 25,marginTop: 12 , marginRight : 20}}
                      source={require('../images/heart.png')}
                      tintColor='red'
                    />
                  </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={() => this.onRecipeClick(item)}>
                  <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} defaultSource={placeholder} style={[styles.imageContainer, { height: 180 }]} resizeMode="cover">
                    <View style={styles.transparentContainer}>
                      <View style={styles.rowContainer}>
                        <View style={styles.combineRowContainer}>
                          <Image source={require('../images/effort.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                          <Text style={styles.textStyle}>{item.complexity}</Text>
                        </View>
                        <View style={styles.combineRowContainer}>
                          <Image source={require('../images/fork.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                          <Text style={styles.textStyle}>{item.serves}</Text>
                        </View>
                        <View style={styles.combineRowContainer}>
                          <Image source={require('../images/clock.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                          <Text style={styles.textStyle}>{item.preparationTime}</Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableWithoutFeedback>
                <View style = {{height : 10, width : 381,backgroundColor  :'#A0A5B0',borderBottomStartRadius : 10, borderBottomEndRadius : 10}}>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.recipeId}
        />
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}



