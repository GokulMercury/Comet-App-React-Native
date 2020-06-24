/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './app/store/reducers';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(reducers, composeEnhancers(
    applyMiddleware(promiseMiddleware)
))

const appRedux = () => (
    <Provider store={createStoreWithMiddleware}>
        <App/>
    </Provider>
)
// Register background handler
console.disableYellowBox=true;

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
    parseData = JSON.parse(remoteMessage.data.payload_post);

    
    Notifications.postLocalNotification({
      title: parseData.postchannel,
      body: parseData.postcontent,
      extra: "data"
  });
  
  });

  function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }

AppRegistry.registerComponent(appName, () => appRedux, () => HeadlessCheck);

