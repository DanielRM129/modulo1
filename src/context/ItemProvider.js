import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const ItemContext = createContext({});

export const ItemProvider = ({children}) => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('itens')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        //console.log(snapShot);
        //console.log(snapShot._docs);
        let data = [];
        snapShot.forEach(doc => {
          data.push({
            uid: doc.id,
            nome: doc.data().nome,
            descricao: doc.data().descricao,
          });
        });
        setItens(data);
      });
    return () => {
      listener();
    };
  }, []);

  const del = async uid => {
    try {
      await firestore().collection('itens').doc(uid).delete();
      return true;
    } catch (e) {
      console.error('ItemProvider, deletar' + e);
      return false;
    }
  };

  const save = async item => {
    try {
      console.log(item.uid);
      console.log("teste");
      await firestore().collection('itens').doc(item.uid).set(
        {
          nome: item.nome,
          descricao: item.descricao,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('ItemProvider, salvar' + e);
      return false;
    }
  };
  return (
    <ItemContext.Provider value={{itens, save, del}}>
      {children}
    </ItemContext.Provider>
  );
};
