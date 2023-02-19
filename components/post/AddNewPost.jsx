import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FormicPostUploader from './FormicPostUploader'

const AddNewPost = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <FormicPostUploader navigation={navigation} />
        </View>
    )
}

const Header = ({ navigation }) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={{ uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png" }} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
        <Text></Text>
    </View>
)

export default AddNewPost

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingTop: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
    },
    headerText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
        marginRight: 27.5
    }
})