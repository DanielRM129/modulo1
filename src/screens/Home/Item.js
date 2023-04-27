import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  background-color: ${COLORS.primary};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextName = styled.Text`
  font-size: 24px;
  color: ${COLORS.white};
`;
const TextDesc = styled.Text`
  font-size: 24px;
  color: ${COLORS.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
        <>
      <TextName>{item.nome}</TextName>
      <TextDesc>{item.descricao}</TextDesc>
      {/* <TextName>{title}</TextName> */}
      </>
    </Button>
  );
};

export default Item;
