import React , {Component} from 'react';
import {View,FlatList, SafeAreaView,RefreshControl,TouchableWithoutFeedback,Text,Dimensions, Image , StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    imageContainer : {
    width: 250,
    height: 250,
    marginTop: 20
    }
})

function Item({ recipeItems }) {
    if(recipeItems.photo!=null){
    return (
      <View>
          <Image source={{ uri: recipeItems.photo }} style={styles.imageContainer}></Image>
        <Text>{recipeItems.complexity}</Text>
      </View>
    );
    }else {
        return null
    }
  }
export class HomeComponent extends Component{

    constructor(props){
            super(props)
            this.state = {
                isLoading : false,
                dataSource : []
            }
    }

    componentDidMount(){
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
        {
            method : 'GET',
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
                dataSource: responseJson
              });
          }).catch((error) => {
            console.log(error)
          });
    }

    // renderItem = ({item, index}) => {
    //     const { CookingList } = item;
    
    //     if (!CookingList[0]) return null;
    //     const details = CookingList[0];
    
    //     return (
    //         <View>
    //         <Text>{details.name}</Text>
    // </View>
    //     );
    //   }
    
    //   keyExtractor = (item, index) => {
    //     return index.toString();
    //   }

    render(){
        return (
            <SafeAreaView>
            
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => <Item recipeItems={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
          );
    }
}