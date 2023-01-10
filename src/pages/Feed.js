import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import camera from '../assets/camera.png';

const Feed = () => {
  return <View />;
};

Feed.navigationOptions = ({navigation}) => {
  return {
    headerRight: (
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => {
          navigation.navigate('New');
        }}>
        <Image source={camera} />
      </TouchableOpacity>
    ),
  };
};

export default Feed;
