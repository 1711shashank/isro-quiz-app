import React from 'react';
import { router } from 'expo-router';
import { vhUnit } from '@/utils/Dimensions';
import { theme } from '@/constants/AppTheme';
import CustomText from '@/components/CustomText';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '@/components/CustomButton';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MCQHomeScreen = () => {
    const subjects = [
        {
            id: 'spacecrafts',
            title: 'Spacecrafts',
            description: 'Learn about ISRO spacecrafts and missions',
            icon: <FontAwesome6 name="rocket" size={24} color="white" />,
            color: '#FF6B6B'
        },
        {
            id: 'launchers',
            title: 'Launch Vehicles',
            description: 'Explore ISRO launch vehicles and rockets',
            icon: <FontAwesome6 name="business-time" size={24} color="white" />,
            color: '#4ECDC4'
        },
        {
            id: 'satellites',
            title: 'Customer Satellites',
            description: 'Discover customer satellites launched by ISRO',
            icon: <FontAwesome6 name="satellite" size={24} color="white" />,
            color: '#45B7D1'
        }
    ];

    const difficultyLevels = [
        { id: 'easy', title: 'Easy', color: '#16A149' },
        { id: 'medium', title: 'Medium', color: '#F39C12' },
        { id: 'hard', title: 'Hard', color: '#E74C3C' }
    ];

    const handleStartQuiz = (subject: string, difficulty: string) => {
        router.push({
            pathname: '/(app)/(tabs)/(mcq)/quiz',
            params: { subject, difficulty }
        });
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <CustomText text="ISRO MCQ Quiz" style={styles.title} />
                <CustomText text="Test your knowledge about Indian Space Research Organisation" style={styles.subtitle} />
            </View>

            <ScrollView>
                <View style={styles.section}>
                    <CustomText text="Choose Subject" style={styles.sectionTitle} />
                    {subjects.map((subject) => (
                        <TouchableOpacity
                            key={subject.id}
                            style={[styles.subjectCard, { borderLeftColor: subject.color }]}
                            onPress={() => handleStartQuiz(subject.id, 'easy')}
                        >
                            <View style={styles.subjectContent}>
                                <View style={[styles.iconContainer, { backgroundColor: subject.color }]}>
                                    {subject.icon}
                                </View>
                                <View style={styles.subjectInfo}>
                                    <CustomText text={subject.title} style={styles.subjectTitle} />
                                    <CustomText text={subject.description} style={styles.subjectDescription} />
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={theme.secondaryTextColor} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.section}>
                    <CustomText text="Difficulty Levels" style={styles.sectionTitle} />
                    <View style={styles.difficultyContainer}>
                        {difficultyLevels.map((level) => (
                            <View key={level.id} style={styles.difficultyCard}>
                                <View style={[styles.difficultyIndicator, { backgroundColor: level.color }]} />
                                <CustomText text={level.title} style={styles.difficultyTitle} />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <CustomText text="Quick Start" style={styles.sectionTitle} />
                    <CustomButton title="Start Random Quiz" onPress={() => handleStartQuiz('random', 'mixed')} />
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.progressButton} onPress={() => router.push("/(app)/(tabs)/(mcq)/progress")}>
                        <View style={styles.progressButtonContent}>
                            <Ionicons name="stats-chart" size={24} color="white" />
                            <View style={styles.progressButtonText}>
                                <CustomText text="View Progress" style={styles.progressButtonTitle} />
                                <CustomText text="Track your learning journey" style={styles.progressButtonSubtitle} />
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.screenBgColor,
    },
    header: {
        padding: 20 * vhUnit,
        paddingTop: 80 * vhUnit,
        alignItems: 'center',
        backgroundColor: theme.primaryColor,
    },
    title: {
        fontSize: 28 * vhUnit,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8 * vhUnit,
    },
    subtitle: {
        fontSize: 16 * vhUnit,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 22 * vhUnit,
    },
    section: {
        padding: 20 * vhUnit,
    },
    sectionTitle: {
        fontSize: 20 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 15 * vhUnit,
    },
    subjectCard: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        marginBottom: 12 * vhUnit,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    subjectContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16 * vhUnit,
    },
    iconContainer: {
        width: 48 * vhUnit,
        height: 48 * vhUnit,
        borderRadius: 24 * vhUnit,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16 * vhUnit,
    },
    subjectInfo: {
        flex: 1,
    },
    subjectTitle: {
        fontSize: 18 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 4 * vhUnit,
    },
    subjectDescription: {
        fontSize: 14 * vhUnit,
        color: theme.secondaryTextColor,
        lineHeight: 20 * vhUnit,
    },
    difficultyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    difficultyCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 16 * vhUnit,
        alignItems: 'center',
        marginHorizontal: 4 * vhUnit,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    difficultyIndicator: {
        width: 12 * vhUnit,
        height: 12 * vhUnit,
        borderRadius: 6 * vhUnit,
        marginBottom: 8 * vhUnit,
    },
    difficultyTitle: {
        fontSize: 14 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
    },
    progressButton: {
        backgroundColor: theme.secondaryColor,
        borderRadius: 12 * vhUnit,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    progressButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16 * vhUnit,
    },
    progressButtonText: {
        flex: 1,
        marginLeft: 12 * vhUnit,
    },
    progressButtonTitle: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: 'white',
        marginBottom: 2 * vhUnit,
    },
    progressButtonSubtitle: {
        fontSize: 12 * vhUnit,
        color: 'rgba(255, 255, 255, 0.8)',
    },
});

export default MCQHomeScreen;
