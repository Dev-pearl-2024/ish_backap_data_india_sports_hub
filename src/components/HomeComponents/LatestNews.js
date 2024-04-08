import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import COLORS from '../../constants/Colors';

const LatestNews = () => {
  return (
    <View style={styles.headingContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Text style={styles.title}>LATEST NEWS</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 18,
            color: COLORS.primary,
          }}>
          View all
        </Text>
      </View>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
        <View style={styles.contentContainer}>
          <View style={{width: '33%'}}>
            <Image
              source={require('../../assets/images/img1.png')}
              style={{width: 114, height: 104}}
            />
          </View>
          <View
            style={{
              width: '67%',
              //   alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                lineHeight: 24,
                color: COLORS.black,
                paddingHorizontal: 8,
              }}>
              At vero eos et accusamus et iusto odio dignissimos ducimus
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 18,
                color: COLORS.dark_gray,
                paddingHorizontal: 8,
              }}>
              {' '}
              1hr | Bill Roger
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default LatestNews;

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
  },
  contentContainer: {
    width: '90%',
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    alignSelf: 'center',
  },
});
