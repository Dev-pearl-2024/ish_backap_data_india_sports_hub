import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import MenuBlog from '../../assets/icons/menuBlog';
import ShareIcon from '../../assets/icons/share-icon.svg';
import Message from '../../assets/icons/message.svg';
import Thumb from '../../assets/icons/thumb.svg';
import {useNavigation} from '@react-navigation/native';
export default function BlogView() {
  const navigation = useNavigation();
  return (
    <>
      <BackHeader />
      <View
        style={{
          position: 'relative',
        }}>
        <Image
          source={require('../../assets/images/blogDummy.png')}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <View
          style={{
            padding: 10,
            position: 'absolute',
            borderRadius: 100,
            top: 10,
            right: 10,
            width: 40,
            height: 40,
            overflow: 'hidden',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: COLORS.medium_gray,
              position: 'absolute',
              width: 40,
              height: 40,
              opacity: 0.5,
            }}
          />
          <ShareIcon />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <MenuBlog />
          <Text
            style={{
              color: COLORS.white,
              fontSize: 16,
              fontWeight: '500',
            }}>
            New York Football Teams Score Big Wins and Championship Titles
          </Text>
        </View>
        </View>
        <ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            marginVertical: 10,
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 12,
          }}
          onPress={() => navigation.navigate('blog-profile-view')}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={require('../../assets/images/img1.png')}
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: COLORS.black,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: COLORS.black,
                }}>
                SANKALP MISHRA
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLORS.dark_gray,
                }}>
                20 Feb 2024
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Message />
            <Thumb />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: COLORS.white,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: COLORS.black,
              paddingBottom: 20,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.black,
              paddingBottom: 20,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.black,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.black,
              paddingBottom: 20,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry.
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.black,
              paddingBottom: 20,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.black,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.black,
              paddingBottom: 20,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry.
          </Text>
        </View>
        </ScrollView>
    </>
  );
}
