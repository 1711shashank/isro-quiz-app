import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { vhUnit } from '@/utils/Dimensions';
import { theme } from '@/constants/AppTheme';
import CustomText from '@/components/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getUserProgress, getQuizResults, QuizResult, UserProgress } from '@/utils/quizStorage';

const ProgressScreen = () => {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [recentResults, setRecentResults] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        try {
            const [userProgress, quizResults] = await Promise.all([
                getUserProgress(),
                getQuizResults()
            ]);
            
            setProgress(userProgress);
            setRecentResults(quizResults.slice(-5).reverse()); // Last 5 results
        } catch (error) {
            console.error('Error loading progress data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const getScoreColor = (score: number) => {
        if (score >= 80) return theme.greenColor;
        if (score >= 60) return '#F39C12';
        return theme.redColor;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return theme.greenColor;
            case 'medium': return '#F39C12';
            case 'hard': return theme.redColor;
            default: return theme.primaryColor;
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <CustomText text="Loading progress..." />
            </View>
        );
    }

    if (!progress) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="stats-chart" size={64} color={theme.secondaryTextColor} />
                <CustomText text="No progress data available" style={styles.emptyText} />
                <CustomText text="Take some quizzes to see your progress!" style={styles.emptySubtext} />
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <CustomText text="Your Progress" style={styles.headerTitle} />
                <View style={styles.placeholder} />
            </View>

            {/* Overall Stats */}
            <View style={styles.section}>
                <CustomText text="Overall Statistics" style={styles.sectionTitle} />
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Ionicons name="trophy" size={32} color={theme.primaryColor} />
                        <CustomText text={progress.totalQuizzesTaken.toString()} style={styles.statValue} />
                        <CustomText text="Quizzes Taken" style={styles.statLabel} />
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="trending-up" size={32} color={theme.greenColor} />
                        <CustomText text={`${Math.round(progress.averageScore)}%`} style={styles.statValue} />
                        <CustomText text="Average Score" style={styles.statLabel} />
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="star" size={32} color="#F39C12" />
                        <CustomText text={`${progress.bestScore}%`} style={styles.statValue} />
                        <CustomText text="Best Score" style={styles.statLabel} />
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="time" size={32} color={theme.secondaryTextColor} />
                        <CustomText text={formatTime(progress.totalTimeSpent)} style={styles.statValue} />
                        <CustomText text="Total Time" style={styles.statLabel} />
                    </View>
                </View>
            </View>

            {/* Difficulty Progress */}
            <View style={styles.section}>
                <CustomText text="Difficulty Progress" style={styles.sectionTitle} />
                <View style={styles.difficultyContainer}>
                    {Object.entries(progress.difficultyProgress).map(([difficulty, score]) => (
                        <View key={difficulty} style={styles.difficultyCard}>
                            <View style={styles.difficultyHeader}>
                                <View style={[styles.difficultyIndicator, { backgroundColor: getDifficultyColor(difficulty) }]} />
                                <CustomText text={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} style={styles.difficultyTitle} />
                            </View>
                            <CustomText text={`${Math.round(score)}%`} style={[styles.difficultyScore, { color: getDifficultyColor(difficulty) }]} />
                        </View>
                    ))}
                </View>
            </View>

            {/* Mastered Subjects */}
            {progress.subjectsMastered.length > 0 && (
                <View style={styles.section}>
                    <CustomText text="Mastered Subjects" style={styles.sectionTitle} />
                    <View style={styles.masteredContainer}>
                        {progress.subjectsMastered.map((subject, index) => (
                            <View key={index} style={styles.masteredCard}>
                                <Ionicons name="checkmark-circle" size={20} color={theme.greenColor} />
                                <CustomText text={subject} style={styles.masteredText} />
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Recent Results */}
            {recentResults.length > 0 && (
                <View style={styles.section}>
                    <CustomText text="Recent Results" style={styles.sectionTitle} />
                    {recentResults.map((result, _index) => (
                        <View key={result.id} style={styles.resultCard}>
                            <View style={styles.resultHeader}>
                                <View style={styles.resultInfo}>
                                    <CustomText text={result.subject} style={styles.resultSubject} />
                                    <CustomText text={`${result.difficulty} • ${new Date(result.date).toLocaleDateString()}`} style={styles.resultMeta} />
                                </View>
                                <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(result.percentage) }]}>
                                    <CustomText text={`${result.percentage}%`} style={styles.scoreText} />
                                </View>
                            </View>
                            <View style={styles.resultDetails}>
                                <CustomText text={`${result.score}/${result.totalQuestions} correct`} style={styles.resultDetail} />
                                <CustomText text={formatTime(result.timeSpent)} style={styles.resultDetail} />
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => router.push("/(app)/(tabs)/(mcq)")}
                >
                    <Ionicons name="play" size={20} color="white" />
                    <CustomText text="Take New Quiz" style={styles.actionButtonText} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.screenBgColor,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.screenBgColor,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.screenBgColor,
        padding: 40 * vhUnit,
    },
    emptyText: {
        fontSize: 18 * vhUnit,
        fontWeight: '500',
        color: theme.primaryTextColor,
        marginTop: 16 * vhUnit,
        marginBottom: 8 * vhUnit,
    },
    emptySubtext: {
        fontSize: 14 * vhUnit,
        color: theme.secondaryTextColor,
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10 * vhUnit,
        paddingTop: 80 * vhUnit,
        backgroundColor: theme.primaryColor,
    },
    headerTitle: {
        fontSize: 20 * vhUnit,
        fontWeight: '600',
        color: 'white',
    },
    placeholder: {
    },
    section: {
        padding: 20 * vhUnit,
    },
    sectionTitle: {
        fontSize: 20 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 16 * vhUnit,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12 * vhUnit,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
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
        color: theme.primaryTextColor,
        marginTop: 8 * vhUnit,
        marginBottom: 4 * vhUnit,
    },
    statLabel: {
        fontSize: 12 * vhUnit,
        color: theme.secondaryTextColor,
        textAlign: 'center',
    },
    difficultyContainer: {
        gap: 12 * vhUnit,
    },
    difficultyCard: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 16 * vhUnit,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    difficultyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    difficultyIndicator: {
        width: 12 * vhUnit,
        height: 12 * vhUnit,
        borderRadius: 6 * vhUnit,
        marginRight: 12 * vhUnit,
    },
    difficultyTitle: {
        fontSize: 16 * vhUnit,
        fontWeight: '500',
        color: theme.primaryTextColor,
    },
    difficultyScore: {
        fontSize: 18 * vhUnit,
        fontWeight: 'bold',
    },
    masteredContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8 * vhUnit,
    },
    masteredCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.greenColor + '20',
        paddingHorizontal: 12 * vhUnit,
        paddingVertical: 6 * vhUnit,
        borderRadius: 20 * vhUnit,
    },
    masteredText: {
        fontSize: 14 * vhUnit,
        color: theme.greenColor,
        fontWeight: '500',
        marginLeft: 6 * vhUnit,
    },
    resultCard: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 16 * vhUnit,
        marginBottom: 12 * vhUnit,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8 * vhUnit,
    },
    resultInfo: {
        flex: 1,
    },
    resultSubject: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 2 * vhUnit,
    },
    resultMeta: {
        fontSize: 12 * vhUnit,
        color: theme.secondaryTextColor,
    },
    scoreBadge: {
        paddingHorizontal: 12 * vhUnit,
        paddingVertical: 4 * vhUnit,
        borderRadius: 12 * vhUnit,
    },
    scoreText: {
        fontSize: 14 * vhUnit,
        fontWeight: 'bold',
        color: 'white',
    },
    resultDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    resultDetail: {
        fontSize: 12 * vhUnit,
        color: theme.secondaryTextColor,
    },
    actionsContainer: {
        padding: 20 * vhUnit,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.primaryColor,
        paddingVertical: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
    },
    actionButtonText: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: 'white',
        marginLeft: 8 * vhUnit,
    },
});

export default ProgressScreen;
