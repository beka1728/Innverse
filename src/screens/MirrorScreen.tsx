import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Icon } from '../components';
import { theme } from '../theme';

const MirrorScreen: React.FC = ({ navigation }: any) => {
  const prompts = [
    "What am I most grateful for today?",
    "How have I grown this month?",
    "What pattern do I want to change?",
    "What brings me the most joy?",
    "How can I be kinder to myself?",
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.mirrorSilver, theme.colors.mirrorPearl]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.mirrorBlue} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mirror Work</Text>
          <Icon name="person" size={24} color={theme.colors.mirrorBlue} />
        </View>

        <ScrollView style={styles.scrollView}>
          <Card style={styles.reflectionCard}>
            <Text style={styles.reflectionTitle}>Daily Reflection</Text>
            <Text style={styles.reflectionSubtitle}>Take a moment to look within</Text>
            
            <View style={styles.mirrorIcon}>
              <Icon name="person-circle" size={80} color={theme.colors.mirrorBlue} />
            </View>
            
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Begin Reflection</Text>
            </TouchableOpacity>
          </Card>

          <Text style={styles.sectionTitle}>Reflection Prompts</Text>
          
          {prompts.map((prompt, index) => (
            <TouchableOpacity key={index} style={styles.promptCard}>
              <Text style={styles.promptText}>{prompt}</Text>
              <Icon name="chevron-forward" size={20} color={theme.colors.mirrorBlue} />
            </TouchableOpacity>
          ))}

          <Card style={styles.insightCard}>
            <Icon name="bulb" size={32} color={theme.colors.goldCoin} />
            <Text style={styles.insightTitle}>Self-Awareness Insight</Text>
            <Text style={styles.insightText}>
              Regular self-reflection helps you understand your patterns, 
              growth areas, and authentic self more deeply.
            </Text>
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
    color: theme.colors.mirrorBlue,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  reflectionCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  reflectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.xs,
  },
  reflectionSubtitle: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  mirrorIcon: {
    marginBottom: theme.spacing.lg,
  },
  startButton: {
    backgroundColor: theme.colors.mirrorBlue,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  startButtonText: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.white,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.md,
  },
  promptCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  promptText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.gray[700],
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  insightCard: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.goldCoin + '10',
  },
  insightTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  insightText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: theme.fonts.lineHeights.normal * theme.fonts.sizes.sm,
  },
});

export default MirrorScreen;