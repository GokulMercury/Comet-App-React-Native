import React, { Component } from 'react';
import {
  View,StyleSheet, ScrollView, ActivityIndicator
} from 'react-native';

import AuthLogo from '../auth/authLogo';
import AuthForm from '../auth/authForm';

import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';

import { getTokens, setTokens } from '../../utils/misc';

class AuthComponent extends Component{
  
state = {
  loading:true
}

componentDidMount(){
  getTokens((value)=>{
    if(value[0][1]===null){
      console.log("NO TOKENS");
      this.setState({loading:false})
    } else{
      this.props.autoSignIn(value[1][1]).then(()=>{
        if(!this.props.User.auth.token){
          this.setState({loading:false})
        }else{
          setTokens(this.props.User.auth,()=>{
            this.goNext();
          })
        }
      })
    }
  })
}

goNext = () => {
  this.props.navigation.navigate('App')
}


render() {
  if(this.state.loading){
    return(
    <View style={styles.loading}>
      <ActivityIndicator/>
    </View>
    )
  }
  else{
    
    return (
      
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
      <View >
        <AuthLogo/>
        <AuthForm
        goNext={this.goNext}/>
        
      </View>
    </ScrollView>
      );
  }
  // return (
      // <KeyboardAvoidingView style={{flexGrow: 1}} behavior="padding" enabled>
      //     <View style={style.container}>
      //       <CometLogo/>
      //         <TextInput 
      //             keyboardType="email-address"
      //             onChangeText={email => this.setState({email})}
      //             style={style.input}
      //             placeholder="Email Address"
      //             value={this.state.email}
      //         />
      //         <TextInput 
      //             secureTextEntry={true}
      //             onChangeText={password => this.setState({password})}
      //             style={style.input}
      //             placeholder="Password"
      //             value={this.state.password}
      //         />
      //         {this.state.spinner &&
      //             <Text style={style.spinnerTextStyle}>Processing ...</Text>
      //         }
      //         {!this.state.spinner &&
      //             <Button
      //                 title="Sign in!"
      //                 onPress={this._signInHandler}
      //             />
      //         }
      //     </View>
      // </KeyboardAvoidingView>
  // );
}
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#1d428a',
      padding:50
  },
  loading:{
      flex:1,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center'
  }
})

function mapStateToProps(state){
  
  return {
      User: state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({autoSignIn},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthComponent)
//const DEVICE_WIDTH = Dimensions.get('window').width;

// const style = StyleSheet.create({
// container: {
//   flex: 1, 
//   justifyContent: 'center', 
//   alignItems: 'center'
// }, 
// input: {
//   backgroundColor: '#DAE1F1',
 
//   height: 40,
//   marginHorizontal: 20,
//   borderRadius: 20,
//   color: '#333333',
//   marginBottom: 30,
//   paddingLeft: 15
// },
// spinnerTextStyle: {
//   textAlign: 'center'
// },
// });
      
     

