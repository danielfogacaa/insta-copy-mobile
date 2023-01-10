import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

// import { Container } from './styles';

const New = () => {
  const [state, setState] = useState({
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={() => {}}>
        <Text style={styles.selectButtonText}>Selecionar imagem</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Nome do author"
        placeholderTextColor="#999"
        value={state.author}
        onChangeText={author =>
          setState(oldState => ({
            ...oldState,
            author,
          }))
        }
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Local da fotor"
        placeholderTextColor="#999"
        value={state.place}
        onChangeText={place =>
          setState(oldState => ({
            ...oldState,
            place,
          }))
        }
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Descrição"
        placeholderTextColor="#999"
        value={state.description}
        onChangeText={description =>
          setState(oldState => ({
            ...oldState,
            description,
          }))
        }
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Hashtags"
        placeholderTextColor="#999"
        value={state.hashtags}
        onChangeText={hashtags =>
          setState(oldState => ({
            ...oldState,
            hashtags,
          }))
        }
      />
      <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
        <Text style={styles.shareButtonText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
};

New.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Nova publicação',
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

export default New;
