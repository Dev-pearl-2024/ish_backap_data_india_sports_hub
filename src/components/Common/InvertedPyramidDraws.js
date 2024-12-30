import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import COLORS from '../../constants/Colors';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const InvertedPyramidDraws = ({ sportData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://prod.indiasportshub.com/draws/${sportData.drawsId}`
      );
      setData(response.data);
    } catch (err) {
      console.log(err, 'error from Draws');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sportData?.eventStatus !== 'completed') {
      const interval = setInterval(() => {
        fetchData();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  // Render match information inside each stage
  const renderMatch = ({ item }) => (
    <View style={styles.matchCard}>
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

  // Render each stage's data (if available)
  const renderStage = (stageData, index) => (
    <View key={index} style={styles.stageContainer}>
      <Text style={styles.stageTitle}> {stageData?.stageName || "Stage "+ (index+1)  }</Text>
      <FlatList
        data={stageData.teams}
        renderItem={renderMatch}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  // Render pools and their stages
  const renderPool = (poolData, index) => (
    <View key={index} style={styles.poolInfoContainer}>
      <Text style={styles.poolTitle}>{poolData.poolName}</Text>
      {/* {console.log} */}
      {poolData.stages.map((stageData, idx) => renderStage(stageData, idx))}
    </View>
  );

  return (
    <View style={styles.container}>
      {data?.existing ? (
        data?.existing?.data.map((poolData, index) => renderPool(poolData, index))
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS.black }}>No data available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dynamicSize(8),
    backgroundColor: '#fff',
  },
  poolInfoContainer: {
    marginBottom: dynamicSize(20),
  },
  poolTitle: {
    fontSize: dynamicSize(20),
    fontWeight: 'bold',
    marginBottom: dynamicSize(10),
    color:Colors.black
  },
  stageContainer: {
    marginBottom: dynamicSize(15),
  },
  stageTitle: {
    fontSize: dynamicSize(18),
    fontWeight: 'bold',
    marginBottom: dynamicSize(10),
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamContainer: {
    alignItems: 'center',
    width: '40%',
  },
  vsText: {
    fontSize: dynamicSize(18),
    fontWeight: 'bold',
    color: '#333',
  },
  teamName: {
    fontSize: dynamicSize(14),
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: dynamicSize(5),
  },
  teamScore: {
    fontSize: dynamicSize(12),
    color: '#555',
  },
});

export default InvertedPyramidDraws;
