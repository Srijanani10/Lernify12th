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
  const { subject } = route.params;

  const subjectData = formulas[subject];

  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem(`bookmarks-${subject}`);
      if (saved) setBookmarks(JSON.parse(saved));
    };
    load();
  }, [subject]);

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
      {subjectData.formulas.map((item, index) => (
        <View key={index}>
          <Flashcard formula={item.formula} story={item.story} />
          <TouchableOpacity onPress={() => toggleBookmark(index)}>
            <Text style={{ color: bookmarks.includes(index) ? 'green' : 'blue', textAlign: 'center' }}>
              {bookmarks.includes(index) ? 'Bookmarked ✅' : 'Bookmark 🔖'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
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
