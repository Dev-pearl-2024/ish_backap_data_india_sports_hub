import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Linking,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Button,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import CheckBox from 'react-native-check-box'
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';
import OtpPopup from '../../components/Popup/OtpPopup';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtpRequest } from '../../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../../components/dropdown/Dropdown';
import CountryCodeDropdown from '../../components/dropdown/countryCodeDropdown';


const { width, height } = Dimensions.get('window');

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading);
  const navigation = useNavigation();
  const optMessage = useSelector(state => state.auth?.successMessage?.message);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpTemp, setOtpTemp] = useState(null);
  const [acceptTermsAndCondition, setAcceptTermsAndCondition] = useState(false)
  const [countryCodeList, setCountryCodeList] = useState([])
  const [countryCode, setCountryCode] = useState('+91')
  // useEffect(() => {
  //   if (optMessage) {
  //     const tempOtp = optMessage?.match(/\d+/)[0];
  //     setOtpTemp(tempOtp);
  //   }
  // }, [optMessage, otpTemp]);

  const handleSendOtp = values => {
    setPhoneNumber(values.phoneNo);
    dispatch(sendOtpRequest(values.phoneNo, countryCode));
    setModalVisible(true);
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <>
      {/* <StatusBar backgroundColor="#D9D9D9" barStyle="light-content" /> */}

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
            <Text style={[styles.text_header, { textAlign: "center" }]}>
              Login or registration
            </Text>
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
                  .required('Mobile number is required')
                  .matches(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                    'Must be a valid mobile no',
                  )
                  .max(10, 'Should not exceeds 13 digits')
                  .min(10, 'Must be only 9 digits'),
                countryCode: yup.string().required("Please choose country code!")
              })}
              onSubmit={handleSendOtp}>
              {formikProps => (
                <>
                  <View style={{ marginTop: "4%" }}>
                    <CountryCodeDropdown
                      placeholder="Choose country code"
                      placeholderTextColor="+91 ( India )"
                      style={[styles.textInput]}
                      data={countryCodeList}
                      getValue={(val) => {
                        console.log("setted value", val)
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
                      placeholder="Mobile No"
                      placeholderTextColor="#666666"
                      style={[styles.textInput]}
                      onChangeText={formikProps.handleChange('phoneNo')}
                      onBlur={formikProps.handleBlur('phoneNo')}
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={formikProps.values.phoneNo}
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {' '}
                    {formikProps.touched.phoneNo && formikProps.errors.phoneNo}
                  </Text>
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
                  <TouchableOpacity
                    onPress={formikProps.handleSubmit}
                    style={[
                      styles.continueBtn,
                      acceptTermsAndCondition && formikProps.values.phoneNo &&
                        formikProps.values.phoneNo.length === 10
                        ? { opacity: 1 }
                        : { opacity: 0.5 },
                    ]}
                    disabled={
                      !(
                        acceptTermsAndCondition && formikProps.values.phoneNo &&
                        formikProps.values.phoneNo.length === 10
                      )
                    }>
                    {loading ? (
                      <ActivityIndicator size="large" />
                    ) : (
                      <Text style={styles.btnText}>Continue</Text>
                    )}
                  </TouchableOpacity>
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
    marginTop: 48,
    height: 52,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    opacity: 0.5,
    backgroundColor: COLORS.primary,
  },
  errorText: {
    color: 'red',
  },
  termText: {
    color: "black"
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    color: '#ffffff',
  },
});
