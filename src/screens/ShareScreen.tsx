import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Icon } from '../components';
import { theme } from '../theme';

const ShareScreen: React.FC = ({ navigation }: any) => {
  const communityFeatures = [
    { title: 'Share Progress', icon: 'stats-chart', description: 'Show your growth journey' },
    { title: 'Join Circles', icon: 'people', description: 'Connect with like-minded souls' },
    { title: 'Wisdom Exchange', icon: 'bulb', description: 'Share and learn insights' },
    { title: 'Support Others', icon: 'heart', description: 'Encourage fellow travelers' },
  ];

  const recentShares = [
    { user: 'Sarah', content: 'Completed 30 days of meditation!', type: 'achievement' },
    { user: 'Mike', content: 'Beautiful dream about flying...', type: 'dream' },
    { user: 'Anna', content: 'Feeling grateful for small moments', type: 'mood' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.shareGreen, theme.colors.shareBlue]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Community</Text>
          <Icon name="people" size={24} color={theme.colors.white} />
        </View>

        <ScrollView style={styles.scrollView}>
          <Card style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome to the Community</Text>
            <Text style={styles.welcomeSubtitle}>
              Connect with others on their inner journey. Share wisdom, support each other, and grow together.
            </Text>
          </Card>

          <Text style={styles.sectionTitle}>Community Features</Text>
          
          {communityFeatures.map((feature, index) => (
            <TouchableOpacity key={index} style={styles.featureCard}>
              <Icon name={feature.icon as any} size={32} color={theme.colors.shareGreen} />
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={theme.colors.gray[400]} />
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>Recent Community Activity</Text>
          
          {recentShares.map((share, index) => (
            <Card key={index} style={styles.shareCard}>
              <View style={styles.shareHeader}>
                <View style={styles.shareUser}>
                  <Icon name="person-circle" size={32} color={theme.colors.shareBlue} />
                  <Text style={styles.shareUsername}>{share.user}</Text>
                </View>
                <View style={[styles.shareType, { backgroundColor: getTypeColor(share.type) }]}>
                  <Text style={styles.shareTypeText}>{share.type}</Text>
                </View>
              </View>
              <Text style={styles.shareContent}>{share.content}</Text>
              <View style={styles.shareActions}>
                <TouchableOpacity style={styles.shareAction}>
                  <Icon name="heart-outline" size={16} color={theme.colors.gray[500]} />
                  <Text style={styles.shareActionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareAction}>
                  <Icon name="chatbubble-outline" size={16} color={theme.colors.gray[500]} />
                  <Text style={styles.shareActionText}>Comment</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}

          <Card style={styles.privacyCard}>
            <Icon name="shield-checkmark" size={24} color={theme.colors.success} />
            <View style={styles.privacyInfo}>
              <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
              <Text style={styles.privacyText}>
                You control what you share. All sharing is optional and can be anonymous.
              </Text>
            </View>
          </Card>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'achievement': return theme.colors.success + '20';
    case 'dream': return theme.colors.dreamBlue + '20';
    case 'mood': return theme.colors.moodYellow + '20';
    default: return theme.colors.gray[200];
  }
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
  welcomeCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  welcomeTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: theme.fonts.lineHeights.normal * theme.fonts.sizes.sm,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  featureCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  featureInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  featureTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  featureDescription: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  shareCard: {
    marginBottom: theme.spacing.sm,
  },
  shareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  shareUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareUsername: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[800],
    marginLeft: theme.spacing.sm,
  },
  shareType: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  shareTypeText: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[700],
    textTransform: 'capitalize',
  },
  shareContent: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.md,
    lineHeight: theme.fonts.lineHeights.normal * theme.fonts.sizes.sm,
  },
  shareActions: {
    flexDirection: 'row',
  },
  shareAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  shareActionText: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.gray[500],
    marginLeft: theme.spacing.xs,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.success + '10',
  },
  privacyInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  privacyTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.xs,
  },
  privacyText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    lineHeight: theme.fonts.lineHeights.normal * theme.fonts.sizes.sm,
  },
});

export default ShareScreen;