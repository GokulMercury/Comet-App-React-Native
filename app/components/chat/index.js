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
import { getChats} from '../../store/actions/chat_actions';
import {IMAGEURL} from '../../utils/misc';
import { getTokens } from '../../utils/misc';
import { subscribeChannels, unSubscribeChannels,getChannels } from '../../store/actions/channels_actions';
import database from '@react-native-firebase/database';
import _ from 'lodash';

// import firebaseTest from './firebaseTest'

class ChannelsComponent extends Component {
  constructor() {
    super();
    this.state = { 
      userId :"",
      cjPhone:"",
      peeped : false,
      subscribeData : [],
      animating: false,
      loading: false,
      friends: []
    };
  }

  componentDidMount(){

//   firebaseTest;


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
        console.log('<<<<<ASYNC VALUE IN CHAT', value[1][1]);
        this.state.userId = value[2][1];
        this.state.cjPhone = value[1][1];
        params.user_id = this.state.userId;
       
       // this.props.dispatch(getChats());
       this.getChatBoxData(params.user_id);
       
      }
    })    
  }
  
  getChatBoxData(user_id){
    console.log(user_id);
    
    const chatRef = "/Chats/"+this.state.cjPhone;
    console.log(chatRef)
    database().ref(chatRef)
      .on('value', snapshot => {
        const friends = _.map(snapshot.val(), (uid) => {
          return {uid}
        });
        
        this.setState({friends, loading: false});
        console.log(this.state.friends)
      })
  }

  
  renderItem({item}) {
    console.log(item);
    return (
      <TouchableOpacity style={styles.card} 
      onPress={()=> this.props.navigation.navigate('Article',{
        userId:this.state.userId,
        cjName:'Gokul',
        cjPhone:this.state.cjPhone
      })}
       key={item.party_id}>
              <Image style={styles.image} source={{uri:IMAGEURL+`${item.party_image_obj_id}`}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.uid.text}++{item.uid.user._id}</Text>
                
                <View style={styles.followButton}>
                
                <Icon type='ionicon' name={item.peepin === 'true' ? 'ios-radio' : 'ios-radio'} size={23} color={item.peepin === 'true' ? "#075e54" : "#ed788b"} /> 
                
                </View>
              </View>
            </TouchableOpacity>

      )
  }
  
  render() {
    if (this.state.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.friends}
          renderItem={this.renderItem}
          keyExtractor={item => item.uid}
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
    
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
});


function mapStateToProps(state){
 console.log(state)
  return {
    Channels:state.Channels
  }
}


export default connect(mapStateToProps)(ChannelsComponent);