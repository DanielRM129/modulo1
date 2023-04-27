import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {Body, TextInput} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// import { Container } from './styles';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [confirmPass, setConfirmPassword] = useState('');
  //console.log(firestore);

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            let userF = auth().currentUser;
            let user = {};
            user.nome = nome;
            user.email = email;

            firestore()
              .collection('users') //referencia da coleção
              .doc(userF.uid) //chave do documento
              .set(user) //valor do documento
              .then(() => {
                console.log('SignUp, cadastrar: Usuário Adicionado!');
                userF
                  .sendEmailVerification()
                  .then(() => {
                    Alert.alert(
                      'Informação',
                      'Foi enviado um email para: ' +
                        email +
                        ' para verificação.',
                    );
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'SignIn'}],
                      }),
                    );
                  })
                  .catch(e => {
                    console.error('SignUp, cadastrar: ' + e);
                  });
              })
              .catch(e => {
                console.error('SignUp, cadastrar: ' + e);
              });
          })
          .catch(e => {
            console.error('SignUp, cadastrar: ' + e);
            switch (e.code) {
              case 'auth/email-already-in-use':
                Alert.alert('Erro', 'Email já está em uso.');
                break;
              case 'auth/operation-not-allowed':
                Alert.alert('Erro', 'Problemas ao cadastrar o usuário.');
                break;
              case 'auth/invalid-email':
                Alert.alert('Erro', 'Email inválido.');
                break;
              case 'auth/weak-password':
                Alert.alert(
                  'Erro',
                  'Senha é fraca, por favor, digite uma senha forte.',
                );
                break;
            }
          });
      } else {
        Alert.alert('Erro', 'As senhas digitadas são diferentes');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha os campos do formulario');
    }
  };
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPassword(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setConfirmPassword(t)}
      />
      <MyButtom text="Cadastrar" onClick={cadastrar} />
    </Body>
    // <View>
    //   <Text>SignUp</Text>
    // </View>
  );
};

export default SignUp;
