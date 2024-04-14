import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import CarouselCards from '../../components/HomeComponents/CarouselCards';
import LatestNews from '../../components/HomeComponents/LatestNews';
import LatestInterNation from '../../components/HomeComponents/LatestInterNation';
import LatestDomestic from '../../components/HomeComponents/LatestDomestic';

const Home = () => {
  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{padding: 16, gap: 6}}>
              {[1, 2, 3, 4, 5, 6].map(() => {
                return (
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text>View all</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <LatestInterNation />
          <LatestDomestic />
          <LatestNews showTitle={true}/>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },

  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  carouselHeadingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    marginBottom: 16,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
  },
});
