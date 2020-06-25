import React, { Component } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import AuthLogo from '../auth/authLogo';
import ContentLoader, { Facebook } from 'react-content-loader/native';
//import AuthForm from '../auth/authForm';

import {connect} from 'react-redux';
import {signIn} from '../../store/actions/user_actions'
import {autoSignIn} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { getTokens, setTokens } from '../../utils/misc';
class AuthComponent extends Component {

  constructor() {
    super();
    this.state = { 
      phone: '',
      confirmResult: null,
      verificationCode: '',
      userId: '',
      loading:true
    };
  }
 
  componentDidMount(){
  getTokens((value)=>{
    if(value[2][1]===null){
      console.log("NO TOKENS");
      this.setState({loading:false})
    } else{
      this.props.navigation.navigate('App');
    }
  })
}

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(this.state.phone)
  }

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.setState({ confirmResult })
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
        })
    } else {
      alert('Invalid Phone Number')
    }
  }

  changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: '' })
  }

  handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({ userId: user.uid }),
          

          //this.saveLoginData();
         
          this.goNext()
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  }

  
  async goNext (){
    
  await this.props.signIn({phone : this.state.phone});
  console.log('<<<<<<<<<<<GO NEXT>>>>>>>>',this.props.User.auth);
  setTokens(this.props.User.auth)
  this.props.navigation.navigate('App')
  
}

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
        <TextInput
          style={styles.textInput}
          placeholder='Verification code'
          placeholderTextColor='#eee'
          value={this.state.verificationCode}
          keyboardType='numeric'
          onChangeText={verificationCode => {
            this.setState({ verificationCode })
          }}
          maxLength={6}
        />
        <TouchableOpacity
          style={[styles.themeButton, { marginTop: 20 }]}
          onPress={this.handleVerifyCode}>
          <Text style={styles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    if(this.state.loading){
      return(
            <View style={styles.loading}>
              <AuthLogo/>
              <ContentLoader/>
              <ActivityIndicator/>
            </View>
            )
    } else {
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
          <View style={styles.page}>
            <AuthLogo/>
            <TextInput
              style={styles.textInput}
              placeholder='Phone Number with country code'
              placeholderTextColor='#555'
              keyboardType='phone-pad'
              value={this.state.phone}
              onChangeText={phone => {
                this.setState({ phone })
              }}
              maxLength={15}
              editable={this.state.confirmResult ? false : true}
            />
  
            <TouchableOpacity
              style={[styles.themeButton, { marginTop: 20 }]}
              onPress={
                this.state.confirmResult
                  ? this.changePhoneNumber
                  : this.handleSendCode
              }>
              <Text style={styles.themeButtonTitle}>
                {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
              </Text>
            </TouchableOpacity>
  
            {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
          </View>
        </SafeAreaView>
      )
    }
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e02143'
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    marginTop: 20,
    width: '90%',
    height: 40,
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#555',
    fontSize: 16
  },
  themeButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e02143',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50
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
  return bindActionCreators({autoSignIn,signIn},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthComponent)



// import React, { Component } from 'react';
// import {
//   View,StyleSheet, ScrollView, ActivityIndicator
// } from 'react-native';

// import AuthLogo from '../auth/authLogo';
// import AuthForm from '../auth/authForm';

// import {connect} from 'react-redux';
// import {autoSignIn} from '../../store/actions/user_actions';
// import {bindActionCreators} from 'redux';

// import { getTokens, setTokens } from '../../utils/misc';

// class AuthComponent extends Component{
  
// state = {
//   loading:true
// }

// componentDidMount(){
//   getTokens((value)=>{
//     if(value[0][1]===null){
//       console.log("NO TOKENS");
//       this.setState({loading:false})
//     } else{
//       this.props.autoSignIn(value[1][1]).then(()=>{
//         if(!this.props.User.auth.token){
//           this.setState({loading:false})
//         }else{
//           setTokens(this.props.User.auth,()=>{
//             this.goNext();
//           })
//         }
//       })
//     }
//   })
// }

// goNext = () => {
//   this.props.navigation.navigate('App')
// }


// render() {
//   if(this.state.loading){
//     return(
//     <View style={styles.loading}>
//       <ActivityIndicator/>
//     </View>
//     )
//   }
//   else{
    
//     return (
      
//       <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
//       <View >
//         <AuthLogo/>
//         <AuthForm
//         goNext={this.goNext}/>
        
//       </View>
//     </ScrollView>
//       );
//   }
//   // return (
//       // <KeyboardAvoidingView style={{flexGrow: 1}} behavior="padding" enabled>
//       //     <View style={style.container}>
//       //       <CometLogo/>
//       //         <TextInput 
//       //             keyboardType="email-address"
//       //             onChangeText={email => this.setState({email})}
//       //             style={style.input}
//       //             placeholder="Email Address"
//       //             value={this.state.email}
//       //         />
//       //         <TextInput 
//       //             secureTextEntry={true}
//       //             onChangeText={password => this.setState({password})}
//       //             style={style.input}
//       //             placeholder="Password"
//       //             value={this.state.password}
//       //         />
//       //         {this.state.spinner &&
//       //             <Text style={style.spinnerTextStyle}>Processing ...</Text>
//       //         }
//       //         {!this.state.spinner &&
//       //             <Button
//       //                 title="Sign in!"
//       //                 onPress={this._signInHandler}
//       //             />
//       //         }
//       //     </View>
//       // </KeyboardAvoidingView>
//   // );
// }
// }

// const styles = StyleSheet.create({
//   container:{
//       flex:1,
//       backgroundColor:'#1d428a',
//       padding:50
//   },
//   loading:{
//       flex:1,
//       backgroundColor:'#fff',
//       alignItems:'center',
//       justifyContent:'center'
//   }
// })

// function mapStateToProps(state){
  
//   return {
//       User: state.User
//   }
// }

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({autoSignIn},dispatch);
// }

// export default connect(mapStateToProps,mapDispatchToProps)(AuthComponent)
// //const DEVICE_WIDTH = Dimensions.get('window').width;

// // const style = StyleSheet.create({
// // container: {
// //   flex: 1, 
// //   justifyContent: 'center', 
// //   alignItems: 'center'
// // }, 
// // input: {
// //   backgroundColor: '#DAE1F1',
 
// //   height: 40,
// //   marginHorizontal: 20,
// //   borderRadius: 20,
// //   color: '#333333',
// //   marginBottom: 30,
// //   paddingLeft: 15
// // },
// // spinnerTextStyle: {
// //   textAlign: 'center'
// // },
// // });
      
     

