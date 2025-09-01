import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style 
}) => {
  const buttonStyle = [
    styles.button,
    styles[size],
    variant === 'outline' && styles.outline,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${size}Text` as keyof typeof styles],
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.homePrimary, theme.colors.homeCoral]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: theme.borderRadius.lg }]}
        />
        <Text style={[textStyle, { color: theme.colors.white }]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        variant === 'secondary' && { backgroundColor: theme.colors.gray[100] },
        variant === 'outline' && { backgroundColor: 'transparent' },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  small: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  medium: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  large: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  outline: {
    borderWidth: 1,
    borderColor: theme.colors.homePrimary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.medium,
    textAlign: 'center',
  },
  smallText: {
    fontSize: theme.fonts.sizes.sm,
  },
  mediumText: {
    fontSize: theme.fonts.sizes.md,
  },
  largeText: {
    fontSize: theme.fonts.sizes.lg,
  },
  outlineText: {
    color: theme.colors.homePrimary,
  },
  disabledText: {
    color: theme.colors.gray[400],
  },
});