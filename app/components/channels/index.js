import axios from 'axios';
import qs from 'qs';
import React, { Component } from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import {JSONURL} from '../../utils/misc';

export default class ChannelComponent extends Component{
    componentDidMount(){
        this.getUpdates();
      }

      
getUpdates(){
  const params = {
    user_id: "429",
    start:"0",
    limit:"25",
    explore:"10"
};

axios.post("http://dev.cometbroadcast.com/appuser/user_home_feed", qs.stringify(params))
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

    
}   
render() {
    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
            <Text>to Channels Screen</Text>
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