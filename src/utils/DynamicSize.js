import { Dimensions } from 'react-native';

// Get the device's screen dimensions
const { width, height } = Dimensions.get('window');

// Guideline sizes based on a standard device (e.g., iPhone 8 - 375x667)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// Function to calculate dynamic size
const dynamicSize = (size) => {
  // Get scaling factor based on the smallest side (for consistency)
  const scaleFactor = Math.min(width / guidelineBaseWidth, height / guidelineBaseHeight);
  
  // Return the scaled size
  return size * scaleFactor;
};

export default dynamicSize;
