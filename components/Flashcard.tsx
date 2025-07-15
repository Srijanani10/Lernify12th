import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

type FlashcardProps = {
  formula: string;
  story: string;
};

const Flashcard = ({ formula, story }: FlashcardProps) => {
  const rotateY = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(
            rotateY.value,
            [0, 180],
            [0, 180],
            Extrapolate.CLAMP
          )}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
      position: 'absolute',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(
            rotateY.value,
            [0, 180],
            [180, 360],
            Extrapolate.CLAMP
          )}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
    };
  });

  const handleFlip = () => {
    setFlipped(!flipped);
    rotateY.value = withTiming(flipped ? 0 : 180, { duration: 300 });
  };

  return (
    <Pressable onPress={handleFlip}>
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.text}>🔢 {formula}</Text>
          <Text style={styles.hint}>(Tap to flip)</Text>
        </Animated.View>

        <Animated.View style={[styles.card, backAnimatedStyle]}>
          <Text style={styles.text}>📖 {story}</Text>
          <Text style={styles.hint}>(Tap to flip)</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    height: 150,
    marginVertical: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    height: '100%',
    backgroundColor: '#fffbe6',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    marginTop: 8,
    color: '#888',
  },
});

export default Flashcard;
