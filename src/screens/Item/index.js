import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid, View} from 'react-native';
import {Container, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';
import DeleteButton from '../../components/DeleteButton';
import {ItemContext} from '../../context/ItemProvider';

const Item = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(ItemContext);

  useEffect(() => {
    // console.log(route.params.Item);
    // setNome('');
    // setDescricao('');
    // setUid('');
    if (route.params.value) {
      setNome(route.params.value.nome);
      setDescricao(route.params.value.descricao);
      setUid(route.params.value.uid);
    }
    // return () => {
    //   console.log('desmontou item');
    // };
  }, [route]);

  const salvar = async () => {
    //TODO: Corrigir função salvar
    setLoading(true);
    console.log(uid);
    console.log('teste');
    if (await save({uid, nome, descricao})) {
      // let itens = {};
      // itens.uid = uid;
      // itens.nome = nome;
      // itens.descricao = descricao;
      // setLoading(true);
      // await save(itens);
      // setLoading(false);
      Alert.alert('Show!', 'Você salvou com sucesso.');
      //ToastAndroid.show('Show! Voce salvou');
      setLoading(false);
      navigation.goBack();
    } else {
      setLoading(false);
      //ToastAndroid('Ops! Deu problema');
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o aluno?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          if (await del(uid)) {
            Alert.alert('Beleza', 'Ordem dada é ordem cumprida.');
          } else {
            Alert.alert('Ops', 'Deu problema ao excluir');
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };
  return (
    <Container>
      <TextInput
        placeholder="Nome do item"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Descricão"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDescricao(t)}
        value={descricao}
      />
      <MyButtom text="Salvar" onClick={salvar} />
      {uid && <DeleteButton texto="Excluir" onClick={excluir} />}
      {loading && <Loading />}
    </Container>
  );
};

export default Item;
