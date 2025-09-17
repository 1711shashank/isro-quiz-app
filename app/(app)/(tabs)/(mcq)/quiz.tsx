/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { vhUnit } from '@/utils/Dimensions';
import { theme } from '@/constants/AppTheme';
import CustomText from '@/components/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { saveQuizResult } from '@/utils/quizStorage';
import { questionsData } from '@/constants/questionsData';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

const QuizScreen = () => {
    const { subject, difficulty } = useLocalSearchParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
    const [questions, setQuestions] = useState<Question[]>([]);
    const [startTime, setStartTime] = useState<number>(Date.now());

    useEffect(() => {
        // Filter questions based on subject and difficulty
        let filteredQuestions = questionsData;

        if (subject !== 'random') {
            filteredQuestions = filteredQuestions.filter(q => q.subject === subject);
        }

        if (difficulty !== 'mixed') {
            filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
        }

        // Shuffle and take 10 questions
        const shuffled = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffled);
    }, [subject, difficulty]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNextQuestion();
        }
    }, [timeLeft]);

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = async () => {
        if (selectedAnswer !== null) {
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedAnswer === currentQuestion.correctAnswer) {
                setScore(score + 1);
            }
            setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
        } else {
            // Quiz completed - save result
            const endTime = Date.now();
            const timeSpent = Math.floor((endTime - startTime) / 1000);
            const percentage = Math.round((score / questions.length) * 100);

            const quizResult = {
                id: Date.now().toString(),
                subject: subject as string,
                difficulty: difficulty as string,
                score: score,
                totalQuestions: questions.length,
                percentage: percentage,
                date: new Date().toISOString(),
                timeSpent: timeSpent
            };

            await saveQuizResult(quizResult);

            router.push({
                pathname: '/(app)/(tabs)/(mcq)/results',
                params: {
                    score: score.toString(),
                    total: questions.length.toString(),
                    subject: subject as string,
                    difficulty: difficulty as string
                }
            });
        }
    };

    const handleSkipQuestion = async () => {
        setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
        } else {
            // Quiz completed - save result
            const endTime = Date.now();
            const timeSpent = Math.floor((endTime - startTime) / 1000);
            const percentage = Math.round((score / questions.length) * 100);

            const quizResult = {
                id: Date.now().toString(),
                subject: subject as string,
                difficulty: difficulty as string,
                score: score,
                totalQuestions: questions.length,
                percentage: percentage,
                date: new Date().toISOString(),
                timeSpent: timeSpent
            };

            await saveQuizResult(quizResult);

            router.push({
                pathname: '/(app)/(tabs)/(mcq)/results',
                params: {
                    score: score.toString(),
                    total: questions.length.toString(),
                    subject: subject as string,
                    difficulty: difficulty as string
                }
            });
        }
    };

    if (questions.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <CustomText text="Loading questions..." />
            </View>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <CustomText
                        text={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
                        style={styles.headerTitle}
                    />
                    <CustomText
                        text={`${currentQuestion.subject} • ${currentQuestion.difficulty}`}
                        style={styles.headerSubtitle}
                    />
                </View>
                <View style={styles.timerContainer}>
                    <Ionicons name="time" size={20} color="white" />
                    <CustomText text={`${timeLeft}s`} style={styles.timerText} />
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>

            <ScrollView style={styles.content}>
                {/* Question */}
                <View style={styles.questionContainer}>
                    <CustomText
                        text={currentQuestion.question}
                        style={styles.questionText}
                    />
                </View>

                {/* Options */}
                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedAnswer === index && styles.selectedOption
                            ]}
                            onPress={() => handleAnswerSelect(index)}
                        >
                            <View style={styles.optionContent}>
                                <View style={[
                                    styles.optionIndicator,
                                    selectedAnswer === index && styles.selectedIndicator
                                ]}>
                                    <CustomText
                                        text={String.fromCharCode(65 + index)}
                                        style={[
                                            styles.optionLetter,
                                            selectedAnswer === index ? { color: 'white' } : {}
                                        ]}
                                    />
                                </View>
                                <CustomText
                                    text={option}
                                    style={[
                                        styles.optionText,
                                        selectedAnswer === index ? { color: theme.primaryColor } : {}
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.skipButton} onPress={handleSkipQuestion}>
                    <CustomText text="Skip" style={styles.skipButtonText} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        selectedAnswer === null && styles.disabledButton
                    ]}
                    onPress={handleNextQuestion}
                    disabled={selectedAnswer === null}
                >
                    <CustomText
                        text={currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                        style={[
                            styles.nextButtonText,
                            selectedAnswer === null ? { color: theme.secondaryTextColor } : {}
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20 * vhUnit,
        backgroundColor: theme.primaryColor,
        paddingTop: 80 * vhUnit,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 16 * vhUnit,
    },
    headerTitle: {
        fontSize: 18 * vhUnit,
        fontWeight: '600',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 14 * vhUnit,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 2 * vhUnit,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12 * vhUnit,
        paddingVertical: 6 * vhUnit,
        borderRadius: 20 * vhUnit,
    },
    timerText: {
        fontSize: 14 * vhUnit,
        fontWeight: '600',
        color: 'white',
        marginLeft: 4 * vhUnit,
    },
    progressContainer: {
        height: 4 * vhUnit,
        backgroundColor: theme.borderColor,
    },
    progressBar: {
        height: '100%',
        backgroundColor: theme.primaryColor,
    },
    content: {
        flex: 1,
        padding: 20 * vhUnit,
    },
    questionContainer: {
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
    questionText: {
        fontSize: 18 * vhUnit,
        lineHeight: 26 * vhUnit,
        color: theme.primaryTextColor,
        fontWeight: '500',
    },
    optionsContainer: {
        gap: 12 * vhUnit,
    },
    optionButton: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        borderWidth: 2,
        borderColor: theme.borderColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedOption: {
        borderColor: theme.primaryColor,
        backgroundColor: theme.primaryColor + '10',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16 * vhUnit,
    },
    optionIndicator: {
        width: 32 * vhUnit,
        height: 32 * vhUnit,
        borderRadius: 16 * vhUnit,
        backgroundColor: theme.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16 * vhUnit,
    },
    selectedIndicator: {
        backgroundColor: theme.primaryColor,
    },
    optionLetter: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.secondaryTextColor,
    },
    optionText: {
        flex: 1,
        fontSize: 16 * vhUnit,
        lineHeight: 22 * vhUnit,
        color: theme.primaryTextColor,
    },

    bottomActions: {
        flexDirection: 'row',
        padding: 20 * vhUnit,
        gap: 12 * vhUnit,
    },
    skipButton: {
        flex: 1,
        paddingVertical: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
        borderWidth: 2,
        borderColor: theme.borderColor,
        alignItems: 'center',
    },
    skipButtonText: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.secondaryTextColor,
    },
    nextButton: {
        flex: 2,
        paddingVertical: 16 * vhUnit,
        borderRadius: 12 * vhUnit,
        backgroundColor: theme.primaryColor,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: theme.borderColor,
    },
    nextButtonText: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: 'white',
    },
});

export default QuizScreen;
