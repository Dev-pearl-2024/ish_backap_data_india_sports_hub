import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import dynamicSize from '../../utils/DynamicSize';

const PlayerStandingTable = ({data}) => {
   const players = data[0]?.players;

    if(!players) return <Text style={styles.noDataText}>No data available</Text>

   return (
      <View style={styles.container}>
         <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Rank</Text>
            <Text style={styles.playeNameSection}>Player</Text>
            <Text style={styles.headerText}>Country</Text>
            <Text style={styles.headerText}>Result</Text>
         </View>
         <FlatList
            data={players}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
               <View style={styles.tableRow}>
                  <Text style={styles.rowText}>{item.rank}</Text>
                  <View style={[styles.playerInfo, {marginRight: 5}]}>
                     <Image source={{ uri: item.player.image }} style={styles.playerImage} />
                  </View>
                     <Text style={styles.rowText}>{item.player.name}</Text>
                  <Text style={styles.rowText}>{item.country}</Text>
                  <Text style={styles.rowText}>{item.result || "N/A"}</Text>
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
