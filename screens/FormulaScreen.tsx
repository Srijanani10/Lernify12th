import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../AppNavigator';
import formulas from '../data/formulas';
import Flashcard from '../components/Flashcard';

type RouteProps = RouteProp<RootStackParamList, 'Formula'>;

const FormulaScreen = () => {
  const route = useRoute<RouteProps>();
  const { subject } = route.params as { subject: string };

  const subjectData = formulas[subject as keyof typeof formulas];
  const [seen, setSeen] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const seenStored = await AsyncStorage.getItem(`seen-${subject}`);
      if (seenStored) setSeen(JSON.parse(seenStored));

      const bookmarksStored = await AsyncStorage.getItem(`bookmarks-${subject}`);
      if (bookmarksStored) setBookmarks(JSON.parse(bookmarksStored));
    };
    loadData();
  }, [subject]);

  const markSeen = async (index: number) => {
    const updated = Array.from(new Set([...seen, index]));
    setSeen(updated);
    await AsyncStorage.setItem(`seen-${subject}`, JSON.stringify(updated));
  };

  const toggleBookmark = async (index: number) => {
    const updated = bookmarks.includes(index)
      ? bookmarks.filter(i => i !== index)
      : [...bookmarks, index];
    setBookmarks(updated);
    await AsyncStorage.setItem(`bookmarks-${subject}`, JSON.stringify(updated));
  };

  if (!subjectData) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>❌ Error: Invalid subject "{subject}"</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{subject} Formulas</Text>
      {Object.entries(subjectData.topics).map(([topicName, formulasArr]) =>
        formulasArr.map((item, index) => (
          <View key={`${topicName}-${index}`}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>{topicName}</Text>
            <Flashcard
              formula={item.formula}
              story={item.story}
              onFlip={() => markSeen(index)}
            />
            <Text style={{ textAlign: 'center', color: seen.includes(index) ? 'green' : '#aaa' }}>
              {seen.includes(index) ? '✅ Seen' : ''}
            </Text>
            <TouchableOpacity onPress={() => toggleBookmark(index)}>
              <Text style={{ color: bookmarks.includes(index) ? 'green' : 'blue', textAlign: 'center' }}>
                {bookmarks.includes(index) ? 'Bookmarked ✅' : 'Bookmark 🔖'}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormulaScreen;
