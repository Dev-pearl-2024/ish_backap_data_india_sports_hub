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
  Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  verifyOtpRequest,
  sendOtpRequest,
} from '../../redux/actions/authActions';

const OtpPopup = ({modalVisible, setModalVisible, phoneNumber}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(state => state.auth.isLoading);
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);
  const [resendTimer, setResendTimer] = useState(60);
  const authState = useSelector(state => state.auth);
  const successMessage = authState.data;

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index, value) => {
    const newOtp = [...enteredOtp];

    if (value === '') {
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

  useEffect(() =>{
    if(successMessage?.message === "Otp Verified Successfully."){
      navigation.navigate("SignUp");
    } else if(successMessage?.message == "Invalid OTP"){
      console.log("chutiyappaaaaa")
      Alert.alert("Invalid OTP")
    }
  },[successMessage])
 
  const handleResendOtp = () => {
    if (resendTimer === 0) {
      console.log('Resending OTP...');
      dispatch(sendOtpRequest(phoneNumber));
      setResendTimer(60);
    } else {
      setModalVisible(true);
    }
  };
  const isOtpFilled = enteredOtp.every(digit => digit !== '');
  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
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
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.text}>
                Enter the OTP sent on your mobile number - {phoneNumber}
              </Text>

              <View style={styles.otpContainer}>
                {enteredOtp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => (otpInputs.current[index] = ref)}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={value => handleOtpChange(index, value)}
                    onKeyPress={e => handleKeyPress(e, index)}
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
              <Text style={{fontSize: 16, fontWeight: '400'}}>
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
