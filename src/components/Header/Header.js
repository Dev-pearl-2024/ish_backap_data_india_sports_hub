import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import COLORS from '../../constants/Colors';
import MenuHumberger from '../../assets/icons/menu-hamburger.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';

const Header = () => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <MenuHumberger />
        <LogoIcon />
        <View style={styles.noticification}>
          <SearchIcon />
          <NoticificationIcon style={{marginHorizontal: 20}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 60,
  },
  noticification: {
    flexDirection: 'row',
  },
});
