import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
      ? bookmarks.filter((i) => i !== index)
      : [...bookmarks, index];
    setBookmarks(updated);
    await AsyncStorage.setItem(`bookmarks-${subject}`, JSON.stringify(updated));
  };

  const handleTopicPress = (topicName: string) => {
    setSelectedTopic((prev) => (prev === topicName ? null : topicName));
  };

  if (!subjectData) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', fontSize: 18 }}>
          ❌ Oops! Invalid subject "{subject}"
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📘 {subject} Formulas</Text>

      {Object.entries(subjectData.topics).map(([topicName, formulasArr], topicIndex) => (
        <View key={topicName}>
          <TouchableOpacity
            onPress={() => handleTopicPress(topicName)}
            style={styles.topicButton}
          >
            <Text style={styles.topicTitle}>
              {selectedTopic === topicName ? '🔽' : '▶️'} {topicName}
            </Text>
          </TouchableOpacity>

          {selectedTopic === topicName &&
            formulasArr.map((item, index) => {
              const globalIndex = topicIndex * 100 + index;
              return (
                <View key={`${topicName}-${index}`} style={styles.card}>
                  <Flashcard
                    formula={item.formula}
                    story={item.story}
                    onFlip={() => markSeen(globalIndex)}
                  />

                  <Text style={styles.statusText}>
                    {seen.includes(globalIndex) ? '✅ Marked as Seen' : '👀 Flip to Learn'}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.bookmarkButton,
                      bookmarks.includes(globalIndex) && styles.bookmarked,
                    ]}
                    onPress={() => toggleBookmark(globalIndex)}
                  >
                    <Text style={styles.bookmarkText}>
                      {bookmarks.includes(globalIndex)
                        ? '🔖 Bookmarked'
                        : '📌 Tap to Bookmark'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      ))}
    </ScrollView>
  );
};

export default FormulaScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFDE7',
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F57F17',
    marginBottom: 25,
    textAlign: 'center',
  },
  topicButton: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
  },
  statusText: {
    textAlign: 'center',
    color: '#388E3C',
    marginTop: 8,
    fontSize: 16,
  },
  bookmarkButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: '#81D4FA',
    alignItems: 'center',
  },
  bookmarked: {
    backgroundColor: '#AED581',
  },
  bookmarkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
  },
});
