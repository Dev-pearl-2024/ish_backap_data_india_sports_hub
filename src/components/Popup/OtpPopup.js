import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  verifyOtpRequest,
  sendOtpRequest,
} from '../../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Image} from 'react-native-svg';
const OtpPopup = ({modalVisible, setModalVisible, phoneNumber, otpTemp}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(state => state.auth.isLoading);
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);
  const [resendTimer, setResendTimer] = useState(60);
  const authState = useSelector(state => state.auth);
  const successMessage = authState.data;
  const userState = useSelector(state => state.user);
  const userData = userState.data;

  useEffect(() => {
    if (otpTemp) {
      setTimeout(() => {
        Alert.alert(`Please enter this OTP: ${otpTemp}`);
      }, 2000);
    }
  }, [otpTemp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index, value) => {
    const newOtp = [...enteredOtp];
    console.log(value, 'value --- ');
    if (value === 'Backspace') {
      newOtp[index] = '';
      setEnteredOtp(newOtp);
      if (index > 0) {
        otpInputs.current[index - 1].focus();
      }
      return;
    }
    if (/^\d$/.test(value)) {
      newOtp[index] = value;
      setEnteredOtp(newOtp);
      if (index < enteredOtp.length - 1) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    const otp = enteredOtp.join('');
    dispatch(verifyOtpRequest({otp, phoneNumber}));
  };
  const storeData = async (value, name, userid) => {
    try {
      await AsyncStorage.setItem('userToken', value);
      await AsyncStorage.setItem('userId', userid);
      if (name !== null) {
        await AsyncStorage.setItem('firstName', name);
      } else {
        await AsyncStorage.setItem('firstName', '');
      }
    } catch (e) {}
  };
  useEffect(() => {
    checkNavigate();
  }, [successMessage, userData]);
  const checkNavigate = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        if (successMessage?.message === 'Otp Verified Successfully.') {
          
          storeData(
            successMessage?.data?.accessToken,
            successMessage?.data?.firstName || userData?.firstName,
            successMessage?.data?._id,
          );
          if (successMessage?.data?.firstName === null) {
            navigation.navigate('SignUp');
          } else {
            navigation.navigate('Home');
          }
          setModalVisible(false);
        } else if (successMessage?.message == 'Invalid OTP') {
          Alert.alert('Invalid OTP');
        }
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };
  const handleResendOtp = () => {
    if (resendTimer === 0) {
      dispatch(sendOtpRequest(phoneNumber));
      setResendTimer(60);
    } else {
      setModalVisible(true);
    }
  };
  const isOtpFilled = enteredOtp.every(digit => digit !== '');

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000aa',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback>
          <View
            style={styles.modalContainer}
            onPressOut={() => {
              setModalVisible(false);
            }}>
            <View style={{width: 20, alignSelf: 'flex-end', marginBottom: 20}}>
              <TouchableOpacity
                onPressOut={() => {
                  setModalVisible(false);
                }}>
                <Image
                  style={styles.referIcon2}
                  source={require('../../assets/icons/close.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.text}>
                Enter the OTP sent on your mobile number - {phoneNumber}
              </Text>
              {/* <Text>hello</Text> */}
              <View style={styles.otpContainer}>
                {enteredOtp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => (otpInputs.current[index] = ref)}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    // onChangeText={
                    //   value => handleOtpChangeNew(index, value)}
                    onKeyPress={({nativeEvent}) => {
                      nativeEvent.key === 'Backspace'
                        ? handleOtpChange(index, nativeEvent.key)
                        : handleOtpChange(index, nativeEvent.key);
                    }}
                    // onKeyPress={e => handleKeyPress(e, index)}
                    value={digit}
                  />
                ))}
              </View>
              <View>
                {resendTimer > 0 && (
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 5,
                      color: 'red',
                    }}>
                    Ends in : {`${resendTimer} sec`}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.resendView}>
              <Text
                style={{fontSize: 16, fontWeight: '400', color: COLORS.black}}>
                Didn't get code?
              </Text>
              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={resendTimer > 0}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: COLORS.primary,
                    opacity: resendTimer > 0 ? 0.5 : 1,
                  }}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleOtpSubmit}
              style={[styles.submitButton, {opacity: isOtpFilled ? 1 : 0.5}]}
              disabled={!isOtpFilled || loading}>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text style={styles.btnText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default OtpPopup;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    width: '95%',
    height: 'auto',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
    color: '#000000',
  },
  referIcon2: {
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginVertical: 10,
    fontSize: 18,
  },
  otpContainer: {
    marginTop: 24,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 5,
    padding: 10,
    width: 50,
    marginHorizontal: 5,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#FCFCFC',
    color: COLORS.black,
  },
  resendView: {
    flexDirection: 'row',
    width: '80%',
    // backgroundColor: 'red',
    marginTop: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  submitButton: {
    marginTop: 24,
    height: 52,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    color: '#ffffff',
  },
});
