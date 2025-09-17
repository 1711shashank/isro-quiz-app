import React from 'react';
import { router } from 'expo-router';
import { vhUnit } from '@/utils/Dimensions';
import { theme } from '@/constants/AppTheme';
import CustomText from '@/components/CustomText';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '@/components/CustomButton';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
    const features = [
        {
            title: "MCQ Quiz",
            description: "Test your knowledge with interactive quizzes",
            icon: <FontAwesome6 name="book" size={24} color="white" />,
            color: "#FF6B6B",
            route: "/(app)/(tabs)/(mcq)/"
        },
        {
            title: "ISRO Learning",
            description: "Explore ISRO's missions and achievements",
            icon: <Ionicons name="book" size={24} color="white" />,
            color: "#4ECDC4",
            route: "/(app)/(tabs)/(learning)/"
        }
    ];

    const quickStats = [
        { label: "Questions", value: "40+" },
        { label: "Subjects", value: "3" },
        { label: "Difficulty", value: "3 Levels" }
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <CustomText text="Welcome to" style={styles.welcomeText} />
                    <CustomText text="ISRO Knowledge Hub" style={styles.appTitle} />
                    <CustomText
                        text="Discover India's space achievements and test your knowledge"
                        style={styles.subtitle}
                    />
                </View>
                <View style={styles.logoContainer}>
                    <Ionicons name="rocket" size={60} color="white" />
                </View>
            </View>
            <ScrollView>


                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    {quickStats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <CustomText text={stat.value} style={styles.statValue} />
                            <CustomText text={stat.label} style={styles.statLabel} />
                        </View>
                    ))}
                </View>

                {/* Main Features */}
                <View style={styles.featuresContainer}>
                    <CustomText text="Explore & Learn" style={styles.sectionTitle} />
                    {features.map((feature, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.featureCard, { borderLeftColor: feature.color }]}
                            onPress={() => router.push(feature.route as any)}
                        >
                            <View style={styles.featureContent}>
                                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                                    {feature.icon}
                                </View>
                                <View style={styles.featureInfo}>
                                    <CustomText text={feature.title} style={styles.featureTitle} />
                                    <CustomText text={feature.description} style={styles.featureDescription} />
                                </View>
                                <Ionicons name="chevron-forward" size={24} color={theme.secondaryTextColor} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ISRO Facts */}
                <View style={styles.factsContainer}>
                    <CustomText text="Did You Know?" style={styles.sectionTitle} />
                    <View style={styles.factCard}>
                        <Ionicons name="bulb" size={24} color="#F39C12" />
                        <CustomText
                            text="India became the first country to reach Mars orbit in its maiden attempt with Mangalyaan!"
                            style={styles.factText}
                        />
                    </View>
                    <View style={styles.factCard}>
                        <Ionicons name="trophy" size={24} color="#E74C3C" />
                        <CustomText
                            text="Chandrayaan-3 made India the first country to land on the Moon's south pole!"
                            style={styles.factText}
                        />
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                    <CustomButton
                        title="Start Quick Quiz"
                        onPress={() => router.push("/(app)/(tabs)/(mcq)")}
                        style={styles.primaryButton}
                    />
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.push("/(app)/(tabs)/(learning)")}
                    >
                        <CustomText text="Explore Learning" style={styles.secondaryButtonText} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.screenBgColor,
    },
    header: {
        backgroundColor: theme.primaryColor,
        padding: 20 * vhUnit,
        paddingTop: 60 * vhUnit,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContent: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 16 * vhUnit,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 4 * vhUnit,
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
        lineHeight: 22 * vhUnit,
    },
    logoContainer: {
        marginLeft: 20 * vhUnit,
    },
    statsContainer: {
        flexDirection: 'row',
        padding: 20 * vhUnit,
        gap: 12 * vhUnit,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 16 * vhUnit,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statValue: {
        fontSize: 24 * vhUnit,
        fontWeight: 'bold',
        color: theme.primaryColor,
        marginBottom: 4 * vhUnit,
    },
    statLabel: {
        fontSize: 14 * vhUnit,
        color: theme.secondaryTextColor,
        textAlign: 'center',
    },
    featuresContainer: {
        padding: 20 * vhUnit,
    },
    sectionTitle: {
        fontSize: 20 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 16 * vhUnit,
    },
    featureCard: {
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
    featureContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20 * vhUnit,
    },
    featureIcon: {
        width: 56 * vhUnit,
        height: 56 * vhUnit,
        borderRadius: 28 * vhUnit,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16 * vhUnit,
    },
    featureInfo: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 18 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 4 * vhUnit,
    },
    featureDescription: {
        fontSize: 14 * vhUnit,
        color: theme.secondaryTextColor,
        lineHeight: 20 * vhUnit,
    },
    factsContainer: {
        padding: 20 * vhUnit,
    },
    factCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 16 * vhUnit,
        marginBottom: 12 * vhUnit,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    factText: {
        flex: 1,
        fontSize: 14 * vhUnit,
        color: theme.primaryTextColor,
        lineHeight: 20 * vhUnit,
        marginLeft: 12 * vhUnit,
    },
    actionsContainer: {
        padding: 20 * vhUnit,
        gap: 12 * vhUnit,
    },
    primaryButton: {
        backgroundColor: theme.primaryColor,
    },
    secondaryButton: {
        paddingVertical: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
        borderWidth: 2,
        borderColor: theme.primaryColor,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.primaryColor,
    },
});
