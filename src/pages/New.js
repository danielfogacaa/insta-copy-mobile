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
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#7159c1',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#5037a0',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default New;
