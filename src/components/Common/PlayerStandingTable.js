import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import COLORS from '../../constants/Colors';

  const width = Dimensions.get('window').width;

const PlayerStandingTable = ({data,category}) => {
   // const test = data[0]?.players;
   const players = data.filter((item) => item.eventCategory === category)[0]?.players
    if(!players) return <Text style={styles.noDataText}>No data available</Text>

   return (
      <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              width: width,
            }}>
            <Text style={{ width: '15%', color: '#56BCBE' }}>Rank</Text>
            <Text style={{ color: '#56BCBE', width: '50%' }}>Player Name</Text>
            <Text style={{ color: '#56BCBE', width: '25%' }}>Country</Text>
            <Text style={{ color: '#56BCBE', width: '15%' }}>Result</Text>
          </View>

          <FlatList
            data={players}
            //   keyExtractor={item => item._id}
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  width: width,
                }}>
                <Text style={{ color: COLORS.black, textAlign: 'center' }}>
                  No Data Found
                </Text>
              </View>
            )}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
                  padding: 10,
                }}
                onPress={() => {
                  // handleAtheleteProfileData(item?._id);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    width: '15%',
                  }}>
                  <Text style={{ color: COLORS.black }} numberOfLines={1}>
                    {item.rank}
                    {/* {console.log("RANKKKKKKKK",item)} */}
                  </Text>
                  
                </View>
                <View style={{width: '50%',flexDirection:"row"}}>
                <Image
                    source={item?.player?.image ? { uri: item?.player?.image } : require('../../assets/images/user.png')}
                    style={{
                      borderRadius: 50,
                      marginHorizontal: 2,
                      width: 25,
                      height: 25,

                    }}
                    width={25}
                    height={25}
                  />
                <Text
                  style={{
                    color: COLORS.black,
                    width:"70%"
                  }}>
                  {item?.player?.name}
                </Text>
                </View>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '25%',
                  }}>
                  {item?.country}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '15%',
                  }}>
                  {item?.result}
                </Text>
              </View>
            )}
          />
        </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: dynamicSize(5),
   },
   
   tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: dynamicSize(10),
      borderBottomWidth: dynamicSize(1),
      borderBottomColor: '#ddd',
   },
   headerText: {
      fontSize: dynamicSize(14),
      fontWeight: 'bold',
      width: '20%',
      textAlign: 'center',
   },
   playeNameSection: {
    fontSize: dynamicSize(14),
    fontWeight: 'bold',
    width: '40%',
    textAlign: 'center',
 },
   tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: dynamicSize(10),
      borderBottomWidth: dynamicSize(1),
      borderBottomColor: '#f0f0f0',
   },
   rowText: {
      fontSize: dynamicSize(14),
      width: '20%',
      textAlign: 'center',
   },
   playerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      width: dynamicSize(25),
      height: dynamicSize(25),
      borderRadius:dynamicSize(13)
   },
   playerImage: {
      width: dynamicSize(30),
      height: dynamicSize(30),
      borderRadius: dynamicSize(15),
      marginRight: dynamicSize(8),
   },
   noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    margin: dynamicSize(20),
 },
});

export default PlayerStandingTable;
