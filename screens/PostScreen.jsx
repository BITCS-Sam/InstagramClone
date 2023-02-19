import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddNewPost from '../components/post/AddNewPost'

const PostScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <AddNewPost navigation={navigation} />
        </SafeAreaView>
    )
}

export default PostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "black"
    },
})