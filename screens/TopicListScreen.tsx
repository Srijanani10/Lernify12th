import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import formulas from '../data/formulas';

type TopicListRouteProp = RouteProp<RootStackParamList, 'TopicList'>;

const TopicListScreen = () => {
  const route = useRoute<TopicListRouteProp>();
  const { subject } = route.params;
  const topics = Object.keys(formulas[subject]?.topics || {});
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{subject} Topics</Text>
      {topics.length === 0 ? (
        <Text style={styles.empty}>No topics found.</Text>
      ) : (
        topics.map((topic) => (
          <View key={topic} style={styles.button}>
            <Button
              title={topic}
              onPress={() =>
                setExpandedTopic(expandedTopic === topic ? null : topic)
              }
            />
            {expandedTopic === topic && (
              <View style={styles.formulasContainer}>
                {(formulas[subject].topics[topic] || []).map(
                  (formula: any, idx: number) => (
                    <Text key={idx} style={styles.formulaText}>
                      {formula}
                    </Text>
                  )
                )}
              </View>
            )}
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
  button: {
    marginBottom: 12,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
  },
  formulasContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
  },
  formulaText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default TopicListScreen;
