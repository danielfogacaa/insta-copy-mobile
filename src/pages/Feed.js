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
              source={{uri: `http://192.168.1.165:3333/files/${item.image}`}}
            />
            <View style={styles.footer}>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.action}>
                  <Image source={like} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action}>
                  <Image source={comment} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action}>
                  <Image source={send} />
                </TouchableOpacity>
              </View>
              <Text style={styles.likes}>{`${item.likes} curtida${
                item.likes !== 1 ? 's' : ''
              }`}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginVertical: 10,
  },
  header: {
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    color: '#000',
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },
  footer: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 8,
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    lineHeight: 18,
    color: '#000',
  },
  hashtags: {
    color: '#7159c1',
  },
});

export default Feed;
