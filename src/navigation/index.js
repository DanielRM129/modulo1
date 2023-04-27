import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {ItemProvider} from '../context/ItemProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ItemProvider>
        <Navigator />
      </ItemProvider>
    </AuthUserProvider>
  );
}
