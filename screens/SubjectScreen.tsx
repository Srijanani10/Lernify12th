import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator'; // ✅ Update path if needed

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Subject'>;

const SubjectScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const subjects = ['Physics', 'Chemistry'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Subject</Text>
      {subjects.map(subject => (
        <View key={subject} style={styles.buttonGroup}>
          <Button
            title={`📘 Learn ${subject}`}
            onPress={() => navigation.navigate('TopicList', { subject })}
          />
          <View style={styles.spacer} />
          <Button
            title={`🧠 Quiz: ${subject}`}
            onPress={() => navigation.navigate('Quiz', { subject })}
            color="#6200ee"
          />
          <View style={styles.spacer} />
          <Button
            title="🔖 View Bookmarked Formulas"
            onPress={() => navigation.navigate('Bookmarks', { subject })}
            color="#009688"
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    marginBottom: 30,
  },
  spacer: {
    height: 10,
  },
});

export default SubjectScreen;
