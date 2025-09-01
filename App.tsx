import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initializeDatabase } from './src/database/db';
import { theme } from './src/theme';

export default function App() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await initializeDatabase();
      setIsDbInitialized(true);
    } catch (error) {
      console.error('Failed to initialize database:', error);
      // For MVP, we'll still show the app even if DB fails
      setIsDbInitialized(true);
    }
  };

  if (!isDbInitialized) {
    return (
      <View style={styles.loading}>
        {/* Could add a loading screen here */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={theme.colors.white} />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loading: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});