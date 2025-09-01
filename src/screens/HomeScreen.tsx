import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Button, Icon } from '../components';
import { theme } from '../theme';
import { getRPGProfile, getEntries } from '../database/db';
import { RPGProfile, Entry } from '../types';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [rpgProfile, setRpgProfile] = useState<RPGProfile | null>(null);
  const [recentEntries, setRecentEntries] = useState<Entry[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    loadData();
    const interval = setInterval(() => setCurrentDate(new Date()), 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const profile = await getRPGProfile();
      const entries = await getEntries(undefined, 5);
      setRpgProfile(profile);
      setRecentEntries(entries);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const quickActions = [
    { title: 'Mood Journal', icon: 'happy', screen: 'Mood', color: theme.colors.moodYellow },
    { title: 'Dream Log', icon: 'moon', screen: 'Dream', color: theme.colors.dreamBlue },
    { title: 'Mantra Practice', icon: 'leaf', screen: 'Mantra', color: theme.colors.forestGreen },
    { title: 'Future Note', icon: 'time', screen: 'Time', color: theme.colors.timeBlue },
  ];

  const allFeatures = [
    { title: 'Life Game', icon: 'game-controller', screen: 'LifeGame' },
    { title: 'Digital Library', icon: 'book', screen: 'Book' },
    { title: 'Memory Palace', icon: 'library', screen: 'Memory' },
    { title: 'AI Art', icon: 'color-palette', screen: 'Art' },
    { title: 'Quest Builder', icon: 'trophy', screen: 'Quest' },
    { title: 'Mirror Work', icon: 'person', screen: 'Mirror' },
    { title: 'Community', icon: 'people', screen: 'Share' },
  ];

  return (
    <LinearGradient
      colors={theme.colors.homeGradient}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.date}>{formatDate(currentDate)}</Text>
            <Text style={styles.time}>{formatTime(currentDate)}</Text>
          </View>
          {rpgProfile && (
            <View style={styles.levelBadge}>
              <Icon name="star" size={16} color={theme.colors.goldCoin} />
              <Text style={styles.levelText}>Lv. {rpgProfile.level}</Text>
            </View>
          )}
        </View>

        {/* Daily Portal */}
        <Card style={styles.portalCard}>
          <Text style={styles.portalTitle}>Daily Portal</Text>
          <Text style={styles.portalSubtitle}>Your inner journey starts here</Text>
          
          {rpgProfile && (
            <View style={styles.progressSection}>
              <View style={styles.progressItem}>
                <Icon name="flash" size={20} color={theme.colors.homePrimary} />
                <Text style={styles.progressText}>{rpgProfile.xp} XP</Text>
              </View>
              <View style={styles.progressItem}>
                <Icon name="flame" size={20} color={theme.colors.homeCoral} />
                <Text style={styles.progressText}>{rpgProfile.streak} day streak</Text>
              </View>
            </View>
          )}
        </Card>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Capture</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickAction, { backgroundColor: action.color }]}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Icon name={action.icon as any} size={24} color={theme.colors.white} />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        {recentEntries.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentEntries.slice(0, 3).map((entry, index) => (
              <Card key={entry.id} style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityType}>{entry.type}</Text>
                  <Text style={styles.activityDate}>
                    {new Date(entry.created_at).toLocaleDateString()}
                  </Text>
                </View>
                {entry.title && (
                  <Text style={styles.activityTitle}>{entry.title}</Text>
                )}
                {entry.content && (
                  <Text style={styles.activityContent} numberOfLines={2}>
                    {entry.content}
                  </Text>
                )}
              </Card>
            ))}
          </>
        )}

        {/* All Features */}
        <Text style={styles.sectionTitle}>Explore Your Inner Universe</Text>
        <View style={styles.featuresGrid}>
          {allFeatures.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={() => navigation.navigate(feature.screen)}
            >
              <Icon name={feature.icon as any} size={32} color={theme.colors.homePrimary} />
              <Text style={styles.featureTitle}>{feature.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 50, // Status bar padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.fonts.sizes.xl,
    fontFamily: theme.fonts.secondary,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  date: {
    fontSize: theme.fonts.sizes.md,
    fontFamily: theme.fonts.primary,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  time: {
    fontSize: theme.fonts.sizes.sm,
    fontFamily: theme.fonts.primary,
    color: theme.colors.gray[500],
    marginTop: theme.spacing.xs,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.sm,
  },
  levelText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[700],
  },
  portalCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  portalTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontFamily: theme.fonts.secondary,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  portalSubtitle: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  progressSection: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  progressText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[700],
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  quickAction: {
    width: (width - theme.spacing.md * 3) / 2,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  quickActionText: {
    color: theme.colors.white,
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  activityCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  activityType: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.homePrimary,
    textTransform: 'capitalize',
  },
  activityDate: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.gray[500],
  },
  activityTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.xs,
  },
  activityContent: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    lineHeight: theme.fonts.lineHeights.normal * theme.fonts.sizes.sm,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
  },
  featureCard: {
    width: (width - theme.spacing.md * 4) / 3,
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  featureTitle: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[700],
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: theme.spacing.xl,
  },
});

export default HomeScreen;