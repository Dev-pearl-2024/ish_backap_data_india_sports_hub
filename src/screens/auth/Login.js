import React, {useState, useEffect} from 'react';
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
  KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Formik} from 'formik';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';
import OtpPopup from '../../components/Popup/OtpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {sendOtpRequest} from '../../redux/actions/authActions';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('window');

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading);
  const navigation = useNavigation();
  const optMessage = useSelector(state => state.auth?.successMessage?.message);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpTemp, setOtpTemp] = useState(null);
  // useEffect(() => {
  //   if (optMessage) {
  //     const tempOtp = optMessage?.match(/\d+/)[0];
  //     setOtpTemp(tempOtp);
  //   }
  // }, [optMessage, otpTemp]);

  const handleSendOtp = values => {
    setPhoneNumber(values.phoneNo);
    dispatch(sendOtpRequest(values.phoneNo));
    setModalVisible(true);
  };
  const authState = useSelector(state => state.auth);
  const successMessage = authState.data;
  useEffect(() => {
    handleNav();
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
    BackHandler.exitApp();
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
        <Text style={styles.text_header}>
          Enter your mobile number for Login
        </Text>
        <Formik
          initialValues={{
            phoneNo: '',
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
          })}
          onSubmit={handleSendOtp}>
          {formikProps => (
            <>
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
              <Text style={styles.errorText}>
                {' '}
                {formikProps.touched.phoneNo && formikProps.errors.phoneNo}
              </Text>

              <TouchableOpacity
                onPress={formikProps.handleSubmit}
                style={[
                  styles.continueBtn,
                  formikProps.values.phoneNo &&
                  formikProps.values.phoneNo.length === 10
                    ? {opacity: 1}
                    : {opacity: 0.5},
                ]}
                disabled={
                  !(
                    formikProps.values.phoneNo &&
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
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 33.36,
  },
  textInput: {
    marginTop:  12,
    paddingLeft: 10,
    color: '#05375a',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 8,
    height:50
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
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    color: '#ffffff',
  },
});
