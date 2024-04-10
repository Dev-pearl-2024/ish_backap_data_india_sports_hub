import {Image, StyleSheet, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function AthleteProfileCard({profileImage, name, achievements}) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profileImage}
          source={{
            uri: profileImage,
          }}
        />
        <Text style={styles.profileText}>{name}</Text>
      </View>
      <View>
        {achievements.map((achievement, id) => {
          return (
            <Text key={`achievement${id}`} style={styles.detailText}>
              {achievement}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 16,
    borderRadius:12
  },
  profileImage: {
    width: 90,
    height: 90,
    objectFit: 'cover',
    borderRadius: 90 / 2,
  },
  profileText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 8,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.black,
    marginVertical:3
  },
});
