import React, {Component} from 'react';
import {
  StyleSheet, 
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { Card } from "react-native-elements";
import { connect } from 'react-redux';
import { getChannels } from '../../store/actions/channels_actions';
import Moment from 'moment';
import {IMAGEURL} from '../../utils/misc';
import { getTokens } from '../../utils/misc';
import { subscribeChannels, unSubscribeChannels } from '../../store/actions/channels_actions';

class ChannelsComponent extends Component {
  constructor() {
    super();
    this.state = { 
      userId :"",
      peeped : false,
      subscribeData : []
    };
  }
  componentDidMount(){
    
    const params = {
      // search_keyword: "",
      user_id: "",
      start:"0",
      limit:"25"
  }
    getTokens((value)=>{
      if(value[0][1]===null){
        console.log("NO TOKENS");
      } else{ 
        this.state.userId = value[2][1];
        params.user_id = this.state.userId;
       
        this.props.dispatch(getChannels(params));
      
      }
    })
  }
 
  getChannelData = (peepin,userId,channelId,channelName) => {
    if (peepin == "false"){
      const params = {
        // search_keyword: "",
        user_id:userId,
        start:"0",
        limit:"25"
    }
      console.log('>>>>>>SUBSCRIBE CHANNEL>>>>', params)
      subscribeChannels(userId,channelId,channelName);
      this.props.dispatch(getChannels(params));
      this.state.subscribeData = this.props.Channels.channels;
    } else {
      const params = {
        // search_keyword: "",
        user_id:userId,
        start:"0",
        limit:"25"
    }
    console.log('>>>>>>SUBSCRIBE CHANNEL>>>>', params)
      unSubscribeChannels(userId,channelId,channelName)
      this.props.dispatch(getChannels(params));
      this.state.subscribeData = this.props.Channels.channels;
    }
   
 
  }

render() {
 
  return (
    <View style={styles.container}>
    <FlatList
      data={this.props.Channels.channels}
      // extraData={this.state}
      horizontal = {true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => String(index)}
      renderItem={({item}) =>{ 
      
      if (item.party_active == 1){
       

          return(
         
            <TouchableOpacity
              onPress={()=>
               this.getChannelData(item.peepin,this.state.userId,item.party_id,item.party_name)
              // this.getChannelData(this.state.peepin, this.state.userId,item.party_id,item.party_name)
              }
              key={item.party_id}
            >
            <Card
              title={null}
              image={{ uri: IMAGEURL+`${item.party_image_obj_id}` }}
              containerStyle={{ padding: 0, width: 100 }}
            >
              {
                item.peepin === 'true' ?
                  <Text style={{ marginBottom: 10, fontSize:10, color:'green' }}>
                  {item.party_name}
                  </Text>
                :
                  <Text style={{ marginBottom: 10, fontSize:10, color:'red' }}>
                {item.party_name}
                </Text>
              }
              
            </Card>
    
        </TouchableOpacity>
       ) 
      
          
        }
        
      } 
    }
    
  
    />
  </View>
  );
}
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor:'#fff',
    margin:10,
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  contentCard:{
    borderWidth:1,
    borderColor:'#dddddd'
  },
  titleCard:{
    fontFamily:'Roboto-Bold',
    color:'#232323',
    fontSize:16,
    padding:10
  },
  bottomCard:{
    flex:1,
    flexDirection:'row',
    borderTopWidth:1,
    borderTopColor:'#e6e6e6',
    padding:10,
    width:150
  },
  bottomCardTeam:{
    //fontFamily:'Roboto-Bold',
    color:'#828282',
    fontSize:12
  },
  bottomCardText:{
    fontFamily:'Roboto-Light',
    color:'#828282',
    fontSize:12
  }
});

function mapStateToProps(state){
  console.log(state)
  return {
    Channels:state.Channels
  }
}


export default connect(mapStateToProps)(ChannelsComponent);