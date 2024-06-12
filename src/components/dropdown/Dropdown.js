import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import COLORS from '../../constants/Colors';
import DownwardIcon from '../../assets/icons/downArrow.svg';
const height = Dimensions.get('window').height;
const Dropdown = props => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectSports, setSelectSports] = useState(props.placeholder);
  const [value, setValue] = useState('');
  const data = [{label: 'hi', value: 'hello'}];

  const toggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  const handleSelect = item => {
    if (item === 'All') {
      setSelectSports('All');
      setValue('');
      setIsOpened(false);
      props?.getValue('');
    } else {
      setSelectSports(item.label || item.name || item);
      setValue(item.value || item.name || item);
      setIsOpened(false);
      props?.getValue(item.value || item.name || item);
    }
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
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#000000aa',
          }}>
          <View
            onPressOut={() => {
              setIsOpened(false);
            }}
            style={styles.dropdownSelector}>
            {['All', ...(props?.data || [])].map((item, index) => (
              <TouchableOpacity
                key={item?.value || item?.name || item}
                style={styles.item}
                onPress={() => {
                  handleSelect(item);
                  // setSelectSports(item?.label || item?.name || item);
                  // setValue(item?.value || item?.name || item);
                  // setIsOpened(false);
                  // props?.getValue(item?.value || item?.name || item);
                }}
                accessibilityLabel={`Select ${
                  item?.label || item?.name || item
                }`}>
                <Text style={{color: COLORS.black}}>
                  {item?.label || item?.name || item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.light_gray,
    overflow: 'hidden',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
    overflow: 'hidden',
  },
  item: {
    padding: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ffffff',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.light_gray,
  },
});
