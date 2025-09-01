import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Icon } from '../components';
import { theme } from '../theme';

const MemoryScreen: React.FC = ({ navigation }: any) => {
  const memories = [
    { title: 'Childhood Home', rooms: 5, items: 12 },
    { title: 'Favorite Book Quotes', rooms: 1, items: 8 },
    { title: 'Important Dates', rooms: 1, items: 15 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Memory Palace</Text>
        <Icon name="library" size={24} color={theme.colors.white} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Your Palaces</Text>
        
        {memories.map((palace, index) => (
          <Card key={index} style={styles.palaceCard}>
            <View style={styles.palaceHeader}>
              <Text style={styles.palaceTitle}>{palace.title}</Text>
              <Icon name="home" size={24} color={theme.colors.memoryTeal} />
            </View>
            <View style={styles.palaceStats}>
              <View style={styles.statItem}>
                <Icon name="business" size={16} color={theme.colors.gray[500]} />
                <Text style={styles.statText}>{palace.rooms} rooms</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="albums" size={16} color={theme.colors.gray[500]} />
                <Text style={styles.statText}>{palace.items} items</Text>
              </View>
            </View>
          </Card>
        ))}

        <Card style={styles.addPalaceCard}>
          <Icon name="add" size={32} color={theme.colors.memoryTeal} />
          <Text style={styles.addPalaceText}>Create New Palace</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.memoryLavender,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: 50,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.memoryTeal,
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
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.md,
  },
  palaceCard: {
    marginBottom: theme.spacing.sm,
  },
  palaceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  palaceTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  palaceStats: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  statText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginLeft: theme.spacing.xs,
  },
  addPalaceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.memoryTeal,
    borderStyle: 'dashed',
  },
  addPalaceText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.memoryTeal,
    marginLeft: theme.spacing.sm,
    fontWeight: theme.fonts.weights.medium,
  },
});

export default MemoryScreen;