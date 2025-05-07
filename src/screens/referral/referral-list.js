import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackHeader from '../../components/Header/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import User from '../../assets/icons/user.svg';
import dynamicSize from '../../utils/DynamicSize';
import moment from 'moment';
import RightArrow from "../../assets/images/RightArrow.svg"


const ReferralList = ({ route }) => {
  const navigation = useNavigation();
  const { code } = route.params
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [referralList, setReferralList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({});

  const getData = async () => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      setIsLoading(true);
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/users/${userId}`,
      });
      setData(res?.data?.existing);
      setIsLoading(false);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);


  useEffect(() => {
    getReferralList();
  }, [isFocused]);

  const getReferralList = async () => {
    const userData = await AsyncStorage.getItem('userData');
    // const referralCode = JSON.parse(userData).referralCode;
    try {
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/users/get-all-referred/${code}?page=0&limit=1000`,
      });
      setLoading(false);
      setReferralList(response?.data?.data || []);
    } catch (error) {
      setLoading(false);
      throw new Error('Failed to get referral data');
    }
  };
  const renderReferralList = () => {
    return (

      referralList &&
        referralList.data &&
        referralList.data.length == 0 ? <View style={{ height: dynamicSize(50), justifyContent: "center" }}><Text style={{ color: COLORS.black, textAlign: "center" }}>No data found</Text></View> :

        referralList &&
        referralList.data &&
        referralList.data.length > 0 &&
        referralList.data.map((referral, index) => (
          <View
            key={index}
            style={{
              ...styles.profileContainer,
              flexDirection: 'row',
              paddingHorizontal: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.secondary,
            }}>
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>

                <Image
                  source={referral.image ? { uri: referral.image } : require('../../assets/images/user.png')}
                  style={{ ...styles.profileImage }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.profileInfo}>
                <View style={{ ...styles.nameContainer, marginBottom: 0 }}>
                  <Text style={{ ...styles.profileName, fontSize: 12 }}>
                    {referral.firstName} {referral.lastName}
                  </Text>
                  {referral.isPremiumUser && (
                    <Image
                      source={require('../../assets/icons/checkmark.png')}
                      style={{ ...styles.checkmarkIcon, width: 15, height: 15 }}
                    />
                  )}
                </View>
                <Text style={styles.emailAddress}>{referral.username}</Text>
              </View>
            </View>
            <Text style={styles.emailAddress}>
              {new Date(referral.joiningDate).toLocaleDateString()}
            </Text>
          </View>
        ))
    );
  };

  return (
    <SafeAreaView>
      <BackHeader />
      <ScrollView>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('user-profile')}>
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                {data?.image ? <Image
                  source={{ uri: data?.image }}
                  style={styles.profileImage}
                /> :
                  <User width={dynamicSize(40)} height={dynamicSize(40)} />
                }
              </View>
              <View style={styles.profileInfo}>
                <View style={styles.nameContainer}>
                  <Text style={styles.profileName}>{data?.firstName} {data?.lastName}</Text>
                  {data?.isPremiumUser && <Image
                    source={require('../../assets/icons/checkmark.png')}
                    style={styles.checkmarkIcon}
                  />}
                </View>
                <Text style={styles.emailAddress}>{data?.email}</Text>
              </View>
            </View>
            <View style={{ position: 'absolute', top: "-15%", bottom: 0, left: "90%", right: 0 }}>
              <RightArrow width={"50%"} />
            </View>
          </TouchableOpacity>
          {data?.isPremiumUser && <View style={styles.premiumContainer}>
            <View style={styles.premiumSection}>
              <Image
                source={require('../../assets/icons/premium-icon.png')}
                style={styles.badgeIcon}
              />
              <Text style={styles.premiumText}>
                Premium User Expires on {moment(data?.subscriptionDetails?.endDate).format(
                  'YYYY-MM-DD',
                )}
              </Text>
            </View>
          </View>}
        </View>

        <View style={styles.navigationContainer}>
          <Text style={styles.referredText}>LIST OF REFERRED</Text>
          {renderReferralList()}
        </View>
        <View style={{ marginBottom: "20%" }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferralList;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 60,
  },
  noticification: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%',
  },
  profileContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkmarkIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  emailAddress: {
    fontSize: 12,
    color: COLORS.light_gray,
  },
  premiumContainer: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    borderColor: COLORS.primary,
  },
  premiumSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    width: 22,
    height: 22,
  },
  premiumText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  navigationContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  referredText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  navigationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  navigationItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  referContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  referSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
