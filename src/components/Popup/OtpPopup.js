import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';

const OtpPopup = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();

  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000aa',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            setModalVisible(false);
          }}>
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
                Enter the OTP sent on your mobile number - 9999XXXX89
              </Text>

              <View style={styles.otpContainer}>
                {[1, 2, 3, 4, 5, 6].map((digit, index) => (
                  <TextInput
                    fontSize={35}
                    fontWeight="700"
                    key={index}
                    // ref={ref => (otpInputs.current[index] = ref)}
                    style={[styles.otpInput]}
                    selectionColor={COLORS.black}
                    keyboardType="numeric"
                    maxLength={1}
                    // onChangeText={text => {
                    //   setInvalidOTP(false);
                    //   handleOtpInputChange(text, index);
                    // }}
                    onKeyPress={e => handleKeyPress(e, index)}
                    // value={digit}
                  />
                ))}
              </View>
            </View>
            <View style={styles.resendView}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>
                Didn't get code?
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: COLORS.primary,
                }}>
                Resend
              </Text>
            </View>
            <View></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={[styles.submitButton]}>
              <Text style={styles.btnText}>Submit</Text>
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
