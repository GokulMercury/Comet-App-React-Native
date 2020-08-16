import React, {Component} from 'react';
import {
  StyleSheet, 
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { getChannels } from '../../store/actions/channels_actions';
import Moment from 'moment';
import map from 'lodash/map';
import {IMAGEURL} from '../../utils/misc';

class ChannelsComponent extends Component {
  componentDidMount(){
    this.props.dispatch(getChannels());
  }

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
  
renderUpdates = (channellist) => (

  channellist.channels ? 
    channellist.channels.map((item,i)=>(
     
      <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('Article',{
          ...item
        })}
        key={i}
      >
        <View style={styles.cardContainer}>
          <View>
          {item.post_attachment_obj_id ? <Image
              style={{height:150,justifyContent:'space-around'}}
              source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
              //source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
              resizeMode='cover'
            /> : null}
            
<<<<<<< Updated upstream
          </View>
          <View style={styles.contentCard}>
              <Text style={styles.titleCard}>{item.post_content}</Text>
              <View style={styles.bottomCard}>
              <Image 
                  style={{width: 60, height: 60, borderRadius: 60/ 2}} 
                  source={{uri:IMAGEURL+`${item.party_image_obj_id}`}}
                />
                <Text style={styles.bottomCardTeam}>{item.name} - </Text>
                <Text style={styles.bottomCardTeam}>{item.party_name} - </Text>
                <Text style={styles.bottomCardText}>Posted at {Moment(item.post_date_time).format('d MMMM')}</Text>
              </View>
          </View>
=======
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
    console.log('component did update');
        storeFirstTimeUser('false');
  }
  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 6000)

  ListEmpty = () => {
      return (
        //View to show when list is empty
        <View style={styles.MainContainer}>
          <Facebook />
>>>>>>> Stashed changes
        </View>
      </TouchableOpacity>
    ))
  : null
)

render() {
 if (this.props.Channels.channels){

  return (
<<<<<<< Updated upstream
    <ScrollView style={{backgroundColor:'#F0F0F0'}}>
        { this.renderUpdates(this.props.Channels)}
    </ScrollView>
  );
=======
    <View style={styles.container}>
      
    <View>
      <Text style={styles.listTitle}>Tune to channels</Text>
    
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
>>>>>>> Stashed changes
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
    padding:10
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