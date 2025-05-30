import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';


const AthleteSelfRegistration = () => {
  return (
        <WebView source={{ uri: 'https://prod.d2c70r7y4ln6mc.amplifyapp.com/find-your-profile' }} style={{ flex: 1 }} /> 
  )
}

export default AthleteSelfRegistration

const styles = StyleSheet.create({})