/**
 * Perpose of this comp:
 * Using a reusable CustomText component ensures consistent typography,
 * responsive font scaling across devices, and centralized theme-based
 * styling, making the codebase cleaner, more maintainable, and less error-prone.
 */

import React from 'react';
import { vhUnit } from '@/utils/Dimensions';
import { Text, TextStyle } from 'react-native';
import { theme } from '@/constants/AppTheme';

export interface CustomTextProps {
    text: string | number;
    color?: 'primaryTextColor' | 'secondaryTextColor' | 'primaryColor' | 'whiteColor' | 'redColor' | 'greenColor';
    numberOfLines?: number;                             // Optional prop to restrict number of lines
    style?: TextStyle | TextStyle[];                    // Allow overriding or extending styles
    fontSize?: 12 | 14 | 16 | 20 | 24 | 32 | 40;        // Predefined font sizes for consistency
}

const CustomText: React.FC<CustomTextProps> = ({ text, color = 'primaryTextColor', fontSize = 14, numberOfLines = 5000, style = {} }) => {
    
    return (
        <>
            {text && (
                <Text
                    style={[{ fontSize: vhUnit * fontSize, color: theme[color] }, style]}
                    numberOfLines={numberOfLines}
                >
                    {text}
                </Text>
            )}
        </>
    );
};

export default CustomText;
