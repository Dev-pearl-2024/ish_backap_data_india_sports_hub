import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Button,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  NativeModules
} from 'react-native';
import CheckBox from 'react-native-check-box'
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';
import OtpPopup from '../../components/Popup/OtpPopup';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtpOnEmailRequest, sendOtpRequest } from '../../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../../components/dropdown/Dropdown';
import CountryCodeDropdown from '../../components/dropdown/countryCodeDropdown';
import { Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import GoogleIcon from "../../assets/icons/google-icon.svg"
import { Linking } from 'react-native';
import axios from 'axios';
import { asyncStorage } from 'reactotron-react-native';
const { RNTwitterSignIn } = NativeModules
const { width, height } = Dimensions.get('window');

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading);
  const navigation = useNavigation();
  const optMessage = useSelector(state => state.auth?.successMessage?.message);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpTemp, setOtpTemp] = useState(null);
  const [acceptTermsAndCondition, setAcceptTermsAndCondition] = useState(true)
  const [countryCodeList, setCountryCodeList] = useState([])
  const [countryCode, setCountryCode] = useState('+91')
  const [isPhoneNumber, setIsPhoneNumber] = useState()

  // useEffect(() => {
  //   if (optMessage) {
  //     const tempOtp = optMessage?.match(/\d+/)[0];
  //     setOtpTemp(tempOtp);
  //   }
  // }, [optMessage, otpTemp]);

  const identifyInputType = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (emailRegex.test(input)) {
      setIsPhoneNumber(false)
      return "email";
    } else if (phoneRegex.test(input)) {
      setIsPhoneNumber(true)
      return "phone";
    } else {
      setIsPhoneNumber(false)
      return "invalid";
    }
  };

  const handleSendOtp = values => {
    if (isPhoneNumber) {
      setPhoneNumber(values.phoneNo);
      dispatch(sendOtpRequest(values.phoneNo, countryCode));
      setModalVisible(true);
    } else { // set email when user typed email
      setPhoneNumber(values.phoneNo);
      dispatch(sendOtpOnEmailRequest(values.phoneNo, "email"));
      setModalVisible(true);
    }
  };

  const getCountryCodes = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();

      const countryCodes = countries.map(country => ({
        name: country.name.common,
        countryCode: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : ''),
        flag: country.flags?.png || country.flags?.svg || ""
      }));
      setCountryCodeList(countryCodes);  // Prints country names and their country calling codes
    } catch (error) {
      console.error('Error fetching country codes:', error);
    }
  };

  const authState = useSelector(state => state.auth);
  const successMessage = authState.data;

  useEffect(() => {
    handleNav();
    getCountryCodes()
  }, []);

  const handleNav = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const name = await AsyncStorage.getItem('firstName');
      if (value !== null && name === null) {
        navigation.navigate('SignUp');
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const handleBackButton = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      BackHandler.exitApp();
      return false;
    }
  };
  const socialLogin = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: "https://prod.indiasportshub.com/users/social-login",
        data,
      })
      await AsyncStorage.setItem("userToken", res?.data?.data?.accessToken)
      await AsyncStorage.setItem("firsName", res?.data?.data?.firstName)
      await AsyncStorage.setItem("userId", res?.data?.data?._id)
      await AsyncStorage.setItem('userData', JSON.stringify(res?.data?.data));

      navigation.navigate('Home');
      console.log("login details", res.data?.data)
    } catch (error) {
      console.log("Error in Socail Login : ", error)
    }
  }

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential)
      await socialLogin(signInResult?.data?.user)

      return true
    } catch (error) {
      console.log("Error auth google signin", error)
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '136701180167-b7lgts9mdj50tesn2mjnbahi6tji3jvg.apps.googleusercontent.com',
    });
  }, [])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust for iOS
      >
        <StatusBar hidden={true} barStyle='default' animated={true} />
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                backgroundColor: '#cfe2f4',
                height: height * 0.3,
                width: width,
                position: 'absolute',
                borderBottomLeftRadius: width * 2,
                borderBottomRightRadius: width * 2,
                top: -height * 0.16,
              }}></View>
            <View
              style={{
                backgroundColor: '#e6f0f9',
                height: height * 0.3,
                width: width * 1.1,
                position: 'absolute',
                borderBottomLeftRadius: width * 2,
                borderBottomRightRadius: width * 2,
                top: -height * 0.14,
                zIndex: -1,
              }}></View>
            <BlueLogo />
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: '#ffffff',
              },
            ]}>
            <Formik
              initialValues={{
                phoneNo: '',
                countryCode: countryCode,
                acceptTermsAndCondition: acceptTermsAndCondition
              }}
              initialStatus={{
                success: false,
                successMsg: '',
              }}
              validationSchema={yup.object().shape({
                phoneNo: yup
                  .string()
                  .required('Mobile number or Email Id is required')
                  .test('valid-contact', countryCode == '+91' ? 'Please enter a valid mobile number or email id' : "Please enter a valid email id", function (value) {
                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    const isPhone = /^[\+]?[0-9\s\-\(\)]{4,15}$/im.test(value);

                    if (countryCode == '+91') {
                      return isEmail || isPhone;
                    } else {
                      if (isPhone) {
                        return this.createError({ message: 'Please enter a valid email id' });
                      }
                      return isEmail;
                    }
                  }),
                countryCode: yup.string().required("Please choose country code!")
              })}
              onSubmit={handleSendOtp}>
              {formikProps => (
                <>
                  <View style={{ marginTop: "-5%" }}>
                    <Text style={[styles.text_header, { textAlign: "center" }]}>
                      Welcome back!
                    </Text>
                    <Text style={[styles.text_header, { textAlign: "center", marginBottom: "3%" }]}>
                      Login or New Signup
                    </Text>
                    <View style={{ marginBottom: "5%" }}> 
                      <CheckBox
                        isChecked={acceptTermsAndCondition}
                        rightText={<Text style={styles.termText}>
                          <View>
                            <Text style={styles.termText}>Accept </Text>
                          </View>
                          <TouchableOpacity onPress={() => {
                            Linking.openURL("https://indiasportshub.com/terms-conditions")
                          }}>
                            <Text style={[styles.termText, { color: COLORS.primary }]}> 'T&C' </Text>
                          </TouchableOpacity>
                          <View>
                            <Text style={styles.termText}> and </Text>
                          </View>
                          <TouchableOpacity onPress={() => {
                            Linking.openURL("https://indiasportshub.com/privacy-policy")
                          }}>
                            <Text style={[styles.termText, { color: COLORS.primary }]}> 'Privacy Policy' </Text>
                          </TouchableOpacity>
                        </Text>}
                        onClick={() => setAcceptTermsAndCondition(!acceptTermsAndCondition)}
                        checkedCheckBoxColor={COLORS.primary}
                        uncheckedCheckBoxColor={'#666666'}
                      />
                    </View>
                    <Text style={{ marginBottom: "1.5%", color: COLORS.black }}>Select Your Country</Text>
                    <CountryCodeDropdown
                      placeholder="India"
                      placeholderTextColor={COLORS.black}
                      style={[styles.textInput]}
                      data={countryCodeList}
                      getValue={(val) => {
                        setCountryCode(val)
                      }}
                      onChangeText={formikProps.handleChange('countryCode')}
                      onBlur={formikProps.handleBlur('countryCode')}
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={formikProps.values.countryCode}
                    />
                    <Text style={styles.errorText}>
                      {' '}
                      {formikProps.touched.countryCode && formikProps.errors.countryCode}
                    </Text>
                    <TextInput
                      placeholder={countryCode == "+91" ? "Enter Mobile Number / Email Id" : "Enter Email Id"}
                      placeholderTextColor="#666666"
                      style={[styles.textInput]}
                      onChangeText={(text) => {
                        identifyInputType(text);
                        formikProps.setFieldValue("phoneNo", text);
                      }}
                      onBlur={formikProps.handleBlur('phoneNo')}
                      value={formikProps.values.phoneNo}
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {' '}
                    {formikProps.touched.phoneNo && formikProps.errors.phoneNo}
                  </Text>
                  <TouchableOpacity
                    onPress={formikProps.handleSubmit}
                    style={[
                      styles.continueBtn,
                      acceptTermsAndCondition && formikProps.values.phoneNo &&
                        formikProps.values.phoneNo.length >= 5
                        ? { opacity: 1 }
                        : { opacity: 0.5 },
                    ]}
                    disabled={
                      !(
                        acceptTermsAndCondition && formikProps.values.phoneNo &&
                        formikProps.values.phoneNo.length >= 5
                      )
                    }>
                    {loading ? (
                      <ActivityIndicator size="large" />
                    ) : (
                      <Text style={styles.btnText}>Continue</Text>
                    )}
                  </TouchableOpacity>
                  <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={[styles.orText, { color: COLORS.black }]}>OR</Text>
                    <View style={styles.line} />
                  </View>
                  <View >
                    <TouchableOpacity
                      style={[
                        styles.continueWithGoogleBtn,
                        acceptTermsAndCondition
                          ? { opacity: 1 }
                          : { opacity: 0.5 },
                      ]}
                      disabled={
                        !(
                          acceptTermsAndCondition
                        )
                      }
                      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                    >
                      <View style={{ position: "absolute", marginLeft: "15%" }}>
                        <GoogleIcon width={"66%"} />
                      </View>
                      <Text style={styles.btnGoogleText}>
                        Continue With Google
                      </Text>
                    </TouchableOpacity>
                    {/* <Button 
                      title="Google Sign-In"
                      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                    /> */}
                    {/* <TouchableOpacity style={styles.socialButton}>
                      <Text>Continue With Facebook</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.socialButton}>
                      <Text onPress={twitterLogin}>Continue With X</Text>
                    </TouchableOpacity> */}
                  </View>
                </>
              )}
            </Formik>
          </Animatable.View>

          {modalVisible ? (
            <OtpPopup
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              phoneNumber={phoneNumber}
              countryCode={countryCode}
              isPhoneNumber={isPhoneNumber}
              otpTemp={otpTemp}
            />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </>

  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33.36,
  },
  textInput: {
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 8,
    height: 50
  },
  continueBtn: {
    marginTop: "5%",
    height: 52,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    opacity: 0.5,
    backgroundColor: COLORS.primary,
  },
  continueWithGoogleBtn: {
    marginTop: "5%",
    height: 52,
    paddingVertical: 12,
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    opacity: 0.5,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  orContainer: { flexDirection: 'row', gap: 10, alignItems: 'center', marginVertical: 5 },
  line: { flex: 1, height: 1, backgroundColor: COLORS.black },
  socialButtons: { flexDirection: 'column', justifyContent: 'center' },
  socialButton: { marginHorizontal: 10 },
  socialIcon: { width: 40, height: 40 },
  orText: { textAlign: 'center', marginVertical: 5, fontSize: 16, fontWeight: '500' },
  errorText: {
    color: 'red',
  },
  termText: {
    color: "black",
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    color: '#ffffff',
  },
  btnGoogleText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    color: COLORS.primary,
  },
});
