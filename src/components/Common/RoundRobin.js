import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import COLORS from '../../constants/Colors';
import axios from 'axios';
import { useEffect, useState } from 'react';


const RoundRobinDraws = ({ sportData }) => {


      const [isLoading, setIsLoading] = useState(true)
      const [data, setData] = useState([])
    
      const fetchData = async () =>{
        try {
          const response = await axios.get(`https://prod.indiasportshub.com/draws/${sportData.drawsId}`); 
          setData(response.data)
       } catch (err) {
          console.log(err, 'error from Draws')
       }
       finally{
        setIsLoading(false);
       }
      }
    
      useEffect(() =>{
        fetchData()
      }, [])
      
console.log("RRPage",`https://prod.indiasportshub.com/draws/${sportData.drawsId}`)

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

    const renderTeam = ({ item }) => {
        return (
            <View style={styles.teamCard}>
                <Text style={styles.teamRank}>{item.rank}</Text>
                <Text style={styles.teamName}>{item.teamName}</Text>
                <Text style={styles.teamScore}>Score: {item.teamScore}</Text>
            </View>
        );
    };

    const renderGroup = (groupData, index) => {
        return (
            <View key={index} style={styles.poolInfoContainer}>
                <Text style={styles.poolTitle}>{groupData.poolName}</Text>
                <FlatList
                    data={groupData.poolTeams}
                    renderItem={renderTeam}
                    keyExtractor={(item) => item.rank.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* {data?.existing?.data.map((groupData, index) => renderGroup(groupData, index))} */}


            {data?.existing ?  data?.existing?.data.map((groupData, index) => renderGroup(groupData, index))
             : (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:COLORS.black}}>No data available</Text>
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
    },
    teamCard: {
        marginRight: dynamicSize(15),
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: dynamicSize(120),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    teamRank: {
        fontSize: dynamicSize(18),
        fontWeight: 'bold',
        color: '#333',
    },
    teamName: {
        fontSize: dynamicSize(14),
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: dynamicSize(5),
        color:COLORS.black

    },
    teamScore: {
        fontSize: dynamicSize(12),
        color: '#555',
    },
    stageContainer: {
        marginBottom: dynamicSize(20),
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
});

export default RoundRobinDraws;
