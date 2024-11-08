import {Image, ScrollView, Text, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import LatestNews from '../../components/HomeComponents/LatestNews';
import COLORS from '../../constants/Colors';
import HeartIcom from '../../assets/icons/redHeart.svg';
import { useEffect } from 'react';
import AuthorPostListing from './AuthorPostListing';
import dynamicSize from '../../utils/DynamicSize';
export default function BlogProfileView({route}) {
    const authorData = JSON.parse(route?.params?.authorData);   

  

  return (
    <ScrollView>
      <BackHeader />
      <View
        style={{
          position: 'relative',
        }}>
        <Image
          source={{uri: authorData?.[0]?.avatar_urls[96]}}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: dynamicSize(10),
            left: dynamicSize(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width:"95%",
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: dynamicSize(16),
              fontWeight: '500',
            }}>
            {authorData?.[0]?.name}
          </Text>
        </View>
      </View>
      <AuthorPostListing author={authorData?.[0]?.id}/>
    </ScrollView>
  );
}
