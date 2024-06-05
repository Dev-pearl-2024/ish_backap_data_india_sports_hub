import {useState,useEffect} from  "react";
import {Image, StyleSheet, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {useSelector} from 'react-redux';

export default function AthleteProfileCard({athProfileData}) {
  const [accomplArray, setAccomplArray] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const isLoading = useSelector(state => state.atheleteReducer.isLoading);

  useEffect(() => {
    const accomplKeys = Object.keys(athProfileData).filter((key) => key.startsWith("accomplishments"));
    setAccomplArray(accomplKeys);
    if(athProfileData){
      const image = athProfileData?.coverImage
      setProfileImg(image)
    }
  },[athProfileData])

  return (
    <View style={styles.container}>
      <View style={{
        alignItems:'center',
        width:'30%',
      }}>
      <ShimmerPlaceholder
      stopAutoRun
      duration={1500}
      visible={!isLoading}
      style={styles.skeletonContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: profileImg,
          }}
        />
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
        stopAutoRun
        duration={1500}
        visible={!isLoading}
        style={{width:'100%'}}
        >
        <Text style={styles.profileText}>{athProfileData?.fullName}</Text>
        </ShimmerPlaceholder>
      </View>
      <View style={{width:"60%"}}>
        {accomplArray.map((item, id) => {
          return (
            <ShimmerPlaceholder
            stopAutoRun
            duration={1500}
            visible={!isLoading}>
            <Text key={`achievement${id}`} style={styles.detailText}>
              {athProfileData[item]}
            </Text>
            </ShimmerPlaceholder>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 16,
    borderRadius:12
  },
  profileImage: {
    width: 90,
    height: 90,
    objectFit: 'cover',
    borderRadius: 90 / 2,
  },
  profileText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 8,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.black,
    marginVertical:3
  },
  skeletonContainer:{
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  }
});
