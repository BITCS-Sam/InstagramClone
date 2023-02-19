import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { firebase, db } from '../../firebase'



const SignUpForm = ({ navigation }) => {


    const SignUpFormSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        username: Yup.string().required("Username is required").min(2, "A username should be between more than 3"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required")
    })

    const getRandomProfilePicture = async () => {
        const response = await fetch("https://randomuser.me/api")
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignUp = async (email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log("SignUpForm:[28] -> onSingUp[Success]:: SignUp Successfully")

            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: email,
                profilePicture: await getRandomProfilePicture(),
            }).then(() => {
                console.log("SignUpForm:[36] -> collection[Success]:: User Added Successfully",)
            }).catch((error) => {
                console.log("SignUpForm:[38] -> collection[Error]:: ", error.code, error.message)
            })
        } catch {
            console.log("SignUpForm:[41] -> onSingUp[Error]:: ", error.code, error.message)
            Alert.alert("🔥 Ohh!...", error.message + "\n\n... Please Try after some time ⌚")
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", password: "", username: "" }}
                onSubmit={(values) => { onSignUp(values.email, values.password, values.username) }}
                validationSchema={SignUpFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={[styles.inputField,
                        { borderColor: values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : "red" }
                        ]}>
                            <TextInput placeholderTextColor='#444' placeholder='Email' autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoFocus={true} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
                        </View>

                        <View style={[styles.inputField,
                        { borderColor: 1 > values.username.length || values.username.length >= 3 ? "#ccc" : "red" }
                        ]}>
                            <TextInput placeholderTextColor='#444' placeholder='Username' autoCapitalize='none' textContentType='username' onChangeText={handleChange('username')} onBlur={handleBlur('username')} value={values.username} />
                        </View>

                        <View style={[styles.inputField,
                        {
                            borderColor: 1 > values.password.length || values.password.length >= 6 ? "#ccc" : "red"
                        }]}>
                            <TextInput placeholderTextColor='#444' placeholder='Password' autoCapitalize='none' autoCorrect={false} secureTextEntry={true} textContentType='password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                        </View>

                        <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
                            <Text style={{ color: "#6bb0f5" }}>Forgot Password?</Text>
                        </View>

                        <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} >
                            <Text style={styles.buttonText}>Sign up</Text>
                        </Pressable>

                        <View style={styles.signUpContainer}>
                            <Text>Already An account</Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: "#6bb0f5" }}> Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#fafafa",
        marginBottom: 10,
        borderWidth: 1,
    },
    button: (isValid) => ({
        backgroundColor: isValid ? "#0096f6" : "#9acaf7",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        borderRadius: 4,
    }),
    buttonText: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 16
    },
    signUpContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 50,
    }
})

export default SignUpForm