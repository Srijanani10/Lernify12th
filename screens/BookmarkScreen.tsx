import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import Flashcard from '../components/Flashcard';
import formulas from '../data/formulas';

type RouteProps = RouteProp<RootStackParamList, 'Bookmarks'>;

const BookmarkScreen = () => {
  const route = useRoute<RouteProps>();
  const { subject } = route.params;

  const subjectData = formulas[subject as keyof typeof formulas];
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const stored = await AsyncStorage.getItem(`bookmarks-${subject}`);
      if (stored) setBookmarks(JSON.parse(stored));
    };
    fetchBookmarks();
  }, [subject]);

  const toggleBookmark = async (index: number) => {
    const updated = bookmarks.filter((i) => i !== index);
    setBookmarks(updated);
    await AsyncStorage.setItem(`bookmarks-${subject}`, JSON.stringify(updated));
  };

  // Flatten all formulas from all topics into a single array
  const allFormulas = Object.values(subjectData.topics).flat();
  const bookmarkedFormulas = bookmarks.map((index) => ({
    ...allFormulas[index],
    index,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 Bookmarked {subject} Formulas</Text>

      {bookmarkedFormulas.length === 0 ? (
        <Text style={styles.empty}>😕 No bookmarks yet.</Text>
      ) : (
        bookmarkedFormulas.map(({ formula, story, index }, i) => (
          <View key={index} style={styles.card}>
            <Text style={styles.topicLabel}>⭐ Formula {i + 1}</Text>

            <Flashcard formula={formula} story={story} />

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => toggleBookmark(index)}
            >
              <Text style={styles.removeText}>❌ Remove Bookmark</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#FFF9C4', // Light yellow
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F57F17',
    textAlign: 'center',
    marginBottom: 25,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#9E9E9E',
  },
  card: {
    backgroundColor: '#FFECB3',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 25,
    elevation: 4,
  },
  topicLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 10,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#FF8A65',
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
