import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SubjectScreen from './screens/SubjectScreen';
import FormulaScreen from './screens/FormulaScreen';
import QuizScreen from './screens/QuizScreen';

export type RootStackParamList = {
  Home: undefined;
  Subject: undefined;
  Formula: { subject: string };
  Quiz: { subject: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Subject" component={SubjectScreen} />
    <Stack.Screen name="Formula" component={FormulaScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
