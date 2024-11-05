import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Sample Data
const upcomingMatches = [
  {
    id: '1',
    event: '100m Sprint',
    participants: ['Athlete A', 'Athlete B', 'Athlete C'],
    date: '2024-08-05',
    time: '10:00 AM',
    location: 'Olympic Stadium',
  },
  {
    id: '2',
    event: 'Swimming 200m Freestyle',
    participants: ['Athlete D', 'Athlete E'],
    date: '2024-08-06',
    time: '12:30 PM',
    location: 'Aquatic Center',
  },
  // Add more events as needed
];

// Match Item Component
const MatchItem = ({ event, participants, date, time, location }) => (
  <View style={styles.matchContainer}>
    <Text style={styles.eventText}>{event}</Text>
    <Text style={styles.dateText}>Date: {date}</Text>
    <Text style={styles.timeText}>Time: {time}</Text>
    <Text style={styles.locationText}>Location: {location}</Text>
    <Text style={styles.participantsText}>
      Participants: {participants.join(', ')}
    </Text>
  </View>
);

// Upcoming Matches Component
const UpcomingMatches = () => {
  return (
    <FlatList
      data={upcomingMatches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MatchItem
          event={item.event}
          participants={item.participants}
          date={item.date}
          time={item.time}
          location={item.location}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f8',
  },
  matchContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  participantsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default UpcomingMatches;
