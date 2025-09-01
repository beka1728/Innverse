import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface ChipProps {
  label: string;
  color?: string;
  textColor?: string;
  onPress?: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  color = theme.colors.gray[100], 
  textColor = theme.colors.gray[700],
  onPress,
  selected = false,
  style 
}) => {
  const chipStyle = [
    styles.chip,
    { backgroundColor: selected ? theme.colors.homePrimary : color },
    style,
  ];

  const chipTextStyle = [
    styles.text,
    { color: selected ? theme.colors.white : textColor },
  ];

  return (
    <TouchableOpacity
      style={chipStyle}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <Text style={chipTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  text: {
    fontSize: theme.fonts.sizes.sm,
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.medium,
  },
});