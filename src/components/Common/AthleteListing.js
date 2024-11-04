import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';

const athletesData = [
  {
    id: '1',
    name: 'John Doe',
    profile_pic: 'https://example.com/profile1.jpg',
    country: 'USA',
    sport: 'basketball',
    event_category: ['men’s singles', 'mixed doubles'],
  },
  {
    id: '2',
    name: 'Emma Li',
    profile_pic: 'https://example.com/profile2.jpg',
    country: 'China',
    sport: 'table tennis',
    event_category: ['womens singles', 'womens doubles'],
  },
];

const AthleteListing = () => {
  const renderRow = ({item, index}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>S.No</Text>
      <Image source={{ uri: item.profile_pic }} style={styles.photo} />
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.country}</Text>
      <Text style={styles.cell}>{item.sport}</Text>
      <View style={styles.eventCell}>
        {item.event_category.map((category, idx) => (
          <Text key={idx} style={styles.eventText}>
            {category}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Athletes Table</Text> */}
      <FlatList
        data={athletesData}
        renderItem={renderRow}
        keyExtractor={item => item.id}
        scrollEnabled
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>
              S.No
            </Text>
            <Text style={styles.headerCell}>Photo</Text>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Country</Text>
            <Text style={styles.headerCell}>Sport</Text>
            <Text style={styles.headerCell}>Event Categories</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: dynamicSize(4),
    backgroundColor: '#fff',
  },
  header: {
    fontSize: dynamicSize(18),
    fontWeight: 'bold',
    marginBottom: dynamicSize(8),
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: dynamicSize(4),
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: dynamicSize(4),
    borderBottomWidth: dynamicSize(1),
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: dynamicSize(5)
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: dynamicSize(12),
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  photo: {
    width: dynamicSize(50),
    height: dynamicSize(50),
    borderRadius: dynamicSize(25),
  },
  eventCell: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  eventText: {
    textAlign: 'center',
  },
});

export default AthleteListing;
