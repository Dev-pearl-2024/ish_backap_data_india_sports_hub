import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import NewSportCard from './NewSportCard';

const MatchCard = ({data}) => {
 
  // const renderCards = ({item, index}) => {
  //   const {athelete1_details, athelete2_details} = item;
  //   return (
  //     <TouchableOpacity
  //       style={styles.container}>
  //       <View style={styles.scoreContainer}>
  //         <View style={{flexDirection: 'row'}}>
  //           <View style={[styles.teamContainer]}>
  //             <Text style={styles.teamName}>
  //               {athelete1_details?.athlete_name}
  //             </Text>
  //           </View>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               alignItems: 'center',
  //               width: '50%',
  //             }}>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 justifyContent: 'space-between',
  //                 alignItems: 'center',
  //               }}>
  //               {athelete1_details?.profile_pic && (
  //                 <Image
  //                   style={{
  //                     height: dynamicSize(30),
  //                     width: dynamicSize(30),
  //                     borderRadius: dynamicSize(15),
  //                     marginRight: dynamicSize(15),
  //                   }}
  //                   source={{uri: athelete1_details?.profile_pic}}
  //                 />
  //               )}
  //               <Text style={{alignSelf: 'center', color: '#000'}}>
  //                 {athelete1_details?.athlete_score}
  //               </Text>
  //             </View>
  //             {/* 2nd opponent */}

  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 justifyContent: 'space-between',
  //                 alignContent: 'center',
  //                 alignItems: 'center',
  //               }}>
  //               <Text style={{alignSelf: 'center', color: '#000'}}>
  //                 {athelete2_details?.athlete_score}
  //               </Text>
  //               {athelete2_details?.profile_pic && (
  //                 <Image
  //                   style={{
  //                     height: dynamicSize(30),
  //                     width: dynamicSize(30),
  //                     borderRadius: dynamicSize(15),
  //                     marginLeft: dynamicSize(15),
  //                   }}
  //                   source={{uri: athelete2_details?.profile_pic}}
  //                 />
  //               )}
  //             </View>
  //           </View>
  //           <View style={[styles.teamContainer]}>
  //             <Text style={styles.teamName}>
  //               {athelete2_details?.athlete_name}
  //             </Text>
  //           </View>
  //         </View>

  //         <Text style={{alignSelf: 'center', color: '#000'}}>
  //           {item?.result}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <>
    {data.length===0 && <Text style={{textAlign:"center",color:"black",marginVertical:10}} >No data available</Text>}
    <FlatList
      data={data}
      renderItem={({ item }) => <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <NewSportCard item={item} margin={10} />
      </View> }
      keyExtractor={(_, index) => index.toString()}
    />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: dynamicSize(8),
    padding: dynamicSize(15),
    marginVertical: dynamicSize(10),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  result: {
    fontSize: dynamicSize(16),
    color: '#6c757d',
  },
  date: {
    fontSize: dynamicSize(14),
    color: '#adb5bd',
    marginTop: dynamicSize(4),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    aligneventDatas: 'center',
    backgroundColor: '#f8f8f8',
    height: dynamicSize(70),
    margin: dynamicSize(5),
    padding: dynamicSize(5),
  },
  scoreContainer: {
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: dynamicSize(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: 'center',
    textAlignVertical: 'center',
    padding: dynamicSize(5),
  },
  teamContainer: {
    flex: 1,
    aligneventDatas: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: dynamicSize(8),
    flexDirection: 'row',
    // backgroundColor: 'blue'
  },
  teamName: {
    fontSize: dynamicSize(12),
    fontWeight: 'bold',
    marginBottom: dynamicSize(10),
    textAlign: 'center',
    marginTop: dynamicSize(10),
    color: 'black',
  },
  score: {
    fontSize: dynamicSize(16),
    fontWeight: 'bold',
    marginHorizontal: dynamicSize(15),
    marginTop: '10%',
  },
  eventdetails: {
    fontSize: dynamicSize(10),
    fontWeight: 'bold',
    marginBottom: dynamicSize(5),
    textAlign: 'center',
    // marginTop: dynamicSize(5)
  },
});

export default MatchCard;
