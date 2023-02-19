import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { firebase } from '../../firebase'

const Header = ({ navigation }) => {

    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut()
            console.log("Header:[11] -> handleSignOut[Success]:: SignOut Successfully");
        } catch (error) {
            console.log("Header:[13] -> handleSignOut[Error]:: ", error.message)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={handleSignOut}>
                    <Image style={styles.logo} source={require('../../assets/instagram_logo_white.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.push('PostScreen')}>
                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png" }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png" }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: "relative" }}>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>15</Text>
                    </View>
                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png" }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: "contain"
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: "contain"
    },
    unreadBadge: {
        backgroundColor: "#ff3250",
        position: "absolute",
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
    },
    unreadBadgeText: {
        color: "white",
        fontWeight: "600",
        fontSize: 12
    }
})