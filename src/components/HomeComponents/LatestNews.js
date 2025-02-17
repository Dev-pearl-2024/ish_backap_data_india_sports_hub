import { Config } from 'react-native-config';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import COLORS from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import getTimeDifference from '../../utils/getTimeDiff';
import dynamicSize from '../../utils/DynamicSize';

const LatestNews = props => {
  const navigation = useNavigation();
  const [allNewsPosts, setAllNewsPost] = useState([]);
  const baseURL = Config.BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchAllPosts = async (page = 1) => {
    const createdURL = `https://indiasportshub.com/wp-json/wp/v2/posts?per_page=20&orderby=date&order=desc&page=${page}&_embed`;

    try {
      setLoading(true);
      const response = await axios.get(createdURL);
      setAllNewsPost([...allNewsPosts, ...response.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    setCurrentPage(1);
  }, []);

  // useEffect(() => {
  //   fetchAllPosts(currentPage);
  // }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
    fetchAllPosts(currentPage);
  };



  const RenderPost = React.memo(({ item, index }) => {
    return (
      item && (
        <TouchableOpacity
          style={styles.contentContainer}
          onPress={() =>
            navigation.navigate('blog-view', {
              postID: item?.id,
            })
          }>
          <View style={{ width: '33%', marginRight: 3 }}>
            <Image
              source={{ uri: item.jetpack_featured_media_url }}
              style={{ width: 114, height: 104 }}
            />
          </View>
          <View
            style={{
              width: '67%',
              justifyContent: 'center',
            }}>
            <Text numberOfLines={3}
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
              {getTimeDifference(item?.modified)} |{' '}
              {item?._embedded?.author?.[0]?.name}
            </Text>
          </View>
        </TouchableOpacity>
      )
    );
  })

  const renderPost = useCallback(
    ({ item, index }) => <RenderPost item={item} navigation={navigation} />,
    [navigation]
  );

  return (
    <>
      <View style={styles.headingContainer}>
        {props.showTitle && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: dynamicSize(10),
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
        )}
      </View>
      <FlatList
        data={props?.limit ? allNewsPosts?.slice(0, 10) : allNewsPosts}
        renderItem={renderPost}
        keyExtractor={(_, i) => i.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color={COLORS.primary} /> : null}
      />
    </>
  );
};

export default LatestNews;

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 'auto',
    borderRadius: dynamicSize(12),
    // marginBottom: dynamicSize(16),
  },
  title: {
    fontSize: dynamicSize(13),
    fontWeight: '800',
    // lineHeight: dynamicSize(24),
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
    marginVertical: dynamicSize(5),
    borderRadius: dynamicSize(12),
    alignSelf: 'center',
    overflow: 'hidden'
  },
});
