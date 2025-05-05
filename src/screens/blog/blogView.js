import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Platform
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import MenuBlog from '../../assets/icons/menuBlog';
import ShareIcon from '../../assets/icons/share-icon.svg';
import Message from '../../assets/icons/message.svg';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import dynamicSize from '../../utils/DynamicSize';
import getFormattedDate from '../../utils/GetFormattedDate';
import SkeletonLoader from './blogSkeletonLoader';
import WebViewWithSkeleton from './webViewSkeletonLoader';
import { decodeHtmlEntities } from '../../utils/convertIntoHtml';

export default function BlogView({ route }) {
  const navigation = useNavigation();
  const { postID } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [webViewHeight, setWebViewHeight] = useState(1500);
  const [postDetails, setPostDetails] = useState('');

  const fetchPost = async () => {
    const createdURL = `https://indiasportshub.com/wp-json/wp/v2/posts/${postID}?_embed`;
    try {
      const response = await axios.get(createdURL);
      setPostDetails(response.data);
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const shareLink = async () => {
    try {
      await Share.share({
        message: `Check out this Post by ${postDetails?._embedded?.author[0]?.name}: ${postDetails?.link}`
      });
    } catch (error) {
      console.log('Error sharing link:', error);
    }
  };

  const onWebViewMessage = event => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };
  const injectedJS = `document.body.style.fontSize = '32px';
              const masthead = document.getElementById("masthead");
              const comments = document.getElementById("comments");
              const colophon = document.getElementById("colophon");
              const elements = document.querySelectorAll(".single-related-posts-section-wrap.layout--list");
              elements.forEach(element => element.remove());
              const postNavigation = document.querySelectorAll(".navigation.post-navigation");
              postNavigation.forEach(element => element.remove());
              const entryHeader = document.querySelectorAll(".entry-header");
              entryHeader.forEach(element => element.remove());
              const SocialIcons = document.querySelectorAll(".heateor_sss_sharing_container");
              SocialIcons.forEach(element => element.remove())
              document.querySelectorAll(".kk-star-ratings.kksr-auto.kksr-align-left.kksr-valign-top")?.forEach(element =>element.remove())
              document.querySelectorAll(".entry-footer")?.forEach(element => element.remove())
              if (masthead) {
                  masthead.remove();
              }
              if (comments) {
                comments.remove();
              }
              if (colophon) {
                colophon.remove();
              }
              setTimeout(function() {
                window.ReactNativeWebView.postMessage(
                  document.body.scrollHeight
                );
              }, 500);
 `;

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    isLoading ?
      <SkeletonLoader /> : <>
        <BackHeader />
        <ScrollView>
          <View
            style={{
              position: 'relative',
            }}>
            <Image
              source={{ uri: postDetails?.jetpack_featured_media_url }}
              style={{
                width: '100%',
                height: dynamicSize(200),
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: dynamicSize(10),
                left: dynamicSize(10),
                flexDirection: 'row',
                alignItems: 'center',
                gap: dynamicSize(5),
                width: "90%",
              }}>
              <MenuBlog />
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: dynamicSize(16),
                  fontWeight: '500',
                }}>
                {decodeHtmlEntities(postDetails?.title?.rendered)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              marginVertical: dynamicSize(10),
              padding: dynamicSize(16),
              flexDirection: 'row',
              borderRadius: dynamicSize(12),
            }}
            onPress={() => navigation.navigate('blog-profile-view', {
              authorData: JSON.stringify(postDetails?._embedded?.author)
            })}>
            <View style={{ flexDirection: 'row', gap: dynamicSize(10) }}>
              <Image
                source={{ uri: postDetails?._embedded?.author[0].avatar_urls[24] }}
                style={{
                  width: dynamicSize(45),
                  height: dynamicSize(45),
                  borderRadius: dynamicSize(100),
                  borderWidth: dynamicSize(1),
                  borderColor: COLORS.black,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: dynamicSize(14),
                    fontWeight: '600',
                    color: COLORS.black,
                  }}>
                  {postDetails?._embedded?.author[0].name}
                </Text>
                <Text
                  style={{
                    fontSize: dynamicSize(12),
                    fontWeight: '400',
                    color: COLORS.dark_gray,
                  }}>
                  {getFormattedDate(postDetails.modified)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={shareLink}
                style={{
                  padding: dynamicSize(12.5),
                  borderRadius: dynamicSize(100),
                  width: dynamicSize(40),
                  height: dynamicSize(40),
                  marginLeft: '41%',
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary,
                    position: 'absolute',
                    width: dynamicSize(40),
                    height: dynamicSize(40),
                  }}
                />
                <ShareIcon />
              </TouchableOpacity>
            </View>
            {/* <View style={{flexDirection: 'row', gap: 10}}>
          <Message />
           <Thumb /> 
        </View> */}
          </TouchableOpacity>
          {Platform.OS === 'ios' ? postDetails?.guid?.rendered && <WebView
            renderLoading={() => <WebViewWithSkeleton />}
            source={{ uri: postDetails?.guid?.rendered }}
            style={{ minHeight: webViewHeight, width: '100%' }}
            injectedJavaScript={injectedJS}
            javaScriptEnabled
            scalesPageToFit={true}
            onMessage={onWebViewMessage}
          /> :
            postDetails?.guid?.rendered && <WebView
              renderLoading={() => <WebViewWithSkeleton />}
              source={{ uri: postDetails?.guid?.rendered }}
              style={{ minHeight: webViewHeight || 5000, width: '100%' }}
              injectedJavaScript={injectedJS}
              javaScriptEnabled
              scalesPageToFit={true}
              onTouchStart={(e) => webViewHeight <= 5000 && setWebViewHeight((prev) => (prev + 500))}
            />}
          {
            !postDetails?.guid?.rendered && <Text>Id not found!</Text>
          }
        </ScrollView>
      </>
  );
}


const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
})