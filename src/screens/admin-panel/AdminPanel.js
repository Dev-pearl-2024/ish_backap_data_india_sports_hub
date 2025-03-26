import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';


const AdminPanel = () => {
  return (
        <WebView source={{ uri: 'https://prod.d2c70r7y4ln6mc.amplifyapp.com' }} style={{ flex: 1 }} /> 
  )
}

export default AdminPanel

const styles = StyleSheet.create({})