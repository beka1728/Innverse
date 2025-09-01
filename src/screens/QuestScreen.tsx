import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Icon } from '../components';
import { theme } from '../theme';

const QuestScreen: React.FC = ({ navigation }: any) => {
  const quests = [
    { title: 'Morning Meditation', progress: 3, target: 7, difficulty: 'easy' },
    { title: 'Read 30 minutes daily', progress: 12, target: 30, difficulty: 'medium' },
    { title: 'Weekly Nature Walk', progress: 1, target: 4, difficulty: 'easy' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return theme.colors.success;
      case 'medium': return theme.colors.warning;
      case 'hard': return theme.colors.error;
      default: return theme.colors.gray[500];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.questRed, theme.colors.questOrange]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quest Builder</Text>
          <Icon name="trophy" size={24} color={theme.colors.white} />
        </View>

        <ScrollView style={styles.scrollView}>
          <Text style={styles.sectionTitle}>Active Quests</Text>
          
          {quests.map((quest, index) => (
            <Card key={index} style={styles.questCard}>
              <View style={styles.questHeader}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <View style={[
                  styles.difficultyBadge, 
                  { backgroundColor: getDifficultyColor(quest.difficulty) }
                ]}>
                  <Text style={styles.difficultyText}>{quest.difficulty}</Text>
                </View>
              </View>
              
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(quest.progress / quest.target) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {quest.progress}/{quest.target}
                </Text>
              </View>

              <TouchableOpacity style={styles.questAction}>
                <Icon name="checkmark-circle" size={20} color={theme.colors.success} />
                <Text style={styles.questActionText}>Mark Progress</Text>
              </TouchableOpacity>
            </Card>
          ))}

          <Card style={styles.addQuestCard}>
            <Icon name="add" size={32} color={theme.colors.questOrange} />
            <Text style={styles.addQuestText}>Create New Quest</Text>
          </Card>
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
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  questCard: {
    marginBottom: theme.spacing.md,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  questTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  difficultyText: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    marginRight: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.questOrange,
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[600],
    width: 40,
  },
  questAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  questActionText: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.success,
    marginLeft: theme.spacing.sm,
  },
  addQuestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.questOrange,
    borderStyle: 'dashed',
  },
  addQuestText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.questOrange,
    marginLeft: theme.spacing.sm,
    fontWeight: theme.fonts.weights.medium,
  },
});

export default QuestScreen;