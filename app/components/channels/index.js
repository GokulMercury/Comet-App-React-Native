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
import { getTokens, storeFirstTimeUser } from '../../utils/misc';
import { subscribeChannels, unSubscribeChannels, firebaseSubscribe } from '../../store/actions/channels_actions';
import ContentLoader, { Facebook } from 'react-content-loader/native';
import Toast from 'react-native-simple-toast';

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
      user_id: this.props.User.auth.userId,
      start:"0",
      limit:"25"
  }
    getTokens(async value=>{
      if(JSON.stringify(this.props.User.auth.message) !='user already found'){
        this.state.userId = value[2][1];
        // params.user_id = this.state.userId;
      //  console.log("CHANNEL PARAMS");
        this.props.dispatch(getChannels(params));
        this.setState({subscribeData: this.props.Channels.channels})
        //console.log(this.props.Channels.channels)
      } 
    })

  }
  
  // async componentDidMount(){
  

  //   // Toast.showWithGravity('Comet loading. Please wait..', Toast.SHORT, Toast.TOP);
  //   //   this.checkPermission() ;
  //   //   this.createNotificationListeners(); 
  //   //   this.getMessage();
      
      
  //   //   const params = {
  //   //     user_id: this.props.User.auth.userId,
  //   //     start:"0",
  //   //     limit:"25",
  //   //     explore:"10"
  //   // };
  //   const params = {
  //     // search_keyword: "",
  //     user_id: this.props.User.auth.userId,
  //     start:"0",
  //     limit:"25"
  // }
  //    await  getTokens(async (value)=>{
  //       // console.log("IN GET TOKENS", this.props.User.auth.userId);
  //       // this.state.refreshing=true;
  //       if(JSON.stringify(this.props.User.auth.message) !='user already found'){
  //         console.log('TOKEN VALUE',JSON.stringify(this.props.User.auth.phone));
  //         // this.state.userId = JSON.stringify(this.props.User.auth.userId);
  //         console.log("PARAMS", params);
  //         params.user_id = this.state.userId;
       
  //         await this.props.dispatch(getChannels(params));
  //         // params.user_id = this.state.userId;
         
  //         // const value = AsyncStorage.getItem('@comet_app_firstTimeUser');
          
  //         // if(value == 'true') {
  //         //   console.log('LOADING NEW NEWS DATA')
           
            
  //         //     //console.log('NEW USER FIREBASE SUBSCRIPTION');
  //         // }
  //         // else {console.log('LOADING PERSISTED DATA')}
  //         //this.props.dispatch(getChannels(paramsChannels));
          
  //         this.state.refreshing=false
  //       }
  //     })
    //   console.log('cHANNEL LOAD')
    // }

  componentDidUpdate () {
    //console.log('component did update');
        storeFirstTimeUser('false');
  }
  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 6000)

  ListEmpty = () => {
      return (
        //View to show when list is empty
        <View style={styles.MainContainer}>
          <Facebook />
        </View>
      );
    };

  getChannelData = async (peepin,userId,channelId,channelName,channelObjId) => {
    this.state.animating =true;
    Toast.showWithGravity('Please wait', Toast.SHORT, Toast.TOP);
    // this.closeActivityIndicator()
    if (peepin == "false"){
      const params = {
        // search_keyword: "",
        user_id:this.props.User.auth.userId,
        start:"0",
        limit:"25"
    }
      //console.log('>>>>>>SUBSCRIBE CHANNEL>>>>', params)
      await subscribeChannels(userId,channelId,channelName,channelObjId);
      await this.props.dispatch(getChannels(params));
      this.setState({subscribeData: this.props.Channels.channels})
      // this.setState({animating: false});
      Toast.showWithGravity('Subscribed :)', Toast.SHORT, Toast.TOP);
    } else {
      const params = {
        // search_keyword: "",
        user_id:this.props.User.auth.userId,
        start:"0",
        limit:"25"
    }
    //console.log('>>>>>>UNSUBSCRIBE CHANNEL>>>>', params)
      await unSubscribeChannels(userId,channelId,channelName,channelObjId)
      await this.props.dispatch(getChannels(params));
      this.setState({subscribeData: this.props.Channels.channels})
      // this.state.subscribeData = this.props.Channels.channels;
      Toast.showWithGravity('Unsubscribed :(', Toast.SHORT, Toast.TOP);
      // this.setState({animating: false});
    }
   
 
  }


  
render() {
 if (this.props.Channels.channels){

  return (
    <View style={styles.container}>
      
    <View>
      <Text style={styles.listTitle}>Select channels</Text>
    
    </View>
    <FlatList
      data={this.props.Channels.channels.sort((a, b) => a.party_name.localeCompare(b.party_name))}
      // extraData={this.state}
      horizontal = {true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => String(index)}
      listEmptyComponent={this.ListEmpty}
      renderItem={({item}) =>{ 
      
      if (item.party_active == 1){
        if (item.peepin === 'true')
        {
          firebaseSubscribe(item.party_obj_id) 
        }

          return(
            
      <TouchableOpacity style={styles.card} onPress={()=>
        this.getChannelData(item.peepin,this.state.userId,item.party_id,item.party_name,item.party_obj_id)
       // this.getChannelData(this.state.peepin, this.state.userId,item.party_id,item.party_name)
       }
       key={item.party_id}>
              <Image style={styles.image} source={{uri:IMAGEURL+`${item.party_image_obj_id}`}}/>
              <View style={styles.cardContent}>
              <Icon type='ionicon' name={item.peepin === 'true' ? 'ios-checkmark-circle' : 'ios-radio'} size={23} color={item.peepin === 'true' ? "#075e54" : "#ed788b"} /> 
                <Text style={styles.name}>{item.party_name}</Text>
                
                <View style={styles.followButton}>
                
               
                {/* {<ActivityIndicator
                  animating = {this.state.animating}
                  color = '#bc2b78'
                  size = "large"
                  />} */}
                </View>
              </View>
            </TouchableOpacity>

       ) 
      
          
        }

        
      } 
      
    }
    
  
    />
    
  </View>
  
  );

} else {return null;}
}
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:10,
    backgroundColor:"#e02143"
  },
  listTitle:{
    fontSize:26,
    fontWeight: 'bold',
    color:'#feb40a',
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
    borderRadius:10,
  },

  name:{
    fontSize:16,
    flex:1,
    alignSelf:'flex-start',
    color:"#002768",
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
    height:10,
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
    User: state.User,
    Channels:state.Channels
  }
}


export default connect(mapStateToProps)(ChannelsComponent);