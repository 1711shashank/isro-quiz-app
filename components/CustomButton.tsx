/**
 * Purpose of this component:
 * A reusable CustomButton component that ensures consistent styling,
 * responsive sizing across devices, theme-based colors, and centralized
 * button behavior, making the codebase cleaner and more maintainable.
 */

import React from 'react';
import { vhUnit } from '@/utils/Dimensions';
import CustomText from '@/components/CustomText';
import { TouchableOpacity, ViewStyle, ActivityIndicator, View } from 'react-native';
import { theme } from '@/constants/AppTheme';

interface CustomButtonProps {

    title: string;
    loading?: boolean;
    disabled?: boolean;
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;

    fontSize?: 12 | 14 | 16 | 20 | 24 | 32 | 40;

    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'cancel';
    textColor?: 'primaryTextColor' | 'secondaryTextColor' | 'primaryColor' | 'whiteColor' | 'redColor' | 'greenColor';

}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    rightIcon,
    textColor,
    leftIcon,
    style = {},
    fontSize = 20,
    loading = false,
    disabled = false,
    size = 'medium',
    variant = 'primary',
}) => {
    // Define button styles based on variant
    const getButtonStyle = (): ViewStyle => {

        const baseStyle: ViewStyle = {
            borderRadius: 10 * vhUnit,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        };

        // Size-based padding
        const sizeStyles = {
            small: {
                paddingVertical: 8 * vhUnit,
                paddingHorizontal: 20 * vhUnit,
            },
            medium: {
                paddingVertical: 12 * vhUnit,
                paddingHorizontal: 20 * vhUnit,
            },
            large: {
                paddingVertical: 16 * vhUnit,
                paddingHorizontal: 50 * vhUnit,
            },
        };

        // Variant-based styles
        const variantStyles = {
            primary: {
                backgroundColor: disabled ? theme.borderColor : theme.primaryColor,
            },
            secondary: {
                backgroundColor: disabled ? theme.borderColor : theme.secondaryColor,
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 1 * vhUnit,
                borderColor: disabled ? theme.borderColor : theme.primaryColor,
            },
            danger: {
                backgroundColor: disabled ? theme.borderColor : theme.redColor,
            },
            cancel: {
                borderWidth: 0.3 * vhUnit,
                borderColor: theme.borderColor,
                backgroundColor: `${theme.borderColor}66`,
            },
        };

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
            opacity: disabled ? 0.6 : 1,
        };
    };

    // Define text color based on variant and props
    const getTextColor = () => {
        if (textColor) return textColor;

        switch (variant) {
            case 'primary':
            case 'secondary':
            case 'danger':
                return 'whiteColor';
            case 'outline':
                return disabled ? 'secondaryTextColor' : 'primaryColor';
            case 'cancel':
                return 'primaryTextColor';
            default:
                return 'whiteColor';
        }
    };

    // Define font size based on button size
    const getFontSize = () => {
        if (fontSize) return fontSize;

        switch (size) {
            case 'small':
                return 14;
            case 'medium':
                return 16;
            case 'large':
                return 20;
            default:
                return 16;
        }
    };

    // Get icon color based on variant
    const getIconColor = () => {
        switch (variant) {
            case 'primary':
            case 'secondary':
            case 'danger':
                return theme.whiteColor;
            case 'outline':
                return disabled ? theme.secondaryTextColor : theme.primaryColor;
            case 'cancel':
                return theme.primaryTextColor;
            default:
                return theme.whiteColor;
        }
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Left Icon */}
                {leftIcon && !loading && (
                    <View style={{ marginRight: 8 * vhUnit }}>
                        {leftIcon}
                    </View>
                )}

                {/* Loading Indicator */}
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color={getIconColor()}
                        style={{ marginRight: 8 * vhUnit }}
                    />
                )}

                {/* Button Text */}
                <CustomText
                    text={title}
                    color={getTextColor()}
                    fontSize={getFontSize()}
                    style={{ fontWeight: '600' }}
                />

                {/* Right Icon */}
                {rightIcon && !loading && (
                    <View style={{ marginLeft: 8 * vhUnit }}>
                        {rightIcon}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;
