import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FavoritesProvider } from './src/context/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
