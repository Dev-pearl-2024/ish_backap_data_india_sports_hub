import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import SportSelection from '../../components/allsportsComponents/sportsSelection';
import COLORS from '../../constants/Colors';
import dynamicSize from '../../utils/DynamicSize';
import GoogleAd from '../../components/GoogleAds';

export default function AllArchieve() {
  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <BackHeader />
      <Text style={styles.sportsTitle}>All Archives</Text>
      <SportSelection route={'archieve-tournament'} />
      <View
        style={{
          padding: dynamicSize(5),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: -5,
          left: 0,
        }}>
        {/* <Text>Google Ads</Text> */}
        <GoogleAd />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
});
