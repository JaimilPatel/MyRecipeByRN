import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl, ImageBackground, TouchableWithoutFeedback, Text, StyleSheet, Alert, Dimensions, Image } from 'react-native'
import DataLoadingComponent from './DataLoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

const placholder = require('../images/loaderfood.gif')

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
  }
})

export class RecipeFeedComponent extends Component {
  static navigationOptions = {
    headerShown: false,
    title: '',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Image
          source={require('../images/fork.png')}
          style={{ width: 26, height: 26, tintColor: tintColor, marginBottom: 10 }}
        />
      } else {
        return <Image
          source={require('../images/fork.png')}
          style={{ width: 26, height: 26, tintColor: 'white', marginBottom: 10 }}
        />
      }
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isApiLoading: false,
      dataFeedSource: [],
      dataFavouriteSource: [],
      isRefreshing: true,
      authToken: '',
      value: ''
    }
    this.arrayHolder = [];
  }

  refreshList() {
    this.setState({ isRefreshing: true, isLoading: true }, function () { this.getFeedList(), this.getFavouriteRecipeList() });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 1000);

  }

  onShare

  onLikeClick(item) {
    this.addToFavourite(item)
  }

  onRecipeClick(item) {
    this.props.navigation.navigate('RecipeDetail', {
      id: item.recipeId,
      data : data
    });
  }

  addToFavourite(item) {

    const data = this.props.navigation.getParam('data', '');
    if (item.inCookingList == 0) {
      fetch('http://35.160.197.175:3006/api/v1/recipe/add-to-cooking-list',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + data,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'recipeId': item.recipeId,
          })
        }
      ).then((response) => {
        if (response.status == 200) {
          return response.json()
        } else {
        }
      }).then((responseJson) => {
        this.getFeedList()
        this.getFavouriteRecipeList()
      }).catch((error) => {
        console.log(error)
      });
    } else {
      this.removeFromFavourite(item)
    }
  }

  removeFromFavourite(item) {
    const data = this.props.navigation.getParam('data', '');
    fetch('http://35.160.197.175:3006/api/v1/recipe/rm-from-cooking-list',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + data,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'recipeId': item.recipeId,
        })
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
      }
    }).then((responseJson) => {
      this.getFeedList()
      this.getFavouriteRecipeList()
    }).catch((error) => {
      console.log(error)
    });
  }

  getFavouriteRecipeList() {
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
      this.arrayHolder = responseJson
    }).catch((error) => {
      console.log(error)
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#000000',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <SearchBar
          autoCorrect={false}
          autoFocus={true}
          placeholder="Search Your Recipe Here......"
          placeholderTextColor='silver'
          onChangeText={text => this.searchFilterFunction(text)}
          value={this.state.value}
          autoFocus={false}
          lightTheme={true}
          containerStyle={{ backgroundColor: '#F9DAC6' }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          round={true}
          clearIcon={null}
          color='black'
          searchIcon={null}
          icon={{ type: 'font-awesome', name: 'search' }}
          ref={search => this.search = search}

        />
      </View>
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayHolder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataFeedSource: newData,
    });
  };

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
          <DataLoadingComponent isLoading={this.state.isLoading} style={{ flex: 1, paddingTop: 20, justifyContent: "center" }} />
        </View>
      );
    }
    return (

      <SafeAreaView>

        <ScrollView>
          <View style={{ backgroundColor: '#F9DAC6' }}>
            <View style={styles.combineRowContainer}>
              <Image source={require('../images/meals.png')} style={{ width: 25, height: 25, marginStart: 10, marginTop: 20 }}></Image>
              <Text style={{ fontWeight: "bold", fontSize: 20, marginStart: 5, marginTop: 20 }}>Meals For One</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginStart: 10, fontSize: 15, marginTop: 5 }}>Everyday meals curated for you</Text>
              <View style={styles.combineRowContainer}>
                <Text style={{ fontSize: 17, fontWeight: '900', marginTop: 4 }}>See all</Text>
                <Image source={require('../images/next.png')} style={{ width: 20, height: 20, marginStart: 5, marginEnd: 10, marginTop: 7 }}></Image>

              </View>
            </View>

            <FlatList
              refreshControl={
                <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
              }
              horizontal={true}
              data={this.state.dataFavouriteSource}
              renderItem={({ item }) => {
                return <View style={styles.horizontalImageViewContainer}>
                  <View style={{ height: 200, backgroundColor: 'white', margin: 10, borderRadius: 10, borderColor: 'silver', borderWidth: 1, }}>
                    <TouchableWithoutFeedback onPress={() => this.onRecipeClick(item)} style={{ height: 50 }}>
                      <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} defaultSource={placholder} style={[styles.horizontalImageContainer, { height: 200, flex: 0.95 }]} resizeMode="cover">

                      </ImageBackground>
                    </TouchableWithoutFeedback>
                    <View style={styles.transparentContainer}>
                      <View style={[styles.rowContainer, { height: 30 }]}>
                        <View style={styles.combineRowContainer}>
                          <Image source={require('../images/fork.png')} style={{ width: 15, height: 15, tintColor: 'white' }}></Image>
                          <Text style={[styles.textStyle, { fontSize: 12, marginTop: 0 }]}>{item.serves}</Text>
                        </View>
                        <View style={styles.combineRowContainer}>
                          <Image source={require('../images/clock.png')} style={{ width: 15, height: 15, tintColor: 'white' }}></Image>
                          <Text style={[styles.textStyle, { fontSize: 12, marginTop: 0 }]}>{item.preparationTime}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              }}
              keyExtractor={item => item.recipeId}
            />

          </View>

          <View style={{ backgroundColor: '#F9DAC6' }}>

            <View style={styles.combineRowContainer}>
              <Image source={require('../images/foodorder.png')} style={{ width: 25, height: 25, marginStart: 10, marginTop: 20 }}></Image>
              <Text style={{ fontWeight: "bold", fontSize: 20, marginStart: 5, marginTop: 20 }}>Orders</Text>
            </View>

            <Text style={{ marginStart: 10, fontSize: 15, marginTop: 5 }}>First we eat, then we do everything else.</Text>
            <FlatList style={{ marginTop: 10 }}
              refreshControl={
                <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
              }
              data={this.state.dataFeedSource}
              renderItem={({ item }) => {
                return (
                  <View style={[styles.imageViewController, { borderColor: 'silver', borderWidth: 1, borderBottomWidth: 1 }]}>
                    <View style={styles.topTitleContainer}>
                      <View style={{ flexDirection: 'row', marginStart: 10 }}>
                        <Image
                          style={{ width: 30, height: 30, marginStart: 10, marginTop: 12 }}
                          source={require('../images/cooking.png')}
                        />
                        <Text style={[styles.titleTextColor, { marginTop: 14 }]}>{item.firstName}{" "}{item.lastName}</Text>
                      </View>
                      <TouchableWithoutFeedback onPress={() => this.onLikeClick(item)}>
                        <Image
                          style={{ width: 30, height: 30, marginTop: 12, marginRight: 20 }}
                          source={(item.inCookingList == 0)
                            ? require('../images/dislike.png')
                            : require('../images/like.png')}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.onRecipeClick(item)}>
                      <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} style={[styles.imageContainer, { height: 178, marginBottom: 10 }]} resizeMode="cover">
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
                  </View>
                );
              }}
              keyExtractor={item => item.recipeId}
              ListHeaderComponent={this.renderHeader}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}



