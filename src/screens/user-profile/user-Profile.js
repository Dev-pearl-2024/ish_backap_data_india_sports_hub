import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import User from "../../assets/icons/user.svg"
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import EditIcon from '../../assets/icons/edit.svg';
import BackHeader from '../../components/Header/BackHeader';
import { TextInput } from 'react-native';
import { RadioButton, Snackbar } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreLoader from '../../components/loader/fullLoader';
import moment from 'moment';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


import dynamicSize from '../../utils/DynamicSize';

const UserProfile = () => {
  const navigation = useNavigation();
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [visible, setVisible] = React.useState(false);
  const [userName, setUserName] = useState('');
  const [suggestions, setSuggestions] = useState(undefined);
  const [debouncedUserName, setDebouncedUserName] = useState('');
  const [dobError, setDobError] = useState('');
  const [ageWarning, setAgeWarning] = useState('');

  const validateDOB = (dob) => {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/; // DD-MM-YYYY format

    if (!dobRegex.test(dob)) {
      setDobError('❌ Please enter DOB in DD-MM-YYYY format');
      setAgeWarning('');
      return;
    }

    const birthDate = moment(dob, 'DD-MM-YYYY');
    const age = moment().diff(birthDate, 'years');

    if (age < 18) {
      setAgeWarning('⚠️ Chat functionality will not be enabled for you as you are under 18 years of age.');
    } else {
      setAgeWarning('');
    }

    setDobError('');
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handleImagePicker = async () => {
    try {
      // Check permission on Android
      if (Platform.OS === 'android') {
        openImagePicker();
        return
        let permissionStatus = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        // const permissionStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        console.log('permissionStatus', permissionStatus)
        if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission granted, proceed with image picking
          openImagePicker();
        } else {
          // Request permission
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            openImagePicker();
          } else {
            showPermissionAlert();
          }
        }
      } else if (Platform.OS === 'ios') {
        // Check permission on iOS
        let permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        console.log('permissionStatus=>', permissionStatus)

        if (permissionStatus === RESULTS.GRANTED || permissionStatus === RESULTS.LIMITED) {
          // Permission granted, proceed with image picking
          openImagePicker();
        } else {
          // Request permission
          const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
          if (granted === RESULTS.GRANTED) {
            openImagePicker();
          } else {
            showPermissionAlert();
          }
        }
      }
    } catch (error) {
      console.log('Permission check error:', error);
    }
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        handleFileUpload(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const showPermissionAlert = () => {
    Alert.alert(
      'Permission Denied',
      'You need to grant permission to access your photo library. Would you like to go to settings and enable it?',
      [
        { text: 'Cancel', onPress: () => console.log('Permission denied') },
        { text: 'Go to Settings', onPress: () => openSettings() },
      ]
    );
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:'); // Opens app settings on iOS
    } else {
      Linking.openSettings();  // Opens app settings on Android
    }
  };

  const handleFileUpload = async file => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append('folderName', 'profile');
      formdata.append('file', {
        uri: file.path || file.uri,
        name: file.filename || `file-${Date.now()}`,
        type: file.mime || 'image/jpeg', // Adjust mime type according to the selected file
      });

      const response = await axios.post(
        'https://prod.indiasportshub.com/images/upload',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accessToken: token,
          },
        },
      );

      const imageUrl = response?.data?.imageUrl;

      setIsLoading(false);
      updateUserData(imageUrl);
    } catch (error) {
      Alert.alert('Upload Error', 'Failed to upload file. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUserName(userData?.username);
    }, 500);

    return () => clearTimeout(handler);
  }, [userData?.username]);

  useEffect(() => {
    const getUserName = async () => {
      if (!debouncedUserName.trim()) {
        setSuggestions(false)
        return;
      }
      const token = await AsyncStorage.getItem('userToken');
      try {
        let res = await axios({
          method: "GET",
          url: `https://prod.indiasportshub.com/users?criteria=${debouncedUserName}&field=username`,
          headers: {
            'Content-Type': 'multipart/form-data',
            accessToken: token,
          },
        });
        if (res?.data && res?.data?.data && res?.data?.data?.length == 0) {
          setSuggestions(true);
        } else {
          setSuggestions(false);
        }
      } catch (e) {
        setSuggestions(null);
        console.log(e, 'Error fetching username suggestions');
      }
    };

    getUserName();
  }, [debouncedUserName]);


  const updateUserData = async imageUrl => {
    let userId = await AsyncStorage.getItem('userId');
    let data = imageUrl
      ? {
        image: imageUrl,
      }
      : {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        age: userData?.age,
        email: userData?.email,
        gender: userData?.gender,
        phoneNumber: userData?.phoneNumber,
        username: userData?.username
      };
      
      try {
      let res = await axios({
        method: 'PUT',
        url: `https://prod.indiasportshub.com/users/${userId}`,
        data,
      });

      setUserData(res?.data?.existing);
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
        url: `https://prod.indiasportshub.com/users/${userId}`,
      });

      setUserData(res?.data?.existing);
      setUserName(res?.data?.existing?.username)
      setIsLoading(false);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const capitalizeFirstLetter = string => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderPremiumContainer = () => {
    const isPremiumUser = userData.isPremiumUser;

    const date = moment(userData?.subscriptionDetails?.endDate).format(
      'YYYY-MM-DD',
    );
    const text = isPremiumUser
      ? `Premium User Expires on ${date}`
      : 'Upgrade to Premium in just - 99₹';

    const performAction = () => {
      if (isPremiumUser) {
        onToggleSnackBar();
      } else {
        navigation.navigate('plans');
      }
    };
    return (
      <>
        {
          !isPremiumUser && <TouchableOpacity
            style={[
              styles.premiumContainer,
              isPremiumUser ? {} : { backgroundColor: COLORS.primary },
            ]}
            onPress={performAction}>
            <View style={styles.premiumSection}>
              <Image
                source={require('../../assets/icons/premium-icon.png')}
                style={styles.badgeIcon}
              />
              <Text
                style={[
                  styles.premiumText,
                  isPremiumUser ? {} : { color: COLORS.white },
                ]}>
                {text}
              </Text>
            </View>
          </TouchableOpacity>
        }
      </>
    );
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView>
        {!isLoading ? (
          <>
            <BackHeader />
            <View style={styles.profileContainer}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  {userData?.image ? <Image
                    source={{ uri: userData?.image }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  /> :
                    <User width={dynamicSize(40)} height={dynamicSize(40)} />
                  }

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
                    {userData?.isPremiumUser && (
                      <Image
                        source={require('../../assets/icons/checkmark.png')}
                        style={styles.checkmarkIcon}
                      />
                    )}
                  </View>
                  <Text style={styles.emailAddress}>{userData?.username}</Text>
                </View>
              </View>
              {renderPremiumContainer()}
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
                    autoCapitalize="none"
                    placeholder='Enter your full name'
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
                  DOB:
                </Text>
                {editing ? (
                  <>
                    <TextInput
                      autoCapitalize="none"
                      placeholder='DD-MM-YYYY'
                      style={{
                        borderWidth: 0.5,
                        width: '80%',
                        borderRadius: 5,
                        padding: 5,
                        marginLeft: 10,
                        color: COLORS.black,
                      }}
                      onChangeText={(text) => {
                        setUserData({ ...userData, age: text });
                        validateDOB(text);
                      }}
                      defaultValue={userData?.age}
                      value={userData?.age}
                    />
                  </>) : (
                  <Text style={styles.navigationItemText}>{userData?.age}</Text>
                )}
              </View>
              <View style={{ flexDirection: "column", textAlign: 'center' }}>
                {dobError ? <Text style={{ color: 'red', textAlign: 'center' }}>{dobError}</Text> : null}
                {ageWarning ? <Text style={{ color: 'orange', textAlign: 'center' }}>{ageWarning}</Text> : null}
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
                      setUserData({ ...userData, gender: value })
                    }
                    value={userData?.gender}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="male" color={COLORS.primary} />
                        <Text style={{ color: COLORS.black }}>Male</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="female" color={COLORS.primary} />
                        <Text style={{ color: COLORS.black }}>Female</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="others" color={COLORS.primary} />
                        <Text style={{ color: COLORS.black }}>Other</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                ) : (
                  <Text style={styles.navigationItemText}>
                    {capitalizeFirstLetter(userData?.gender)}
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
                {
                  editing ? <TextInput
                    autoCapitalize="none"
                    phoneNumber={"Enter your email"}
                    style={{
                      borderWidth: 0.5,
                      width: '80%',
                      borderRadius: 5,
                      padding: 5,
                      marginLeft: 10,
                      color: COLORS.black,
                    }}
                    onChangeText={text => setUserData({ ...userData, email: text })}
                    value={userData?.email}
                  /> : <Text style={styles.navigationItemText}>{userData?.email}</Text>
                }
              </View>

              <View style={styles.navigationItem}>
                <Text
                  style={{
                    ...styles.navigationItemText,
                    color: COLORS.light_gray,
                  }}>
                  Phone Number:
                </Text>
                {editing ? <TextInput
                  placeholder='Enter your phone number'
                  autoCapitalize="none"
                  style={{
                    borderWidth: 0.5,
                    width: '50%',
                    borderRadius: 5,
                    padding: 5,
                    marginLeft: 10,
                    color: COLORS.black,
                  }}
                  onChangeText={text => setUserData({ ...userData, ["phoneNumber"]: text })}
                  value={userData?.phoneNumber}
                /> : <Text style={styles.navigationItemText}>
                  {userData?.phoneNumber}
                </Text>}
              </View>

              <View style={styles.navigationItem}>
                <Text
                  style={{
                    ...styles.navigationItemText,
                    color: COLORS.light_gray,
                  }}>
                  Username:
                </Text>
                {editing ? <TextInput
                  placeholder='Type username'
                  autoCapitalize="none"
                  style={{
                    borderWidth: 0.5,
                    width: '50%',
                    borderRadius: 5,
                    padding: 5,
                    marginLeft: 10,
                    color: COLORS.black,
                  }}
                  onChangeText={text => setUserData({ ...userData, ["username"]: text })}
                  value={userData?.username}
                /> : <Text style={styles.navigationItemText}>
                  {userData?.username}
                </Text>}
              </View>
              <View>
                {editing && suggestions && <Text style={{ color: "green", textAlign: "center" }}>{userData?.username} is available!</Text>}
                {editing && suggestions == false && debouncedUserName != userName && <Text style={{ color: "red", textAlign: "center" }}>{userData?.username} is not available!</Text>}

              </View>
              {editing ? (
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {!(suggestions == false && debouncedUserName != userName) && !dobError && <TouchableOpacity
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
                    <Text style={{ color: COLORS.white, fontSize: 14 }}>Save</Text>
                  </TouchableOpacity>}
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
                    onPress={() => {
                      setEditing(!editing)
                      getUserData()
                    }}>
                    <Text style={{ color: COLORS.black, fontSize: 14 }}>
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
                  <Text style={{ color: COLORS.white, fontSize: 14 }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={() => navigation.navigate('settings')}>
              <View style={styles.settingSection}>
                <Image
                  source={require('../../assets/icons/settingIcon.png')}
                  style={styles.referIcon}
                />
                <Text style={styles.referText}>Settings</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <PreLoader />
        )}

        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          You are already on a premium plan.
        </Snackbar>
      </ScrollView>
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
    justifyContent: "center",
    alignItems: "center"
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
