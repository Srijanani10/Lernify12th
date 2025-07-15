import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import formulas from '../data/formulas';

type RouteProps = RouteProp<RootStackParamList, 'Quiz'>;

const QuizScreen = () => {
  const route = useRoute<RouteProps>();
  const { subject } = route.params;

  const quiz = formulas[subject]?.quiz || [];
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = quiz[qIndex];

  const handleAnswer = (selected: number) => {
    const correct = current.correct;
    if (selected === correct) {
      setScore(score + 1);
      Alert.alert('✅ Correct');
    } else {
      Alert.alert('❌ Wrong', `Answer: ${current.options[correct]}`);
    }

    const next = qIndex + 1;
    if (next < quiz.length) setQIndex(next);
    else Alert.alert('🎉 Quiz Finished', `Score: ${score + (selected === correct ? 1 : 0)}`);
  };

  if (!current) {
    return (
      <View style={styles.container}>
        <Text>No quiz available for {subject}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{current.question}</Text>
      {current.options.map((opt, i) => (
        <Button key={i} title={opt} onPress={() => handleAnswer(i)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default QuizScreen;
