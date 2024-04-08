import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../components/Header/Header';

export const HeaderNavigationProvider = ({ children }) => {
  return (
    <NavigationContainer>
      {children}
      <Header />
    </NavigationContainer>
  );
};