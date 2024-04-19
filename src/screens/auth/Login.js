import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';
import OtpPopup from '../../components/Popup/OtpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {sendOtpRequest} from '../../redux/actions/authActions';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOtp = () => {
    dispatch(sendOtpRequest(phoneNumber));
    setModalVisible(true);
  };

  const handleChangePhoneNumber = text => {
    const formattedValue = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedValue);
  };

  const validateMobileNumber = () => {
    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Mobile number is required');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };
  const handleContinue = () => {
    if (validateMobileNumber()) {
      handleSendOtp();
    }
  };
  const isContinueButtonEnabled = () => {
    return !loading && phoneNumber.trim() !== '' && phoneNumberError === '';
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#D9D9D9" barStyle="light-content" />
      <View style={styles.header}>
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

        <TextInput
          placeholder="Mobile No"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          onChangeText={handleChangePhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {phoneNumberError ? (
          <Text style={styles.errorText}>{phoneNumberError}</Text>
        ) : null}
        <TouchableOpacity
          onPress={handleContinue}
          style={[
            styles.continueBtn,
            !isContinueButtonEnabled() && {opacity: 0.5},
          ]}
          disabled={!isContinueButtonEnabled()}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={styles.btnText}>Continue</Text>
          )}
        </TouchableOpacity>
      </Animatable.View>

      {modalVisible ? (
        <OtpPopup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          phoneNumber={phoneNumber}
        />
      ) : null}
    </View>
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
    marginTop: Platform.OS === 'ios' ? 0 : 12,
    paddingLeft: 10,
    color: '#05375a',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 8,
  },

  continueBtn: {
    marginTop: 48,
    height: 52,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
