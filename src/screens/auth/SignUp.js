import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';
import {useDispatch, useSelector} from 'react-redux';
import {userCreationRequest} from '../../redux/actions/userActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading);
  const authState = useSelector(state => state.auth);

  const authStateData = authState;
  console.log(authState,'auth data')
  const handleFormSubmit = (values, {setSubmitting}) => {
    setSubmitting(true);

    const additionalData = {
      phoneNumber: authStateData?.data?.data?.phoneNumber,
      firstName: values?.fullName.split(' ')[0],
      lastName: values?.fullName.split(' ')[1],
    };
    values.age = parseInt(values.age);
    const formData = {...values, ...additionalData};
    dispatch(userCreationRequest(formData));
    setSubmitting(false);
    navigation.navigate('Home');
  };
  return (
    <Formik
      initialValues={{
        firstName: authStateData?.data?.data?.firstName || '',
        fullName:
          authStateData?.data?.data?.firstName +
            authStateData?.data?.data?.lastName || '',
        lastName: authStateData?.data?.data?.lastName || '',
        age: authStateData?.data?.data?.age || '',
        email: authStateData?.data?.data?.email || '',
        gender: authStateData?.data?.data?.gender || '',
        username: authStateData?.data?.data?.username || '',
      }}
      validationSchema={yup.object().shape({
        fullName: yup.string().required('First name is required'),
        age: yup.string().required('Age is required'),
        email: yup
          .string()
          .email('Invalid email format')
          .required('Email is required'),
        gender: yup.string().required('Gender is required'),
        username: yup.string().required('Username is required'),
      })}
      onSubmit={handleFormSubmit}>
      {formikProps => (
        <View style={styles.container}>
          <StatusBar backgroundColor="#D9D9D9" barStyle="light-content" />
          <View style={styles.header}>
            <BlueLogo />
          </View>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={formikProps.handleChange('fullName')}
            onBlur={formikProps.handleBlur('fullName')}
            value={formikProps.values.fullName}
          />
          <Text style={styles.error}>
            {formikProps.touched.firstName && formikProps.errors.firstName}
          </Text>

          <TextInput
            placeholder="Age"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={formikProps.handleChange('age')}
            onBlur={formikProps.handleBlur('age')}
            value={formikProps.values.age}
          />
          <Text style={styles.error}>
            {formikProps.touched.age && formikProps.errors.age}
          </Text>
          <TextInput
            placeholder="Email Id"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={formikProps.handleChange('email')}
            onBlur={formikProps.handleBlur('email')}
            value={formikProps.values.email}
          />
          <Text style={styles.error}>
            {formikProps.touched.email && formikProps.errors.email}
          </Text>

          <View style={styles.genderView}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text>Gender</Text>

              <RadioButton.Group
                onValueChange={formikProps.handleChange('gender')}
                value={formikProps.values.gender}>
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
            </View>
          </View>
          <Text style={styles.error}>
            {formikProps.touched.gender && formikProps.errors.gender}
          </Text>

          <TextInput
            placeholder="User Name"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            value={formikProps.values.username}
            onChangeText={formikProps.handleChange('username')}
          />
          <Text style={styles.error}>
            {formikProps.touched.username && formikProps.errors.username}
          </Text>
          <TouchableOpacity
            onPress={formikProps.handleSubmit}
            style={[styles.continueBtn]}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text style={styles.btnText}>SignUp</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    marginTop: 48,
    marginBottom: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : 12,
    width: '90%',
    alignSelf: 'center',
    paddingLeft: 10,
    color: '#05375a',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 8,
  },
  genderView: {
    marginTop: Platform.OS === 'ios' ? 0 : 12,
    width: '90%',
    alignSelf: 'center',
  },

  continueBtn: {
    marginTop: 48,
    width: '90%',
    alignSelf: 'center',
    height: 52,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  error: {
    color: 'red',
    marginLeft: 20,
  },
});
