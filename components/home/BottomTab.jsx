import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import { firebase, db } from '../../firebase'

const BottomTab = ({ icons }) => {

    const [activeTab, setActiveTab] = useState("Home")
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUserName = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profilePicture
                })
            })
        )
        return unsubscribe
    }

    useEffect(() => {
        getUserName()
    }, [])


    const IconSub = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            {icon.name === "Profile" ? (
                <Image source={{ uri: currentLoggedInUser?.profilePicture }} style={[styles.icon, icon.name === "Profile" ? styles.profilePic() : null, activeTab === "Profile" && icon.name === activeTab ? styles.profilePic(activeTab) : null]} />
            ) : (
                <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }} style={[styles.icon, icon.name === "Profile" ? styles.profilePic() : null, activeTab === "Profile" && icon.name === activeTab ? styles.profilePic(activeTab) : null]} />
            )}
        </TouchableOpacity>
    )

    console.log(firebase.auth().currentUser)

    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <IconSub key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

export default BottomTab

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        zIndex: 999,
        backgroundColor: "#000"
    },

    icon: {
        width: 25, height: 25
    },
    container: {
        flexDirection: 'row',
        justifyContent: "space-around",
        height: 60,
        paddingTop: 12,
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === "Profile" ? 2 : 0,
        borderColor: "#fff",
    })
}) 