import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '../components';
import { theme } from '../theme';
import { TabParamList, RootStackParamList } from '../types';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import MoodScreen from '../screens/MoodScreen';
import DreamScreen from '../screens/DreamScreen';
import MantraScreen from '../screens/MantraScreen';
import LifeGameScreen from '../screens/LifeGameScreen';
import BookScreen from '../screens/BookScreen';
import MemoryScreen from '../screens/MemoryScreen';
import ArtScreen from '../screens/ArtScreen';
import QuestScreen from '../screens/QuestScreen';
import TimeScreen from '../screens/TimeScreen';
import MirrorScreen from '../screens/MirrorScreen';
import ShareScreen from '../screens/ShareScreen';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Mood" component={MoodScreen} />
    <Stack.Screen name="Dream" component={DreamScreen} />
    <Stack.Screen name="Book" component={BookScreen} />
    <Stack.Screen name="Memory" component={MemoryScreen} />
    <Stack.Screen name="Art" component={ArtScreen} />
    <Stack.Screen name="Quest" component={QuestScreen} />
    <Stack.Screen name="Time" component={TimeScreen} />
    <Stack.Screen name="Mirror" component={MirrorScreen} />
    <Stack.Screen name="Share" component={ShareScreen} />
  </Stack.Navigator>
);

const CaptureStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Mood" component={MoodScreen} />
  </Stack.Navigator>
);

const ForestStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Mantra" component={MantraScreen} />
  </Stack.Navigator>
);

const RPGStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LifeGame" component={LifeGameScreen} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Share" component={ShareScreen} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Capture':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              case 'Forest':
                iconName = focused ? 'leaf' : 'leaf-outline';
                break;
              case 'RPG':
                iconName = focused ? 'game-controller' : 'game-controller-outline';
                break;
              case 'More':
                iconName = focused ? 'grid' : 'grid-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.homePrimary,
          tabBarInactiveTintColor: theme.colors.gray[400],
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.white,
            borderTopColor: theme.colors.gray[200],
            paddingTop: theme.spacing.xs,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: theme.fonts.sizes.xs,
            fontFamily: theme.fonts.primary,
            fontWeight: theme.fonts.weights.medium,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Capture" component={CaptureStack} />
        <Tab.Screen name="Forest" component={ForestStack} />
        <Tab.Screen name="RPG" component={RPGStack} />
        <Tab.Screen name="More" component={MoreStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};