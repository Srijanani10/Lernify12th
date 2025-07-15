import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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
    const updated = bookmarks.filter(i => i !== index);
    setBookmarks(updated);
    await AsyncStorage.setItem(`bookmarks-${subject}`, JSON.stringify(updated));
  };

  // Flatten all formulas from all topics into a single array
  const allFormulas = Object.values(subjectData.topics).flat();
  const bookmarkedFormulas = bookmarks.map(index => ({
    ...allFormulas[index],
    index,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔖 {subject} Bookmarks</Text>
      {bookmarkedFormulas.length === 0 ? (
        <Text style={styles.empty}>No bookmarks yet.</Text>
      ) : (
        bookmarkedFormulas.map(({ formula, story, index }) => (
          <View key={index}>
            <Flashcard formula={formula} story={story} />
            <TouchableOpacity onPress={() => toggleBookmark(index)}>
              <Text style={styles.bookmark}>❌ Remove Bookmark</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#aaa',
  },
  bookmark: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default BookmarkScreen;
