import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Cursos from '../screens/Cursos/styles';
import Item from '../screens/Item';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ForgotPassWord from '../screens/ForgotPassWord';
import {COLORS} from '../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'react-native';
import itens from '../screens/Itens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen component={Preload} name="Preload" options={preloadStyle} />
    <Stack.Screen component={SignIn} name="SignIn" options={authStackStyle} />
    <Stack.Screen component={SignUp} name="SignUp" options={signUpStyle} />
    <Stack.Screen
      name="ForgotPassWord"
      component={ForgotPassWord}
      options={forgotPassWordStyle}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: true,
    }}>
    <Tab.Screen
      component={Home}
      name="Home"
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon name="home" color={COLORS.primary} size={20} />,
      }}
    />
    <Tab.Screen
      component={itens}
      name="itens"
      options={{
        tabBarLabel: 'Itens',
        tabBarIcon: () => (
          <Icon name="search" color={COLORS.primary} size={20} />
        ),
      }}
    />
    
  </Tab.Navigator>
);

const Navigator = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={COLORS.primary} />
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
      <Stack.Screen
        component={Item}
        name="Item"
        options={{
          presentation: 'modal',
        }}
      />
      
    </Stack.Navigator>
  </NavigationContainer>
);
export default Navigator;

const preloadStyle = {
  headerShown: false,
};

const forgotPassWordStyle = {
  //headerLeft: false,
  title: 'Recuperar senha',
  headerStyle: {backgroundColor: COLORS.accent},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const authStackStyle = {
  title: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.accent},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const signUpStyle = {
  title: 'Cadastrar',
  headerStyle: {backgroundColor: COLORS.accent},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};
