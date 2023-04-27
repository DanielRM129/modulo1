import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//import MyButtom from '../../components/MyButtom';
//import {Text} from './styles';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container, FlatList} from './styles';
import Item from './Item';
import firestore from '@react-native-firebase/firestore';
const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const getItens = () => {
    firestore()
      .collection('itens')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
          const item = {
            id: doc.uid,
            nome: doc.data().nome,
            descricao: doc.data().descricao,
          };
          d.push(item);
        });
        setData(d);
      })
      .catch(e => {
        console.log('Home, getItens:' + e);
      });
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Usuários',
      headerStyle: {backgroundColor: COLORS.accent},
      headerTitleStyle: {color: COLORS.white},
      headerRight: () => <LogoutButton />,
    });
    getItens();
  }, []);

  // const DATA = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'First Item',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     title: 'Second Item',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     title: 'Third Item',
  //   },
  // ];

  const routeItem = item => {
    console.log(item);
  };
  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeItem(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
    // <View style={styles.container}>
    //   <Text style={styles.texto}>Home</Text>
    // </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 24,
  },
});
