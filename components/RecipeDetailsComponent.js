import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity, Share } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DataLoadingComponent from './DataLoadingComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-community/async-storage'

const styles = StyleSheet.create({

    touchableButton: {
        alignItems: 'center',
        backgroundColor: 'black',
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
        justifyContent: "space-around",
        backgroundColor: 'white',
        alignItems: "stretch",
        width: Dimensions.get('window').width,
        height: 50,
        padding: 5,
    },

    titleTextColor: {
        color: 'black',
        marginStart: 10,
        fontSize: 18,
    },
    textColor: {
        color: 'white'
    },

    imageContainer: {
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: 250,
    },


    transparentContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row',

    },

    textStyle: {
        color: 'white',
        marginStart: 5,
        marginTop: 3
    },

    circle: {
        width: 30,
        height: 30,
        borderRadius: 100 / 2,
        backgroundColor: '#DC7633',
        justifyContent: 'center',
        alignItems: "center"
    }
})

export class RecipeDetailsComponent extends Component {

    constructor() {
        super()
        this.state = {
            id: null,
            recipeName: '',
            imageUrl: '',
            youtubeUrl: '',
            serves: null,
            complexity: '',
            preparationTime: '',
            viewSelection: false,
            instructionDataSource: [],
            ingredientDataSource: [],
            instructionSelectedButton: true,
            ingredientSelectedButton: false,
            isLoading: false,
            isRefreshing: true,
            TextInputValueHolder: '',
            getToken: ''
        }
    }

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

    onShowIngredients() {

        this.setState({ viewSection: true })
        if (!this.state.ingredientSelectedButton) {
            this.setState({ ingredientSelectedButton: true, instructionSelectedButton: false })
        }
    }

    onShowInstructions() {
        this.setState({ viewSection: false })
        if (!this.state.instructionSelectedButton) {
            this.setState({ instructionSelectedButton: true, ingredientSelectedButton: false })
        }
    }

    onShareData = () => {
        const recipeMessage = "Recipe Name : " + this.state.recipeName + "\n Complexity : " + this.state.complexity + "\n Youtube Link : " + this.state.youtubeUrl
        this.setState({
            TextInputValueHolder: recipeMessage
        })
        Share.share(
            {
                message: this.state.TextInputValueHolder.toString()
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }

    getRecipeDetails() {
        const recipeId = this.props.navigation.getParam('id', '');
        const data = this.props.navigation.getParam('data', '');
        fetch('http://35.160.197.175:3006/api/v1/recipe/' + recipeId + '/details', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {

            }
        }).then((responseJson) => {

            const { preparationTime } = responseJson
            const { photo } = responseJson
            const { serves } = responseJson
            const { complexity } = responseJson
            const { ingredients } = responseJson
            const { instructions } = responseJson
            const { name } = responseJson
            const { ytUrl } = responseJson
            var ingredientsArray = []
            var instructionArray = []
            for (var ingredientData in ingredients) {
                ingredientsArray.push(ingredients[ingredientData].ingredient)
            }
            this.setState({
                ingredientDataSource: ingredientsArray
            })
            for (var instructionData in instructions) {
                instructionArray.push(instructions[instructionData].instruction)
            }
            this.setState({
                instructionDataSource: instructionArray
            })
            this.setState({
                youtubeUrl: ytUrl,
                recipeName: name,
                imageUrl: photo,
                serves: serves,
                complexity: complexity,
                preparationTime: preparationTime,
                isRefreshing: false,
                isLoading: false
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidMount() {
        this.retrieveData()
        this.setState({
            isLoading: true,
        });
        this.getRecipeDetails()
    }
    render() {
        if (this.state.isRefreshing) {
            return (
                <View style={{ flex: 1, paddingTop: 20, justifyContent: "center" }}>
                    <DataLoadingComponent isLoading={this.state.isLoading} style={{ flex: 1, paddingTop: 20, justifyContent: "center" }} />
                </View>
            );
        }

        var renderbottomView = [];
        if (this.state.viewSection) {

            for (var i in this.state.ingredientDataSource) {
                renderbottomView.push(
                    <View key={i}>
                        <View style={styles.topTitleContainer}>
                            <View style={{ flexDirection: 'row', marginStart: 10 }}>
                                <View style={styles.circle}>
                                    <Text>{i}</Text>
                                </View>
                                <Text style={[styles.titleTextColor,]}>{this.state.ingredientDataSource[i]}</Text>
                            </View>
                        </View>
                    </View>
                );
            }

        } else {

            for (var i in this.state.instructionDataSource) {
                renderbottomView.push(
                    <View key={i}>
                        <View style={styles.topTitleContainer}>
                            <View style={{ flexDirection: 'row', marginStart: 10, width: Dimensions.get('window').width - 50 }}>
                                <View style={styles.circle}>
                                    <Text>{i}</Text>
                                </View>
                                <Text style={[styles.titleTextColor,]}>{this.state.instructionDataSource[i]}</Text>
                            </View>
                        </View>
                    </View>
                );

            }
        }


        return (
            <SafeAreaView style={{ backgroundColor: '#F9DAC6' }}>
                <ScrollView>
                    <View>
                        <View style={{ height: 230, justifyContent: 'flex-end' }}>
                            <WebView
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: this.state.youtubeUrl }}
                            />
                            <View style={styles.transparentContainer}>
                                <View style={styles.rowContainer}>
                                    <View style={styles.combineRowContainer}>
                                        <Image source={require('../images/effort.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                                        <Text style={styles.textStyle}>{this.state.complexity}</Text>
                                    </View>
                                    <View style={styles.combineRowContainer}>
                                        <Image source={require('../images/fork.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                                        <Text style={styles.textStyle}>{this.state.serves}</Text>
                                    </View>
                                    <View style={styles.combineRowContainer}>
                                        <Image source={require('../images/clock.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                                        <Text style={styles.textStyle}>{this.state.preparationTime}</Text>
                                    </View>
                                    <View style={styles.combineRowContainer}>
                                        <TouchableWithoutFeedback onPress={() => this.onShareData()} >
                                            <Image source={require('../images/share.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{
                                    alignSelf: 'stretch', backgroundColor:
                                        this.state.instructionSelectedButton
                                            ? "#DC7633"
                                            : "#F9DAC6", height: 50
                                }} onPress={() => this.onShowInstructions()}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: '600',
                                        paddingTop: 14,
                                        paddingBottom: 10

                                    }}>INSTRUCTIONS</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderLeftWidth: 1, borderLeftColor: 'white' }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{
                                    alignSelf: 'stretch', backgroundColor:
                                        this.state.ingredientSelectedButton
                                            ? "#DC7633"
                                            : "#F9DAC6", height: 50
                                }} onPress={() => this.onShowIngredients()}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: '600',
                                        paddingTop: 14,
                                        paddingBottom: 10
                                    }}>INGREDIENTS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {renderbottomView}
                </ScrollView>
            </SafeAreaView>
        )
    }
}