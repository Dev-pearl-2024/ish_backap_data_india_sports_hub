import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';

const Home = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: 16, gap: 6}}>
            {[1, 2, 3, 4, 5, 6].map(() => {
              return (
                <Button
                  buttonColor={COLORS.white}
                  textColor={COLORS.black}
                  // icon="camera"
                  mode="contained"
                  onPress={() => console.log('Pressed')}>
                  View all
                </Button>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '100%',
            height: 250,
            borderRadius: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                lineHeight: 24,
                color: COLORS.black,
              }}>
              LATEST INTERNATION
            </Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
});
