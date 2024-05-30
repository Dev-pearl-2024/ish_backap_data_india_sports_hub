import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import EditIcon from '../../assets/icons/edit.svg';
import BackHeader from '../../components/Header/BackHeader';
import {TextInput} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreLoader from '../../components/loader/fullLoader';

const UserProfile = () => {
  const navigation = useNavigation();
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    age: '',
    firstname: '',
    lastName: '',
    gender: '',
  });

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      path: selectedImage,
      cropping: true,
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateUserData = async () => {
    let userId = await AsyncStorage.getItem('userId');
    console.log(userId);
    try {
      let res = await axios({
        method: 'PUT',
        url: `http://15.206.246.81:3000/users/${userId}`,
        data: {
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          age: Number(userData?.age),
          // email: userData?.email,
          gender: userData?.gender,
        },
      });
      setUserData({
        firstName: res?.data?.existing?.firstName,
        lastName: res?.data?.existing?.lastName,
        email: res?.data?.existing?.email,
        age: res?.data?.existing?.age,
        gender: res?.data?.existing?.gender,
        phoneNumber: res?.data?.existing?.phoneNumber,
        username: res?.data?.existing?.username,
      });
    } catch (error) {
      console.log(error?.message, error?.response);
    }
  };

  const getUserData = async () => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      setIsLoading(true);
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/users/${userId}`,
      });
      setUserData({
        firstName: res?.data?.existing?.firstName,
        lastName: res?.data?.existing?.lastName,
        email: res?.data?.existing?.email,
        age: res?.data?.existing?.age,
        gender: res?.data?.existing?.gender,
        phoneNumber: res?.data?.existing?.phoneNumber,
        username: res?.data?.existing?.username,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView>
      {!isLoading ? (
        <>
          <BackHeader />

          <View style={styles.profileContainer}>
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={
                    selectedImage
                      ? {uri: selectedImage}
                      : require('../../assets/images/profileImg.png')
                  }
                  style={styles.profileImage}
                  resizeMode="cover"
                />

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: COLORS.white,
                    borderRadius: 50,
                    padding: 5,
                  }}
                  onPress={() => handleImagePicker()}>
                  <EditIcon width={20} height={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <View style={styles.nameContainer}>
                  <Text style={styles.profileName}>
                    {userData?.firstName} {userData?.lastName}
                  </Text>
                  <Image
                    source={require('../../assets/icons/checkmark.png')}
                    style={styles.checkmarkIcon}
                  />
                </View>
                <Text style={styles.emailAddress}>{userData?.username}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.premiumContainer}
              onPress={() => navigation.navigate('plans')}>
              <View style={styles.premiumSection}>
                <Image
                  source={require('../../assets/icons/premium-icon.png')}
                  style={styles.badgeIcon}
                />
                <Text style={styles.premiumText}>
                  Premium User Expires on 01/12/2024
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationContainer}>
            {editing ? (
              <View
                style={{
                  paddingVertical: 6,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.secondary,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.navigationItemText,
                    color: COLORS.light_gray,
                  }}>
                  Name:
                </Text>
                <TextInput
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  style={{
                    borderWidth: 0.5,
                    width: '80%',
                    borderRadius: 5,
                    padding: 5,
                    marginLeft: 10,
                    color: COLORS.black,
                  }}
                  onChangeText={text =>
                    setUserData({
                      ...userData,
                      firstName: text?.split(' ')[0],
                      lastName: text?.split(' ')[1],
                    })
                  }
                  defaultValue={
                    userData?.lastName
                      ? userData?.firstName + ' ' + userData?.lastName
                      : userData?.firstName
                  }
                />
              </View>
            ) : null}
            <View
              style={
                editing
                  ? {
                      paddingVertical: 6,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.secondary,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }
                  : {
                      paddingVertical: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.secondary,
                      flexDirection: 'row',
                    }
              }>
              <Text
                style={{
                  ...styles.navigationItemText,
                  color: COLORS.light_gray,
                }}>
                Age:
              </Text>
              {editing ? (
                <TextInput
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  style={{
                    borderWidth: 0.5,
                    width: '80%',
                    borderRadius: 5,
                    padding: 5,
                    marginLeft: 10,
                    color: COLORS.black,
                  }}
                  onChangeText={text => setUserData({...userData, age: text})}
                  value={userData?.age?.toString()}
                />
              ) : (
                <Text style={styles.navigationItemText}>{userData?.age}</Text>
              )}
            </View>
            <View
              style={
                editing
                  ? {
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.secondary,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }
                  : {
                      paddingVertical: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.secondary,
                      flexDirection: 'row',
                    }
              }>
              <Text
                style={{
                  ...styles.navigationItemText,
                  color: COLORS.light_gray,
                }}>
                Gender:
              </Text>
              {editing ? (
                <RadioButton.Group
                  onValueChange={value =>
                    setUserData({...userData, gender: value})
                  }
                  value={userData?.gender}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton value="male" color={COLORS.primary} />
                      <Text style={{color: COLORS.black}}>Male</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton value="female" color={COLORS.primary} />
                      <Text style={{color: COLORS.black}}>Female</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton value="others" color={COLORS.primary} />
                      <Text style={{color: COLORS.black}}>Other</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              ) : (
                <Text style={styles.navigationItemText}>
                  {userData?.gender}
                </Text>
              )}
            </View>
            <View
              style={
                editing
                  ? {
                      paddingVertical: 7,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.secondary,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }
                  : {
                      paddingVertical: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.secondary,
                      flexDirection: 'row',
                    }
              }>
              <Text
                style={{
                  ...styles.navigationItemText,
                  color: COLORS.light_gray,
                }}>
                Email id:
              </Text>
              <Text style={styles.navigationItemText}>{userData?.email}</Text>
            </View>
            {/* {editing ? (
                <TextInput
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  style={{
                    borderWidth: 0.5,
                    width: '73%',
                    borderRadius: 5,
                    padding: 5,
                    marginLeft: 10,
                    color: COLORS.black,
                  }}
                  // onChangeText={text => setUserData({...userData, email: text})}
                  // value={userData?.email}
                />
              ) : ( */}
            {/* )} */}
            <View style={styles.navigationItem}>
              <Text
                style={{
                  ...styles.navigationItemText,
                  color: COLORS.light_gray,
                }}>
                Phone Number:
              </Text>
              <Text style={styles.navigationItemText}>
                {userData?.phoneNumber}
              </Text>
            </View>
            {editing ? (
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 10,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setEditing(!editing), updateUserData();
                  }}>
                  <Text style={{color: COLORS.white, fontSize: 14}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 10,
                    alignItems: 'center',
                    border: 1,
                    borderWidth: 1,
                    borderColor: COLORS.black,
                  }}
                  onPress={() => setEditing(!editing)}>
                  <Text style={{color: COLORS.black, fontSize: 14}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 10,
                  alignItems: 'center',
                }}
                onPress={() => setEditing(!editing)}>
                <Text style={{color: COLORS.white, fontSize: 14}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => navigation.navigate('settings')}>
            <View style={styles.settingSection}>
              <Image
                source={require('../../assets/icons/settingIcon.png')}
                style={styles.referIcon}
              />
              <Text style={styles.referText}>Settings</Text>
            </View>
          </TouchableOpacity> */}
        </>
      ) : (
        <PreLoader />
      )}
    </SafeAreaView>
  );
};

export default UserProfile;

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
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
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
    marginBottom: 2,
  },
  emailAddress: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.light_gray,
  },
  premiumContainer: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 50,
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
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  navigationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    flexDirection: 'row',
  },
  navigationItemText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  settingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  settingSection: {
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
