import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";



export default function HomeScreen ({navigation}) {
    return (
        <View style={styles.container}>
           <Image style={styles.img} source={require('../assets/logo.png')} />
           <TouchableOpacity
           onPress={() => navigation.navigate('CreateBill')} style={styles.but}>
            <Text style={styles.text}>Create Bill</Text>
           </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems:'center'
    },

    img: {
        width:200,
        height:200
    },

    but: {
        alignItems:"center",
        justifyContent:"center",
        width:100,
        height:40,
        backgroundColor:'#0F2C59',
        borderRadius:10
    },
    text: {
        color:"#fff",
        fontSize:18
    }
})