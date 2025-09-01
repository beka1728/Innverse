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
import { MoodEntry, Entry } from '../types';

const moodEmojis = [
  { emoji: '😊', label: 'Happy', color: theme.colors.moodYellow },
  { emoji: '😢', label: 'Sad', color: theme.colors.dreamBlue },
  { emoji: '😠', label: 'Angry', color: theme.colors.questRed },
  { emoji: '😰', label: 'Anxious', color: theme.colors.moodOrange },
  { emoji: '😴', label: 'Tired', color: theme.colors.gray[400] },
  { emoji: '🤗', label: 'Excited', color: theme.colors.artPink },
  { emoji: '😌', label: 'Peaceful', color: theme.colors.forestGreen },
  { emoji: '🤔', label: 'Thoughtful', color: theme.colors.memoryTeal },
];

const commonTags = [
  'Work', 'Family', 'Friends', 'Health', 'Exercise', 
  'Sleep', 'Food', 'Weather', 'Achievement', 'Challenge'
];

const MoodScreen: React.FC = ({ navigation }: any) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState<string>('');
  const [recentEntries, setRecentEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecentEntries();
  }, []);

  const loadRecentEntries = async () => {
    try {
      const entries = await getEntries('mood', 10);
      setRecentEntries(entries);
    } catch (error) {
      console.error('Error loading mood entries:', error);
    }
  };

  const handleMoodSelect = (emoji: string) => {
    setSelectedMood(emoji);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = async () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood', 'Choose an emoji that represents how you\'re feeling');
      return;
    }

    setLoading(true);
    try {
      const moodData: MoodEntry = {
        emoji: selectedMood,
        intensity,
        tags: selectedTags,
        note: note.trim() || undefined,
      };

      await createEntry('mood', undefined, note.trim() || undefined, selectedTags, moodData);
      
      // Reset form
      setSelectedMood('');
      setIntensity(5);
      setSelectedTags([]);
      setNote('');
      
      // Reload entries
      await loadRecentEntries();
      
      Alert.alert('Mood Saved!', 'Your mood has been recorded in your journal.');
    } catch (error) {
      console.error('Error saving mood:', error);
      Alert.alert('Error', 'Failed to save your mood. Please try again.');
    }
    setLoading(false);
  };

  const selectedMoodEmoji = moodEmojis.find(m => m.emoji === selectedMood);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.moodYellow + '20', theme.colors.white]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.gray[700]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mood Journal</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Current Mood Selection */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>How are you feeling?</Text>
            <Text style={styles.cardSubtitle}>Tap an emoji that matches your mood</Text>
            
            <View style={styles.moodGrid}>
              {moodEmojis.map((mood, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.moodItem,
                    selectedMood === mood.emoji && { backgroundColor: mood.color + '20' }
                  ]}
                  onPress={() => handleMoodSelect(mood.emoji)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Intensity Slider */}
          {selectedMood && (
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Intensity Level</Text>
              <Text style={styles.cardSubtitle}>How strong is this feeling?</Text>
              
              <View style={styles.intensityContainer}>
                <Text style={styles.intensityLabel}>Low</Text>
                <View style={styles.intensitySlider}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.intensityDot,
                        intensity >= level && { 
                          backgroundColor: selectedMoodEmoji?.color || theme.colors.homePrimary 
                        }
                      ]}
                      onPress={() => setIntensity(level)}
                    />
                  ))}
                </View>
                <Text style={styles.intensityLabel}>High</Text>
              </View>
              <Text style={styles.intensityValue}>{intensity}/10</Text>
            </Card>
          )}

          {/* Tags */}
          {selectedMood && (
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>What's affecting your mood?</Text>
              <Text style={styles.cardSubtitle}>Select relevant tags</Text>
              
              <View style={styles.tagsContainer}>
                {commonTags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    selected={selectedTags.includes(tag)}
                    onPress={() => handleTagToggle(tag)}
                  />
                ))}
              </View>
            </Card>
          )}

          {/* Note */}
          {selectedMood && (
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Add a note (optional)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="What's on your mind?"
                value={note}
                onChangeText={setNote}
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
            </Card>
          )}

          {/* Save Button */}
          {selectedMood && (
            <View style={styles.saveContainer}>
              <Button
                title={loading ? "Saving..." : "Save Mood"}
                onPress={handleSave}
                disabled={loading}
              />
            </View>
          )}

          {/* Recent Entries */}
          {recentEntries.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recent Moods</Text>
              {recentEntries.slice(0, 5).map((entry) => (
                <Card key={entry.id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryEmoji}>
                      {entry.data?.emoji || '😊'}
                    </Text>
                    <View style={styles.entryInfo}>
                      <Text style={styles.entryDate}>
                        {new Date(entry.created_at).toLocaleDateString()}
                      </Text>
                      <Text style={styles.entryIntensity}>
                        Intensity: {entry.data?.intensity || 5}/10
                      </Text>
                    </View>
                  </View>
                  {entry.content && (
                    <Text style={styles.entryNote} numberOfLines={2}>
                      {entry.content}
                    </Text>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <View style={styles.entryTags}>
                      {entry.tags.slice(0, 3).map((tag, index) => (
                        <Chip key={index} label={tag} />
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
    backgroundColor: theme.colors.white,
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
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
  },
  headerRight: {
    width: 24,
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
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: '22%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  moodLabel: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  intensityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  intensityLabel: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    width: 30,
  },
  intensitySlider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: theme.spacing.md,
  },
  intensityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[300],
  },
  intensityValue: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    height: 100,
    fontSize: theme.fonts.sizes.md,
    fontFamily: theme.fonts.primary,
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
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  entryEmoji: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  entryInfo: {
    flex: 1,
  },
  entryDate: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
  },
  entryIntensity: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.gray[500],
    marginTop: theme.spacing.xs,
  },
  entryNote: {
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

export default MoodScreen;