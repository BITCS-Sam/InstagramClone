import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

import { firebase } from '../../firebase'



const LoginForm = ({ navigation }) => {


    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required")
    })

    const onLogin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log("LoginForm:[22] -> onLogin[Success]:: Login Done 🔥")
        }).catch((error) => {
            Alert.alert("🔥 Ohh!...", error.message + "\n\n... What you like to do next 👀", [
                {
                    text: "Ok",
                    onPress: () => console.log("LoginForm:[27] -> AlertMessage[Okay]:: Okay Pressed"),
                    style: "cancel"
                },
                {
                    text: "Sign Up",
                    onPress: () => navigation.push("SignUpScreen")
                }
            ])
            console.log("LoginForm:[35] -> onLogin[Error]:: ", error.code, error.message)
        })
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={[styles.inputField,
                        { borderColor: values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : "red" }
                        ]}>
                            <TextInput placeholderTextColor='#444' placeholder='Phone number, username or email' autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoFocus={true} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
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
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <View style={styles.signUpContainer}>
                            <Text>Don't Have an account</Text>
                            <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                                <Text style={{ color: "#6bb0f5" }}> Sign Up</Text>
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

export default LoginForm