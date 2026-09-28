import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import GamesScreen from '../screens/GamesScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const gameShelfTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#8B5CF6',
    background: '#0B0D12',
    card: '#0B0D12',
    text: '#F2F3F5',
    border: '#252A33',
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={gameShelfTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#0B0D12' },
          headerTitleStyle: { fontSize: 17, fontWeight: '600', color: '#F2F3F5' },
          headerTintColor: '#A78BFA',
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: '#0B0D12' },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Games" component={GamesScreen} options={{ title: 'Jogos' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
