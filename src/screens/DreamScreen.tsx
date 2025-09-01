import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Button, Chip, Icon } from '../components';
import { theme } from '../theme';
import { createEntry, getEntries } from '../database/db';
import { DreamEntry, Entry } from '../types';

const dreamTags = [
  'Lucid', 'Nightmare', 'Flying', 'Falling', 'Water', 
  'Animals', 'People', 'Work', 'Family', 'Adventure'
];

const DreamScreen: React.FC = ({ navigation }: any) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLucid, setIsLucid] = useState<boolean>(false);
  const [vividness, setVividness] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recentEntries, setRecentEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecentEntries();
  }, []);

  const loadRecentEntries = async () => {
    try {
      const entries = await getEntries('dream', 10);
      setRecentEntries(entries);
    } catch (error) {
      console.error('Error loading dream entries:', error);
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = async () => {
    if (!title.trim() && !description.trim()) {
      Alert.alert('Please add content', 'Add a title or description for your dream');
      return;
    }

    setLoading(true);
    try {
      const dreamData: DreamEntry = {
        title: title.trim(),
        description: description.trim(),
        tags: selectedTags,
        lucid: isLucid,
        vividness,
      };

      await createEntry('dream', title.trim() || 'Dream Entry', description.trim(), selectedTags, dreamData);
      
      // Reset form
      setTitle('');
      setDescription('');
      setIsLucid(false);
      setVividness(5);
      setSelectedTags([]);
      
      // Reload entries
      await loadRecentEntries();
      
      Alert.alert('Dream Saved!', 'Your dream has been captured in your log.');
    } catch (error) {
      console.error('Error saving dream:', error);
      Alert.alert('Error', 'Failed to save your dream. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.dreamBlue + '20', theme.colors.dreamCyan + '10', theme.colors.white]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dream Catcher</Text>
          <TouchableOpacity>
            <Icon name="moon" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Dream Entry Form */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Capture Your Dream</Text>
            <Text style={styles.cardSubtitle}>Record the details while they're fresh</Text>
            
            <TextInput
              style={styles.titleInput}
              placeholder="Dream title (optional)"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe your dream..."
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={2000}
              textAlignVertical="top"
            />
          </Card>

          {/* Lucid Dream Toggle */}
          <Card style={styles.card}>
            <TouchableOpacity 
              style={styles.toggleRow}
              onPress={() => setIsLucid(!isLucid)}
            >
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleTitle}>Lucid Dream</Text>
                <Text style={styles.toggleSubtitle}>Were you aware you were dreaming?</Text>
              </View>
              <View style={[styles.toggle, isLucid && styles.toggleActive]}>
                {isLucid && <Icon name="checkmark" size={16} color={theme.colors.white} />}
              </View>
            </TouchableOpacity>
          </Card>

          {/* Vividness Scale */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Dream Vividness</Text>
            <Text style={styles.cardSubtitle}>How clear and detailed was your dream?</Text>
            
            <View style={styles.vividnessContainer}>
              <Text style={styles.vividnessLabel}>Faint</Text>
              <View style={styles.vividnessSlider}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.vividnessDot,
                      vividness >= level && { backgroundColor: theme.colors.dreamCyan }
                    ]}
                    onPress={() => setVividness(level)}
                  />
                ))}
              </View>
              <Text style={styles.vividnessLabel}>Vivid</Text>
            </View>
            <Text style={styles.vividnessValue}>{vividness}/10</Text>
          </Card>

          {/* Tags */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Dream Elements</Text>
            <Text style={styles.cardSubtitle}>Tag the key themes and elements</Text>
            
            <View style={styles.tagsContainer}>
              {dreamTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  selected={selectedTags.includes(tag)}
                  onPress={() => handleTagToggle(tag)}
                  color={theme.colors.dreamCyan + '20'}
                  textColor={theme.colors.dreamBlue}
                />
              ))}
            </View>
          </Card>

          {/* Save Button */}
          <View style={styles.saveContainer}>
            <Button
              title={loading ? "Saving..." : "Save Dream"}
              onPress={handleSave}
              disabled={loading}
            />
          </View>

          {/* Recent Dreams */}
          {recentEntries.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Dream Journal</Text>
              {recentEntries.slice(0, 5).map((entry) => (
                <Card key={entry.id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{entry.title || 'Dream Entry'}</Text>
                    <Text style={styles.entryDate}>
                      {new Date(entry.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  {entry.data?.lucid && (
                    <View style={styles.lucidBadge}>
                      <Icon name="star" size={12} color={theme.colors.goldCoin} />
                      <Text style={styles.lucidText}>Lucid</Text>
                    </View>
                  )}
                  {entry.content && (
                    <Text style={styles.entryContent} numberOfLines={3}>
                      {entry.content}
                    </Text>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <View style={styles.entryTags}>
                      {entry.tags.slice(0, 3).map((tag, index) => (
                        <Chip 
                          key={index} 
                          label={tag} 
                          color={theme.colors.dreamCyan + '20'}
                          textColor={theme.colors.dreamBlue}
                        />
                      ))}
                    </View>
                  )}
                </Card>
              ))}
            </>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dreamBlue,
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
    backgroundColor: theme.colors.dreamBlue + '90',
  },
  headerTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.xs,
  },
  cardSubtitle: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.fonts.sizes.md,
    fontFamily: theme.fonts.primary,
    marginBottom: theme.spacing.sm,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    height: 120,
    fontSize: theme.fonts.sizes.md,
    fontFamily: theme.fonts.primary,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  toggleSubtitle: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  toggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: theme.colors.dreamCyan,
  },
  vividnessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  vividnessLabel: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    width: 40,
  },
  vividnessSlider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: theme.spacing.md,
  },
  vividnessDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[300],
  },
  vividnessValue: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  saveContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  entryCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  entryTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  entryDate: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.gray[500],
  },
  lucidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.goldCoin + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  lucidText: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.goldCoin,
    marginLeft: theme.spacing.xs,
  },
  entryContent: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[700],
    lineHeight: theme.fonts.lineHeights.normal * theme.fonts.sizes.sm,
    marginBottom: theme.spacing.sm,
  },
  entryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomSpacing: {
    height: theme.spacing.xl,
  },
});

export default DreamScreen;