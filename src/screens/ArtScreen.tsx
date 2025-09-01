import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Icon } from '../components';
import { theme } from '../theme';

const ArtScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.artViolet, theme.colors.artPink]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Art Studio</Text>
          <Icon name="color-palette" size={24} color={theme.colors.white} />
        </View>
        
        <ScrollView style={styles.scrollView}>
          <Card style={styles.generateCard}>
            <Text style={styles.generateTitle}>Create New Art</Text>
            <Text style={styles.generateSubtitle}>Transform your thoughts into visual art</Text>
            <TouchableOpacity style={styles.generateButton}>
              <Icon name="brush" size={24} color={theme.colors.white} />
              <Text style={styles.generateButtonText}>Generate Art</Text>
            </TouchableOpacity>
          </Card>

          <Text style={styles.sectionTitle}>Recent Creations</Text>
          
          <Card style={styles.artCard}>
            <View style={styles.artPlaceholder}>
              <Icon name="image" size={64} color={theme.colors.gray[400]} />
            </View>
            <Text style={styles.artTitle}>Peaceful Sunset</Text>
            <Text style={styles.artDate}>Created yesterday</Text>
          </Card>

          <Card style={styles.artCard}>
            <View style={styles.artPlaceholder}>
              <Icon name="image" size={64} color={theme.colors.gray[400]} />
            </View>
            <Text style={styles.artTitle}>Abstract Emotions</Text>
            <Text style={styles.artDate}>Created 3 days ago</Text>
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
  generateCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  generateTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.xs,
  },
  generateSubtitle: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.artPink,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  generateButtonText: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.white,
    marginLeft: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  artCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  artPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  artTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  artDate: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
});

export default ArtScreen;