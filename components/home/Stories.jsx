import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'

const Stories = () => {
    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {USERS.map((user, index) => (
                    <View key={index} style={styles.storyContainer}>
                        <Image source={{ uri: user.imageUri }} style={styles.storyImage} />
                        <Text style={{ color: "white" }}>{user.name.length > 11 ? user.name.slice(0, 11).toLocaleLowerCase + "..." : user.name.toLowerCase()}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    storyImage: {
        width: 60, height: 60, borderRadius: 50, borderWidth: 3, borderColor: 'red'
    },
    storyContainer: {
        alignItems: 'center', marginVertical: 10, marginLeft: 10
    }
})