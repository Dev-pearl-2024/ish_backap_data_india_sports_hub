import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';

const drawData = {
  data: [
    {
      poolName: 'section 1',
      stages: [
        {
          stageName: 'Stage 1',
          teams: [
            {
              homeTeam: 'football 2 ( Switzerland )',
              homeScore: '680 ( 90 )',
              awayTeam: 'football 1 ( Grenada )',
              awayScore: '760 ( 60 )',
              eventId: '6707ff20cf8bd2afc8155737',
            },
            {
              homeTeam: 'football 1 ( Grenada )',
              homeScore: '550 ( 5 )',
              awayTeam: 'football 2 ( Switzerland )',
              awayScore: '450 ( 10 )',
              eventId: '6707fee3cf8bd2afc8155719',
            },
            // More match data here...
          ],
        },
        {
          stageName: 'Stage 2',
          teams: [
            {
              homeTeam: 'football 1 ( Grenada )',
              homeScore: '1000 ( 1 )',
              awayTeam: 'football 2 ( Switzerland )',
              awayScore: '200 ( 2 )',
              eventId: '6707710a41b55b9ffa399834',
            },
          ],
        },
      ],
    },
  ],
};

const InvertedPyramidDraws = () => {
  const poolData = drawData.data[0];

  const renderMatch = ({item}) => {
    // Only render match if both teams are set
    if (item.homeTeam && item.awayTeam) {
      return (
        <View style={styles.card}>
          <View style={styles.teamContainer}>
            <Text style={styles.teamName}>{item.homeTeam}</Text>
            <Text style={styles.teamScore}>{item.homeScore}</Text>
          </View>
          <Text style={styles.vsText}>VS</Text>
          <View style={styles.teamContainer}>
            <Text style={styles.teamName}>{item.awayTeam}</Text>
            <Text style={styles.teamScore}>{item.awayScore}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {poolData.stages.map((stage, index) => (
        <View key={index} style={styles.stageContainer}>
          <Text style={styles.stageTitle}>
            {stage.stageName || `Stage ${index + 1}`}
          </Text>
          <FlatList
            data={stage.teams}
            renderItem={renderMatch}
            keyExtractor={(item, idx) => item.eventId || idx.toString()}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dynamicSize(8),
    backgroundColor: '#fff',
  },
  stageContainer: {
    marginBottom: dynamicSize(20),
  },
  stageTitle: {
    fontSize: dynamicSize(20),
    fontWeight: 'bold',
    marginBottom: dynamicSize(10),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamContainer: {
    alignItems: 'center',
    width: '40%',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  teamScore: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default InvertedPyramidDraws;
