import React, {Component} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

//import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { getUpdates } from '../../store/actions/updates_actions';
import Moment from 'moment';
import map from 'lodash/map';
import {IMAGEURL} from '../../utils/misc';
import { getTokens } from '../../utils/misc';

class NewsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount(){
    const params = {
      user_id: "",
      start:"0",
      limit:"25",
      explore:"10"
  };
    getTokens((value)=>{
      if(value[0][1]===null){
        console.log("NO TOKENS");
      } else{
        
        params.user_id = value[2][1];
        console.log(params)
        this.props.dispatch(getUpdates(params));
      }
    })
  }

  _onRefresh() {
    const params = {
      user_id: "",
      start:"0",
      limit:"25",
      explore:"10"
  };
    getTokens((value)=>{
      if(value[0][1]===null){
        console.log("NO TOKENS");
      } else{
        
        params.user_id = value[2][1];
        console.log(params)
        this.props.dispatch(getUpdates(params));
      }
    })
    // this.setState({refreshing: true});
    // this.props.dispatch(getUpdates()).then(() => {
    //   this.setState({refreshing: false});
    
  }
  
renderUpdates = (updates) => (
  
  updates.news ? 
    updates.news.map((item,i)=>(
     
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
            
          </View>
          <View style={styles.contentCard}>
              <Text style={styles.titleCard}>{item.post_content}</Text>
              <View style={styles.bottomCard}>
              <Image 
                  style={{width: 60, height: 60, borderRadius: 60/ 2}} 
                  source={{uri:IMAGEURL+`${item.image}`}}
                />
                <Text style={styles.bottomCardTeam}>{item.name} - </Text>
                <Text style={styles.bottomCardTeam}>{item.party_name} - </Text>
                <Text style={styles.bottomCardText}>Posted at {Moment(item.post_date_time).format('d MMMM')}</Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    ))
  : null
)

render() {
  


  return (
    <ScrollView style={{backgroundColor:'#F0F0F0'}} 
    refreshControl={
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
      />
    }>
        { this.renderUpdates(this.props.Updates)}
    </ScrollView>
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
    User: state.User,
    Updates:state.Updates
  }
}


export default connect(mapStateToProps)(NewsComponent);