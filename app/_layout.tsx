/* eslint-disable react-hooks/rules-of-hooks */
import { View } from 'react-native'
import { getLocalStorage } from "@/utils/utils";
import React, { useLayoutEffect, useState } from 'react';
import { Href, Redirect, Slot, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from "react-native-gesture-handler";


const _layout = () => {

    const [initialRoute, setInitialRoute] = useState<Href>("/");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const initializeApp = async () => {
        try {
            const token = await getLocalStorage('authToken');

            if (token) {
                setInitialRoute('/(app)/(tabs)')
            } else {
                setInitialRoute('/(auth)')
            }

            setIsAuthenticated(!!token);

        } catch (error) {
            console.log('initializeApp', error);
        } finally {
            await new Promise(resolve => setTimeout(resolve, 2500));
            await SplashScreen.hideAsync();
        }
    }

    useLayoutEffect(() => {
        initializeApp();
    }, [])

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={{ flex: 1 }} >
                    {!isAuthenticated && <Redirect href={initialRoute} />}
                    <Slot screenOptions={{ headerShown: false }} />
                </View>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}

export default _layout