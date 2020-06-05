import {
    GET_CHANNELS
} from '../types';
import qs from 'qs';
import axios from 'axios';
//import {FIREBASEDB} from '../../utils/misc';
import {GETCHANNELSJSON, SUBSCRIBE, UNSUBSCRIBE} from '../../utils/misc';
// import _ from 'lodash';
import map from 'lodash/map';
import merge from 'lodash/merge';
import messaging from '@react-native-firebase/messaging';

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


export function getChannels(params){
      //   const params = {
      //     search_keyword: "",
      //     user_id:"429",
      //     start:"0",
      //     limit:"25"
      // };

   const request =  axios.post(GETCHANNELSJSON, qs.stringify(params))
                  .then((response) => {
                    const channels = [];
                    const details = [];
                    const uservalue = [];
                    console.log ("IN CHANNELS");
                    console.log (response.data.parties);
                    
                   const keys = Object.keys(channels);

                    for(let key in response.data.parties){
                        channels.push({
                            ...response.data.parties[key],
                            id: key
                        })
                        
                    }
                    
                    return channels;
                  })
                  .catch((error) => {
                      console.log(error);
                  });
                  return {
                    type:GET_CHANNELS,
                    payload:request
                }
          
      }   