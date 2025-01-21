import React from 'react';
import { View, StyleSheet } from 'react-native';
import TeamStanding from './TeamStanding';
import PlayerStandingTable from './PlayerStandingTable';
import dynamicSize from '../../utils/DynamicSize';

const PointsTable = ({tournamentDetail,category}) => {
  const {standingForCountry} = tournamentDetail
  return (
    <View style={styles.container}>
      {standingForCountry === 'yes' ?<TeamStanding data={tournamentDetail?.countryStandingList}/> : <PlayerStandingTable key={category} category={category} data={tournamentDetail?.standing}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dynamicSize(8),
    backgroundColor: '#fff',
  },
});

export default PointsTable;
