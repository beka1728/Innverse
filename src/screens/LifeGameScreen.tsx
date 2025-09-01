import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Icon } from '../components';
import { theme } from '../theme';
import { getRPGProfile, updateRPGProfile } from '../database/db';
import { RPGProfile } from '../types';

const LifeGameScreen: React.FC = ({ navigation }: any) => {
  const [profile, setProfile] = useState<RPGProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const rpgProfile = await getRPGProfile();
      setProfile(rpgProfile);
    } catch (error) {
      console.error('Error loading RPG profile:', error);
    }
  };

  const addXP = async (amount: number) => {
    if (!profile) return;
    
    const newXP = profile.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    await updateRPGProfile(newLevel, newXP, profile.streak);
    setProfile({ ...profile, xp: newXP, level: newLevel });
  };

  const getProgressToNextLevel = () => {
    if (!profile) return 0;
    return (profile.xp % 100) / 100;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.rpgPurple, theme.colors.crystalBlue]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Life Game</Text>
          <Icon name="game-controller" size={24} color={theme.colors.white} />
        </View>

        <ScrollView style={styles.scrollView}>
          {profile && (
            <Card style={styles.profileCard}>
              <Text style={styles.levelTitle}>Level {profile.level}</Text>
              <Text style={styles.xpText}>{profile.xp} XP</Text>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${getProgressToNextLevel() * 100}%` }
                  ]} 
                />
              </View>
              
              <Text style={styles.nextLevelText}>
                {100 - (profile.xp % 100)} XP to next level
              </Text>
              
              <View style={styles.streakContainer}>
                <Icon name="flame" size={20} color={theme.colors.homeCoral} />
                <Text style={styles.streakText}>{profile.streak} day streak</Text>
              </View>
            </Card>
          )}

          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionCard} onPress={() => addXP(10)}>
            <Icon name="checkmark-circle" size={32} color={theme.colors.success} />
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Complete Daily Goal</Text>
              <Text style={styles.actionXP}>+10 XP</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => addXP(5)}>
            <Icon name="heart" size={32} color={theme.colors.artPink} />
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Practice Self-Care</Text>
              <Text style={styles.actionXP}>+5 XP</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => addXP(15)}>
            <Icon name="school" size={32} color={theme.colors.timeBlue} />
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Learn Something New</Text>
              <Text style={styles.actionXP}>+15 XP</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
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
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  levelTitle: {
    fontSize: theme.fonts.sizes['2xl'],
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.rpgPurple,
  },
  xpText: {
    fontSize: theme.fonts.sizes.lg,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.goldCoin,
    borderRadius: 4,
  },
  nextLevelText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginLeft: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  actionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.md,
  },
  actionInfo: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  actionTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  actionXP: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.goldCoin,
    fontWeight: theme.fonts.weights.medium,
  },
});

export default LifeGameScreen;