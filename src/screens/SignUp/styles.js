import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Body = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.primary};
  padding-top: 30px;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: #ccc;
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 20px;
`;
