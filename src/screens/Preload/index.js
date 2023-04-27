/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
//import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Container, Image} from './styles';


// import { Container } from './styles';

const Preload = ({navigation}) => {
  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log('getUserCache');
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Home: Erro em getUserCache:' + e);
    }
  };

  // async function retrieveUserSession() {
  //   try {
  //     const session = await EncryptedStorage.getItem('user_session');
  //     return session !== null ? JSON.parse(session) : null;
  //   } catch (error) {
  //     console.error('Preload, retrieveUserSession: ' + error);
  //   }
  // }

  const entrar = async () => {
    const userSession = await getUserCache();
    if (userSession) {
      try {
        await auth()
          .signInWithEmailAndPassword(userSession.email, userSession.password)
          .then(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AppStack'}],
              }),
            );
          });
      } catch (e) {
        console.error('SignIn, entrar: ' + e);
        switch (e.code) {
          case 'auth/user-not-found':
            Alert.alert('Erro', 'Usuário não cadastrado.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Erro', 'Erro na senha.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'Email inválido.');
            break;
          case 'auth/user-disabled':
            Alert.alert('Erro', 'Usuário desabilitado.');
            break;
        }
      }
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
    console.log(userSession);

    // if (userSession) {
    //   try {
    //     await auth().signInWithEmailAndPassword(
    //       userSession.email,
    //       userSession.pass,
    //     );
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [{name: 'AppStack'}],
    //       }),
    //     );
    //   } catch (e) {
    //     console.error('SignIn, entrar: ' + e);
    //     switch (e.code) {
    //       case 'auth/user-not-found':
    //         Alert.alert('Erro', 'Usuário não cadastrado.');
    //         break;
    //       case 'auth/wrong-password':
    //         Alert.alert('Erro', 'Erro na senha.');
    //         break;
    //       case 'auth/invalid-email':
    //         Alert.alert('Erro', 'Email inválido.');
    //         break;
    //       case 'auth/user-disabled':
    //         Alert.alert('Erro', 'Usuário desabilitado.');
    //         break;
    //     }
    //   }
    // } else {
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{name: 'SignIn'}],
    //     }),
    //   );
    // }
  };

  useEffect(() => {
    entrar();
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
