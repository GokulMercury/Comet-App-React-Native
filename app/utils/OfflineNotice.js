import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection. </Text>
      <Text style={styles.offlineText}>Refresh after sometime.</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
   // NetInfo.removeEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = state => {
    if (state.isConnected) {
      
      this.setState({isConnected: true});
    } else {
      
      this.setState({isConnected: false});
    }
  };

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;