import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity, Share, TouchableWithoutFeedbackBase } from 'react-native'
import { ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler';
import DataLoadingComponent from './DataLoadingComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-community/async-storage'
import {
    OutlinedTextField,
} from 'react-native-material-textfield';
import { TextInput } from 'react-native-paper';
import * as AppConstant from '../constants/AppConstants'
import * as ApiConstant from '../constants/ApiConstants'

const styles = StyleSheet.create({

    outLinedTextField: {
        paddingHorizontal: 10
    },


    touchableButton: {
        alignItems: 'center',
        backgroundColor: 'black',
        width: 310,
        justifyContent: "center",
        borderRadius: 10,
        height: 45,
        marginTop: 10,
    },
    touchableButtons: {
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
        justifyContent: "space-around",
        backgroundColor: 'white',
        alignItems: "stretch",
        width: Dimensions.get('window').width,
        height: 50,
        padding: 5,
    },
    commentContainer: {
        justifyContent: "space-around",
        backgroundColor: 'white',
        alignItems: "stretch",
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

export default class RecipeDetailsComponent extends Component {

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
            getToken: '',
            getComments: [],
            addedComment: '',
            commentArray: [],
            commentIdArray: [],
            commentTimeArray: [],
            commentWriterArray: [],
            viewVisible: false,
            itemPressed: null,
            innerViewVisible: false,
            updatedComment: '',
            currentTime: new Date().toLocaleString().substring(11, 13),
            finalDiffTime: ''
        }
    }

    //To get token from AsyncStorage
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(AppConstant.AUTHTOKEN);
            if (value !== null) {
                this.setState({ getToken: value })
            }
        } catch (error) {
        }
    };

    //To show ingredients list into renderBottomView
    onShowIngredients() {

        this.setState({ viewSection: true })
        if (!this.state.ingredientSelectedButton) {
            this.setState({ ingredientSelectedButton: true, instructionSelectedButton: false })
        }
    }

    //To show instructions list into renderBottomView
    onShowInstructions() {
        this.setState({ viewSection: false })
        if (!this.state.instructionSelectedButton) {
            this.setState({ instructionSelectedButton: true, ingredientSelectedButton: false })
        }
    }

    //To share data with other apps
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

    onLocationData = () =>{
             this.props.navigation.navigate(AppConstant.MAPROUTE);
    }

    //To Call API for Add Comment
    addComment() {
        this.textComment.clear()
        const recipeId = this.props.navigation.getParam('id', '');
        const data = this.props.navigation.getParam('data', '');
        fetch(ApiConstant.COMMON_APIURL + recipeId + '/comments', {

            method: ApiConstant.POST_METHOD,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                'Content-Type': ApiConstant.CONTENT_TYPE_VALUE
            },
            body: JSON.stringify({
                'comment': this.state.addedComment,
            })
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
            }
        }).then((responseJson) => {
            const { msg } = responseJson
            this.setState({
                addedComment: ''
            })
            this.getComment()
        }).catch((error) => {
        })
    }

    //To Call API for Get Comment
    getComment() {
        const recipeId = this.props.navigation.getParam('id', '');
        const data = this.props.navigation.getParam('data', '');
        fetch(ApiConstant.COMMON_APIURL + recipeId + '/comments', {

            method: ApiConstant.GET_METHOD,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                'Content-Type': ApiConstant.CONTENT_TYPE_VALUE
            },
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
            }
        }).then((responseJson) => {
            this.setState({
                getComments: responseJson
            })
            var getCommentArray = []
            var getCommentIdArray = []
            var getCommentTimeArray = []
            var getCommentWriterArray = []
            for (var commentData in this.state.getComments) {
                getCommentArray.push(this.state.getComments[commentData].comment)
                getCommentIdArray.push(this.state.getComments[commentData].id)
                getCommentTimeArray.push(this.state.getComments[commentData].createdAt)
                getCommentWriterArray.push(this.state.getComments[commentData].firstName)
            }
            this.setState({
                commentArray: getCommentArray,
                commentIdArray: getCommentIdArray,
                commentTimeArray: getCommentTimeArray,
                commentWriterArray: getCommentWriterArray
            })

        }).catch((error) => {
        })
    }

    //To Call API for Edit Comment
    editComment(commentId) {
        this.setState({ innerViewVisible: false })
        const recipeId = this.props.navigation.getParam('id', '');
        const data = this.props.navigation.getParam('data', '');
        fetch(ApiConstant.COMMON_APIURL + recipeId + '/comments/' + commentId, {

            method: ApiConstant.PUT_METHOD,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                'Content-Type': ApiConstant.CONTENT_TYPE_VALUE
            },
            body: JSON.stringify({
                'comment': this.state.updatedComment,
            })
        }).then((response) => {
            if (response.status == 200) {

                return response.json()
            } else {

            }
        }).then((responseJson) => {
            this.getComment()
        }).catch((error) => {
        })
    }

    //To Call API for Delete Comment
    deleteComment(commentId) {
        const recipeId = this.props.navigation.getParam('id', '');
        const data = this.props.navigation.getParam('data', '');
        fetch(ApiConstant.COMMON_APIURL + recipeId + '/comments/' + commentId, {

            method: ApiConstant.DELETE_METHOD,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {

            }
        }).then((responseJson) => {

            this.getComment()
        }).catch((error) => {
        })
    }

    //To Call API for Recipe Details
    getRecipeDetails() {
        const recipeId = this.props.navigation.getParam('id', '');
        const data = this.props.navigation.getParam('data', '');
        fetch(ApiConstant.COMMON_APIURL + recipeId + '/details', {
            method: ApiConstant.GET_METHOD,
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
        })
    }

    componentDidMount() {
        this.retrieveData()
        this.setState({
            isLoading: true,
        });
        this.getRecipeDetails()
        this.getComment()
    }

    //To know on which comment user clicked
    typeSelected(value) {
        this.setState({
            itemPressed: value,
            innerViewVisible: true
        });

    }

    //Comment list View
    renderTouchableHighlight(comments, commentIds, commenttime, commentwriter, index) {
        let diffTime
        var currentDate = new Date();
        var utcData = currentDate.toUTCString();
        if (commenttime[index].toString().substring(11, 13) > utcData.substring(17, 19)) {
            diffTime = commenttime[index].toString().substring(11, 13) - utcData.substring(17, 19)
        } else {
            diffTime = -(commenttime[index].toString().substring(11, 13) - utcData.substring(17, 19))
        }
        return (
            <View style={{ flexDirection: 'row', marginStart: 10, width: Dimensions.get('window').width - 50, justifyContent: 'space-around', alignItems: "center" }}>

                <TouchableOpacity onPress={() => this.typeSelected(commentIds[index])}>
                    {(this.state.itemPressed === commentIds[index] && this.state.innerViewVisible === true) ?

                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={{ width: 300, height: 20, backgroundColor: 'white', textColor: 'black' }}
                                keyboardType='default'
                                value={this.state.updatedComment}
                                onChangeText={(updatedComment) => this.setState({ updatedComment })}
                            />
                            <TouchableOpacity style={[styles.touchableButtons, {
                                width: 30, height: 30, marginStart: 5
                            }]} onPress={() => this.editComment(commentIds[index])}>
                                <Text style={{ color: 'black', fontSize: 20 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.commentContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circle}>
                                    <Text>{index}</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={[styles.titleTextColor, { width: 300, }]}>{comments[index].toString()}</Text>
                                    <Text style={[styles.titleTextColor, { width: 300, fontSize: 10 }]}>{diffTime} Hours ago by {commentwriter[index]}</Text>
                                </View>
                            </View>
                        </View>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteComment(commentIds[index])}>
                    <Image source={require('../images/bin.png')} style={{ width: 25, height: 25, marginStart: 10 }}></Image>
                </TouchableOpacity>

            </View>
        )
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
                                    <View style={styles.combineRowContainer}>
                                        <TouchableWithoutFeedback onPress={() => this.onLocationData()} >
                                            <Image source={require('../images/pin.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
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
                    <View style={styles.outLinedTextField}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.outLinedTextField, { marginTop: 10, flex: 1 }]}>
                                <OutlinedTextField
                                    label='Add Comment....'
                                    keyboardType='default'
                                    ref={input => { this.textComment = input }}
                                    tintColor='#DC7633'
                                    value={this.state.addedComment}
                                    onChangeText={(addedComment) => this.setState({ addedComment })}
                                />
                            </View>
                            <TouchableOpacity style={[styles.touchableButtons, {
                                width: 50, height: 50, marginTop: 10,
                            }]} onPress={() => this.addComment()}>
                                <Text style={{ color: 'black', fontSize: 30 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{
                            alignSelf: 'stretch', backgroundColor: '#DC7633', height: 50
                        }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: 'black',
                                fontSize: 16,
                                fontWeight: '600',
                                paddingTop: 14,
                                paddingBottom: 10
                            }}>COMMENTS</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={this.state.commentArray}
                        renderItem={({ item, index }) => {
                            return <View key={index}>
                                <View style={styles.topTitleContainer}>
                                    {this.renderTouchableHighlight(this.state.commentArray, this.state.commentIdArray, this.state.commentTimeArray, this.state.commentWriterArray, index)}
                                </View>
                            </View>
                        }}
                        extraData={this.state}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}