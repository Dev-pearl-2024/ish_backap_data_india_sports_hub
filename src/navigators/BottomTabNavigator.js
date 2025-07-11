import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Favorite from '../screens/Favorite/Favorite';
import Calendar from '../screens/Calendar/Calendar';
import COLORS from '../constants/Colors';
import HomeIcon from '../assets/icons/home.svg';
import FavoriteIcon from '../assets/icons/heart-outline.svg';
import CalendarIcon from '../assets/icons/calender.svg';
import { Platform } from 'react-native';
import Chat from '../screens/chatRoom/chat';
import RedChat from '../assets/icons/redChat.svg'
import WhiteChat from '../assets/icons/chat.svg'

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: Platform.OS == 'ios' ? 90 : 60,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? COLORS.white : '#ffffff'} />
          ),
        }}
      />
      <Tab.Screen
        name="FanZone"
        component={Chat}
        options={{
          headerShown: false,
          tabBarLabel: 'FanZone',
          tabBarIcon: ({ focused }) => (
            focused ? <RedChat /> : <WhiteChat />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused }) => (
            <CalendarIcon color={focused ? 'red' : COLORS.white} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
