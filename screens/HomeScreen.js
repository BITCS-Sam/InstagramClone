import { SafeAreaView, StyleSheet, StatusBar, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTab from '../components/home/BottomTab'
import { bottomTabIcons } from '../data/justStore'
import { db } from '../firebase'


const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        db.collectionGroup('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(post => (
                { id: post.id, ...post.data() })))
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </ScrollView>
            <BottomTab icons={bottomTabIcons} />
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "black"
    },
})


export default HomeScreen