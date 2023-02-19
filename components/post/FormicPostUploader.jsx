import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from "yup"
import { Formik } from 'formik'
import validUrl from "valid-url"
import { Divider } from 'react-native-elements'
import { firebase, db } from '../../firebase'

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'


const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is Required"),
    caption: Yup.string().max(2200, "Caption has reached the character limit")
})

const FormicPostUploader = ({ navigation }) => {

    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)


    const getUserName = () => {
        const user = firebase.auth().currentUser

        // console.log(db.collection('users').where('owner_uid', '==', user.uid).limit(1))

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

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add({
            imageUrl: imageUrl,
            username: currentLoggedInUser.username,
            profilePicture: currentLoggedInUser.profilePicture,
            owner_uid: firebase.auth().currentUser.uid,
            owner_email: firebase.auth().currentUser.email,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users: [],
            comments: []
        }).then(() => navigation.goBack())

        return unsubscribe
    }

    return (
        <Formik
            initialValues={{ imageUrl: "", caption: "" }}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <>
                    <View style={styles.container}>
                        <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput placeholder='Write a Caption...' placeholderTextColor='gray' multiline={true} style={{ color: "white", fontSize: 16 }} onChangeText={handleChange('caption')} onBlur={handleBlur('caption')} value={values.caption} />
                        </View>
                    </View>
                    <Divider width={0.5} orientation='vertical' />
                    <TextInput placeholder='Enter Image URL' placeholderTextColor='gray' style={{ color: "white" }} onChangeText={handleChange('imageUrl')} onBlur={handleBlur('imageUrl')} value={values.imageUrl} onChange={(e) => setThumbnailUrl(e.nativeEvent.text)} />
                    {errors.imageUrl && (
                        <Text style={{ color: "red", fontSize: 12 }}>{errors.imageUrl}</Text>
                    )}
                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                </>
            )}
        </Formik>
    )
}

export default FormicPostUploader

const styles = StyleSheet.create({
    container: {
        margin: 20,
        justifyContent: "space-between",
        flexDirection: 'row'
    }
})