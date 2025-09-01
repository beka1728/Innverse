import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Icon } from '../components';
import { theme } from '../theme';

const BookScreen: React.FC = ({ navigation }: any) => {
  const books = [
    { title: 'The Power of Now', author: 'Eckhart Tolle', progress: 65 },
    { title: 'Atomic Habits', author: 'James Clear', progress: 30 },
    { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', progress: 100 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.gray[700]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Digital Library</Text>
        <Icon name="book" size={24} color={theme.colors.gray[700]} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Your Books</Text>
        
        {books.map((book, index) => (
          <Card key={index} style={styles.bookCard}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${book.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{book.progress}%</Text>
              </View>
            </View>
            <Icon name="book-outline" size={48} color={theme.colors.goldLeaf} />
          </Card>
        ))}

        <Card style={styles.addBookCard}>
          <Icon name="add" size={32} color={theme.colors.homePrimary} />
          <Text style={styles.addBookText}>Add New Book</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.parchment,
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
    color: theme.colors.inkBlack,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.inkBlack,
    marginBottom: theme.spacing.md,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  bookInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  bookTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.inkBlack,
  },
  bookAuthor: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.gray[300],
    borderRadius: 2,
    marginRight: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.goldLeaf,
    borderRadius: 2,
  },
  progressText: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.gray[600],
    width: 40,
  },
  addBookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.gray[50],
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    borderStyle: 'dashed',
  },
  addBookText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.homePrimary,
    marginLeft: theme.spacing.sm,
    fontWeight: theme.fonts.weights.medium,
  },
});

export default BookScreen;