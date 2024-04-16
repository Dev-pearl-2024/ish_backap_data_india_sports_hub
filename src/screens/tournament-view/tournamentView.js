import {Image, StyleSheet, Text, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import RadioButton from '../../components/RadioButton';
import Dropdown from '../../components/dropdown/Dropdown';
const profileImage =
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
export default function TournamentView() {
  return (
    <View>
      <BackHeader />
      <Text style={styles.titleFont}>TOURNAMENTS</Text>
      <View style={styles.contentBox}>
        <View style={styles.flex}>
          <Image
            style={styles.profileImage}
            source={{
              uri: profileImage,
            }}
          />
          <Text style={styles.boldText}>SUMMER OLYMPICS</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 50, marginTop: 20}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <RadioButton selected={true} />
            <Text style={styles.radioButtonText}>2024</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <RadioButton selected={true} />
            <Text>Previous Editions</Text>
          </View>
        </View>
      </View>
      <View style={styles.timerContainer}>
        <Text>27/Feb/2024 To 10/Mar/2024</Text>
        <View style={styles.timer}>
          <Text>02 : 18 : 38 : 12</Text>
        </View>
      </View>
      <View style={{backgroundColor: 'white', marginTop: 10}}>
        <Dropdown placeholder="All Sports" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleFont: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  contentBox: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 10,
  },
  profileImage: {
    width: 36,
    height: 36,
    objectFit: 'cover',
    borderRadius: 90 / 2,
  },
  boldText: {
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.black,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioButtonText: {
    color: COLORS.black,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timer: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
});
