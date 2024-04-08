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
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import COLORS from '../../constants/Colors';
import BlueLogo from '../../assets/icons/BlueLogo.svg';

const SignUp = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleRadioButtonPress = value => {
    setSelectedValue(value);
    // You can add your custom logic here based on the selected value
    switch (value) {
      case 'option1':
        // Execute actions for Option 1
        console.log('Option 1 selected');
        break;
      case 'option2':
        // Execute actions for Option 2
        console.log('Option 2 selected');
        break;
      case 'option3':
        // Execute actions for Option 3
        console.log('Option 3 selected');
        break;
      default:
        break;
    }
  };

  return (
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
      />

      <TextInput
        placeholder="Age"
        placeholderTextColor="#666666"
        style={[styles.textInput]}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email Id"
        placeholderTextColor="#666666"
        style={[styles.textInput]}
        autoCapitalize="none"
      />

      <View style={styles.genderView}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text>Gender</Text>

          <RadioButton.Group
            onValueChange={value => handleRadioButtonPress(value)}
            value={selectedValue}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="option1" color={COLORS.primary} />
                <Text>Male</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="option2" color={COLORS.primary} />
                <Text>Female</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="option3" color={COLORS.primary} />
                <Text>Other</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>

      <TextInput
        placeholder="User Name"
        placeholderTextColor="#666666"
        style={[styles.textInput]}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={[styles.continueBtn]}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
    </View>
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
});
