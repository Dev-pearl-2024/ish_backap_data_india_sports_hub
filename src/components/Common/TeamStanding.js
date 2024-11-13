import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import { date } from 'yup';



const TeamStanding = ({data:standings}) => {
    if(!data) return <Text style={styles.noDataText}>No data available</Text>

   return (
      <View style={styles.container}>
         <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Rank</Text>
            <Text style={styles.headerText}>Country</Text>
            <Text style={styles.headerText}>Gold</Text>
            <Text style={styles.headerText}>Silver</Text>
            <Text style={styles.headerText}>Bronze</Text>
            <Text style={styles.headerText}>Total</Text>
         </View>
         <FlatList
            data={standings}
            keyExtractor={(item) => item._id["$oid"]}
            renderItem={({ item }) => (
               <View style={styles.tableRow}>
                  <Text style={styles.rowText}>{item.rank}</Text>
                  <Text style={styles.rowText}>{item.country}</Text>
                  <Text style={styles.rowText}>{item.gold}</Text>
                  <Text style={styles.rowText}>{item.silver}</Text>
                  <Text style={styles.rowText}>{item.bronze}</Text>
                  <Text style={styles.rowText}>{item.total}</Text>
               </View>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: dynamicSize(10),
   },
   tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: dynamicSize(5),
      borderBottomWidth: dynamicSize(1),
      borderBottomColor: '#ddd',
   },
   headerText: {
      fontSize: dynamicSize(14),
      fontWeight: 'bold',
      width: '16%',
      textAlign: 'center',
   },
   tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: dynamicSize(10),
      borderBottomWidth: dynamicSize(1),
      borderBottomColor: '#f0f0f0',
   },
   rowText: {
      fontSize: dynamicSize(14),
      width: '16%',
      textAlign: 'center',
   },
});

export default TeamStanding;
