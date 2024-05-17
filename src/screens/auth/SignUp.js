import React, {useEffect, useState} from 'react';
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
  ScrollView,
  BackHandler,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  userCreationRequest,
  userNameRequest,
} from '../../redux/actions/userActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading);
  const authState = useSelector(state => state.auth);
  const [userNameData, setUserNameData] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userId, setUserId] = useState('');
  const [suggest, setSuggest] = useState([]);
  const authStateData = authState;
  const datafrom = useSelector(state => state.user);

  const handleFormSubmit = (values, {setSubmitting}) => {
    setSubmitting(true);

    const additionalData = {
      firstName: values?.fullName.split(' ')[0],
      lastName: values?.fullName.split(' ')[1],
      userId: userId || authStateData?.data?.data?._id,
    };
    values.age = parseInt(values.age);
    const formData = {...values, ...additionalData};
    console.log(formData, 'formData from signup ----------------');
    dispatch(userCreationRequest(formData));
    setSubmitting(false);
    storeData(values?.fullName.split(' ')[0]);
    navigation.navigate('Home');
  };
  const storeData = async data => {
    try {
      await AsyncStorage.setItem('firstName', data);
    } catch (e) {}
  };
  const getUserId = async () => {
    let res = await AsyncStorage.getItem('userId');
    setUserId(res);
  };
  useEffect(() => {
    getUserId();
  }, []);
  const getUserName = async () => {
    try {
      let res = await axios({
        method: 'POST',
        url: 'http://15.206.246.81:3000/users/suggestions/username',
        data: {
          username: firstName || userNameData,
        },
      });
      setSuggest(res.data.data);
    } catch (e) {
      console.log(e, 'error in suggest user name`');
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
        fullName: yup.string().required('Name is required'),
        age: yup.number().integer().required('Age is required'),
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
            // onChangeText={formikProps.handleChange('fullName')}
            onBlur={formikProps.handleBlur('fullName')}
            value={firstName || formikProps.values.fullName}
            onChangeText={value => {
              formikProps.handleChange('fullName')(value);
              setFirstName(value?.split(' ')[0]);
              if (firstName?.length >= 3) {
                getUserName();
              }
            }}
          />
          <Text style={styles.error}>
            {formikProps.touched.fullName && formikProps.errors.fullName}
          </Text>

          <TextInput
            placeholder="Age"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={formikProps.handleChange('age')}
            onBlur={formikProps.handleBlur('age')}
            value={formikProps.values.age}
            keyboardType="numeric"
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
            value={userNameData || formikProps.values.username}
            onChangeText={value => {
              formikProps.handleChange('username');
              setUserNameData(value);
              if (userNameData?.length >= 3) {
                getUserName();
              }
            }}
          />
          {suggest?.length > 0 && (
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 8,
                marginTop: 10,
                flexDirection: 'row',
                gap: 15,
                flexWrap: 'wrap',
              }}>
              {suggest?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    formikProps.setFieldValue('username', item);
                    setUserNameData(item);
                  }}
                  key={index}>
                  <Text
                    style={{
                      color: COLORS.primary,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

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
