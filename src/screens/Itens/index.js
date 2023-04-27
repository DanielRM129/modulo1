import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {ItemContext} from '../../context/ItemProvider';
//import {Image} from '../Preload/styles';
import Item from '../Item';
import Conteudo from '../Item/Conteudo';
import AddFloatButton from '../../components/AddFloatButton';
import {CommonActions} from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';

const Itens = ({navigation}) => {
  const {itens} = useContext(ItemContext);
  const [itensTemp, setItensTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      itens.forEach(e => {
        if (e.nome.toLowerCase().includes(text.toLowerCase())) {
          a.push(e);
        }
      });
      if (a.length > 0) {
        setItensTemp(a);
      }
    } else {
      setItensTemp([]);
    }
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitleAlign: 'right',
  //     title: 'Itens',
  //     headerTitleStyle: {color: COLORS.white},
  //     headerStyle: {backgroundColor: COLORS.accent},
  //     headerTintColor: {color: COLORS.white},
  //     headerRight: () => <LogoutButton />,
  //   });
  //   //console.log(Itens);
  // }, [itens]);

  const routeItem = value => {
    if (value) {
      navigation.navigate('Item', {
        value,
      });
    } else {
      navigation.navigate('Item', {});
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.div}>
        <SearchBar search={filterByName} />
        <ScrollView>
          <Text style={styles.texto} />
          {itensTemp.length > 0
            ? itensTemp.map((valor, key) => {
                return (
                  <Conteudo
                    conteudo={valor}
                    onPress={() => routeItem(valor)}
                    key={key}
                  />
                );
              })
            : itens.map((valor, key) => {
                return (
                  <Conteudo
                    conteudo={valor}
                    onPress={() => routeItem(valor)}
                    key={key}
                  />
                );
              })}
        </ScrollView>
      </View>
      <AddFloatButton onClick={() => routeItem(null)} />
    </SafeAreaView>
  );
};

export default Itens;

const styles = StyleSheet.create({
  logout: {
    backgroundColor: COLORS.red,
  },
  div: {
    height: 520,
  },
});
