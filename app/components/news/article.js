import React, { Component } from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';

export default class ArticleComponent extends Component{

render() {
    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
            <Text>to Article Screen</Text>
        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
}
});