import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Button, Icon } from '../components';
import { theme } from '../theme';
import { createEntry, getEntries } from '../database/db';
import { MantraSession, Entry } from '../types';

const mantras = [
  "I am at peace with what I cannot control",
  "I choose love over fear",
  "I am grateful for this present moment",
  "I trust in my inner wisdom",
  "I release what no longer serves me",
  "I am worthy of love and happiness",
  "I breathe in calm, I breathe out stress",
  "I am exactly where I need to be"
];

const MantraScreen: React.FC = ({ navigation }: any) => {
  const [selectedMantra, setSelectedMantra] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes default
  const [duration, setDuration] = useState<number>(300);
  const [focusLevel, setFocusLevel] = useState<number>(5);
  const [recentSessions, setRecentSessions] = useState<Entry[]>([]);

  useEffect(() => {
    loadRecentSessions();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const loadRecentSessions = async () => {
    try {
      const entries = await getEntries('mantra', 10);
      setRecentSessions(entries);
    } catch (error) {
      console.error('Error loading mantra sessions:', error);
    }
  };

  const handleStart = () => {
    if (!selectedMantra) {
      Alert.alert('Select a mantra', 'Choose a mantra to focus on during your session');
      return;
    }
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  const handleSessionComplete = async () => {
    setIsActive(false);
    
    try {
      const sessionData: MantraSession = {
        mantra: selectedMantra,
        duration: duration - timeLeft,
        completed: timeLeft === 0,
        focus_level: focusLevel,
      };

      await createEntry('mantra', selectedMantra, undefined, ['meditation', 'mindfulness'], sessionData);
      await loadRecentSessions();
      
      Alert.alert('Session Complete!', 'Your mantra practice has been recorded.');
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const durationOptions = [
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '20 min', value: 1200 },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.forestGreen, theme.colors.leafGlow]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mantra Forest</Text>
          <TouchableOpacity>
            <Icon name="leaf" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.timerSubtext}>
              {isActive ? 'In Progress' : 'Ready to Start'}
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {!isActive && timeLeft === duration && (
            <Button
              title="Start Session"
              onPress={handleStart}
              style={styles.controlButton}
            />
          )}
          
          {isActive && (
            <View style={styles.activeControls}>
              <Button
                title="Pause"
                onPress={handlePause}
                variant="secondary"
                style={styles.controlButton}
              />
              <Button
                title="Reset"
                onPress={handleReset}
                variant="outline"
                style={styles.controlButton}
              />
            </View>
          )}

          {!isActive && timeLeft < duration && (
            <View style={styles.pausedControls}>
              <Button
                title="Resume"
                onPress={handleStart}
                style={styles.controlButton}
              />
              <Button
                title="Complete"
                onPress={handleSessionComplete}
                variant="secondary"
                style={styles.controlButton}
              />
            </View>
          )}
        </View>
      </LinearGradient>

      <View style={styles.bottomSection}>
        {/* Duration Selection */}
        {!isActive && (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Session Duration</Text>
            <View style={styles.durationOptions}>
              {durationOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.durationOption,
                    duration === option.value && styles.durationOptionActive
                  ]}
                  onPress={() => {
                    setDuration(option.value);
                    setTimeLeft(option.value);
                  }}
                >
                  <Text style={[
                    styles.durationText,
                    duration === option.value && styles.durationTextActive
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        )}

        {/* Mantra Selection */}
        {!isActive && (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Choose Your Mantra</Text>
            <View style={styles.mantrasContainer}>
              {mantras.map((mantra, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.mantraOption,
                    selectedMantra === mantra && styles.mantraOptionActive
                  ]}
                  onPress={() => setSelectedMantra(mantra)}
                >
                  <Text style={[
                    styles.mantraText,
                    selectedMantra === mantra && styles.mantraTextActive
                  ]}>
                    {mantra}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        )}

        {/* Current Mantra Display */}
        {isActive && selectedMantra && (
          <Card style={styles.card}>
            <Text style={styles.currentMantraTitle}>Focus on:</Text>
            <Text style={styles.currentMantraText}>{selectedMantra}</Text>
          </Card>
        )}

        {/* Recent Sessions */}
        {recentSessions.length > 0 && !isActive && (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Recent Sessions</Text>
            {recentSessions.slice(0, 3).map((session) => (
              <View key={session.id} style={styles.sessionItem}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionMantra} numberOfLines={1}>
                    {session.title}
                  </Text>
                  <Text style={styles.sessionDetails}>
                    {Math.floor((session.data?.duration || 0) / 60)}m • 
                    {new Date(session.created_at).toLocaleDateString()}
                  </Text>
                </View>
                <Icon 
                  name={session.data?.completed ? "checkmark-circle" : "time"} 
                  size={16} 
                  color={session.data?.completed ? theme.colors.success : theme.colors.warning}
                />
              </View>
            ))}
          </Card>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  gradient: {
    flex: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: 50,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  timerText: {
    fontSize: theme.fonts.sizes['3xl'],
    fontFamily: theme.fonts.mono,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.white,
  },
  timerSubtext: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.white,
    opacity: 0.8,
    marginTop: theme.spacing.xs,
  },
  controlsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  controlButton: {
    marginBottom: theme.spacing.sm,
  },
  activeControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pausedControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomSection: {
    flex: 0.4,
    backgroundColor: theme.colors.white,
    paddingTop: theme.spacing.md,
  },
  card: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.md,
  },
  durationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  durationOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gray[100],
  },
  durationOptionActive: {
    backgroundColor: theme.colors.forestGreen,
  },
  durationText: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[700],
  },
  durationTextActive: {
    color: theme.colors.white,
  },
  mantrasContainer: {
    maxHeight: 150,
  },
  mantraOption: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gray[50],
    marginBottom: theme.spacing.xs,
  },
  mantraOptionActive: {
    backgroundColor: theme.colors.forestGreen + '20',
    borderWidth: 1,
    borderColor: theme.colors.forestGreen,
  },
  mantraText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  mantraTextActive: {
    color: theme.colors.forestGreen,
    fontWeight: theme.fonts.weights.medium,
  },
  currentMantraTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  currentMantraText: {
    fontSize: theme.fonts.sizes.lg,
    fontFamily: theme.fonts.secondary,
    color: theme.colors.forestGreen,
    textAlign: 'center',
    lineHeight: theme.fonts.lineHeights.relaxed * theme.fonts.sizes.lg,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  sessionInfo: {
    flex: 1,
  },
  sessionMantra: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[800],
  },
  sessionDetails: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.gray[500],
    marginTop: theme.spacing.xs,
  },
});

export default MantraScreen;