import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../constants/Colors';
import CarouselCards from './CarouselCards';

const LatestInterNation = () => {
  return (
    <View style={styles.headingContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Text style={styles.title}>LATEST INTERNATION</Text>
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
      <CarouselCards />
    </View>
  );
};

export default LatestInterNation;

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
});
