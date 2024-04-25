import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../constants/Colors';
import CarouselCards from './CarouselCards';
import { useNavigation } from '@react-navigation/native';
export const SLIDER_HEIGHT = Dimensions.get('window').height/3;

const LatestDomestic = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headingContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text style={styles.title}>LATEST DOMESTIC</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('latest-domestic-view');
          }}
          style={{
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 18,
            color: COLORS.primary,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              lineHeight: 18,
              color: COLORS.primary,
            }}>
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <CarouselCards />
    </View>
  );
};

export default LatestDomestic;

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: SLIDER_HEIGHT,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
  },
  
});
