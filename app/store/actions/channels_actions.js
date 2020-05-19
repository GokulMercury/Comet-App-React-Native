import {
    GET_CHANNELS
} from '../types';
import qs from 'qs';
import axios from 'axios';
//import {FIREBASEDB} from '../../utils/misc';
import {GETCHANNELSJSON} from '../../utils/misc';
// import _ from 'lodash';
import map from 'lodash/map';
import merge from 'lodash/merge';
export function getChannels(){
        const params = {
          search_keyword: "",
          user_id:"429",
          start:"0",
          limit:"25"
      };

   const request = axios.post(GETCHANNELSJSON, qs.stringify(params))
                  .then((response) => {
                    const channels = [];
                    const details = [];
                    const uservalue = [];
                    console.log ("IN CHANNELS");
                    console.log (response.data.parties);
                    
                   const keys = Object.keys(channels);
  //here we are using lodah to create an array from all the objects
//   const newData = _.values(news);
  //const mapData = map(response.data, 'channels');
  //const mapUserData = map(response.data, 'user');
  //const mapMergeData = merge(mapData,mapUserData);


                   // console.log(mapData)
                    //console.log (news);
                   // console.log ("USERS END");


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