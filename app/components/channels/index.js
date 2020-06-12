import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,

} from 'react-native';
import Icon from 'react-native-ionicons'
import { connect } from 'react-redux';
import { getChannels } from '../../store/actions/channels_actions';
import {IMAGEURL} from '../../utils/misc';
import { getTokens } from '../../utils/misc';
import { subscribeChannels, unSubscribeChannels } from '../../store/actions/channels_actions';
import database from '@react-native-firebase/database';
import firebaseTest from './firebaseTest'

class ChannelsComponent extends Component {
  constructor() {
    super();
    this.state = { 
      userId :"",
      peeped : false,
      subscribeData : [],
      animating: false
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
        //console.log(this.props.Channels.channels)
      }
    })
    
  }
  
  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 7000)


  getChannelData = (peepin,userId,channelId,channelName,channelObjId) => {
    this.state.animating =true
    this.closeActivityIndicator()
    if (peepin == "false"){
      const params = {
        // search_keyword: "",
        user_id:userId,
        start:"0",
        limit:"25"
    }
      console.log('>>>>>>SUBSCRIBE CHANNEL>>>>', params)
      subscribeChannels(userId,channelId,channelName,channelObjId);
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
      unSubscribeChannels(userId,channelId,channelName,channelObjId)
      this.props.dispatch(getChannels(params));
      this.state.subscribeData = this.props.Channels.channels;
    }
   
 
  }

render() {
 
  return (
    <View style={styles.container}>
      
    <View>
      <Text style={styles.listTitle}>Tune to channels</Text>
    
    </View>
    <FlatList
      data={this.props.Channels.channels}
      // extraData={this.state}
      horizontal = {true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => String(index)}
      renderItem={({item}) =>{ 
      
      if (item.party_active == 1){
       

          return(

      <TouchableOpacity style={styles.card} onPress={()=>
        this.getChannelData(item.peepin,this.state.userId,item.party_id,item.party_name,item.party_obj_id)
       // this.getChannelData(this.state.peepin, this.state.userId,item.party_id,item.party_name)
       }
       key={item.party_id}>
              <Image style={styles.image} source={{uri:IMAGEURL+`${item.party_image_obj_id}`}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.party_name}</Text>
                
                <View style={styles.followButton}>
                
                <Icon type='ionicon' name={item.peepin === 'true' ? 'ios-radio' : 'ios-radio'} size={23} color={item.peepin === 'true' ? "#075e54" : "#ed788b"} /> 
                {<ActivityIndicator
                  animating = {this.state.animating}
                  color = '#bc2b78'
                  size = "large"
                  />}
                </View>
              </View>
            </TouchableOpacity>

  //           <TouchableOpacity
              // onPress={()=>
              //  this.getChannelData(item.peepin,this.state.userId,item.party_id,item.party_name)
              // // this.getChannelData(this.state.peepin, this.state.userId,item.party_id,item.party_name)
              // }
              // key={item.party_id}
  //           >
  //           <View style = {styles.listItemContainer}>
  //   <View style= {styles.iconContainer}>
  //    <Image source={{uri:IMAGEURL+`${item.party_image_obj_id}`}} style={styles.initStyle} resizeMode='contain' />
  //   </View>
  //   <View style = {styles.callerDetailsContainer}>
  //    <View style={styles.callerDetailsContainerWrap}>
  //     <View style={styles.nameContainer}>
  //       <Text style={{ fontFamily:'400', color:'#000', fontSize:16 }}>{item.party_name}</Text>
  //       <View style={styles.dateContainer}>
        
  //         {/* <Ionicons name={item.party_name ? "ios-alarm" : "ios-alarm"} size={15} color={item.party_name ? "#ed788b" : "#075e54"} /> */}
  //         {/* <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}>{item.party_name} {item.party_name}</Text> */}
  //       </View>
  //      </View>
  //    <View style={styles.callIconContainer}>
  //    <Ionicons name={item.peepin === 'true' ? "ios-alarm" : "ios-alarm"} size={23} color={item.peepin === 'true' ? "#075e54" : "#ed788b"} />
  //      {/* <Ionicons name="ios-alarm" color='#075e54' size={23} style={{ padding:5 }} />  */}
  //    </View>
  //   </View>
  //  </View>
  // </View>
  // </TouchableOpacity>    
           
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
  container:{
    flex:1,
    marginBottom:10,
    backgroundColor:"#824d9d"
  },
  listTitle:{
    fontSize:26,
    fontWeight: 'bold',
    color:'#EBEBEB',
    marginTop:10,
    alignSelf: 'center'
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:60,
    height:60,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 3,
    marginTop:20,
    marginBottom:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:16,
    flex:1,
    alignSelf:'center',
    color:"#824d9d",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    // marginTop:10,
    height:35,
    width:100,
    // padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius:30,
    // backgroundColor: "white",
    // borderWidth:1,
    // borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
});

function mapStateToProps(state){
 // console.log(state)
  return {
    Channels:state.Channels
  }
}


export default connect(mapStateToProps)(ChannelsComponent);