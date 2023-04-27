import React from 'react';
//import {AccessibilityInfo, Alert} from 'react-native/types';
import styled from 'styled-components/native';
// import { Container } from './styles';
//import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';

const ButtonExit = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 45px;
  height: 45px;
`;
const LogoutButton = () => {
  const signOut = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        auth()
          .signOut()
          .then()
          .catch(e => {
            console.log('LogoutButton, signOut auth signOut: ' + e);
          });
        RNRestart.Restart();
      })
      .catch(e => {
        console.log('LogoutButton, signOut em removeItem: ' + e);
      });
  };
  return (
    <ButtonExit onPress={signOut} underlayColor="transparent">
      <Image
        source={require('../assets/images/exit.png')}
        accessibilityLabel="botão sair"
      />
    </ButtonExit>
  );
};

export default LogoutButton;
