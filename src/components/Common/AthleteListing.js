import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import COLORS from '../../constants/Colors';
const width = Dimensions.get('window').width;


const AthleteListing = ({ athleteDetail }) => {

  return(
  <ScrollView horizontal style={{ backgroundColor: COLORS.white }}>
    <View>
      {athleteDetail.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            width: width + width,
          }}>
          <Text style={{ color: '#56BCBE', width: '5%', textAlign: 'center' }}>
          S.no
          </Text>
          <Text style={{ color: '#56BCBE', width: '15%', textAlign: 'center' }}>
          Photo
          </Text>
          <Text style={{ color: '#56BCBE', width: '15%', textAlign: 'center' }}>
          Name
          </Text>
          <Text style={{ color: '#56BCBE', width: '10%', textAlign: 'center' }}>
          Country
          </Text>
          <Text style={{ color: '#56BCBE', width: '15%', textAlign: 'center' }}>
          Sport
          </Text>
          <Text style={{ color: '#56BCBE', width: '15%', textAlign: 'center' }}>
            Event
          </Text>
          <Text style={{ color: '#56BCBE', width: '10%', textAlign: 'center' }}>
          Age
          </Text>
        </View>)}

      <FlatList
        data={athleteDetail}
        keyExtractor={item => item._id}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              width: width,
            }}>
            <Text style={{ color: COLORS.black, textAlign: 'center' }}>No Data Found</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
              padding: 10,
            }}>
           
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                width: '5%',
              }}>
              {index + 1}
            </Text>
            {/* <View style={{flex:1,justifyContent:"center",alignItems:"center",width:"1%",backgroundColor:"green"}}> */}
              <Image source={{ uri: item.icon }} style={styles.photo} />
              {/* </View> */}
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                width: '15%',
              }}>
              {item.fullName}
            </Text>
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                width: '10%',
              }}>
              {item?.country}
            </Text>
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                width: '15%',
              }}>
              {item?.sports}
            </Text>
           
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                width: '15%',
              }}>
              {item?.eventCategory[0]}
            </Text>
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                width: '10%',
              }}>
              {item?.age}
            </Text>
          </View>
        )}
      />
    </View>
  </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: dynamicSize(4),
    backgroundColor: '#fff',
  },
  scrollView: {
    flexDirection: "column",
    paddingVertical: dynamicSize(4),
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: dynamicSize(4),
    marginBottom: dynamicSize(10),
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: dynamicSize(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: dynamicSize(4),
    borderBottomWidth: dynamicSize(1),
    borderBottomColor: '#ccc',
    marginRight: dynamicSize(10), // Adding spacing between rows
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
    marginHorizontal: dynamicSize(40)

  },
  eventCell: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  eventText: {
    textAlign: 'center',
  }
});

export default AthleteListing;
