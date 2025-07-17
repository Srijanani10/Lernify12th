declare module 'react-native-math-view' {
  import React from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  export interface MathViewProps {
    math: string;
    style?: StyleProp<ViewStyle>;
    resizeMode?: 'cover' | 'contain' | 'stretch';
  }

  const MathView: React.FC<MathViewProps>;
  export default MathView;
}
