import {Image, ScrollView, Text, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import LatestNews from '../../components/HomeComponents/LatestNews';
import COLORS from '../../constants/Colors';
import HeartIcom from '../../assets/icons/redHeart.svg';
export default function BlogProfileView() {
  return (
    <ScrollView>
      <BackHeader />
      <View
        style={{
          position: 'relative',
        }}>
        <Image
          source={require('../../assets/images/blogProfileDummy.png')}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <View
          style={{
            padding: 10,
            position: 'absolute',
            borderRadius: 100,
            top: 10,
            right: 10,
            width: 40,
            height: 40,
            overflow: 'hidden',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: COLORS.medium_gray,
              position: 'absolute',
              width: 40,
              height: 40,
              opacity: 0.5,
            }}
          />
          <HeartIcom />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width:"95%",
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Name of Person
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 16,
              fontWeight: '500',
            }}>
            256 - Followers
          </Text>
        </View>
      </View>
      <LatestNews showTitle={false} />
    </ScrollView>
  );
}
