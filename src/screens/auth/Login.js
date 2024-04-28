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
import {Form, Formik} from 'formik';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';
import OtpPopup from '../../components/Popup/OtpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {sendOtpRequest} from '../../redux/actions/authActions';
import * as yup from 'yup';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOtp = (values) => {
    setPhoneNumber(values.phoneNo)
    dispatch(sendOtpRequest(values.phoneNo));
    setModalVisible(true);
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
                  formikProps.values.phoneNo && formikProps.values.phoneNo.length <= 10 ? { opacity: 1 } : null,
                ]}
                // disabled={!loading}
              >
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
