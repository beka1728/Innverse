import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = theme.colors.gray[700] 
}) => {
  return <Ionicons name={name} size={size} color={color} />;
};