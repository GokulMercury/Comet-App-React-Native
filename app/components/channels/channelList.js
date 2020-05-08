import React, { Component } from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';


export default class ChannelList extends Component{
 
render() {
    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
            <Text>to Channel List Screen</Text>
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