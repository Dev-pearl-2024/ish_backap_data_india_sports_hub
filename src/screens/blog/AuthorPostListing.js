import {Config} from 'react-native-config';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import getTimeDifference from '../../utils/getTimeDiff';
import dynamicSize from '../../utils/DynamicSize';

const AuthorPostListing = ({author}) => {
  const navigation = useNavigation();
  const [allNewsPosts, setAllNewsPost] = useState([]);
  const baseURL = Config.BASE_URL;
  console.log(author, 'from author listing')

  const fetchPostList = async () => {
    const createdURL = `https://indiasportshub.com/wp-json/wp/v2/posts?author=${author}&_embed`;
    try {
      const response = await axios.get(createdURL);
      setAllNewsPost(response.data);
    } catch (err) {
      console.error(err)
    } 
  };

  useEffect(() =>{
      fetchPostList()
  }, [])

  const renderPost = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() =>
          navigation.navigate('blog-view', {
            postID: item?.id,
          })
        }>
        <View style={{width: '33%'}}>
          <Image
            source={{uri: item.jetpack_featured_media_url}}
            style={{width: 114, height: 104}}
          />
        </View>
        <View
          style={{
            width: '67%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              lineHeight: 24,
              color: COLORS.black,
              paddingHorizontal: 8,
            }}>
            {item?.title?.rendered}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 18,
              color: COLORS.dark_gray,
              paddingHorizontal: 8,
            }}>
            {' '}
            {getTimeDifference(item.modified)} | {item?._embedded?.author[0]?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // List all categories - https://indiasportshub.com/wp-json/wp/v2/categories?per_page=100

  // All news of that sports - https://indiasportshub.com/wp-json/wp/v2/posts?categories=199&per_page=10&orderby=date&order=desc&page=1
  return (
    <View style={styles.headingContainer}>
      {/* {props.showTitle && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text style={styles.title}>LATEST NEWS</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('latest-news-view')}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
                color: COLORS.primary,
              }}>
              View all
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
      <FlatList data={allNewsPosts} renderItem={renderPost} />
    </View>
  );
};

export default AuthorPostListing;

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 'auto',
    borderRadius: dynamicSize(12),
    marginBottom: dynamicSize(16),
  },
  title: {
    fontSize: dynamicSize(16),
    fontWeight: '800',
    lineHeight: dynamicSize(24),
    color: COLORS.black,
  },
  contentContainer: {
    width: '90%',
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: dynamicSize(1),
    marginHorizontal: dynamicSize(16),
    marginVertical: dynamicSize(10),
    borderRadius: dynamicSize(12),
    alignSelf: 'center',
  },
});
