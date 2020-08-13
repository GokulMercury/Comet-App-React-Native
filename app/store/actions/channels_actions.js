import {
    GET_CHANNELS
} from '../types';
import qs from 'qs';
import axios from 'axios';
//import {FIREBASEDB} from '../../utils/misc';
import {GETCHANNELSJSON, SUBSCRIBE, UNSUBSCRIBE} from '../../utils/misc';
import { storeFirstTimeUser } from '../../utils/misc';
// import _ from 'lodash';
import map from 'lodash/map';
import merge from 'lodash/merge';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

export async function subscribeChannels(user,channel,cName,channelObjId){
  const params = {
          user_id:user,
          party_id:channel
  };
  const paramsGetChannels = {
    user_id:user,
    start:'0',
    limit:'10'
}
        let channelName = channelObjId;
        //console.log(channelName)
        messaging()
        .subscribeToTopic(channelName)
        .then(() => console.log('Subscribed to topic!', channelName));

  const request = await axios.post(SUBSCRIBE, qs.stringify(params))
      .then((response) => {
        // console.log ('PARAMS', params);
        // console.log ('SUBSCRIBE RESPONSE', response.data);
       
      })
      return request;
}

export async function unSubscribeChannels(user,channel,cName,channelObjId){
 // console.log('UNSUBSCRIBE');
  const params = {
          user_id:user,
          party_id:channel
  };
  const paramsGetChannels = {
          user_id:user,
          start:'0',
          limit:'10'
  }
        
    let channelName = channelObjId;
        messaging()
        .unsubscribeFromTopic(channelName)
        .then(() => console.log('Unbscribed to topic!', channelName));

  const request = await axios.post(UNSUBSCRIBE, qs.stringify(params))
      .then((response) => {
        // console.log ('PARAMS', params);
        // console.log ('UNSUBSCRIBE RESPONSE', response.data);
      
      })
      return request;
}

export async function firebaseSubscribe(channelObjId){
  
  try {
    const value = await AsyncStorage.getItem('@comet_app_firstTimeUser');
    //console.log('NEW USER FIREBASE SUBSCRIPTION VALUE', value);
    if(value == 'true') {
        let channelName = channelObjId;
        console.log(channelName)
        messaging()
        .subscribeToTopic(channelName)
        .then(() => console.log('Subscribed to topic!', channelName));
      
        //console.log('NEW USER FIREBASE SUBSCRIPTION');
    } else {
      //console.log('NEW USER FIREBASE SUBSCRIPTION NO NEED');
    }
  } catch(e) {
    //console.log('ERROR',e);
  }
       
}


export function getChannels(params){
  return function(dispatch){
      //   const params = {
      //     search_keyword: "",
      //     user_id:"429",
      //     start:"0",
      //     limit:"25"
      // };

   return axios.post(GETCHANNELSJSON, qs.stringify(params))
                  .then((response) => {
                    const channels = [];
                    const details = [];
                    const uservalue = [];
                    // console.log ("IN CHANNELS");
                    // console.log (response.data.parties);
                    
                   const keys = Object.keys(channels);

                    for(let key in response.data.parties){
                        channels.push({
                            ...response.data.parties[key],
                            id: key
                        })
                        
                    }
                    
                    dispatch({
                      type:GET_CHANNELS,
                      payload:channels,
                  });
                  })
                  
                  
              }
          
      }   