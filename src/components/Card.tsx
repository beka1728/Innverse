import React from 'react';
import { TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  color = theme.colors.white, 
  onPress, 
  style 
}) => {
  const cardStyle = [
    styles.card,
    { backgroundColor: color },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={cardStyle} disabled>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.xl, // 14px radius as specified
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
});