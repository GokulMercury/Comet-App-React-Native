import React, { Component } from 'react';
import Ionicons from 'react-native-ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationContainer, createSwitchNavigator } from 'react-navigation'; 

//screens
import SignIn from './components/auth';
import News from './components/news';
import Article from './components/news/article';
import CjChat from './components/chat';
import UserChat from './components/chat/userChat';
import Channels from './components/channels';
import ChannelList from './components/channels/channelList';


import Logo from './utils/appLogo'

const headerConf={
  headerLayoutPreset:'center',
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor:'#e02143'
      },
      headerTintColor:'white',
      //headerTitle:'COMET'
      headerTitle:Logo
    }
  }

const AuthStack = createStackNavigator({
  SignIn:SignIn
},
{
  headerMode:'none'
  
})

const ChatStack = createStackNavigator({
  CjChat:CjChat,
  UserChat:UserChat
},headerConf)

const NewsStack = createStackNavigator({
  News:News,
  Article: Article
},headerConf)

const AppStack = createBottomTabNavigator({
  News:NewsStack,
  Chats: ChatStack
},{
  tabBarOptions:{
    activeTintColor:'#e02143',
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
        iconName='ios-radio';
        
      } else if(routeName === 'Chats'){
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