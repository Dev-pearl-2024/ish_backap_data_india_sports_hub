import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import dynamicSize from '../../utils/DynamicSize'
import COLORS from '../../constants/Colors'
import Crown from "../../assets/icons/crown.svg"
import { useNavigation } from '@react-navigation/native'

const height = Dimensions.get('window').height;

const PremiumFeature = (props) => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.premiumContainer}>
                <ScrollView>
                {props?.child && props.child}
                </ScrollView>

            </View>
            <View style={styles.btnContainer}>
            <Crown width={dynamicSize(50)} height={dynamicSize(50)} />
            {/* <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('plans')}> */}
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Sidebar',{purchase:true})}>
                <Text style={{ color: COLORS.white, textAlign: "center" }}>Upgrade</Text>
            </TouchableOpacity>
            </View>
        </>
    )
}

export default PremiumFeature

const styles = StyleSheet.create({
    premiumContainer: {
        width: "full",
        height:dynamicSize(150),
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.1,
        pointerEvents: "none",

    },
    button: {
        backgroundColor: COLORS.primary,
        padding: dynamicSize(8),
        paddingHorizontal: dynamicSize(15),
        borderRadius: dynamicSize(50),
        width: dynamicSize(90)

    },
    crown: {
        padding: dynamicSize(8),
        paddingHorizontal: dynamicSize(15),
        borderRadius: dynamicSize(50),
        position: "relative",
        bottom: dynamicSize(90),
        left: "47%",
        width: dynamicSize(90),
        marginBottom:5

    },
    btnContainer:{
        position: "relative",
        bottom: dynamicSize(120),
        flex:1,
        justifyContent:"center",
        alignItems:"center"

    }
})