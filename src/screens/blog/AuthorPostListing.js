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
  const [currentPage, setCurrentPage] = useState(1);

  const baseURL = Config.BASE_URL;

  const fetchPostList = async (page = 1) => {
    const createdURL = `https://indiasportshub.com/wp-json/wp/v2/posts?author=${author}&per_page=6&orderby=date&order=desc&page=${page}&_embed`;
    try {
      const response = await axios.get(createdURL);
      setAllNewsPost([...allNewsPosts, ...response.data]);
    } catch (err) {
      console.error(err)
    } 
  };

  useEffect(() =>{
      fetchPostList()
      setCurrentPage(1)
  }, [])
  useEffect(() => {
    fetchPostList(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
    console.log('##############')
  };

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
    <FlatList 
        data={allNewsPosts} 
        renderItem={renderPost} 
        keyExtractor={(_, i) => i.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      
      
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
