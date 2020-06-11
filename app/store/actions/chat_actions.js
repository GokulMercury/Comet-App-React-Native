import {
    GET_CHATS
} from '../types';
import qs from 'qs';
import axios from 'axios';
//import {FIREBASEDB} from '../../utils/misc';
import {GETCHANNELSJSON, SUBSCRIBE, UNSUBSCRIBE} from '../../utils/misc';
// import _ from 'lodash';
import map from 'lodash/map';
import merge from 'lodash/merge';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

export function subscribeChannels(user,channel,cName){
  const params = {
          user_id:user,
          party_id:channel
  };
  const paramsGetChannels = {
    user_id:user,
    start:'0',
    limit:'10'
}
        let channelName = cName.replace(/ /g, "_");
        messaging()
        .subscribeToTopic(channelName)
        .then(() => console.log('Subscribed to topic!', channelName));

  const request = axios.post(SUBSCRIBE, qs.stringify(params))
      .then((response) => {
        console.log ('PARAMS', params);
        console.log ('SUBSCRIBE RESPONSE', response.data);
       
      })
      return request;
}

export function unSubscribeChannels(user,channel,cName){
  console.log('UNSUBSCRIBE');
  const params = {
          user_id:user,
          party_id:channel
  };
  const paramsGetChannels = {
          user_id:user,
          start:'0',
          limit:'10'
  }
        let channelName = cName.replace(/ /g, "_");
        messaging()
        .subscribeToTopic(channelName)
        .then(() => console.log('Subscribed to topic!', channelName));

  const request = axios.post(UNSUBSCRIBE, qs.stringify(params))
      .then((response) => {
        console.log ('PARAMS', params);
        console.log ('UNSUBSCRIBE RESPONSE', response.data);
      
      })
      return request;
}




export function getChats(){
      console.log('<<<<<<<<<<<<<IN CHATS>>>>>')
      var rootRef = database().ref();
      var ref = rootRef.child("/Chats/+919701565293/");
      ref.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
       
          var childData = snapshot.val();
        const chats = [];
        console.log('<<<<<CHATS>>>>>>',[childData]);
        for(let key in childData){
          chats.push({
              ...childData[key],
          })
        }
        return {
          type:GET_CHATS,
          payload:chats
      }
        
        }) .catch((error) => {
            console.log(error);
        })
        
     })

    }

    export function pushUpdates(params){
      let news = params;
      console.log('PUSH_UPDATES', news);
      //news.push(params.data);
        return{
          type:PUSH_UPDATES,
          payload: news
        }
    }