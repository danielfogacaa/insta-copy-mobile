import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import api from '../services/api';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import send from '../assets/send.png';
import comment from '../assets/comment.png';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const getResponse = async () => {
    const response = await api.get('posts');
    const data = response.data;
    setPosts(data);
  };

  useEffect(() => {
    //registerToSocket();
    getResponse();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={post => post._id}
        renderItem={({item}) => (
          <View style={styles.feedItem}>
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.author}</Text>
                <Text style={styles.place}>{item.place}</Text>
              </View>
              <Image source={more} />
            </View>
            <Image
              style={styles.feedImage}
              source={{uri: `http://192.168.1.165:3333/${item.image}`}}
            />
            <View style={styles.footer}>
              <View style={styles.actions}>
                <TouchableOpacity>
                  <Image source={like} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={comment} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={send} />
                </TouchableOpacity>
              </View>
              <Text style={styles.likes}>{item.likes}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.hashtags}>{item.hashtags}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
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

const styles = StyleSheet.create({});

export default Feed;
