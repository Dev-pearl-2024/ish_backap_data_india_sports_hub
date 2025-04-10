import React, { useState } from 'react';
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

const ReferralCodeModal = ({ modalVisible, setModalVisible, payment }) => {
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handleReferralCodeSubmit = async () => {
    
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

    await AsyncStorage.setItem('referralCode', referralCode);
    setModalVisible(false);
    setReferralCode('')
    // payment()
  };

  const handleSkip = () => {
    setModalVisible(false);
    setReferralCode('')
    // payment();
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
            <Text style={styles.modalTitle}>Referral Code</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.dark_gray}
              placeholder="Enter referral code"
              value={referralCode}
              onChangeText={text => setReferralCode(text)}
            />
            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
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
    color: COLORS.primary
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    color: COLORS.dark_gray
  },
  submitButton: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  skipBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  btnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold'
  },
});
