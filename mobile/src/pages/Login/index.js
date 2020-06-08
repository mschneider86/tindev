/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

import api from '../../serices/api';
import AsyncStorage from '@react-native-community/async-storage';
import {navigation} from 'react-navigation';
import styles from './styles';

import logo from '../../assets/logo.png';

export default function Login() {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((user_id) => {
      if (user_id) {
        navigation.navigate('Main', {user_id});
      }
    });
  });

  async function handleLogin() {
    const response = await api.post('/devs', {username: user});

    const {_id} = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', {_id});
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}>
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
