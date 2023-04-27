import React from 'react';
import {View} from 'react-native';
import {TextInput} from '../screens/SignUp/styles';

// import { Container } from './styles';

const SearchBar = ({search}) => {
  return (
    <TextInput
      placeholder="Pesquisar itens"
      keyboardType="text"
      returnKeyType="go"
      onChangeText={t => {
        search(t);
      }}
    />
  );
};

export default SearchBar;
