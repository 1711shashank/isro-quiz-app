import React, { useState } from "react";
import { vhUnit } from "@/utils/Dimensions";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { TextInput, StyleSheet, KeyboardAvoidingView, Platform, View, Keyboard, TouchableOpacity, Alert } from "react-native";
import { theme } from "@/constants/AppTheme";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Handle Login/Register
    const handleAuth = async () => {
        try {
            if (isLogin) {
                if (!email.trim() || !phone.trim()) {
                    Alert.alert("Error", "Please fill in all fields");
                    return;
                }
            } else {
                if (!name.trim() || !email.trim() || !phone.trim()) {
                    Alert.alert("Error", "Please fill in all fields");
                    return;
                }
            }

            Keyboard.dismiss();

            // Simulate authentication success
            Alert.alert(
                "Success",
                isLogin ? "Login successful!" : "Registration successful!",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace("/(app)/(tabs)")
                    }
                ]
            );
        } catch (error) {
            console.log('error', error);
            Alert.alert("Error", "Authentication failed. Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={-100}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Ionicons name="rocket" size={60} color="white" />
                </View>
                <CustomText text="ISRO Knowledge Hub" style={styles.appTitle} />
                <CustomText text={isLogin ? "Welcome back!" : "Join us to explore space!"} style={styles.subtitle} />
            </View>

            <View style={styles.formContainer}>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity style={[styles.toggleButton, isLogin && styles.activeToggle]} onPress={() => setIsLogin(true)}>
                        <CustomText text="Login" style={[styles.toggleText, ...(isLogin ? [styles.activeToggleText] : [])]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toggleButton, !isLogin && styles.activeToggle]} onPress={() => setIsLogin(false)}>
                        <CustomText text="Register" style={[styles.toggleText, ...(!isLogin ? [styles.activeToggleText] : [])]} />
                    </TouchableOpacity>
                </View>

                {!isLogin && (
                    <View style={styles.inputContainer}>
                        <CustomText text="Full Name" style={styles.inputLabel} />
                        <TextInput
                            value={name}
                            autoCorrect={false}
                            autoCapitalize="words"
                            onChangeText={setName}
                            style={styles.textInput}
                            placeholder="Enter your full name"
                            placeholderTextColor={theme.secondaryTextColor}
                        />
                    </View>
                )}

                <View style={styles.inputContainer}>
                    <CustomText text="Email" style={styles.inputLabel} />
                    <TextInput
                        value={email}
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        style={styles.textInput}
                        placeholder="Enter your email"
                        placeholderTextColor={theme.secondaryTextColor}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <CustomText text="Phone Number" style={styles.inputLabel} />
                    <View style={styles.phoneInputRow}>
                        <View style={styles.countryCodeBox}>
                            <CustomText text="+91" style={styles.countryCode} />
                        </View>
                        <TextInput
                            value={phone}
                            maxLength={10}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="phone-pad"
                            onChangeText={setPhone}
                            style={styles.phoneInput}
                            placeholder="Enter phone number"
                            placeholderTextColor={theme.secondaryTextColor}
                        />
                    </View>
                </View>

                <CustomButton
                    title={isLogin ? "Login" : "Register"}
                    onPress={handleAuth}
                    style={styles.authButton}
                    disabled={isLogin ? (!email.trim() || !phone.trim()) : (!name.trim() || !email.trim() || !phone.trim())}
                />

                <TouchableOpacity style={styles.guestButton} onPress={() => router.replace("/(app)/(tabs)")}>
                    <CustomText text="Continue as Guest" style={styles.guestButtonText} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.screenBgColor
    },
    header: {
        backgroundColor: theme.primaryColor,
        padding: 20 * vhUnit,
        paddingTop: 80 * vhUnit,
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 16 * vhUnit,
    },
    appTitle: {
        fontSize: 28 * vhUnit,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8 * vhUnit,
    },
    subtitle: {
        fontSize: 16 * vhUnit,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        padding: 20 * vhUnit,
        paddingTop: 30 * vhUnit,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: theme.fadedbgColor,
        borderRadius: 12 * vhUnit,
        padding: 4 * vhUnit,
        marginBottom: 30 * vhUnit,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12 * vhUnit,
        borderRadius: 8 * vhUnit,
        alignItems: 'center',
    },
    activeToggle: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toggleText: {
        fontSize: 16 * vhUnit,
        fontWeight: '500',
        color: theme.secondaryTextColor,
    },
    activeToggleText: {
        color: theme.primaryColor,
    },
    inputContainer: {
        marginBottom: 20 * vhUnit,
    },
    inputLabel: {
        fontSize: 16 * vhUnit,
        fontWeight: '500',
        color: theme.primaryTextColor,
        marginBottom: 8 * vhUnit,
    },
    textInput: {
        fontSize: 16 * vhUnit,
        height: 56 * vhUnit,
        paddingHorizontal: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
        borderWidth: 1,
        color: theme.primaryTextColor,
        borderColor: theme.borderColor,
        backgroundColor: 'white',
    },
    phoneInputRow: {
        flexDirection: 'row',
        gap: 12 * vhUnit,
    },
    countryCodeBox: {
        height: 56 * vhUnit,
        paddingHorizontal: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: theme.borderColor,
        backgroundColor: 'white',
    },
    countryCode: {
        fontSize: 16 * vhUnit,
        color: theme.primaryTextColor,
    },
    phoneInput: {
        flex: 1,
        fontSize: 16 * vhUnit,
        height: 56 * vhUnit,
        paddingHorizontal: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
        borderWidth: 1,
        color: theme.primaryTextColor,
        borderColor: theme.borderColor,
        backgroundColor: 'white',
    },
    authButton: {
        backgroundColor: theme.primaryColor,
        marginTop: 10 * vhUnit,
        marginBottom: 20 * vhUnit,
    },
    guestButton: {
        alignItems: 'center',
        paddingVertical: 16 * vhUnit,
    },
    guestButtonText: {
        fontSize: 16 * vhUnit,
        color: theme.secondaryTextColor,
        textDecorationLine: 'underline',
    },
});
