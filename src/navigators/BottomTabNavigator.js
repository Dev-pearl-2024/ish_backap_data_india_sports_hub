import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Favorite from './Favorite.js/Favorite';
import Calendar from '../screens/Calendar.js/Calendar';
import COLORS from '../constants/Colors';
import HomeIcon from '../assets/icons/home.svg';
import FavoriteIcon from '../assets/icons/heart-outline.svg';
import CalendarIcon from '../assets/icons/calender.svg';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0.8,
          height: 60,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {fontSize: 14, fontWeight: '500'},
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <HomeIcon
              width={25}
              height={25}
              color={focused ? COLORS.red : '#ffffff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarLabel: 'Favorite',
          tabBarIcon: ({focused}) => (
            <FavoriteIcon
              width={25}
              height={25}
              color={focused ? COLORS.red : '#ffffff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarLabel: 'Calendar',
          tabBarIcon: ({focused}) => (
            <CalendarIcon
              width={25}
              height={25}
              color={focused ? COLORS.red : '#ffffff'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
