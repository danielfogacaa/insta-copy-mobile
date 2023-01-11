import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';

import api from '../services/api';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

// import { Container } from './styles';

const New = ({navigation}) => {
  const [state, setState] = useState({
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  });
  const [imageSelected, setImageSelected] = useState(null);

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      upload => {
        console.log(
          upload.assets[0].base64.substring(0, 10),
          Object.keys(upload.assets[0]),
        );
        if (upload.didCancel) {
        } else if (upload.error) {
          alert('Ocorreu um erro, tente novamente!');
        } else {
          handleImage(upload);
        }
      },
    );
  };

  const handleTakePicture = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      upload => {
        if (upload.didCancel) {
        } else if (upload.error) {
          alert('Ocorreu um erro, tente novamente!');
        } else {
          handleImage(upload);
        }
      },
    );
  };

  const handleImage = upload => {
    const preview = {
      uri: `data:image/jpeg;base64,${upload.assets[0].base64}`,
    };

    let prefix;
    let ext;

    if (upload.assets[0].fileName) {
      [prefix, ext] = upload.assets[0].fileName.split('.');
      ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
    } else {
      prefix = new Date().getTime();
      ext = 'jpg';
    }

    const image = {
      uri: upload.assets[0].uri,
      type: upload.assets[0].type,
      name: `${prefix}.${ext}`,
    };

    setImageSelected(preview);

    setState(oldState => ({
      ...oldState,
      image,
    }));
  };

  const handleSubmit = async () => {
    console.log('st', state);
    console.log('img', state.image);
    const data = new FormData();

    data.append('image', state.image);
    data.append('author', state.author);
    data.append('place', state.place);
    data.append('description', state.description);
    data.append('hashtags', state.hashtags);

    console.log('dat', data);

    await api.post('posts', data, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            handleSelectImage();
          }}>
          <Text style={styles.selectButtonText}>
            Selecionar imagem da galeria
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filledButton}
          onPress={() => {
            handleTakePicture();
          }}>
          <Text style={styles.filledButtonText}>Tirar foto</Text>
        </TouchableOpacity>
        {imageSelected && (
          <Image style={styles.preview} source={imageSelected} />
        )}
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
          placeholder="Local da foto"
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
        <TouchableOpacity style={styles.filledButton} onPress={handleSubmit}>
          <Text style={styles.filledButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 30,
    position: 'relative',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  selectButton: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#7159c1',
    borderStyle: 'dashed',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#7159c1',
    fontWeight: 'bold',
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
  filledButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default New;
