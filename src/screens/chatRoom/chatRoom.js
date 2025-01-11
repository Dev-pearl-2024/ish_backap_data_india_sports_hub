import React, { useEffect, useState } from 'react';
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

const height = Dimensions.get('window').height;

const ChatRoom = ({ roomId, sportData }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const userDataString = await AsyncStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
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
    getCHats();
  }, []);

  const getCHats = async () => {
    try {
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/chat/previous-data/${roomId}`,
      });

      setMessages(res?.data?.data[0]?.data || []);

    } catch (e) {
      console.log(e, 'error in gechat');
      setMessages([]);
    }
  };

  useEffect(() => {
    // Create socket connection
    const newSocket = io('https://prod.indiasportshub.com', {
      query: {
        token: token,
      },
    });

    newSocket.on('connect', () => {

      // Join room
      newSocket.emit('join room', { roomId: roomId, userId: userId });
    });

    newSocket.on('connect_error', err => {
      // HandleLogout(navigation)
    });

    newSocket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason);
    });

    // Listen for incoming messages
    newSocket.on('message', msg => {
      setMessages(prevMessages =>
        prevMessages ? [msg, ...prevMessages] : [msg],
      );
    });

    newSocket.on('join room', user => {
      const joinMessage = {
        userId: 'system',
        message: user?.user,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages =>
        prevMessages ? [joinMessage, ...prevMessages] : [joinMessage],
      );
    });

    // Set socket to state
    setSocket(newSocket);

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [roomId, token, userId]);

  const sendMessage = (fileUrl, mediaType = '') => {
    if (socket && (message || fileUrl)) {
      const textMsg = {
        roomName: roomId,
        message,
        userId,
        timestamp: new Date().toISOString(),
      };

      const imageMsg = {
        roomName: roomId,
        messageImage: fileUrl,
        userId,
        timestamp: new Date().toISOString(),
      };

      const videoMsg = {
        roomName: roomId,
        video: fileUrl,
        userId,
        timestamp: new Date().toISOString(),
      };

      let msg = '';

      console.log(fileUrl, mediaType, 'fileUrl && mediaType');

      // if mediaType is video, send video message. if mediaType is image, send image message. else send text message
      if (fileUrl && mediaType === 'video') {
        msg = videoMsg;
      } else if (fileUrl && mediaType === 'photo') {
        msg = imageMsg;
      } else {
        msg = textMsg;
      }

      console.log(msg, 'msg');
      // Ensure the message is added to the existing array, or create a new array if it's empty
      setMessages(prevMessages =>
        prevMessages ? [msg, ...prevMessages] : [msg],
      );
      console.log('Sending message:', msg,);
      socket.emit('message', msg);
      setMessage('');
    }
  };

  const handleFilePicker = async mediaType => {
    try {
      const file = await ImageCropPicker.openPicker({
        mediaType,
      });

      // Handle file upload
      await handleFileUpload(file, mediaType);
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

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

  const handleVideoPress = videoLink => {
    if (videoLink) {
      Linking.openURL(videoLink).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  const renderMsg = item => {
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
      <Text
        style={{
          textAlign: item.userId === userId ? 'right' : 'left',
          color: item.userId === userId ? COLORS.white : COLORS.black,
          padding: 5,
        }}>
        {item?.message}
      </Text>
    );
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {loading ? (
          <PreLoader />
        ) : (
          <View style={{ flex: 1, backgroundColor: COLORS.white, padding: 10, height:height }}>
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                fontWeight: '500',
              }}>
              Chat Room: {sportData?.sport}
            </Text>
            <View style={{ flex: 1, marginTop: 20 }}>
              <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: 'rotate(180deg)',
                    }}>
                    <Text>Start conversation by sending a message</Text>
                  </View>
                )}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
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
                            ? COLORS.primary
                            : COLORS.table_gray,
                        borderRadius: 10,
                        alignSelf:
                          item.userId === userId ? 'flex-end' : 'flex-start',
                        marginVertical: 5,
                      }}>
                      {(item.firstName || item?.username) && (
                        <Text
                          style={{
                            color:
                              item.userId === userId
                                ? COLORS.white
                                : stringToDarkColor(
                                  item?.firstName || item?.username,
                                ) || COLORS.black,
                            textAlign: 'center',
                            fontWeight: '500',
                            display: item.userId === userId ? 'none' : 'flex',
                          }}>
                          {item?.firstName || item?.username} {item?.lastName}
                        </Text>
                      )}

                      {renderMsg(item)}
                    </View>
                  );
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
                inverted
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
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
        )}
      </TouchableWithoutFeedback>
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
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Upload</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                handleFilePicker('photo');
              }}
              style={{
                marginVertical: 10,
                padding: 15,
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white' }}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                handleFilePicker('video');
              }}
              style={{
                marginVertical: 10,
                padding: 15,
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white' }}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginVertical: 10,
                padding: 15,
                backgroundColor: COLORS.secondary,
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
