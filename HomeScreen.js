import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            wordSearched: '',
            wordReturnedFromDatabase: '',
            lexicalCategory: '',
            definition: '',
            isButtonPressed: false,
        }
    }
    render() {
        return (
                <View>
                <TextInput
                style={styles.inputBox}
                onChangeText={text => {
                    this.setState({
                        text: text,
                        isSearchPressed: false,
                        word : "Loading...",
                        lexicalCategory: '',
                        examples: [],
                        defination: ''
                    });
                }}
                value={this.state.text}
                />

                <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                    this.setState({ isSearchPressed: true });
                    this.getWord(this.state.text);    
                }}>

                </TouchableOpacity>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Word :{''}
                        </Text>
                        <Text style = {{fontSize:168}}>
                            {this.state.word}
                        </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Word :{''}
                    </Text>
                    <Text style = {{fontSize:18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style = {styles.detailsTitle}>
                        Definition :{''}
                    </Text>
                    <Text style = {{fontSize:18}}>
                        {this.state.definition}
                    </Text>
                    </View>
                </View>
         
        )
    }



getWord(text)=> {
    var text = text.toLowerCase();
    try {
        var word = dictionary[text]['word'];
        var lexicalCategory = dictionary[text]['lexicalCategory']
        var definition = dictionary[text]['definition']
        this.setState({
            'word': word,
            'lexicalCategory': lexicalCategory,
            'definition': definition,
        })
    }
    catch(err) {
        alert("Sorry this word is not avaliable for now")
        this.setState({
            text:'',
            isSearchPressed: 'false',
        })
    }
}



    .then((response)=> {
        var responseObject = response
        
        if(responseObject) {
            var wordData = responseObject.definitions[0]
            var definition = wordData.desciption
            var lexicalCategory = wordData.wordType
            this.setState({
                'word' : this.state.text,
                'definition' : definition,
                'lexicalCategory' : lexicalCategory
            })
        }
        else {
            this.setState({
                'word' : this.state.text,
                'definition' : 'Not Found',
            })
        }
    })
}

}


const styles = StyleSheet.create({
    inputBox: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: "80%",
        alignSelf: 'center',
        height: 40,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }


})




