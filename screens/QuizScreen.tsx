import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import formulas from '../data/formulas';

type RouteProps = RouteProp<RootStackParamList, 'Quiz'>;

const QuizScreen = () => {
  const route = useRoute<RouteProps>();
  const { subject } = route.params;

  const quiz = formulas[subject]?.quiz || [];
  const [qIndex, setQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const current = quiz[qIndex];

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    const updated = [...selectedAnswers];
    updated[qIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleSubmit = () => {
    let score = 0;
    selectedAnswers.forEach((ans, i) => {
      if (ans === quiz[i].correct) score++;
    });

    setSubmitted(true);
    Alert.alert('🏁 Quiz Finished!', `Your Score: ${score} / ${quiz.length}`);
  };

  if (!current) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>😕 No quiz available for {subject}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 {subject} Quiz</Text>
      <Text style={styles.question}>
        {qIndex + 1}. {current.question}
      </Text>

      {current.options.map((opt, i) => {
        const isSelected = selectedAnswers[qIndex] === i;
        const isCorrect = submitted && i === current.correct;
        const isWrong =
          submitted &&
          selectedAnswers[qIndex] === i &&
          i !== current.correct;

        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.optionButton,
              isSelected && styles.selected,
              isCorrect && styles.correct,
              isWrong && styles.wrong,
            ]}
            onPress={() => handleSelect(i)}
            disabled={submitted}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.navRow}>
        <TouchableOpacity
          onPress={() => setQIndex((prev) => Math.max(prev - 1, 0))}
          style={[styles.navButton, qIndex === 0 && styles.disabled]}
          disabled={qIndex === 0}
        >
          <Text style={styles.navText}>⬅️ Previous</Text>
        </TouchableOpacity>

        {qIndex === quiz.length - 1 ? (
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton]}
            disabled={submitted}
          >
            <Text style={styles.submitText}>✅ Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              setQIndex((prev) => Math.min(prev + 1, quiz.length - 1))
            }
            style={styles.navButton}
          >
            <Text style={styles.navText}>Next ➡️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F57F17',
    textAlign: 'center',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#4E342E',
  },
  optionButton: {
    backgroundColor: '#FFECB3',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#3E2723',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#FFE082',
  },
  correct: {
    backgroundColor: '#A5D6A7',
  },
  wrong: {
    backgroundColor: '#EF9A9A',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  navButton: {
    backgroundColor: '#FFD54F',
    padding: 12,
    borderRadius: 12,
  },
  navText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#81C784',
    padding: 12,
    borderRadius: 12,
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  empty: {
    fontSize: 18,
    color: '#757575',
    textAlign: 'center',
  },
});
