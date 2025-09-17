import React from 'react';
import { Stack } from 'expo-router';

export default function MCQLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="quiz" />
            <Stack.Screen name="results" />
            <Stack.Screen name="progress" />
        </Stack>
    );
}
