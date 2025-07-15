import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SubjectScreen from './screens/SubjectScreen';
import TopicListScreen from './screens/TopicScreen';
import FormulaScreen from './screens/FormulaScreen';
import QuizScreen from './screens/QuizScreen';
import BookmarksScreen from './screens/BookmarkScreen'; // ✅ Import BookmarksScreen


export type RootStackParamList = {
  Home: undefined;
  Subject: undefined;
  TopicList: { subject: string };
  Formula: { subject: string; topic: string };
  Quiz: { subject: string };
  Bookmarks: { subject: string }; // ✅ Add this
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Subject" component={SubjectScreen} />
    <Stack.Screen name="TopicList" component={TopicListScreen} />
    <Stack.Screen name="Formula" component={FormulaScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
