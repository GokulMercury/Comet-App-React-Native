import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationContainer, createSwitchNavigator } from 'react-navigation'; 

//screens
import SignIn from './components/auth';
import News from './components/news';
import Article from './components/news/article';
import Channels from './components/channels';
import ChannelList from './components/channels/channelList';


//import Logo from './utils/appLogo'

const headerConf={
  headerLayoutPreset:'center',
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor:'white'
      },
      headerTintColor:'#11457e',
      headerTitle:'COMET'
      //headerTitle:Logo
    }
  }

const AuthStack = createStackNavigator({
  SignIn:SignIn
},
{
  headerMode:'none'
  
})

const ChannelStack = createStackNavigator({
  Channels:Channels,
  ChannelList:ChannelList
},headerConf)

const NewsStack = createStackNavigator({
  News:News,
  Article: Article
},headerConf)

const AppStack = createBottomTabNavigator({
  News:NewsStack,
  Channels: ChannelStack
},{
  tabBarOptions:{
    activeTintColor:'#11457e',
    showLabel:false,
    showIcon: true,
    activeBackgroundColor:'white',
    inactiveBackgroundColor:'white',
    style:{
      backgroundColor:'#001338'
    },
  },
  initialRouteName:'News',
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({focused,horizontal,tintColor})=>{
      
      const { routeName } = navigation.state;
      let iconName;
      
      if (routeName === 'News'){
        iconName='ios-alarm';
        
      } else if(routeName === 'Channels'){
        iconName='ios-add';
      }
      
      return <Ionicons name={iconName} size={25} color={tintColor}/>;
    }
  })
})


export const RootNavigator = () => {
  return createAppContainer(createSwitchNavigator({
    //Starter: LoadingStack,
    App:AppStack,
    Auth:AuthStack
  },
  {
    initialRouteName:'Auth'
  }))
}