export const lightTheme = {
    // Primary theme colors
    primaryColor: '#1A7DEC',
    secondaryColor: "#0e2141",

    // Text colors
    primaryTextColor: '#344256',
    secondaryTextColor: '#64758B',

    // Border color
    borderColor: '#d4d9e0',

    // Utility colors
    whiteColor: '#fff',
    redColor: '#EF4444',
    greenColor: '#16A149',
    
    // Screen background
    screenBgColor: '#FFFFFF',
    fadedbgColor: '#f6f6f6',
    
    // Input colors
    inputBgColor: '#f6f6f6',
    inputBorderColor: '#d4d9e0',
    
    // Icon colors
    iconColor: '#64758B',
    activeIconColor: '#1A7DEC',
};



// Legacy export for backward compatibility
export const theme = lightTheme;

export type ThemeType = typeof lightTheme;
