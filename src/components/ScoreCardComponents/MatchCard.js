import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MatchCard = ({ athlete1, athlete2, result, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{`${athlete1} vs ${athlete2}`}</Text>
      <Text style={styles.result}>{`Result: ${result}`}</Text>
      <Text style={styles.date}>{`Date: ${date}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  result: {
    fontSize: 16,
    color: '#6c757d',
  },
  date: {
    fontSize: 14,
    color: '#adb5bd',
    marginTop: 4,
  },
});

export default MatchCard;
