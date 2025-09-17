import React from 'react';
import { Tabs } from 'expo-router';

import { vhUnit } from '@/utils/Dimensions';
import { Platform, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/constants/AppTheme';
import { FontAwesome6 } from '@expo/vector-icons';


export default function TabLayout() {

    const insets = useSafeAreaInsets();

    return (
        <>
            <View style={{ backgroundColor: theme.screenBgColor }} />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.primaryColor,
                    tabBarInactiveTintColor: theme.secondaryTextColor,
                    tabBarStyle: {
                        paddingTop: 10,
                        backgroundColor: theme.screenBgColor,
                        paddingBottom: Platform.OS === "android" ? 10 * vhUnit : 0,
                        height: Platform.OS === "android" ? 80 * vhUnit : 70 * vhUnit,

                        // shadow
                        elevation: 1,
                        shadowRadius: 100,
                        shadowOpacity: 0.3,
                        shadowColor: theme.secondaryColor,
                        shadowOffset: { width: 0, height: 5 },
                        borderTopWidth: 1,
                        borderTopColor: theme.borderColor,
                    },
                    tabBarLabelStyle: {
                        fontSize: 14 * vhUnit,
                        lineHeight: 20 * vhUnit,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <Ionicons size={28 * vhUnit} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="(learning)"
                    options={{
                        title: 'Learning',
                        tabBarIcon: ({ color }) => <Ionicons name="book" size={24 * vhUnit} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="(mcq)"
                    options={{
                        title: 'MCQ Quiz',
                        tabBarIcon: ({ color }) => <FontAwesome6 name="book" size={24 * vhUnit} color={color} />,
                    }}
                />
            </Tabs>
            <View style={{ paddingBottom: insets.bottom, backgroundColor: theme.screenBgColor }} />
        </>
    );
}
