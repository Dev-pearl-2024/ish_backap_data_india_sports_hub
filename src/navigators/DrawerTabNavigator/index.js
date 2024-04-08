import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderNavigationProvider } from '../../hooks/useHeaderNavigation';
import SideDrawer from './sideDrawer';
import BottomTabNavigator from "../BottomTabNavigator";

const Drawer = createDrawerNavigator();

const DrawerTabNavigator = () => {
  return (
    <NavigationContainer>
    <Drawer.Navigator drawerContent={({ navigation }) => <SideDrawer navigation={navigation} />}>
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
    </Drawer.Navigator>
    {/* Log navigation here to ensure it's defined */}
    {console.log('Navigation:', navigation)}
    {/* Render Header component here */}
    <Header navigation={navigation} />
  </NavigationContainer>

  );
};

export default DrawerTabNavigator;
