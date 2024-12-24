import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';


const AdminPanel = () => {
  return (
        <WebView source={{ uri: 'https://prod.d21b9k87xqy4ma.amplifyapp.com/dashboard/Tournaments' }} style={{ flex: 1 }} /> 
  )
}

export default AdminPanel

const styles = StyleSheet.create({})