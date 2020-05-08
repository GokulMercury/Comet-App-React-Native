import React from 'react';

import {
  View,
  Image
} from 'react-native';

import cometLogo from '../../assets/images/cool-logo.png'

const logoComponent = () => (
    <View style={{alignItems:'center'}}>
        <Image 
            source={cometLogo} 
            resizeMode={'contain'}
            style={{
                width:270,
                height:150
            }}
        />
    </View>
)

export default logoComponent;