import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GameCard from '../components/GameCard';
import games from '../data/games';

function GameSeparator() {
  return <View style={styles.separator} />;
}

export default function GamesScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();
  const normalizedSearch = search.trim().toLowerCase();
  const filteredGames = games.filter((game) => game.name.toLowerCase().includes(normalizedSearch));

  function handleViewDetails(game) {
    navigation.navigate('Details', { game });
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.headerContainer,
        { paddingLeft: insets.left + 16, paddingRight: insets.right + 16 },
      ]}>
        <TextInput
          accessibilityLabel="Pesquisar jogos pelo nome"
          placeholder="Pesquisar jogos"
          placeholderTextColor="#858D9B"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          selectionColor="#8B5CF6"
          style={styles.searchInput}
        />
      </View>
      <FlatList
        style={styles.list}
        data={filteredGames}
        keyExtractor={(game) => game.id}
        renderItem={({ item }) => <GameCard game={item} onPress={handleViewDetails} />}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum jogo encontrado.</Text>
          </View>
        }
        ItemSeparatorComponent={GameSeparator}
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
    paddingTop: 2,
  },
  headerContainer: {
    paddingTop: 14,
    paddingBottom: 12,
    width: '100%',
  },
  separator: {
    height: 12,
  },
  searchInput: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2B303A',
    backgroundColor: '#151922',
    color: '#F2F3F5',
    fontSize: 16,
  },
  emptyContainer: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#A3AAB8',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
  },
});
