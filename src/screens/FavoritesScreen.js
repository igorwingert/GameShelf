import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GameCard from '../components/GameCard';
import { useFavorites } from '../context/FavoritesContext';

function FavoriteSeparator() {
  return <View style={styles.separator} />;
}

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();
  const insets = useSafeAreaInsets();

  function handleViewDetails(game) {
    navigation.navigate('Details', { game });
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={favorites}
        keyExtractor={(game) => game.id}
        renderItem={({ item }) => <GameCard game={item} onPress={handleViewDetails} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não possui jogos favoritos.</Text>
          </View>
        }
        ItemSeparatorComponent={FavoriteSeparator}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingBottom: insets.bottom + 20,
            paddingLeft: insets.left + 16,
            paddingRight: insets.right + 16,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D12',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 14,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#A3AAB8',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
  },
});
