import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Platform,
  ActivityIndicator,
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import MenuBlog from '../../assets/icons/menuBlog';
import ShareIcon from '../../assets/icons/share-icon.svg';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import dynamicSize from '../../utils/DynamicSize';
import getFormattedDate from '../../utils/GetFormattedDate';
import SkeletonLoader from './blogSkeletonLoader';
import WebViewWithSkeleton from './webViewSkeletonLoader';
import {decodeHtmlEntities} from '../../utils/convertIntoHtml';

export default function BlogView({route}) {
  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const {postID} = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [webViewHeight, setWebViewHeight] = useState(300);
  const [postDetails, setPostDetails] = useState(null);

  const [htmlContent, setHtmlContent] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://indiasportshub.com/wp-json/wp/v2/posts/${postID}?_embed`,
      );
      setPostDetails(response?.data);

      let content = response?.data?.content?.rendered;

      content = await content.replace(
        /<footer class="entry-footer">[\s\S]*?<\/footer>/,
        '',
      );

      content = await content.replace(
        /<div id="comments"[\s\S]*?<\/div><!-- #comments -->/,
        '',
      );

      content = await content.replace(
        /<div class="single-related-posts-section-wrap[\s\S]*?<\/div>\s*<\/div>/,
        '',
      );

      content = await content.replace(
        /<footer id="colophon"[\s\S]*?<\/footer>/,
        '',
      );

      setHtmlContent(content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const shareLink = async () => {
    try {
      await Share.share({
        message: `Check out this Post by ${postDetails?._embedded?.author[0]?.name}: ${postDetails?.link}`,
      });
    } catch (error) {
      console.log('Error sharing link:', error);
    }
  };

  const onWebViewMessage = event => {
    const height = Number(event.nativeEvent.data);
    if (height > 0) setWebViewHeight(height);
  };

  const injectedHTML = `
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                body {
                  font-size: 16px;
                  padding: 16px;
                  margin: 0;
                  background-color: #fff;
                  line-height: 1.6;
                  color: #000;
                  text-align: justify;
                }

                img,
                figure img,
                .wp-block-image img,
                [class*="wp-image"] {
                  width: 100% !important;
                  height: auto !important;
                  max-width: 100% !important;
                  display: block !important;
                  object-fit: contain !important;
                  margin: 10px 0 !important;
                }

                figure {
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
                }

                figcaption {
                  font-size: 12px;
                  color: gray;
                  text-align: center;
                }

                a {
                  color: #2D6AFE;
                  text-decoration: none;
                }

                ul {
                  padding-left: 20px;
                }

                /* Override inline styles */
                *[style*="width"] {
                  width: 100% !important;
                }

                *[style*="height"] {
                  height: auto !important;
                }
              </style>


                </head>
                <body>${htmlContent}</body>
              </html>
            `;

  const injectedJS = `
            function sendHeight() {
              if (document.documentElement && document.documentElement.scrollHeight) {
                window.ReactNativeWebView.postMessage(String(document.documentElement.scrollHeight));
              } else if (document.body && document.body.scrollHeight) {
                window.ReactNativeWebView.postMessage(String(document.body.scrollHeight));
              }
            }
            // Call sendHeight after the document is fully loaded
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              sendHeight();
            } else {
              document.addEventListener('DOMContentLoaded', sendHeight);
            }
            // Also, send the height whenever the window resizes (e.g., orientation change)
            window.addEventListener('resize', sendHeight);
            true; // Ensure the injected JavaScript returns true (required by react-native-webview)
          `;

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading || !postDetails) return <SkeletonLoader />;

  return (
    <>
      <BackHeader />
      <ScrollView>
        <Image
          source={{uri: postDetails.jetpack_featured_media_url}}
          style={{width: '100%', height: dynamicSize(200)}}
        />
        <View
          style={{
            // position: 'absolute',
            // bottom: dynamicSize(10),
            // left: dynamicSize(10),
            marginTop: dynamicSize(10),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            gap: 10,
            padding: dynamicSize(10),
            backgroundColor: COLORS.white,
          }}>
          <MenuBlog />
          <Text
            style={{
              color: 'black',
              fontSize: dynamicSize(16),
              fontWeight: '500',
            }}>
            {decodeHtmlEntities(postDetails?.title?.rendered)}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            marginVertical: dynamicSize(10),
            padding: dynamicSize(16),
            flexDirection: 'row',
            borderRadius: dynamicSize(12),
          }}
          onPress={() =>
            navigation.navigate('blog-profile-view', {
              authorData: JSON.stringify(postDetails?._embedded?.author),
            })
          }>
          <View style={{flexDirection: 'row', gap: dynamicSize(10)}}>
            <Image
              source={{uri: postDetails?._embedded?.author[0].avatar_urls[24]}}
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
                padding: dynamicSize(10),
                borderRadius: dynamicSize(100),
                width: dynamicSize(40),
                height: dynamicSize(40),
                marginLeft: dynamicSize(90),
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

        {Platform.OS === 'ios'
          ? postDetails?.guid?.rendered && (
              <WebView
                renderLoading={() => <WebViewWithSkeleton />}
                source={{
                  html: injectedHTML,
                }}
                style={{height: 3600}}
                injectedJavaScript={injectedJS}
                javaScriptEnabled
                scalesPageToFit={true}
                onMessage={onWebViewMessage}
              />
            )
          : postDetails?.guid?.rendered && (
              <View style={{flex: 1}}>
                <WebView
                  ref={webViewRef}
                  originWhitelist={['*']}
                  source={{
                    html: injectedHTML,
                  }}
                  injectedJavaScript={injectedJS}
                  javaScriptEnabled
                  style={{height: webViewHeight}}
                  startInLoadingState
                  renderLoading={() => <WebViewWithSkeleton />}
                  mixedContentMode="always"
                  onMessage={event => {
                    const height = parseInt(event.nativeEvent.data, 10);
                    if (!isNaN(height) && height > 0) {
                      setWebViewHeight(height);
                    }
                  }}
                />
              </View>
            )}
        {!postDetails?.guid?.rendered && <Text>Id not found!</Text>}
      </ScrollView>
      <View style={{padding: dynamicSize(20), justifyContent:"center", alignItems:"center"}}>
        <Text>Google Ads</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
