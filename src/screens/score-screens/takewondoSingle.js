import {Image} from 'react-native';
import {Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function TakewondoSingle() {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center', gap: 5, position: 'relative'}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: COLORS.red,
            width: 10,
            height: 10,
            borderRadius: 50,
          }}
        />
        <Image
          source={require('../../assets/images/athelete.png')}
          style={{
            width: 40,
            height: 40,
          }}
        />

        <Text style={{color: COLORS.black, fontSize: 12, fontWeight: 400}}>
          Player Name
        </Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Image
            source={require('../../assets/images/india.png')}
            style={{width: 22, height: 22}}
          />
          <Text style={{color: COLORS.black, fontSize: 12, fontWeight: 400}}>
            India
          </Text>
        </View>
      </View>
      <View style={{position: 'relative',alignItems:"center"}}>
        <View
          style={{
            width: 20,
            height: 2,
            backgroundColor: '#0166C2',
            position: 'absolute',
            transform: [{rotate: '110deg'}],
            bottom:35,
            left:24
          }}
        />
        <Text style={{color: COLORS.black,fontSize:16,fontWeight:500}}>82 / 85</Text>
        <View
          style={{
            width: 20,
            height: 2,
            backgroundColor: '#0166C2',
            position: 'absolute',
            transform: [{rotate: '110deg'}],
            top:35,
            left:8
          }}
        />
      </View>
      <View style={{alignItems: 'center', gap: 5, position: 'relative'}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'blue',
            width: 10,
            height: 10,
            borderRadius: 50,
          }}
        />
        <Image
          source={require('../../assets/images/athelete.png')}
          style={{
            width: 40,
            height: 40,
          }}
        />
        <Text style={{color: COLORS.black, fontSize: 12, fontWeight: 400}}>
          Player Name
        </Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Image
            source={require('../../assets/images/india.png')}
            style={{width: 22, height: 22}}
          />
          <Text style={{color: COLORS.black, fontSize: 12, fontWeight: 400}}>
            India
          </Text>
        </View>
      </View>
    </View>
  );
}
