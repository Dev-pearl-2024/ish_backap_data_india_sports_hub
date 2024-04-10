import {StyleSheet, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function AboutAchievement() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <Text style={styles.contentText}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable.
      </Text>
      <Text style={styles.subtitle}>
        dummy text of the printing and typesetting industry.
      </Text>
      <Text style={styles.contentText}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  contentText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.black,
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    marginVertical: 5,
  },
});
