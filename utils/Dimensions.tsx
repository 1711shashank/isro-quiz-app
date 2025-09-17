import { Dimensions } from "react-native";

/**
 * Define responsive units similar to CSS vh/vw.
 * 
 * vhUnit = 0.1% of screen height
 * vwUnit = 0.1% of screen width
 * 
 * This makes styles scale proportionally across different screen sizes.
 * 
 * Example:
 * ----------
 * Small screen (height = 640px, width = 360px):
 *   vhUnit = 0.64
 *   vwUnit = 0.36
 *   50 * vhUnit = 32px   (≈5% of height)
 *   80 * vwUnit = 28.8px (≈8% of width)
 * 
 * Large screen (height = 1280px, width = 720px):
 *   vhUnit = 1.28
 *   vwUnit = 0.72
 *   50 * vhUnit = 64px   (≈5% of height)
 *   80 * vwUnit = 57.6px (≈8% of width)
 * 
 * → On both screens, the element takes the same percentage of space,
 *   but the actual pixel values adjust automatically.
 */

export const vhUnit = Dimensions.get('window').height * 0.001;
export const vwUnit = Dimensions.get('window').width * 0.001;
