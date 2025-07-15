import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to Learn Formulas 🎉</Text>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/201/201818.png' }} // Fun cartoon image
        style={styles.image}
      />
      <Text style={styles.subtitle}>Let's have fun with Math, Physics, Chemistry & Biology!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Subject')}
      >
        <Text style={styles.buttonText}>🚀 Start Learning</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4B5', // Warm background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
