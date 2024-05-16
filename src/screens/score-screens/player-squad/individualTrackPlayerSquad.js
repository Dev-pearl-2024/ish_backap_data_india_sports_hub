import {Image, Text, View} from 'react-native';
import Dropdown from '../../../components/dropdown/Dropdown';
import COLORS from '../../../constants/Colors';

export default function IndividualTrackPlayerSquad() {
  return (
    <View style={{backgroundColor: COLORS.white,paddingTop:16}}>
      <View style={{paddingHorizontal: 16}}>
        <Dropdown
          placeholder="All Teams"
          data={[
            {label: 'Team 1', value: '1'},
            {label: 'Team 2', value: '2'},
            {label: 'Team 3', value: '1'},
          ]}
        />
      </View>
      <View style={{padding: 16, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image
              source={require('../../../assets/images/profileImg.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
            />
            <Text style={{color: COLORS.black, fontSize: 14}}>Player Name</Text>
          </View>
          <Text style={{color: COLORS.black, fontSize: 14}}>Country</Text>
        </View>
      </View>
    </View>
  );
}
