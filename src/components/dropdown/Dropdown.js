import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal} from 'react-native';
import COLORS from '../../constants/Colors';
import DownwardIcon from '../../assets/icons/downArrow.svg';

const Dropdown = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectSports, setSelectSports] = useState(props.placeholder);
  const [value, setValue] = useState('');

  const data = [
    {label: 'Tennis', value: '1'},
    {label: 'Wrestling', value: '2'},
    {label: 'Sailing', value: '3'},
    {label: 'Swimming', value: '4'},
    {label: 'Judo', value: '5'},
    {label: 'Shooting', value: '6'},
    {label: 'Golf', value: '7'},
    {label: 'Fencing', value: '8'},
    {label: 'Gymnastic', value: '9'},
  ];

  const toggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.placeholderText}>{selectSports}</Text>
        <DownwardIcon />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpened}
        onRequestClose={() => setIsOpened(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000aa',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            onPressOut={() => {
              setIsOpened(false);
            }}
            style={styles.dropdownSelector}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={item.value}
                style={styles.item}
                onPress={() => {
                  setSelectSports(item.label);
                  setValue(item.value);
                  setIsOpened(false);
                }}
                accessibilityLabel={`Select ${item.label}`}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.light_gray,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 5,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    alignSelf: 'center',
  },
  dropdownSelector: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  placeholderText:{
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.light_gray,
  }
});
