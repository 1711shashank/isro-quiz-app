import AsyncStorage from '@react-native-async-storage/async-storage';

export interface QuizResult {
    id: string;
    subject: string;
    difficulty: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    date: string;
    timeSpent: number; // in seconds
}

export interface UserProgress {
    totalQuizzesTaken: number;
    averageScore: number;
    bestScore: number;
    totalTimeSpent: number;
    subjectsMastered: string[];
    difficultyProgress: {
        easy: number;
        medium: number;
        hard: number;
    };
}

const QUIZ_RESULTS_KEY = 'quiz_results';
const USER_PROGRESS_KEY = 'user_progress';

export const saveQuizResult = async (result: QuizResult): Promise<void> => {
    try {
        const existingResults = await getQuizResults();
        const updatedResults = [...existingResults, result];
        await AsyncStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(updatedResults));
        
        // Update user progress
        await updateUserProgress(result);
    } catch (error) {
        console.error('Error saving quiz result:', error);
    }
};

export const getQuizResults = async (): Promise<QuizResult[]> => {
    try {
        const results = await AsyncStorage.getItem(QUIZ_RESULTS_KEY);
        return results ? JSON.parse(results) : [];
    } catch (error) {
        console.error('Error getting quiz results:', error);
        return [];
    }
};

export const getUserProgress = async (): Promise<UserProgress> => {
    try {
        const progress = await AsyncStorage.getItem(USER_PROGRESS_KEY);
        if (progress) {
            return JSON.parse(progress);
        }
        
        // Return default progress if none exists
        return {
            totalQuizzesTaken: 0,
            averageScore: 0,
            bestScore: 0,
            totalTimeSpent: 0,
            subjectsMastered: [],
            difficultyProgress: {
                easy: 0,
                medium: 0,
                hard: 0
            }
        };
    } catch (error) {
        console.error('Error getting user progress:', error);
        return {
            totalQuizzesTaken: 0,
            averageScore: 0,
            bestScore: 0,
            totalTimeSpent: 0,
            subjectsMastered: [],
            difficultyProgress: {
                easy: 0,
                medium: 0,
                hard: 0
            }
        };
    }
};

const updateUserProgress = async (newResult: QuizResult): Promise<void> => {
    try {
        const currentProgress = await getUserProgress();
        const allResults = await getQuizResults();
        
        const updatedProgress: UserProgress = {
            totalQuizzesTaken: allResults.length,
            averageScore: allResults.reduce((sum, result) => sum + result.percentage, 0) / allResults.length,
            bestScore: Math.max(currentProgress.bestScore, newResult.percentage),
            totalTimeSpent: allResults.reduce((sum, result) => sum + result.timeSpent, 0),
            subjectsMastered: getSubjectsMastered(allResults),
            difficultyProgress: getDifficultyProgress(allResults)
        };
        
        await AsyncStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(updatedProgress));
    } catch (error) {
        console.error('Error updating user progress:', error);
    }
};

const getSubjectsMastered = (results: QuizResult[]): string[] => {
    const subjectScores: { [key: string]: number[] } = {};
    
    results.forEach(result => {
        if (!subjectScores[result.subject]) {
            subjectScores[result.subject] = [];
        }
        subjectScores[result.subject].push(result.percentage);
    });
    
    const masteredSubjects: string[] = [];
    Object.entries(subjectScores).forEach(([subject, scores]) => {
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        if (averageScore >= 80 && scores.length >= 3) {
            masteredSubjects.push(subject);
        }
    });
    
    return masteredSubjects;
};

const getDifficultyProgress = (results: QuizResult[]): { easy: number; medium: number; hard: number } => {
    const difficultyScores: { [key: string]: number[] } = { easy: [], medium: [], hard: [] };
    
    results.forEach(result => {
        if (difficultyScores[result.difficulty]) {
            difficultyScores[result.difficulty].push(result.percentage);
        }
    });
    
    return {
        easy: difficultyScores.easy.length > 0 ? 
            difficultyScores.easy.reduce((sum, score) => sum + score, 0) / difficultyScores.easy.length : 0,
        medium: difficultyScores.medium.length > 0 ? 
            difficultyScores.medium.reduce((sum, score) => sum + score, 0) / difficultyScores.medium.length : 0,
        hard: difficultyScores.hard.length > 0 ? 
            difficultyScores.hard.reduce((sum, score) => sum + score, 0) / difficultyScores.hard.length : 0
    };
};

export const clearAllData = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(QUIZ_RESULTS_KEY);
        await AsyncStorage.removeItem(USER_PROGRESS_KEY);
    } catch (error) {
        console.error('Error clearing data:', error);
    }
};
