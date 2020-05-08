import React from 'react';

import {
  Image
} from 'react-native';

import cometHeaderLogo from '../assets/images/comet-logo-header.png'

const LogoTitle = () => (

        <Image 
            source={cometHeaderLogo} 
            resizeMode={'contain'}
            style={{
                width:70,
                height:35
            }}
        />
)

export default LogoTitle;