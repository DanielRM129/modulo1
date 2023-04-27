import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: auto;
  background-color: ${COLORS.primary};
  padding: 30px;
  margin: 10px;
  border-radius: 20px;
`;

const Div = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
`;

const TextNome = styled.Text`
  font-size: 18px;
  text-align: justify;
  color: ${COLORS.black};
`;

const TextDescricao = styled.Text`
  font-size: 16px;
  color: ${COLORS.black};
`;

const Conteudo = ({conteudo, onPress}) => {
  //console.log(conteudo);
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>{conteudo.nome}</TextNome>
        <TextDescricao>{conteudo.descricao}</TextDescricao>

        {/* <Div>
        </Div> */}
      </>
    </Button>
  );
};
export default Conteudo;