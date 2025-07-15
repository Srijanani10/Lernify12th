import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, View, Vibration } from 'react-native';
import Sound from 'react-native-sound';
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
  onFlip?: () => void;
  soundEnabled?: boolean;
  vibrationEnabled?: boolean;
};

const playFlipSound = () => {
  const flipSound = new Sound('flip.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.warn('Sound load error:', error);
      return;
    }
    flipSound.play((success) => {
      if (!success) console.warn('Sound playback failed');
      flipSound.release();
    });
  });
};

const Flashcard = ({
  formula,
  story,
  onFlip,
  soundEnabled = true,
  vibrationEnabled = true,
}: FlashcardProps) => {
  const rotateY = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const frontStyle = useAnimatedStyle(() => ({
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
  }));

  const backStyle = useAnimatedStyle(() => ({
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
  }));

  const handleFlip = () => {
    if (soundEnabled) playFlipSound();
    if (vibrationEnabled) Vibration.vibrate(50);

    setFlipped(!flipped);
    rotateY.value = withTiming(flipped ? 0 : 180, { duration: 300 });
    onFlip?.();
  };

  return (
    <Pressable onPress={handleFlip}>
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.card, frontStyle]}>
          <Text style={styles.icon}>🔢</Text>
          <Text style={styles.text}>{formula}</Text>
          <Text style={styles.hint}>👆 Tap to flip</Text>
        </Animated.View>

        <Animated.View style={[styles.card, backStyle]}>
          <Text style={styles.icon}>📖</Text>
          <Text style={styles.text}>{story}</Text>
          <Text style={styles.hint}>👆 Tap to flip back</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    height: 170,
    marginVertical: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    height: '100%',
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    borderColor: '#FFD54F',
    borderWidth: 2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: '#3E2723',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  hint: {
    fontSize: 12,
    marginTop: 8,
    color: '#888',
  },
});

export default Flashcard;
