import React, {useState} from 'react';
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
} from 'react-native';
import COLORS from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ReferralCodeModal = ({modalVisible, setModalVisible}) => {
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handleReferralCodeSubmit = async () => {
    // Here you can perform validation or additional checks on the referral code
    if (referralCode.trim() === '') {
      Alert.alert('Please enter a referral code.');
      return;
    }
    let userId = await AsyncStorage.getItem('userId');

    setLoading(true);
    const response = await axios({
      method: 'POST',
      url: `https://prod.indiasportshub.com/users/use-referral-code/${userId}/${referralCode}`,
    });
    setLoading(false);

    if (response?.data?.data && response?.data?.data?.isInvalid) {
      Alert.alert('Something went wrong', response?.data?.data?.text);
      return;
    }

    setModalVisible(false);
  };

  const handleSkip = () => {
    setModalVisible(false); 
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Enter Referral Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter referral code"
              value={referralCode}
              onChangeText={text => setReferralCode(text)}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleReferralCodeSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <Text style={styles.btnText}>Submit</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReferralCodeModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipText: {
    fontSize: 16,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});
