import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PointsTable = ({tournamentDetail}) => {
  console.log(JSON.stringify(tournamentDetail), '@@@@@@@@@')
  // Mock data for demonstration
  const medalData = [
    { country: 'USA', gold: 39, silver: 41, bronze: 33 },
    { country: 'China', gold: 38, silver: 32, bronze: 18 },
    { country: 'Japan', gold: 27, silver: 14, bronze: 17 },
    { country: 'Great Britain', gold: 22, silver: 21, bronze: 22 },
    { country: 'Russia', gold: 20, silver: 28, bronze: 23 },
  ];

  // Calculate total medals for each country
  const dataWithTotal = medalData.map(item => ({
    ...item,
    total: item.gold + item.silver + item.bronze,
  }));

  // Render each row in the table
  const renderRow = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
      <Text style={styles.cell}>{item.country}</Text>
      <Text style={styles.cell}>{item.gold}</Text>
      <Text style={styles.cell}>{item.silver}</Text>
      <Text style={styles.cell}>{item.bronze}</Text>
      <Text style={styles.cell}>{item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{tournamentDetail?.name}</Text> */}
      
      {/* Table Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headerCell}>Country</Text>
        <Text style={styles.headerCell}>Gold</Text>
        <Text style={styles.headerCell}>Silver</Text>
        <Text style={styles.headerCell}>Bronze</Text>
        <Text style={styles.headerCell}>Total</Text>
      </View>

      {/* Medal Data */}
      <FlatList
        data={dataWithTotal}
        renderItem={renderRow}
        keyExtractor={(item) => item.country}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  header: {
    borderBottomWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  rowEven: {
    backgroundColor: '#f0f0f0',
  },
  rowOdd: {
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PointsTable;
