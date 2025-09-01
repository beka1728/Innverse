import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Button, Icon } from '../components';
import { theme } from '../theme';
import { createFutureNote } from '../database/db';

const TimeScreen: React.FC = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSaveFutureNote = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert('Missing Information', 'Please add both a title and message');
      return;
    }

    setLoading(true);
    try {
      // Set delivery date to 1 year from now for demo
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      
      await createFutureNote(title.trim(), message.trim(), futureDate);
      
      setTitle('');
      setMessage('');
      
      Alert.alert('Future Note Saved!', 'Your message will be delivered in the future.');
    } catch (error) {
      console.error('Error saving future note:', error);
      Alert.alert('Error', 'Failed to save your future note. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.timeBlue, theme.colors.timeTeal]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Time Capsule</Text>
          <Icon name="time" size={24} color={theme.colors.white} />
        </View>

        <ScrollView style={styles.scrollView}>
          <Card style={styles.createCard}>
            <Text style={styles.createTitle}>Send a Message to Future You</Text>
            <Text style={styles.createSubtitle}>Write a note that will be delivered to you in the future</Text>
            
            <TextInput
              style={styles.titleInput}
              placeholder="Message title..."
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <TextInput
              style={styles.messageInput}
              placeholder="What would you like to tell your future self?"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={1000}
              textAlignVertical="top"
            />

            <View style={styles.deliveryInfo}>
              <Icon name="calendar" size={20} color={theme.colors.timeBlue} />
              <Text style={styles.deliveryText}>Will be delivered in 1 year</Text>
            </View>

            <Button
              title={loading ? "Saving..." : "Send to Future"}
              onPress={handleSaveFutureNote}
              disabled={loading}
            />
          </Card>

          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <Card style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Icon name="create" size={24} color={theme.colors.timeTeal} />
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Write Your Message</Text>
                <Text style={styles.infoDescription}>Share thoughts, goals, or wisdom with your future self</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Icon name="time" size={24} color={theme.colors.timeTeal} />
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Choose Delivery Date</Text>
                <Text style={styles.infoDescription}>Set when you want to receive this message</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Icon name="mail" size={24} color={theme.colors.timeTeal} />
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Receive & Reflect</Text>
                <Text style={styles.infoDescription}>Get surprised by your past thoughts and insights</Text>
              </View>
            </View>
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
  createCard: {
    marginBottom: theme.spacing.lg,
  },
  createTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  createSubtitle: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.fonts.sizes.md,
    fontFamily: theme.fonts.primary,
    marginBottom: theme.spacing.md,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    height: 120,
    fontSize: theme.fonts.sizes.md,
    fontFamily: theme.fonts.primary,
    marginBottom: theme.spacing.md,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  deliveryText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.timeBlue,
    marginLeft: theme.spacing.sm,
    fontWeight: theme.fonts.weights.medium,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    marginBottom: theme.spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  infoText: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  infoTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.xs,
  },
  infoDescription: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    lineHeight: theme.fonts.lineHeights.normal * theme.fonts.sizes.sm,
  },
});

export default TimeScreen;