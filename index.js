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
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Auth from './app/components/auth';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './app/store/reducers';
import { PersistGate } from 'redux-persist/lib/integration/react';
//import {AsyncStorage} from '@react-native-community/async-storage';
import storageLocal from 'redux-persist/es/storage/index'
import storage from 'redux-persist/lib/storage';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';

const persistConfig = {
  key: 'root',
  storage: storage,
  // stateReconciler: autoMergeLevel2
  // key: 'Updates',
  // storage: storageLocal,
  // blacklist: ['Auth'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, reducers);

const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
// useEffect(() => {
//   // Assume a message-notification contains a "type" property in the data payload of the screen to open

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage,
//     );
//     // navigation.navigate(remoteMessage.data.type);
//   });

//Check whether an initial notification is available
// messaging()
// .getInitialNotification()
// .then(remoteMessage => {
//   if (remoteMessage) {
//     console.log(
//       'Notification caused app to open from quit state:',
//       remoteMessage,
//     );
//     // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//   }
 
// });

// Notifications.getInitialNotification()
//   .then((notification) => {
//     console.log("Initial notification was:", (notification ? notification.payload : 'N/A'));
//     })      
//   .catch((err) => console.error("getInitialNotifiation() failed", err));

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
    parseData = JSON.parse(remoteMessage.data.payload_post);
    
    Notifications.postLocalNotification({
      title: parseData.postchannel,
      body: parseData.postcontent,
      // extra: "data"
  });
  
  });

  function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(reducers, composeEnhancers(
    applyMiddleware(promiseMiddleware)
))

const appRedux = () => (
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
)
// Register background handler


  
console.disableYellowBox=true;

AppRegistry.registerComponent(appName, () => appRedux, () => HeadlessCheck);