import {StyleSheet, TouchableOpacity, View} from 'react-native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import {useNavigation} from '@react-navigation/native';

export default function BackHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={{width: '33%'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <BackArrow />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={{
          width: '33%',
          alignItems: 'center',
        }}>
        <LogoIcon />
      </TouchableOpacity>

      <View style={styles.noticification}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('search');
            }}>
            <SearchIcon style={{marginRight: 24}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('notification');
            }}>
            <NoticificationIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 60,
  },
  noticification: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%',
  },
});
