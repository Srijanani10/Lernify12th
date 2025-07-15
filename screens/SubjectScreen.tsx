import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator'; // ✅ Update path if needed

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Subject'>;

const SubjectScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const subjects = [
    { name: 'Physics', emoji: '🧲' },
    { name: 'Chemistry', emoji: '⚗️' },
    { name: 'Biology', emoji: '🧬' },
    { name: 'Maths', emoji: '➗' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎓 Select a Subject 🎓</Text>

      {subjects.map((subject) => (
        <View key={subject.name} style={styles.card}>
          <Text style={styles.subjectTitle}>
            {subject.emoji} {subject.name}
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#ffb74d' }]}
            onPress={() => navigation.navigate('TopicList', { subject: subject.name })}
          >
            <Text style={styles.buttonText}>📘 Learn {subject.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#9575cd' }]}
            onPress={() => navigation.navigate('Quiz', { subject: subject.name })}
          >
            <Text style={styles.buttonText}>🧠 Quiz: {subject.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4db6ac' }]}
            onPress={() => navigation.navigate('Bookmarks', { subject: subject.name })}
          >
            <Text style={styles.buttonText}>🔖 Bookmarked Formulas</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default SubjectScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff8e1',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ff6f00',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff3e0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  subjectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#d84315',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
