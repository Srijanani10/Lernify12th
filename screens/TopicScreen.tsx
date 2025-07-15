import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import formulas from '../data/formulas';

type TopicListRouteProp = RouteProp<RootStackParamList, 'TopicList'>;

const TopicListScreen = () => {
  const route = useRoute<TopicListRouteProp>();
  const navigation = useNavigation<
    import('@react-navigation/native-stack').NativeStackNavigationProp<
      RootStackParamList,
      'TopicList'
    >
  >();
  const { subject } = route.params;

  const topics = Object.keys(formulas[subject]?.topics || {});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 {subject} Topics</Text>

      {topics.length === 0 ? (
        <Text style={styles.empty}>😢 No topics found.</Text>
      ) : (
        topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={styles.topicButton}
            onPress={() => navigation.navigate('Formula', { subject, topic })}
            activeOpacity={0.8}
          >
            <Text style={styles.topicText}>✨ {topic}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default TopicListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBEA', // light yellow background
    padding: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 25,
    textAlign: 'center',
  },
  topicButton: {
    backgroundColor: '#FFCC80', // soft orange
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 4,
  },
  topicText: {
    fontSize: 20,
    color: '#5D4037',
    fontWeight: '600',
    textAlign: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#888',
    marginTop: 30,
    textAlign: 'center',
  },
});
