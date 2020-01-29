import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl, ImageBackground, TouchableWithoutFeedback, Text, Dimensions, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import DataLoadingComponent from './DataLoadingComponent';

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
    flexDirection: 'row'
    
  },
  topTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: "center",
    width: 381,
    height: 50,
    flexDirection: 'row',
  },
  imageViewController: {
    alignItems: "center",
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
    width: "100%",
    justifyContent: 'flex-end',
    width: 380,
    height: 150,
    resizeMode: 'cover',
  },
  transparentContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row'
  },
})

export class HomeComponent extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      dataSource: [],
      isRefreshing: true,
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
    this.setState({ isRefreshing: true, isLoading: true }, function () { this.getCookingList() });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 1000);

  }
  
  onRecipeClick(item){
    console.log(item)
  }

  getCookingList() {
    fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'
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
        dataSource: responseJson,
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
    this.getCookingList()
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
      <SafeAreaView>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshList()}></RefreshControl>
          }
          data={this.state.dataSource}
          renderItem={({ item }) => {
              return (
                <View style={styles.imageViewController}>
                  <View style={styles.shadowController}>
                  
                        <View style={styles.topTitleContainer}>
                          <Text style={styles.textColor}>Cook :{item.firstName}</Text>
                          {/* <Text style={styles.textColor}>Serves : {item.serves}</Text>
                          <Text style={styles.textColor}>PreprationTime {item.preparationTime}</Text> */}
                        </View>
                      <TouchableWithoutFeedback onPress={ () => this.onRecipeClick(item)}>
                    <ImageBackground source={item.photo != null ? { uri: item.photo } : require('../images/recipe.jpg')} defaultSource={placeholder} style={[styles.imageContainer, { height: 200 }]} resizeMode="cover">
                      <View style={styles.transparentContainer}>
                        <View style={styles.rowContainer}>
                          <Text style={styles.textColor}>Complexity : {item.complexity}</Text>
                          <Text style={styles.textColor}>Serves : {item.serves}</Text>
                          <Text style={styles.textColor}>PreprationTime {item.preparationTime}</Text>
                        </View>
                      </View>
                    </ImageBackground>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              );
          }}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}



