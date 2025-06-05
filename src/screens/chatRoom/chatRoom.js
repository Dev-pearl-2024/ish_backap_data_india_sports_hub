import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  Image,
  Modal,
  Alert,
  Linking,
  ScrollView,
  Animated,
  Pressable,
  Share,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SendIcon from './sendIcon';
import { stringToDarkColor } from '../../constants/commonFunctions';
import PreLoader from '../../components/loader/fullLoader';
import AttachmentIcon from './attachmentIcon';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import HandleLogout from '../../utils/HandleLogout';
import iconData from '../../data/sportsDataSmall';
import ShareIcon from '../../assets/icons/share.svg'
import SmallCarouselCards from '../../components/HomeComponents/smallCarouselCards';
import Right from '../../assets/icons/right.svg'
import moment from 'moment';
import dynamicSize from '../../utils/DynamicSize';
import { Picker } from 'emoji-mart-native';
import Gallery from '../../assets/icons/gallery.svg'
import Cross from '../../assets/icons/cross.svg'
import Document from '../../assets/icons/document.svg'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const height = Dimensions.get('window').height;

const ChatRoom = ({ roomId, sportData }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [socket, setSocket] = useState(io('https://prod.indiasportshub.com', {
    query: {
      token: token,
    },
  }));
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const [isPremium, setIsPremium] = useState(false);
  const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
  const [showReactions, setShowReactions] = useState(false);
  const [reactionTargetId, setReactionTargetId] = useState(null);
  const [reactionPosition, setReactionPosition] = useState({ x: 0, y: 0 });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState(false)
  const [eventData, setEventData] = useState([])
  const [reactionCount, setReactionCount] = useState({})
  const [replyTo, setReplyTo] = useState(null);
  let [userDataJson, setUserDataJson] = useState({})

  const ShareMessage = `Hey! I’ve been chatting with fellow sports fans on IndiaSportsHub – India’s first all-in-one app for 25+ sports 🏸🏃‍♂️🏑

${userDataJson?.firstName} invites you to join the conversation!
Get 1 YEAR FREE Premium Membership & use my referral code ${userDataJson?.referralCode} to get 1 extra month free 🎁

👉 Download now:
1) Android: https://play.google.com/store/apps/details?id=com.indiasportshub
2) iOS: https://apps.apple.com/us/app/indiasportshub/id6739810010

Let’s follow, support & discuss Indian Sports together.`;


  const shareLink = async () => {
    try {
      await Share.share({
        message: ShareMessage
      });
    } catch (error) {
      console.log('Error sharing link:', error);
    }
  };

  const getEventData = async () => {
    try {
      setLoading(true)
      const query = {
        status: 'all',
        page: 1,
        limit: 5,
        sportName: sportData?.sport,
        from: "homepage"
      }
      if (userId) {
        query.userId = userId
      }

      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/events/homepage/data`,
        params: query,
        headers: {
          'accessToken': token
        }
      });

      if (res.data.status === 409) {
        HandleLogout(navigation)
      }
      setEventData([...res?.data?.data?.internationalEvents?.[0]?.data, ...res?.data?.data?.domasticEvents?.[0]?.data]);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserDataJson(userData)
        setIsPremium(userData?.isPremiumUser);
      }
    };

    checkPremiumStatus();
  }, []);


  const [imageViewerParams, setImageViewerParams] = useState({
    isVisible: false,
    images: [{ uri: '' }],
  });
  const [modalVisible, setModalVisible] = useState(false);

  const getToken = async () => {
    try {
      setLoading(true);
      const res = await AsyncStorage.getItem('userToken');
      const res1 = await AsyncStorage.getItem('userId');
      setToken(res);
      setUserId(res1);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getChats();
  }, []);


  const getChats = async () => {
    try {
      setLoading(true)
      let res = await axios({
        method: 'get',
        url: roomId ? `https://prod.indiasportshub.com/chat/previous-data/${roomId}` :
          `https://prod.indiasportshub.com/chat/previous-data/${sportData?.sport}?sportName=${sportData?.sport}`,
      });
      setMessages(res?.data?.data[0]?.data || []);
      setReactionCount(res?.data?.reactionsCount || {})
      setLoading(false)
    } catch (e) {
      setMessages([]);
      setLoading(false)
    }
  };

  useEffect(() => {
    const newSocket = io('https://prod.indiasportshub.com', {
      query: {
        token: token,
      },
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {

      // Join room
      newSocket.emit('join room', { roomId: roomId, sportName: sportData?.sport, userId: userId });
    });

    newSocket.on('connect_error', err => {
      // HandleLogout(navigation)
    });

    newSocket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason);
    });

    // Listen for incoming messages
    newSocket.on('message', (msg) => {
      console.log('message : ', msg)
      setMessages((prevMessages) =>
        prevMessages ? [msg, ...prevMessages] : [msg]
      );
    });

    newSocket.on('join room', user => {
      const joinMessage = {
        userId: 'system',
        message: user?.user,
        sportName: sportData?.sport,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages =>
        prevMessages ? [joinMessage, ...prevMessages] : [joinMessage],
      );
    });

    updateUserLastSeen()

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [roomId, token, userId]);

  const handleToggleReaction = (messageId, emoji) => {
    socket.emit('addReaction', { roomId, sportName: sportData?.sport, messageId, emoji: emoji, userId });
    updateUserLastSeen()
  };

  useEffect(() => {
    socket.on('reactionUpdated', (data) => {
      setMessages(data?.reactions?.reverse())
      setReactionCount(data?.reactionsCount)
    });
    updateUserLastSeen()
  }, [messages])

  const sendMessage = (fileUrl, mediaType = '') => {
    if (socket && (message || fileUrl)) {
      const textMsg = {
        roomName: roomId || sportData?.sport,
        message,
        replyTo,
        userId,
        sportName: sportData?.sport,
        timestamp: new Date().toISOString(),
      };

      const imageMsg = {
        roomName: roomId || sportData?.sport,
        messageImage: fileUrl,
        replyTo,
        userId,
        sportName: sportData?.sport,
        timestamp: new Date().toISOString(),
      };

      const videoMsg = {
        roomName: roomId || sportData?.sport,
        video: fileUrl,
        replyTo,
        userId,
        sportName: sportData?.sport,
        timestamp: new Date().toISOString(),
      };

      let msg = '';
      // if mediaType is video, send video message. if mediaType is image, send image message. else send text message
      if (fileUrl && mediaType === 'video') {
        msg = videoMsg;
      } else if (fileUrl && mediaType === 'photo') {
        msg = imageMsg;
      } else {
        msg = textMsg;
      }

      // Ensure the message is added to the existing array, or create a new array if it's empty
      // setMessages(prevMessages =>
      //   prevMessages ? [msg, ...prevMessages] : [msg],
      // );
      socket.emit('message', msg);
      setMessage('');
      setReplyTo(null)
      updateUserLastSeen()
    }
  };

  const handleFilePicker = async mediaType => {
    try {
      const file = await ImageCropPicker.openPicker({
        mediaType,
      });

      await handleFileUpload(file, mediaType);
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  useEffect(() => {
    getEventData()
  }, [])

  const handleFileUpload = async (file, mediaType) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append('folderName', 'chat');
      formdata.append('file', {
        uri: file.path || file.uri,
        name: file.filename || `file-${Date.now()}`,
        type: file.mime, // Adjust mime type according to the selected file
      });

      const response = await axios.post(
        'https://prod.indiasportshub.com/images/upload',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accessToken: token,
          },
        },
      );

      const fileUrl = response?.data?.imageUrl;
      setLoading(false);
      sendMessage(fileUrl, mediaType);
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Upload Error', 'Failed to upload file. Please try again.');
      setLoading(false);
    }
  };

  const updateUserLastSeen = async () => {
    await AsyncStorage.setItem('lastSeenAt', new Date())
  }

  const handleVideoPress = videoLink => {
    if (videoLink) {
      Linking.openURL(videoLink).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  const renderMsg = item => {
    const now = moment();
    const timestamp = moment(item?.timestamp);
    const formattedTime = timestamp.isAfter(now.subtract(24, 'hours'))
      ? timestamp.format('h:mm A')
      : timestamp.format('MMM D, h:mm A');
    if (item.video) {
      return (
        <TouchableOpacity onPress={() => handleVideoPress(item.video)}>
          <Image
            source={require('../../assets/images/video-file.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
      );
    }
    return item?.messageImage ? (
      <TouchableOpacity
        onPress={() =>
          setImageViewerParams(prevProps => {
            return {
              ...prevProps,
              isVisible: true,
              images: [{ uri: item.messageImage }],
            };
          })
        }>
        <Image
          src={item?.messageImage}
          style={{
            height: 100,
            width: 100,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    ) : (
      <>
        <Text
          style={{
            textAlign: item.userId === userId ? 'right' : 'left',
            color: item.userId === userId ? COLORS.darkPrimary : COLORS.white,
            padding: 5,
            fontSize: 15
          }}>
          {item?.message}
        </Text>
        <Text
          style={{
            textAlign: item.userId === userId ? 'right' : 'right',
            color: item.userId === userId ? COLORS.darkPrimary : COLORS.white,
            padding: 5,
            fontSize: 8
          }}>
          {formattedTime}
        </Text>
      </>
    );
  };

  const sportsData = iconData?.find(icon => icon?.name?.toLowerCase() === sportData?.sport?.toLowerCase());

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, }}
    >
      <View style={{ height: "100%" }} onPress={Keyboard.dismiss}>
        {loading ? (
          <PreLoader />
        ) : (
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
                alignItems: 'center',
                padding: 10,
                // borderRadius: 15,
                // borderWidth: 1,

                // Shadow for iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 }, // bottom shadow
                shadowOpacity: 0.1,
                shadowRadius: 6,

                // Shadow for Android
                elevation: 4,
              }}>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {sportsData.icon}
                <Text style={{
                  fontSize: 16,
                  fontWeight: '800',
                  lineHeight: 24,
                  color: COLORS.black,
                  paddingLeft: 10,
                  backgroundColor: COLORS.white,
                }}>
                  {sportData?.sport}
                </Text>
              </View>
              <TouchableOpacity on onPress={shareLink}>
                <ShareIcon />
              </TouchableOpacity>
            </View>
            {eventData?.length > 0 && <View style={{ width: "auto", height: "15%", marginTop: "2%" }}>
              <SmallCarouselCards
                carouselData={[eventData]}
              />
            </View>}

            <View style={{ flex: 1, marginTop: 20 }}>
              <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                inverted
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: [
                        { rotateX: Platform.OS == 'ios' ? '180deg' : '180deg' }, // Rotate 180 degrees around X-axis
                        { scaleX: -1 }, // Flip vertically (inverse scale)
                      ],
                    }}
                  >
                    <Text style={{ color: COLORS.primary }}>Start conversation by sending a message</Text>
                  </View>
                )}
                renderItem={({ item }) => {
                  const emojiKeys = Object.keys(reactionCount?.[item?._id] || {})
                  return (
                    <>
                      <View style={{
                        flexDirection: item?.userId !== userId ? 'row' : "row-reverse", marginBottom: "3%",
                      }}>
                        <Pressable
                          onLongPress={(e) => {
                            setReactionTargetId(item._id);
                            const { pageX, pageY } = e.nativeEvent;
                            setReactionPosition({ x: pageX + item?.userId != userId ? 170 : 130, y: pageY - 100 });
                            setShowReactions(true);
                          }}
                          delayLongPress={100}
                        >
                          <View style={{ flexDirection: item?.userId !== userId ? 'row' : "row-reverse", gap: 8, alignContent: 'center' }}>
                            <View
                              style={{
                                maxWidth: "80%",
                                paddingHorizontal: item.video
                                  ? '0'
                                  : item.messageImage
                                    ? 1
                                    : 10,
                                paddingVertical: item.video
                                  ? '0'
                                  : item.messageImage
                                    ? 1
                                    : 2,
                                borderBottomWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: item.video
                                  ? 'transparent'
                                  : item.userId === userId
                                    ? COLORS.lightPrimary
                                    : COLORS.primary,
                                borderTopStartRadius: item.userId === userId ? 10 : 0,
                                borderTopEndRadius: item.userId === userId ? 0 : 10,
                                borderBottomEndRadius: 10,
                                borderBottomStartRadius: 10,
                                // borderRadius: 10,
                                alignSelf:
                                  item.userId === userId ? 'flex-end' : 'flex-start',
                                marginVertical: 5,
                                marginLeft: item.userId === userId ? '0%' : "2%",
                                marginRight: item.userId === userId ? '2%' : "0%",
                                marginBottom: "8%"
                              }}>
                              {item?.replyTo?.messageId && (
                                <View
                                  style={{
                                    padding: 8,
                                    backgroundColor: COLORS.white,
                                    marginTop: 8,
                                    marginBottom: 5,
                                    marginHorizontal: 5,
                                    borderRadius: 5
                                  }}
                                >
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      gap: 5
                                    }}>
                                      {item?.replyTo?.userImage && <View style={{
                                        borderWidth: 2,
                                        width: dynamicSize(30),
                                        height: dynamicSize(30),
                                        borderRadius: 50,
                                        objectFit: 'contain'
                                      }}>
                                        <Image src={item?.replyTo?.userImage} style={{
                                          width: dynamicSize(25),
                                          height: dynamicSize(25),
                                          borderRadius: 20
                                        }} />
                                      </View>}
                                      {
                                        item?.replyTo?.userName && <Text style={{ color: COLORS.black, fontSize: 12 }}>{item?.replyTo?.userName}</Text>
                                      }
                                    </View>
                                  </View>
                                  <Text style={{ color: COLORS.darkPrimary, fontSize: 12, fontWeight: 500 }}>
                                    {item?.replyTo?.message}
                                  </Text>
                                </View>
                              )}
                              {renderMsg(item)}
                              {item?.reactions && item?.reactions?.length > 0 && <View style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: item.userId === userId ? COLORS.lightPrimary : COLORS.primary,
                                borderRadius: 10,
                                bottom: -25,
                                left: 10,
                                fontSize: 15,
                                padding: 3,
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 5
                              }}>
                                {emojiKeys?.map(key => {
                                  return <Text style={{ color: "#2F4987" }}>{reactionCount?.[item?._id]?.[key] != 1 ? reactionCount?.[item?._id]?.[key] : ""} {key}</Text>
                                })}
                              </View>}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                              <TouchableOpacity onPress={() => setReplyTo({
                                userName: item?.username,
                                message: item?.message,
                                userImage: item?.image,
                                messageId: item?._id
                              })}>
                                <Text style={{ fontSize: 14, color: COLORS.primary }}>💬</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Pressable >
                      </View>
                      < View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5
                      }}>
                        {item?.userId != userId && <View style={{
                          borderWidth: 2,
                          width: dynamicSize(30),
                          height: dynamicSize(30),
                          borderRadius: 50,
                          borderColor: '#D9D9D9',
                          marginLeft: item.userId === userId ? '0%' : "2%",
                          objectFit: 'contain'
                        }}>
                          <Image src={item?.image} style={{
                            width: dynamicSize(25),
                            height: dynamicSize(25),
                            borderRadius: 20
                          }} />
                        </View>}
                        {
                          item?.userId != userId && <Text style={{ color: COLORS.black, fontSize: 12 }}>{item?.username}</Text>
                        }
                      </View>
                    </>
                  );
                }}
                initialNumToRender={10000}
                contentContainerStyle={{ paddingBottom: 20, }}
              />
            </View>
            {replyTo && (
              <View
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 8,
                  borderLeftWidth: 4,
                  borderLeftColor: COLORS.primary,
                  marginBottom: 5,
                  marginHorizontal: 10,
                  borderRadius: 6,
                  position: 'relative',
                }}
              >
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>
                  Replying to {replyTo.userName}
                </Text>
                <Text style={{ color: COLORS.black }} numberOfLines={1}>
                  {replyTo.message}
                </Text>
                <TouchableOpacity
                  onPress={() => setReplyTo(null)}
                  style={{ position: 'absolute', right: 10, top: 5 }}
                >
                  <Text style={{ fontSize: 22, color: 'gray' }}>×</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={{
              flexDirection: 'row', alignItems: 'center',
            }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  width: 50,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  padding: 10,
                  marginVertical: 10,
                  backgroundColor: COLORS.primary,
                  borderRadius: 50,
                  alignItems: 'center',
                }}>
                <AttachmentIcon width={20} height={20} />
              </TouchableOpacity>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
                placeholderTextColor={COLORS.black}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  color: COLORS.black,
                  padding: 7,
                  marginVertical: 10,
                  flex: 1,
                  borderRadius: 5,
                  color: COLORS.black,
                }}
              />
              <TouchableOpacity
                onPress={() => sendMessage()}
                style={{
                  width: 50,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  padding: 10,
                  marginVertical: 10,
                  backgroundColor: COLORS.primary,
                  borderRadius: 50,
                }}>
                <SendIcon color={COLORS.white} width={30} height={30} />
              </TouchableOpacity>
            </View>
          </View>
        )
        }
      </View >
      <ImageView
        images={imageViewerParams.images}
        imageIndex={0}
        visible={imageViewerParams.isVisible}
        onRequestClose={() =>
          setImageViewerParams(prevProps => {
            return {
              ...prevProps,
              isVisible: false,
              images: [{ uri: '' }],
            };
          })
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                alignItems: 'right',
              }}>
              <Cross />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: COLORS.black }}>Upload</Text>
            <Text style={{ color: COLORS.black }}>Max Size - 1MB</Text>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  handleFilePicker('photo');
                }}
                style={{
                  marginVertical: 10,
                  padding: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  // width: '100%',
                  alignItems: 'center',
                }}>
                <Gallery />
                <Text style={{ color: COLORS.black }}>Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  handleFilePicker('document');
                }}
                style={{
                  marginVertical: 10,
                  padding: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  // width: '100%',
                  alignItems: 'center',
                }}>
                <Document />
                <Text style={{ color: COLORS.black }}>Document</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {
        showReactions && (
          <Pressable
            onPress={() => {
              setShowReactions(false)
              setShowEmojiPicker(false)
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999, // Make sure it's above other content
            }}
          >
            {/* Prevent tap propagation to the backdrop */}
            <View
              style={{
                position: 'absolute',
                top: reactionPosition.y,
                left: reactionPosition.x - 100,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 30,
                padding: 8,
                elevation: 5,
              }}
              onStartShouldSetResponder={() => true}
            >
              {commonEmojis.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => {
                    handleToggleReaction(reactionTargetId, emoji);
                    setShowReactions(false);
                  }}
                  style={{ marginHorizontal: 5 }}
                >
                  <Text style={{ fontSize: 24 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => {
                  setShowEmojiPicker(true);
                  setShowReactions(false);
                  // setSelectedMessageId(reactionTargetId);
                }}
                style={{
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  backgroundColor: '#eee',
                  borderRadius: 12,
                }}
              >
                <Text style={{ fontSize: 16 }}>➕</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        )
      }
      {
        showEmojiPicker && (
          <Pressable
            style={{
              position: 'absolute',
              top: "30%",
              left: 0,
              bottom: 0,
              right: 0
            }}
            onPress={() => {
              setShowReactions(false)
              setShowEmojiPicker(false)
            }}>
            <View>
              <Picker
                onSelect={(emoji) => {
                  handleToggleReaction(reactionTargetId, emoji.native);
                  setShowEmojiPicker(false);
                }}
                theme="light"
                emojiSize={30}
              />
            </View>
          </Pressable>
        )
      }
    </KeyboardAvoidingView >
  );
};

export default ChatRoom;
