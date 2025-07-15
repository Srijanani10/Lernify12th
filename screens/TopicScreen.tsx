// screens/TopicListScreen.tsx
import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import formulas from '../data/formulas'; // ✅ make sure data is structured correctly

type TopicListRouteProp = RouteProp<RootStackParamList, 'TopicList'>;

const TopicListScreen = () => {
  const route = useRoute<TopicListRouteProp>();
  const navigation = useNavigation<
    import('@react-navigation/native-stack').NativeStackNavigationProp<RootStackParamList, 'TopicList'>
  >();
  const { subject } = route.params;

  const topics = Object.keys(formulas[subject]?.topics || {});

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
                onPress={() => navigation.navigate('Formula', { subject, topic })}
            />

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
});

export default TopicListScreen;
