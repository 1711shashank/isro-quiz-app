import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { vhUnit } from '@/utils/Dimensions';
import { theme } from '@/constants/AppTheme';
import CustomText from '@/components/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';

const ResultsScreen = () => {
    const { score, total, subject, difficulty } = useLocalSearchParams();

    const scoreNum = parseInt(score as string);
    const totalNum = parseInt(total as string);
    const percentage = Math.round((scoreNum / totalNum) * 100);

    const getScoreMessage = () => {
        if (percentage >= 90) return "Outstanding! You're an ISRO expert! ";
        if (percentage >= 80) return "Excellent! Great knowledge of ISRO! ";
        if (percentage >= 70) return "Good job! You know your space facts! ";
        if (percentage >= 60) return "Not bad! Keep learning about ISRO! ";
        return "Keep studying! ISRO has amazing achievements to discover! ";
    };

    const getScoreColor = () => {
        if (percentage >= 80) return theme.greenColor;
        if (percentage >= 60) return '#F39C12';
        return theme.redColor;
    };

    const handleGoHome = () => {
        router.replace('/(app)/(tabs)/(mcq)')
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoHome} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <CustomText text="Quiz Results" style={styles.headerTitle} />
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content}>
                {/* Score Circle */}
                <View style={styles.scoreContainer}>
                    <View style={[styles.scoreCircle, { borderColor: getScoreColor() }]}>
                        <CustomText
                            text={`${percentage}%`}
                            style={[styles.scoreText, { color: getScoreColor() }]}
                        />
                        <CustomText
                            text={`${scoreNum}/${totalNum}`}
                            style={styles.scoreSubtext}
                        />
                    </View>
                </View>

                {/* Score Message */}
                <View style={styles.messageContainer}>
                    <CustomText
                        text={getScoreMessage()}
                        style={styles.messageText}
                    />
                </View>

                {/* Quiz Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Ionicons name="book" size={20} color={theme.primaryColor} />
                        <CustomText text="Subject:" style={styles.detailLabel} />
                        <CustomText
                            text={subject === 'spacecrafts' ? 'Spacecrafts' :
                                subject === 'launchers' ? 'Launch Vehicles' :
                                    subject === 'satellites' ? 'Customer Satellites' : 'Mixed'}
                            style={styles.detailValue}
                        />
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="trending-up" size={20} color={theme.primaryColor} />
                        <CustomText text="Difficulty:" style={styles.detailLabel} />
                        <CustomText
                            text={difficulty === 'easy' ? 'Easy' :
                                difficulty === 'medium' ? 'Medium' :
                                    difficulty === 'hard' ? 'Hard' : 'Mixed'}
                            style={styles.detailValue}
                        />
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="time" size={20} color={theme.primaryColor} />
                        <CustomText text="Questions:" style={styles.detailLabel} />
                        <CustomText text={totalNum.toString()} style={styles.detailValue} />
                    </View>
                </View>

                {/* Performance Breakdown */}
                <View style={styles.breakdownContainer}>
                    <CustomText text="Performance Breakdown" style={styles.breakdownTitle} />
                    <View style={styles.breakdownItem}>
                        <View style={styles.breakdownLabel}>
                            <View style={[styles.breakdownIndicator, { backgroundColor: theme.greenColor }]} />
                            <CustomText text="Correct Answers" style={styles.breakdownText} />
                        </View>
                        <CustomText text={scoreNum.toString()} style={styles.breakdownValue} />
                    </View>
                    <View style={styles.breakdownItem}>
                        <View style={styles.breakdownLabel}>
                            <View style={[styles.breakdownIndicator, { backgroundColor: theme.redColor }]} />
                            <CustomText text="Incorrect Answers" style={styles.breakdownText} />
                        </View>
                        <CustomText text={(totalNum - scoreNum).toString()} style={styles.breakdownValue} />
                    </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5 * vhUnit,
        paddingTop: 60 * vhUnit,
        backgroundColor: theme.primaryColor,
    },
    backButton: {
        padding: 8 * vhUnit,
    },
    headerTitle: {
        fontSize: 20 * vhUnit,
        fontWeight: '600',
        color: 'white',
    },
    placeholder: {
        width: 40 * vhUnit,
    },
    content: {
        flex: 1,
        padding: 20 * vhUnit,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 30 * vhUnit,
    },
    scoreCircle: {
        width: 150 * vhUnit,
        height: 150 * vhUnit,
        borderRadius: 75 * vhUnit,
        borderWidth: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    scoreText: {
        fontSize: 36 * vhUnit,
        fontWeight: 'bold',
    },
    scoreSubtext: {
        fontSize: 16 * vhUnit,
        color: theme.secondaryTextColor,
        marginTop: 4 * vhUnit,
    },
    messageContainer: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 20 * vhUnit,
        marginBottom: 20 * vhUnit,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    messageText: {
        fontSize: 18 * vhUnit,
        textAlign: 'center',
        color: theme.primaryTextColor,
        lineHeight: 26 * vhUnit,
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 20 * vhUnit,
        marginBottom: 20 * vhUnit,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12 * vhUnit,
    },
    detailLabel: {
        fontSize: 16 * vhUnit,
        color: theme.secondaryTextColor,
        marginLeft: 12 * vhUnit,
        marginRight: 8 * vhUnit,
    },
    detailValue: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
    },
    breakdownContainer: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 20 * vhUnit,
        marginBottom: 30 * vhUnit,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    breakdownTitle: {
        fontSize: 18 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 16 * vhUnit,
    },
    breakdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12 * vhUnit,
    },
    breakdownLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breakdownIndicator: {
        width: 12 * vhUnit,
        height: 12 * vhUnit,
        borderRadius: 6 * vhUnit,
        marginRight: 12 * vhUnit,
    },
    breakdownText: {
        fontSize: 16 * vhUnit,
        color: theme.primaryTextColor,
    },
    breakdownValue: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
    },
    actionsContainer: {
        gap: 12 * vhUnit,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
        borderWidth: 2,
        borderColor: theme.primaryColor,
        backgroundColor: 'white',
    },
    shareButtonText: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.primaryColor,
        marginLeft: 8 * vhUnit,
    },
    retakeButton: {
        backgroundColor: theme.primaryColor,
    },
    homeButton: {
        backgroundColor: theme.secondaryTextColor,
    },
});

export default ResultsScreen;
