/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import {RootNavigator}  from './routes';

export default class App extends Component{
    render(){
      const Nav = RootNavigator();

      return (
        <View style={styles.container}>
          <Nav/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
 container:{
   flex: 1,
   backgroundColor: '#fff'
 }
});

