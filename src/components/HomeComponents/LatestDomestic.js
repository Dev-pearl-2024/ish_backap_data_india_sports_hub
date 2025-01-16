import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../constants/Colors';
import CarouselCards from './CarouselCards';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PreLoader from '../loader/fullLoader';
import dynamicSize from '../../utils/DynamicSize';
export const SLIDER_HEIGHT = Dimensions.get('window').height / 3;

const LatestDomestic = ({
  internationalData,
  isLoading,
  setInternationalData,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <>
        {isLoading ? (
          <PreLoader />
        ) : (
          <>
            {internationalData && internationalData.length > 0 && (
              <View style={styles.headingContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: dynamicSize(20),
                    paddingVertical: dynamicSize(5),
                  }}>
                  <Text style={styles.title}>LATEST DOMESTIC</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('latest-international-view', {
                        internationalData: internationalData[0],
                        isDomestic: true,
                      });
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
                {internationalData?.[0]?.length == 0 &&
                    <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      lineHeight: 18,
                      color: COLORS.primary,
                      marginVertical:dynamicSize(12),
                      textAlign:'center'
                      
                    }}>
                    No Event Found
                  </Text>
               }
                <CarouselCards
                  carouselData={internationalData?.slice(0, 10)}
                  setInternationalData={setInternationalData}
                />
              </View>
            )}
          </>
        )}
      </>
    </>
  );
};

export default LatestDomestic;

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    // minHeight: SLIDER_HEIGHT,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: dynamicSize(13),
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
  },
});
