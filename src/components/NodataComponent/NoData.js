import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import COLORS from '../../constants/Colors';

const NoData = () => {
  return (
    <View>
        <Text style={styles.noData}>No Data Found!</Text>
    </View>
  )
}

export default NoData

const styles = StyleSheet.create({
    noData: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      color: COLORS.light_gray,
      padding: 16,
      backgroundColor: COLORS.white,
      borderRadius: 15,
    },
})